import React from 'react';

export default function JournalEntry({ entries, onDelete }){
  if(!entries || entries.length===0) return <p>No moods logged yet — start today!</p>;
  return (
    <div>
      <h2>Recent Entries</h2>
      {entries.map(e=>(
        <div className="entry" key={e.id}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="meta">{e.date} — {e.mood}</div>
            <div>
              <button title="Delete" onClick={()=>onDelete && onDelete(e.id)} style={{border:'none', background:'transparent', cursor:'pointer'}}>✖️</button>
            </div>
          </div>
          {e.note && <div className="note">{e.note}</div>}
        </div>
      ))}
    </div>
  );
}
