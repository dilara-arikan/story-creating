import React, { useRef } from "react";

export default function StoryPlayer({ story, audioUrl, loadingStep }) {
  const audioRef = useRef(null);

  if (!story && !loadingStep) return null;

  return (
    <div className="story-player">
      {loadingStep === "story" && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Writing your story…</p>
        </div>
      )}

      {story && (
        <>
          <div className="story-text">
            {story.split("\n").filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {loadingStep === "audio" && (
            <div className="loading-state" style={{ marginTop: "1rem" }}>
              <div className="spinner" />
              <p>Preparing audio narration…</p>
            </div>
          )}

          {audioUrl && (
            <div className="audio-section">
              <p className="audio-label">Listen to the story</p>
              <audio ref={audioRef} src={audioUrl} controls style={{ width: "100%" }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
