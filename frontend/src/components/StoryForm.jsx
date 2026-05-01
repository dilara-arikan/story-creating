import React, { useState } from "react";

const VIRTUES = [
  "honesty", "kindness", "perseverance", "courage", "empathy",
  "sharing", "responsibility", "patience", "forgiveness", "gratitude"
];

export default function StoryForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    virtue: "",
    age: "10",
    setting: "",
    characterName: "",
    context: ""
  });

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.virtue) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      <div className="field">
        <label>Virtue to teach <span style={{ color: "var(--rose)" }}>*</span></label>
        <select name="virtue" value={form.virtue} onChange={handle} required>
          <option value="">Select a virtue…</option>
          {VIRTUES.map(v => (
            <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Child's age</label>
        <input type="number" name="age" value={form.age} onChange={handle} min="8" max="12" />
      </div>

      <div className="field">
        <label>Setting <span style={{ color: "var(--ink-muted)", fontSize: "13px" }}>(optional)</span></label>
        <input type="text" name="setting" value={form.setting} onChange={handle}
          placeholder="e.g. a small town, a school, a forest…" />
      </div>

      <div className="field">
        <label>Character name <span style={{ color: "var(--ink-muted)", fontSize: "13px" }}>(optional)</span></label>
        <input type="text" name="characterName" value={form.characterName} onChange={handle}
          placeholder="e.g. Elif, Lucas…" />
      </div>

      <div className="field">
        <label>Extra context <span style={{ color: "var(--ink-muted)", fontSize: "13px" }}>(optional)</span></label>
        <textarea name="context" value={form.context} onChange={handle} rows={3}
          placeholder="e.g. make it slightly funny, the child is going through a hard time at school…" />
      </div>

      <button type="submit" disabled={loading || !form.virtue} className="btn-primary">
        {loading ? "Creating story…" : "Create story"}
      </button>
    </form>
  );
}
