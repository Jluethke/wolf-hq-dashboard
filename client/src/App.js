import React from 'react';
import './App.css';
import logo from './assets/wolf-logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Wolf HQ Logo" />
        <h1><span style={{ color: 'orange' }}>Welcome to Wolf HQ Dashboard</span></h1>
        <p>This is the frontend live test dashboard!</p>
      </header>
    </div>
  );
}

export default App;
