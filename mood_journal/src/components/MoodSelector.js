import React, { useState } from 'react';

const moods = [
  { emoji: '🤩', label: 'Excited' },
  { emoji: '😄', label: 'Happy' },
  { emoji: '🙂', label: 'Content' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
];

export default function MoodSelector({ onSelect }) {
  const [note, setNote] = useState('');
  const [picked, setPicked] = useState(null);

  const submit = () => {
    if (!picked) return alert('Please pick a mood (emoji).');
    onSelect(picked.label, note.trim());
    setNote('');
    setPicked(null);
  };

  return (
    <>
      <h2>How are you feeling today?</h2>
      <div className="mood-list" role="list">
        {moods.map(m => (
          <button
            key={m.label}
            className="mood-btn"
            onClick={() => setPicked(m)}
            aria-pressed={picked && picked.label === m.label}
            title={m.label}
          >
            <span style={{ fontSize: 25 }}>{m.emoji}</span>
          </button>
        ))}
      </div>
      <textarea
        placeholder="Optional note (what's on your mind?)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="actions" style={{ marginTop: 8 }}>
        <button className="btn btn-primary" onClick={submit}>Save today's mood</button>
        <div style={{ flex: 1 }} />
        <div className="muted">Tip: Tap an emoji, add a note, and save.</div>
      </div>
    </>
  );
}
