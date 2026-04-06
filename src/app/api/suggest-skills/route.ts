import { NextResponse } from "next/server";
import { groqChat, isGroqConfigured } from "@/lib/groq";

const SYSTEM =
  "You are an expert resume writer and career coach. Respond ONLY with valid JSON. No markdown, no explanation, no preamble — just the raw JSON object.";

function fallbackSkills(jobRole: string): string[] {
  return [
    `${jobRole.split(" ")[0] || "Core"} fundamentals`,
    "Communication",
    "Problem solving",
    "Agile delivery",
    "Testing & quality",
    "System design",
    "Documentation",
    "Collaboration",
    "Data analysis",
    "Stakeholder alignment",
  ].slice(0, 10);
}

export async function POST(req: Request) {
  console.log("[suggest-skills] action: incoming");
  let body: { jobRole?: string; currentSkills?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const jobRole = body.jobRole || "Professional";
  const currentSkills = body.currentSkills || [];

  if (!isGroqConfigured()) {
    return NextResponse.json({
      suggestions: fallbackSkills(jobRole),
      remainingCalls: 99,
      _demo: true,
    });
  }

  try {
    const user = `Suggest 10 relevant skills for a ${jobRole} that complement these existing skills: ${JSON.stringify(currentSkills)}. Return JSON: { "suggestions": string[] }`;
    const raw = await groqChat(SYSTEM, user);
    const j = JSON.parse(raw) as { suggestions?: string[] };
    const suggestions = Array.isArray(j.suggestions)
      ? j.suggestions.map(String).slice(0, 10)
      : fallbackSkills(jobRole);
    return NextResponse.json({ suggestions, remainingCalls: 99 });
  } catch (e) {
    console.error("[suggest-skills]", e);
    return NextResponse.json({
      suggestions: fallbackSkills(jobRole),
      remainingCalls: 99,
    });
  }
}
