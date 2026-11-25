import { NextResponse } from "next/server";
import { LESSONS, TOPICS, SUBJECTS } from "@/lib/learning-engine";
import { cacheLesson, cacheQuestions } from "@/lib/dexie";

export async function GET() {
  return NextResponse.json({ lessons: LESSONS, topics: TOPICS, subjects: SUBJECTS });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const { QUESTIONS } = require("@/lib/learning-engine");
  const questions = QUESTIONS.filter((q: any) => q.lessonId === id);
  await cacheLesson(lesson);
  await cacheQuestions(questions);

  return NextResponse.json({ success: true, cached: true, lessonId: id, sizeKb: lesson.dataSizeKb });
}
