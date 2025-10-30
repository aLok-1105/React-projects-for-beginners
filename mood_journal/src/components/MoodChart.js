import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f97316', '#f43f5e', '#6366f1', '#06b6d4', '#34d399', '#f59e0b', '#a78bfa'];

export default function MoodChart({ entries }){
  const counts = {};
  (entries || []).forEach(e => counts[e.mood] = (counts[e.mood]||0)+1);
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  if(data.length===0) return <div><h2>Mood Distribution</h2><p className="muted">No data yet.</p></div>;

  return (
    <div style={{width:'100%', height:240}}>
      <h2 style={{marginTop:0}}>Mood Distribution</h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40} paddingAngle={6}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
