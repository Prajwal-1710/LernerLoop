import { NextResponse } from "next/server";
import { getUnsyncedAttempts, markAttemptSynced } from "@/lib/dexie";

export async function GET() {
  const attempts = await getUnsyncedAttempts();
  return NextResponse.json({ attempts, count: attempts.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { attemptIds } = body;

  for (const id of attemptIds) {
    await markAttemptSynced(id);
  }

  return NextResponse.json({ success: true, syncedCount: attemptIds.length });
}
