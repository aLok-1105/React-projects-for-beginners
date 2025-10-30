import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import JournalEntry from './components/JournalEntry';
import MoodChart from './components/MoodChart';
import MoodStats from './components/MoodStats';
import { loadData, saveData } from './utils/storage';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    const saved = loadData();
    setEntries(saved);
  }, []);

  // persist whenever entries change
  useEffect(() => {
    saveData(entries);
  }, [entries]);

  // Called by MoodSelector when user saves a mood
  const handleAdd = (moodLabel, note) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(), // human-readable
      mood: moodLabel,
      note: note || ''
    };

    // prepend newest first
    setEntries(prev => [newEntry, ...prev]);
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
  };

  return (
    <div className="app" role="main">
      <div className="left">
        <Header />
        <div className="card">
          <MoodSelector onSelect={handleAdd} />
        </div>

        <div className="card recent">
          <JournalEntry entries={entries} onDelete={handleDelete} />
        </div>
      </div>

      <div className="right">
        <div className="card">
          <MoodChart entries={entries} />
        </div>
        <div className="card">
          <MoodStats entries={entries} />
        </div>
      </div>
    </div>
  );
}
