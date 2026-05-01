import express from "express";
import { synthesizeSpeech } from "../services/speechmaticsService.js";

const router = express.Router();

router.post("/synthesize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    const audioBuffer = await synthesizeSpeech(text);
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
