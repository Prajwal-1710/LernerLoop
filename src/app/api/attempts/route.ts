import { NextResponse } from "next/server";
import { detectMisconception, QUESTIONS } from "@/lib/learning-engine";
import { saveAttemptLocally } from "@/lib/dexie";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, lessonId, questionId, answer, isCorrect, misconceptionId, misconceptionConfidence, timeSpentSeconds } = body;

  const attempt = {
    id: `attempt-${Date.now()}`,
    userId,
    lessonId,
    questionId,
    answer,
    isCorrect,
    misconceptionId,
    misconceptionConfidence,
    timeSpentSeconds,
    createdAt: new Date().toISOString(),
    synced: false,
    eventId: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    version: 1,
  };

  // Detect misconception if incorrect
  let misconceptionResult = null;
  if (!isCorrect) {
    const { QUESTIONS } = require("@/lib/learning-engine");
    const question = QUESTIONS.find((q: any) => q.id === questionId);
    if (question) {
      misconceptionResult = detectMisconception(answer, question.topicId);
      if (misconceptionResult) {
        attempt.misconceptionId = misconceptionResult.misconception.id;
        attempt.misconceptionConfidence = misconceptionResult.confidence;
      }
    }
  }

  await saveAttemptLocally(attempt);

  return NextResponse.json({
    success: true,
    attemptId: attempt.id,
    misconception: misconceptionResult,
    message: "Attempt saved locally",
  });
}
