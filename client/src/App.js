
import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Click a panel to simulate an action!");

  const handleClick = (panel) => {
    switch (panel) {
      case "announcement":
        setMessage("📢 Pretend announcement sent!");
        break;
      case "welcome":
        setMessage("👋 Pretend welcome message triggered!");
        break;
      case "event":
        setMessage("📆 Event 'Warzone Scrim' added!");
        break;
      case "kick":
        setMessage("🚫 'Player123' was fake-kicked (for demo)!");
        break;
      default:
        setMessage("Clicked!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://i.imgur.com/LbSHfMu.png"
          alt="Wolf HQ Logo"
          className="App-logo"
        />
        <div className="header-text">
          <div className="header-title">Welcome to Wolf HQ Dashboard</div>
          <div className="header-subtitle">Try out the Mod Panels!</div>
        </div>
      </header>

      <div className="Dashboard">
        <div className="Dashboard-card orange" onClick={() => handleClick("announcement")}>📢 Post Announcement</div>
        <div className="Dashboard-card green" onClick={() => handleClick("welcome")}>👋 Welcome Members</div>
        <div className="Dashboard-card blue" onClick={() => handleClick("event")}>📆 Schedule Event</div>
        <div className="Dashboard-card red" onClick={() => handleClick("kick")}>🚫 Kick/Ban User</div>
      </div>

      <div className="feedback">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
