import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🐺 Wolf of Warzone</h1>
        <p>Welcome to the test dashboard. Choose a clip and gear up!</p>
      </header>
      <div className="clips">
        <iframe
          src="https://player.twitch.tv/?video=123456789&parent=vercel.app"
          height="300"
          width="500"
          allowFullScreen
        ></iframe>
        <iframe
          src="https://player.twitch.tv/?video=987654321&parent=vercel.app"
          height="300"
          width="500"
          allowFullScreen
        ></iframe>
      </div>
      <footer className="footer">
        <button>Join Squad</button>
        <button>Watch Leaderboard</button>
        <button>Clip of the Day</button>
      </footer>
    </div>
  );
}

export default App;
