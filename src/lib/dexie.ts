import Dexie, { Table } from "dexie";

export class LearnLoopDB extends Dexie {
  users!: Table<any, string>;
  attempts!: Table<any, string>;
  misconceptionEvents!: Table<any, string>;
  masteryRecords!: Table<any, string>;
  syncEvents!: Table<any, string>;
  downloads!: Table<any, string>;
  cachedContent!: Table<any, string>;
  lessons!: Table<any, string>;
  questions!: Table<any, string>;

  constructor() {
    super("LearnLoopDB");
    this.version(1).stores({
      users: "id, role",
      attempts: "id, userId, lessonId, synced, eventId, createdAt",
      misconceptionEvents: "id, attemptId, misconceptionId, detectedAt",
      masteryRecords: "id, userId, topicId, updatedAt",
      syncEvents: "id, eventId, status, createdAt",
      downloads: "id, userId, lessonId, downloadedAt",
      cachedContent: "id, type, identifier, version, cachedAt",
      lessons: "id, topicId, version",
      questions: "id, lessonId, topicId",
    });
  }
}

export const db = new LearnLoopDB();

export async function saveAttemptLocally(attempt: any) {
  await db.attempts.put({
    ...attempt,
    synced: false,
    createdAt: attempt.createdAt || new Date().toISOString(),
  });
  await db.syncEvents.put({
    id: `sync-${attempt.eventId}`,
    eventId: attempt.eventId,
    entityType: "attempt",
    entityId: attempt.id,
    action: "create",
    status: "pending",
    createdAt: new Date().toISOString(),
    retryCount: 0,
  });
}

export async function getUnsyncedAttempts() {
  return db.attempts.where("synced").equals(0).toArray();
}

export async function markAttemptSynced(attemptId: string) {
  await db.attempts.update(attemptId, { synced: true });
  await db.syncEvents
    .where("entityId")
    .equals(attemptId)
    .modify({ status: "synced", syncedAt: new Date().toISOString() });
}

export async function cacheLesson(lesson: any) {
  await db.cachedContent.put({
    id: `lesson-${lesson.id}`,
    type: "lesson",
    identifier: lesson.id,
    version: lesson.version,
    content: lesson,
    cachedAt: new Date().toISOString(),
  });
  await db.lessons.put(lesson);
}

export async function getCachedLesson(lessonId: string) {
  return db.cachedContent.where("identifier").equals(lessonId).first();
}

export async function cacheQuestions(questions: any[]) {
  for (const q of questions) {
    await db.questions.put(q);
  }
}

export async function getCachedQuestions(lessonId: string) {
  return db.questions.where("lessonId").equals(lessonId).toArray();
}

export async function getCachedContent() {
  return db.cachedContent.toArray();
}
