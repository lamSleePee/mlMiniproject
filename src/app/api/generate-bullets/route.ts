import { NextResponse } from "next/server";
import { groqChat, isGroqConfigured } from "@/lib/groq";

const SYSTEM =
  "You are an expert resume writer and career coach. Respond ONLY with valid JSON. No markdown, no explanation, no preamble — just the raw JSON object.";

function safeParseBullets(raw: string): string[] {
  try {
    const j = JSON.parse(raw) as { bullets?: string[] };
    if (Array.isArray(j.bullets) && j.bullets.length)
      return j.bullets.slice(0, 5).map(String);
  } catch {
    console.error("[generate-bullets] bad JSON:", raw.slice(0, 400));
  }
  return [
    "Delivered measurable outcomes aligned with team goals",
    "Collaborated cross-functionally to ship features on schedule",
    "Improved quality through testing, documentation, and code review",
  ];
}

export async function POST(req: Request) {
  console.log("[generate-bullets] action: incoming");
  let body: { jobRole?: string; context?: string; section?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const jobRole = body.jobRole || "Professional";
  const context = body.context || "";

  if (!isGroqConfigured()) {
    return NextResponse.json({
      bullets: safeParseBullets(""),
      remainingCalls: 99,
      _demo: true,
    });
  }

  try {
    const user = `Rewrite this into 3 strong, ATS-optimized bullet points using the STAR method for a ${jobRole} role. Context: ${context}. Return JSON: { "bullets": string[] }`;
    const raw = await groqChat(SYSTEM, user);
    const bullets = safeParseBullets(raw);
    return NextResponse.json({ bullets, remainingCalls: 99 });
  } catch (e) {
    console.error("[generate-bullets]", e);
    return NextResponse.json({
      bullets: safeParseBullets(""),
      remainingCalls: 99,
    });
  }
}
