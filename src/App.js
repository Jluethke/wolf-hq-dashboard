import React from 'react';
import './App.css';
import logo from './assets/wolf-logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Wolf Logo" />
        <h1>🐺 Welcome to Wolf HQ Dashboard</h1>
        <p>This is the frontend live test dashboard for the kids!</p>
      </header>
    </div>
  );
}

export default App;
