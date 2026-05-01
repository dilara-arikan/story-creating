const BASE = "/api";

export async function generateStory(params) {
  const res = await fetch(`${BASE}/story/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to generate story");
  }
  return res.json(); // { story: "..." }
}

export async function synthesizeSpeech(text) {
  const res = await fetch(`${BASE}/tts/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("Failed to synthesize speech");
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
