import React from "react";
import StoryForm from "./components/StoryForm";
import StoryPlayer from "./components/StoryPlayer";
import { useStory } from "./hooks/useStory";
import "./App.css";

export default function App() {
  const { story, audioUrl, loading, loadingStep, error, create } = useStory();

  return (
    <div className="app">
      <header className="app-header">
        <div className="leaf">🌿</div>
        <h1>Story Garden</h1>
        <p>Grow a story. Plant a value.</p>
      </header>

      <main className="app-main">
        <section className="card form-card">
          <h2>Your story</h2>
          <StoryForm onSubmit={create} loading={loading} />
        </section>

        {error && (
          <div className="error-box">
            <strong>Something went wrong:</strong> {error}
          </div>
        )}

        {(story || loadingStep) && (
          <section className="card story-card">
            <StoryPlayer story={story} audioUrl={audioUrl} loadingStep={loadingStep} />
          </section>
        )}
      </main>
    </div>
  );
}
