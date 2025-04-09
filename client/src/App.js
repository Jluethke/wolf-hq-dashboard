import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState('');

  const [welcomes, setWelcomes] = useState([]);
  const [welcomeName, setWelcomeName] = useState('');

  const [bans, setBans] = useState([]);
  const [banUser, setBanUser] = useState('');

  const handleAddEvent = () => {
    if (!title || !date || !time || !description) return;
    setEvents([...events, { title, date, time, description }]);
    setTitle(''); setDate(''); setTime(''); setDescription('');
  };

  const handleAddAnnouncement = () => {
    if (!announcementText) return;
    setAnnouncements([...announcements, announcementText]);
    setAnnouncementText('');
  };

  const handleWelcomeMember = () => {
    if (!welcomeName) return;
    setWelcomes([...welcomes, welcomeName]);
    setWelcomeName('');
  };

  const handleBanUser = () => {
    if (!banUser) return;
    setBans([...bans, banUser]);
    setBanUser('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/LbSHfMu.png" alt="Wolf HQ Logo" className="App-logo" />
        <div>
          <h1 className="App-title">Welcome to Wolf HQ Dashboard</h1>
          <p className="App-subtitle">The central command for all Warzone missions!</p>
        </div>
      </header>

      <main className="dashboard">
        {/* === MOD ACTIONS COLUMN === */}
        <div className="column">
          <div className="panel orange">
            <h2>📢 Post Announcement</h2>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Enter announcement"
            />
            <button onClick={handleAddAnnouncement}>Post</button>
          </div>
          <div className="panel orange list-panel">
            <h2>📜 Announcements</h2>
            <ul>
              {announcements.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* === MEMBER WELCOME COLUMN === */}
        <div className="column">
          <div className="panel green">
            <h2>👋 Welcome Members</h2>
            <input
              type="text"
              value={welcomeName}
              onChange={(e) => setWelcomeName(e.target.value)}
              placeholder="Member name"
            />
            <button onClick={handleWelcomeMember}>Welcome</button>
          </div>
          <div className="panel green list-panel">
            <h2>🎉 Welcomed Members</h2>
            <ul>
              {welcomes.map((name, idx) => (
                <li key={idx}>{name} joined the Wolf Pack!</li>
              ))}
            </ul>
          </div>
        </div>

        {/* === BAN MANAGEMENT COLUMN === */}
        <div className="column">
          <div className="panel red">
            <h2>🚫 Kick/Ban User</h2>
            <input
              type="text"
              value={banUser}
              onChange={(e) => setBanUser(e.target.value)}
              placeholder="Username"
            />
            <button onClick={handleBanUser}>Kick</button>
          </div>
          <div className="panel red list-panel">
            <h2>🔨 Banned Users</h2>
            <ul>
              {bans.map((name, idx) => (
                <li key={idx}>{name} was removed for bad behavior.</li>
              ))}
            </ul>
          </div>
        </div>

        {/* === EVENT PLANNER COLUMN === */}
        <div className="column">
          <div className="panel blue">
            <h2>📅 Schedule New Event</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button onClick={handleAddEvent}>Add Event</button>
          </div>
          <div className="panel green list-panel">
            <h2>📆 Upcoming Events</h2>
            <ul>
              {events.map((event, idx) => (
                <li key={idx}>
                  <strong>{event.title}</strong> — {event.date} at {event.time}
                  <br />
                  <em>{event.description}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
