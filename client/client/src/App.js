import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-400">🐺 Wolf HQ</h1>
        <nav className="space-x-4">
          <a href="#" className="text-blue-400 hover:text-white">Home</a>
          <a href="#" className="text-green-400 hover:text-white">Clips</a>
          <a href="#" className="text-orange-400 hover:text-white">Calendar</a>
          <a href="#" className="text-red-400 hover:text-white">Ranks</a>
        </nav>
      </header>
      <main className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-300">
          Welcome to Wolf of Warzone HQ — Where Legends Are Born.
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl">🎮 Latest Clips</div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl">📅 Calendar Events</div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl">🏆 Rankings</div>
        </div>
      </main>
    </div>
  );
}

export default App;