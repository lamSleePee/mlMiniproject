import OpenAI from "openai";

let groqClient: OpenAI | null = null;

function getGroqClient(): OpenAI {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("GROQ_API_KEY is not set");
  }
  if (!groqClient) {
    groqClient = new OpenAI({
      apiKey: key,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }
  return groqClient;
}

export async function groqChat(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const groq = getGroqClient();
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 800,
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content ?? "";
}

export function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY;
}
