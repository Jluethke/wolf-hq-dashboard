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
  const [pack, setPack] = useState([]);
  const [speed, setSpeed] = useState(2000);

  useEffect(() => localStorage.setItem('announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('welcomedMembers', JSON.stringify(welcomed)), [welcomed]);
  useEffect(() => localStorage.setItem('bannedUsers', JSON.stringify(banned)), [banned]);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  useEffect(() => {
    const wolf = document.getElementById("wolf-icon");
    if (!wolf) return;

    const move = () => {
      const x = Math.random() * 90;
      const y = Math.random() * 90;
      wolf.style.left = `${x}%`;
      wolf.style.top = `${y}%`;
    };

    const interval = setInterval(move, speed);
    return () => clearInterval(interval);
  }, [speed]);

  const handleWolfClick = () => {
    setPack(prev => [...prev, "https://i.imgur.com/LbSHfMu.png"]);
    setSpeed(prev => Math.max(400, prev - 150));
  };

  const postAnnouncement = () => {
    if (announcement.trim()) {
      setAnnouncements([...announcements, announcement]);
      setAnnouncement('');
    }
  };
  const editAnnouncement = (i) => {
    const edited = prompt("Edit announcement:", announcements[i]);
    if (edited !== null) {
      const updated = [...announcements];
      updated[i] = edited;
      setAnnouncements(updated);
    }
  };
  const deleteAnnouncement = (i) => {
    const updated = [...announcements];
    updated.splice(i, 1);
    setAnnouncements(updated);
  };

  const welcomeUser = () => {
    if (welcomeName.trim()) {
      setWelcomed([...welcomed, welcomeName]);
      setWelcomeName('');
    }
  };
  const undoWelcome = (i) => {
    const updated = [...welcomed];
    updated.splice(i, 1);
    setWelcomed(updated);
  };

  const kickUser = () => {
    if (kickName.trim()) {
      setBanned([...banned, kickName]);
      setKickName('');
    }
  };
  const unbanUser = (i) => {
    const updated = [...banned];
    updated.splice(i, 1);
    setBanned(updated);
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
      const updated = [...events];
      updated[i] = { title, date, time, description };
      setEvents(updated);
    }
  };
  const deleteEvent = (i) => {
    const updated = [...events];
    updated.splice(i, 1);
    setEvents(updated);
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
        {/* Orange */}
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

        {/* Green */}
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

        {/* Red */}
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

        {/* Blue */}
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

      {/* 🐺 Mini Game */}
      <div className="mini-game">
        <h2>🐺 Make a Wolf Pack</h2>
        <div className="game-container">
          <div
            id="wolf-icon"
            className="wolf-icon"
            onClick={handleWolfClick}
            style={{ top: '30%', left: '30%' }}
          ></div>
        </div>
        <p>Tap the wolf to grow your pack!</p>
        <div className="wolf-pack">
          {pack.map((url, i) => (
            <img src={url} alt="Wolf" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
