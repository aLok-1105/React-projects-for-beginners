import React, { useState } from "react";

function App() {
  const [color, setColor] = useState("lightblue");

  const changeColor = () => {
    setColor(color === "lightblue" ? "lightgreen" : "lightblue");
  };

  return (
    <div style={{ backgroundColor: color, height: "100vh", textAlign: "center", paddingTop: "100px" }}>
      <h1>Hello, I’m Akash Chand 👋</h1>
      <p>Welcome to my first React mini project for Hacktoberfest 2025!</p>
      <button onClick={changeColor} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Change Background
      </button>
    </div>
  );
}

export default App;
