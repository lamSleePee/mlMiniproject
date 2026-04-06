import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    groqConfigured: !!process.env.GROQ_API_KEY,
    supabaseConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
