import express from "express";
import { generateStory } from "../services/groqService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { age, virtue, setting, characterName, context } = req.body;

  if (!virtue) {
    return res.status(400).json({ error: "virtue is required" });
  }

  try {
    const story = await generateStory({ age, virtue, setting, characterName, context });
    res.json({ story });
  } catch (err) {
    console.error("Story generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
