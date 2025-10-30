import React, { useMemo } from 'react';

export default function MoodStats({ entries }) {
  const total = entries.length;

  const streak = useMemo(() => {
    if (total === 0) return 0;
    const uniqueDates = [...new Set(entries.map(e => e.date.split(',')[0]))]; // use date part to dedupe
    // normalize to YYYY-MM-DD for comparison
    const normalized = uniqueDates.map(d => {
      try {
        const parsed = new Date(d);
        return parsed.toISOString().split('T')[0];
      } catch (e) {
        return null;
      }
    }).filter(Boolean).sort().reverse(); // newest first

    let count = 0;
    let cur = new Date();
    while (true) {
      const key = cur.toISOString().split('T')[0];
      if (normalized.includes(key)) {
        count++;
        cur.setDate(cur.getDate() - 1);
      } else break;
    }
    return count;
  }, [entries, total]);

  const topMood = useMemo(() => {
    if (total === 0) return '-';
    const counts = {};
    entries.forEach(e => counts[e.mood] = (counts[e.mood] || 0) + 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [entries, total]);

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div className="stat">
        <div className="muted">Total entries</div>
        <div className="streak">{total}</div>
      </div>
      <div className="stat">
        <div className="muted">Current streak</div>
        <div className="streak">{streak}</div>
      </div>
      <div className="stat">
        <div className="muted">Top mood</div>
        <div className="streak">{topMood}</div>
      </div>
    </div>
  );
}
