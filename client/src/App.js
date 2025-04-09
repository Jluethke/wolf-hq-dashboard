
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://i.imgur.com/LbSHfMu.png"
          alt="Wolf HQ Logo"
          className="App-logo"
        />
        <div className="header-text">
          <div className="header-title">🐺 Welcome to Wolf HQ Dashboard</div>
          <div className="header-subtitle">The central command for all Warzone missions!</div>
        </div>
      </header>
      <div className="App-body">
        <p>Test drive the MVP with your squad!</p>
      </div>
    </div>
  );
}

export default App;
