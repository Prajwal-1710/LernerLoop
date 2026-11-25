import { NextResponse } from "next/server";
import { MISCONCEPTION_RULES, detectMisconception } from "@/lib/learning-engine";

export async function GET() {
  return NextResponse.json({ misconceptions: MISCONCEPTION_RULES });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { answer, topic, previousEvents = [] } = body;

  const result = detectMisconception(answer, topic, previousEvents);
  return NextResponse.json({ result });
}
