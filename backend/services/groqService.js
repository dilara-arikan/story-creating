import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateStory({
  age,
  virtue,
  setting,
  characterName,
  context,
}) {
  const userPrompt = `
Write a story for a child aged ${age || 10} years old.

Virtue: ${virtue}
Setting: ${setting || "any"}
Character: ${characterName || "any"}
Context: ${context || "none"}
`;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.9,
    }),
  });

  const rawText = await res.text();

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    console.error("Invalid JSON from Groq:", rawText);
    throw new Error("Invalid Groq response");
  }

  if (!res.ok) {
    console.error("STATUS:", res.status);
    console.error("GROQ ERROR:", rawText);
    throw new Error(data?.error?.message || "Groq API error");
  }

  const text = data.choices?.[0]?.message?.content;

  return text?.trim() || "No story generated";
}