import { NextResponse } from "next/server";

export async function GET() {
  const stored = localStorage.getItem("learnloop_user");
  // This runs server-side; return demo structure
  return NextResponse.json({
    demoAccounts: [
      { id: "stu-1", email: "ananya@example.in", name: "Ananya", role: "student", locale: "kn", grade: "8" },
      { id: "tea-1", email: "ramesh@example.in", name: "Ramesh Teacher", role: "teacher", locale: "en" },
      { id: "adm-1", email: "admin@example.in", name: "School Admin", role: "administrator", locale: "en" },
    ],
  });
}
