import { NextResponse } from "next/server";
import { groqChat, isGroqConfigured } from "@/lib/groq";

const SYSTEM =
  "You are an expert resume writer and career coach. Respond ONLY with valid JSON. No markdown, no explanation, no preamble — just the raw JSON object.";

function fallbackAts(jobDescription: string, resumeText: string) {
  const jdWords = jobDescription
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 4);
  const resumeLower = resumeText.toLowerCase();
  const matched = Array.from(new Set(jdWords)).filter((w) =>
    resumeLower.includes(w),
  ).slice(0, 8);
  const missing = Array.from(new Set(jdWords))
    .filter((w) => !resumeLower.includes(w))
    .slice(0, 8);
  const score = Math.min(
    95,
    Math.round(40 + matched.length * 7 - missing.length * 2),
  );
  return {
    score: Math.max(0, score),
    matched,
    missing,
    suggestions: [
      "Mirror key phrases from the job description in your experience bullets.",
      "Quantify impact with metrics (%, $, time saved).",
      "Add a skills section that maps directly to required tools.",
    ],
  };
}

export async function POST(req: Request) {
  console.log("[ats-score] action: incoming");
  let body: { jobDescription?: string; resumeText?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const jobDescription = body.jobDescription || "";
  const resumeText = body.resumeText || "";

  if (!isGroqConfigured()) {
    const f = fallbackAts(jobDescription, resumeText);
    return NextResponse.json({ ...f, remainingCalls: 99, _demo: true });
  }

  try {
    const user = `Analyze this resume against the job description. Extract keywords from the JD, check presence in resume. Return JSON: { "score": number (0-100), "matched": string[], "missing": string[], "suggestions": string[] (3 items) }\n\nJob description:\n${jobDescription}\n\nResume:\n${resumeText}`;
    const raw = await groqChat(SYSTEM, user);
    const j = JSON.parse(raw) as {
      score?: number;
      matched?: string[];
      missing?: string[];
      suggestions?: string[];
    };
    return NextResponse.json({
      score: typeof j.score === "number" ? j.score : 0,
      matched: Array.isArray(j.matched) ? j.matched : [],
      missing: Array.isArray(j.missing) ? j.missing : [],
      suggestions: Array.isArray(j.suggestions)
        ? j.suggestions.slice(0, 3)
        : [],
      remainingCalls: 99,
    });
  } catch (e) {
    console.error("[ats-score]", e);
    const f = fallbackAts(jobDescription, resumeText);
    return NextResponse.json({ ...f, remainingCalls: 99 });
  }
}
