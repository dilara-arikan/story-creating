export function cleanForTTS(text) {
  return text
    .replace(/[*_#`]/g, "")
    .replace(/—/g, ", ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export async function synthesizeSpeech(text) {
  const cleaned = cleanForTTS(text);

  // Speechmatics TTS endpoint - update path/body to match your plan
  const response = await fetch("https://mp.speechmatics.com/v1/synthesis", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SPEECHMATICS_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: cleaned,
      voice: { language: "en", gender: "F" },
      output_format: { type: "mp3", sample_rate: 22050 }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Speechmatics API error");
  }

  return response.arrayBuffer();
}
