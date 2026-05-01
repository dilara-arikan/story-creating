import { useState } from "react";
import { generateStory, synthesizeSpeech } from "../services/api";

export function useStory() {
  const [story, setStory] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(""); // "story" | "audio"
  const [error, setError] = useState(null);

  async function create(params) {
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setStory("");

    try {
      setLoadingStep("story");
      const { story: text } = await generateStory(params);
      setStory(text);

      setLoadingStep("audio");
      const url = await synthesizeSpeech(text);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  }

  return { story, audioUrl, loading, loadingStep, error, create };
}
