import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const getStored = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState(() => getStored('announcements', []));
  const [welcomeName, setWelcomeName] = useState('');
  const [welcomed, setWelcomed] = useState(() => getStored('welcomedMembers', []));
  const [kickName, setKickName] = useState('');
  const [banned, setBanned] = useState(() => getStored('bannedUsers', []));
  const [eventData, setEventData] = useState({ title: '', date: '', time: '', description: '' });
  const [events, setEvents] = useState(() => getStored('events', []));
  const [score, setScore] = useState(0);

  useEffect(() => localStorage.setItem('announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('welcomedMembers', JSON.stringify(welcomed)), [welcomed]);
  useEffect(() => localStorage.setItem('bannedUsers', JSON.stringify(banned)), [banned]);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  // === Alien Tap Game ===
  useEffect(() => {
    const alien = document.getElementById("alien");
    const moveAlien = () => {
      const x = Math.random() * 90;
      const y = Math.random() * 90;
      if (alien) {
        alien.style.top = `${y}%`;
        alien.style.left = `${x}%`;
      }
    };
    const interval = setInterval(() => moveAlien(), 1500);
    return () => clearInterval(interval);
  }, []);

  const handleAlienClick = () => setScore(score + 1);

  // === Dashboard Actions ===
  const postAnnouncement = () => {
    if (announcement.trim()) {
      setAnnouncements([...announcements, announcement]);
      setAnnouncement('');
    }
  };
  const editAnnouncement = (i) => {
    const edited = prompt("Edit announcement:", announcements[i]);
    if (edited !== null) {
      const copy = [...announcements];
      copy[i] = edited;
      setAnnouncements(copy);
    }
  };
  const deleteAnnouncement = (i) => {
    const copy = [...announcements];
    copy.splice(i, 1);
    setAnnouncements(copy);
  };

  const welcomeUser = () => {
    if (welcomeName.trim()) {
      setWelcomed([...welcomed, welcomeName]);
      setWelcomeName('');
    }
  };
  const undoWelcome = (i) => {
    const copy = [...welcomed];
    copy.splice(i, 1);
    setWelcomed(copy);
  };

  const kickUser = () => {
    if (kickName.trim()) {
      setBanned([...banned, kickName]);
      setKickName('');
    }
  };
  const unbanUser = (i) => {
    const copy = [...banned];
    copy.splice(i, 1);
    setBanned(copy);
  };

  const addEvent = () => {
    const { title, date, time, description } = eventData;
    if (title && date && time) {
      setEvents([...events, { title, date, time, description }]);
      setEventData({ title: '', date: '', time: '', description: '' });
    }
  };
  const editEvent = (i) => {
    const evt = events[i];
    const title = prompt("Edit event title:", evt.title);
    const date = prompt("Edit event date:", evt.date);
    const time = prompt("Edit event time:", evt.time);
    const description = prompt("Edit event description:", evt.description);
    if (title && date && time) {
      const copy = [...events];
      copy[i] = { title, date, time, description };
      setEvents(copy);
    }
  };
  const deleteEvent = (i) => {
    const copy = [...events];
    copy.splice(i, 1);
    setEvents(copy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/LbSHfMu.png" alt="Wolf HQ Logo" className="App-logo" />
        <div className="header-text">
          <h1 className="App-title">Welcome to Wolf HQ Dashboard</h1>
          <p className="App-subtitle">The central command for all Warzone missions!</p>
        </div>
      </header>

      <main className="dashboard">
        {/* Orange Column */}
        <div className="stack-column">
          <div className="panel orange-panel">
            <h2>📢 Post Announcement</h2>
            <input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="Enter announcement" />
            <button onClick={postAnnouncement}>Post</button>
          </div>
          <div className="panel orange-panel">
            <h2>📄 Announcements</h2>
            <ul>
              {announcements.map((text, i) => (
                <li key={i}>
                  {text}
                  <button onClick={() => editAnnouncement(i)}>✏️</button>
                  <button onClick={() => deleteAnnouncement(i)}>🗑️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Green Column */}
        <div className="stack-column">
          <div className="panel green-panel">
            <h2>👋 Welcome Members</h2>
            <input value={welcomeName} onChange={(e) => setWelcomeName(e.target.value)} placeholder="Member name" />
            <button onClick={welcomeUser}>Welcome</button>
          </div>
          <div className="panel green-panel">
            <h2>🎉 Welcomed Members</h2>
            <ul>
              {welcomed.map((name, i) => (
                <li key={i}>
                  {name}
                  <button onClick={() => undoWelcome(i)}>↩️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Red Column */}
        <div className="stack-column">
          <div className="panel red-panel">
            <h2>🚫 Kick/Ban User</h2>
            <input value={kickName} onChange={(e) => setKickName(e.target.value)} placeholder="Username" />
            <button onClick={kickUser}>Kick</button>
          </div>
          <div className="panel red-panel">
            <h2>🔨 Banned Users</h2>
            <ul>
              {banned.map((user, i) => (
                <li key={i}>
                  {user}
                  <button onClick={() => unbanUser(i)}>🛑</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Blue Column */}
        <div className="stack-column">
          <div className="panel blue-panel">
            <h2>📅 Schedule New Event</h2>
            <input placeholder="Event Title" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
            <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} />
            <input type="time" value={eventData.time} onChange={(e) => setEventData({ ...eventData, time: e.target.value })} />
            <textarea placeholder="Description" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
            <button onClick={addEvent}>Add Event</button>
          </div>
          <div className="panel blue-panel">
            <h2>📅 Upcoming Events</h2>
            <ul>
              {events.map((event, i) => (
                <li key={i}>
                  <strong>{event.title}</strong> — {event.date} @ {event.time}
                  <br />
                  <em>{event.description}</em>
                  <br />
                  <button onClick={() => editEvent(i)}>✏️</button>
                  <button onClick={() => deleteEvent(i)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Mobile Mini Game */}
      <div className="mini-game">
        <h2>👾 Alien Tap Game</h2>
        <div className="game-container">
          <div className="alien" id="alien" onClick={handleAlienClick}></div>
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
