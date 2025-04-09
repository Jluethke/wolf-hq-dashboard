
import React from "react";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Wolf HQ Logo" />
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
