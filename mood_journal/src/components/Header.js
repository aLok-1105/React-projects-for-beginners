import React from 'react';

export default function Header() {
  return (
    <div className="header">
      <div className="title">
        <div className="logo">😊</div>
        <div>
          <h1>Mood Journal</h1>
          <div className="sub">Log daily moods · track trends · build a streak</div>
        </div>
      </div>
      <div>
        <small className="muted">Local only · No signup</small>
      </div>
    </div>
  );
}
