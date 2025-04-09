import React from "react";
import "./App.css";
import wolfLogo from "./assets/wolf-logo.png";

function App() {
  const squad = [
    { name: "ShadowHunter", role: "Sniper" },
    { name: "Blitz", role: "Recon" },
    { name: "MedicWolf", role: "Support" },
    { name: "N1ghtFury", role: "Leader" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
	<img src="/wolf-logo.png" alt="Wolf HQ Logo" className="App-logo" />

        </div>
        <div>
          <h1 className="title">🐺 Welcome to Wolf HQ Dashboard</h1>
          <p className="subtitle">The central command for all Warzone missions!</p>
        </div>
      </header>

      <div className="dashboard">
        <section className="panel recent-matches">
          <h2>🎮 Recent Matches</h2>
          <ul>
            <li>🏆 Victory - 12 Kills - Rebirth Island</li>
            <li>💀 Defeat - 6 Kills - Verdansk</li>
            <li>🏆 Victory - 18 Kills - Ashika Island</li>
          </ul>
        </section>

        <section className="panel clip-of-day">
          <h2>🔥 Clip of the Day</h2>
          <video width="100%" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="panel squad">
          <h2>🧑‍🤝‍🧑 Squad Roster</h2>
          <ul>
            {squad.map((member, i) => (
              <li key={i}>
                <strong>{member.name}</strong> – {member.role}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel mods">
          <h2>🛡️ Mod Actions</h2>
          <button>⚠️ Kick Player</button>
          <button>🚫 Mute Chat</button>
          <button>🧼 Clear Lobby</button>
        </section>
      </div>
    </div>
  );
}

export default App;
