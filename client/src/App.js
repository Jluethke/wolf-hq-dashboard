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

  useEffect(() => localStorage.setItem('announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('welcomedMembers', JSON.stringify(welcomed)), [welcomed]);
  useEffect(() => localStorage.setItem('bannedUsers', JSON.stringify(banned)), [banned]);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  // Announcement logic
  const postAnnouncement = () => {
    if (announcement.trim()) {
      setAnnouncements([...announcements, announcement]);
      setAnnouncement('');
    }
  };

  const editAnnouncement = (index) => {
    const edited = prompt("Edit announcement:", announcements[index]);
    if (edited !== null) {
      const copy = [...announcements];
      copy[index] = edited;
      setAnnouncements(copy);
    }
  };

  const deleteAnnouncement = (index) => {
    const copy = [...announcements];
    copy.splice(index, 1);
    setAnnouncements(copy);
  };

  // Welcome logic
  const welcomeUser = () => {
    if (welcomeName.trim()) {
      setWelcomed([...welcomed, welcomeName]);
      setWelcomeName('');
    }
  };

  const undoWelcome = (index) => {
    const copy = [...welcomed];
    copy.splice(index, 1);
    setWelcomed(copy);
  };

  // Ban logic
  const kickUser = () => {
    if (kickName.trim()) {
      setBanned([...banned, kickName]);
      setKickName('');
    }
  };

  const unbanUser = (index) => {
    const copy = [...banned];
    copy.splice(index, 1);
    setBanned(copy);
  };

  // Events logic
  const addEvent = () => {
    const { title, date, time, description } = eventData;
    if (title && date && time) {
      setEvents([...events, { title, date, time, description }]);
      setEventData({ title: '', date: '', time: '', description: '' });
    }
  };

  const editEvent = (index) => {
    const evt = events[index];
    const title = prompt("Edit event title:", evt.title);
    const date = prompt("Edit event date:", evt.date);
    const time = prompt("Edit event time:", evt.time);
    const description = prompt("Edit event description:", evt.description);
    if (title && date && time) {
      const updated = [...events];
      updated[index] = { title, date, time, description };
      setEvents(updated);
    }
  };

  const deleteEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
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
        {/* Orange Stack */}
        <div className="stack-column">
          <div className="panel orange-panel">
            <h2>📢 Post Announcement</h2>
            <input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="Enter announcement" />
            <button onClick={postAnnouncement}>Post</button>
          </div>
          <div className="panel orange-panel">
            <h2>📄 Announcements</h2>
            <ul>
              {announcements.map((item, index) => (
                <li key={index}>
                  {item}
                  <button onClick={() => editAnnouncement(index)}>✏️</button>
                  <button onClick={() => deleteAnnouncement(index)}>🗑️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Green Stack */}
        <div className="stack-column">
          <div className="panel green-panel">
            <h2>👋 Welcome Members</h2>
            <input value={welcomeName} onChange={(e) => setWelcomeName(e.target.value)} placeholder="Member name" />
            <button onClick={welcomeUser}>Welcome</button>
          </div>
          <div className="panel green-panel">
            <h2>🎉 Welcomed Members</h2>
            <ul>
              {welcomed.map((name, index) => (
                <li key={index}>
                  {name}
                  <button onClick={() => undoWelcome(index)}>↩️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Red Stack */}
        <div className="stack-column">
          <div className="panel red-panel">
            <h2>🚫 Kick/Ban User</h2>
            <input value={kickName} onChange={(e) => setKickName(e.target.value)} placeholder="Username" />
            <button onClick={kickUser}>Kick</button>
          </div>
          <div className="panel red-panel">
            <h2>🔨 Banned Users</h2>
            <ul>
              {banned.map((user, index) => (
                <li key={index}>
                  {user}
                  <button onClick={() => unbanUser(index)}>🛑</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Blue Stack */}
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
              {events.map((event, index) => (
                <li key={index}>
                  <strong>{event.title}</strong> — {event.date} @ {event.time}
                  <br />
                  <em>{event.description}</em>
                  <br />
                  <button onClick={() => editEvent(index)}>✏️</button>
                  <button onClick={() => deleteEvent(index)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
