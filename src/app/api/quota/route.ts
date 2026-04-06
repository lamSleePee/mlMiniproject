import { NextResponse } from "next/server";

/** Demo quota when no Supabase auth — enough for class presentation */
export function GET() {
  return NextResponse.json({
    callCount: 0,
    remainingCalls: 99,
    resetAt: null,
    windowStart: new Date().toISOString(),
  });
}
