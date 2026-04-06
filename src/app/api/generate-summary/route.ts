import { NextResponse } from "next/server";
import { groqChat, isGroqConfigured } from "@/lib/groq";

const SYSTEM =
  "You are an expert resume writer and career coach. Respond ONLY with valid JSON. No markdown, no explanation, no preamble — just the raw JSON object.";

export async function POST(req: Request) {
  console.log("[generate-summary] action: incoming");
  let body: { jobRole?: string; resumeData?: object };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const jobRole = body.jobRole || "Professional";
  const resumeData = body.resumeData || {};

  if (!isGroqConfigured()) {
    return NextResponse.json({
      summary: `Results-driven ${jobRole.toLowerCase()} with a track record of shipping reliable solutions and collaborating across teams. Eager to contribute technical depth and strong communication in fast-paced environments.`,
      remainingCalls: 99,
      _demo: true,
    });
  }

  try {
    const user = `Write a 2-sentence professional summary for a ${jobRole} based on this resume data: ${JSON.stringify(resumeData)}. Return JSON: { "summary": string }`;
    const raw = await groqChat(SYSTEM, user);
    const j = JSON.parse(raw) as { summary?: string };
    return NextResponse.json({
      summary:
        typeof j.summary === "string"
          ? j.summary
          : `Experienced ${jobRole} focused on impact and continuous improvement.`,
      remainingCalls: 99,
    });
  } catch (e) {
    console.error("[generate-summary]", e);
    return NextResponse.json({
      summary: `Experienced ${jobRole} focused on impact and continuous improvement.`,
      remainingCalls: 99,
    });
  }
}
