import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Local Storage Helpers
  const getStored = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  // State Declarations
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState(() => getStored('announcements', []));
  const [welcomeName, setWelcomeName] = useState('');
  const [welcomed, setWelcomed] = useState(() => getStored('welcomedMembers', []));
  const [kickName, setKickName] = useState('');
  const [banned, setBanned] = useState(() => getStored('bannedUsers', []));
  const [eventData, setEventData] = useState({ title: '', date: '', time: '', description: '' });
  const [events, setEvents] = useState(() => getStored('events', []));

  // Persist on change
  useEffect(() => localStorage.setItem('announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('welcomedMembers', JSON.stringify(welcomed)), [welcomed]);
  useEffect(() => localStorage.setItem('bannedUsers', JSON.stringify(banned)), [banned]);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  // Announcements
  const postAnnouncement = () => {
    if (announcement.trim()) {
      setAnnouncements([...announcements, announcement]);
      setAnnouncement('');
    }
  };

  const deleteAnnouncement = (index) => {
    const copy = [...announcements];
    copy.splice(index, 1);
    setAnnouncements(copy);
  };

  const editAnnouncement = (index) => {
    const edited = prompt("Edit announcement:", announcements[index]);
    if (edited !== null) {
      const updated = [...announcements];
      updated[index] = edited;
      setAnnouncements(updated);
    }
  };

  // Welcome
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

  // Ban
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

  // Events
  const addEvent = () => {
    const { title, date, time, description } = eventData;
    if (title && date && time) {
      setEvents([...events, { title, date, time, description }]);
      setEventData({ title: '', date: '', time: '', description: '' });
    }
  };

  const deleteEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const editEvent = (index) => {
    const old = events[index];
    const title = prompt("Edit event title:", old.title);
    const date = prompt("Edit date:", old.date);
    const time = prompt("Edit time:", old.time);
    const description = prompt("Edit description:", old.description);
    if (title && date && time) {
      const updated = [...events];
      updated[index] = { title, date, time, description };
      setEvents(updated);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/LbSHfMu.png" alt="Wolf HQ Logo" />
        <h1>Welcome to Wolf HQ Dashboard</h1>
        <p>The central command for all Warzone missions!</p>
      </header>

      <main className="dashboard">
        {/* Orange Panels */}
        <div className="panel orange">
          <h2>📢 Post Announcement</h2>
          <input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="Enter announcement" />
          <button onClick={postAnnouncement}>Post</button>
        </div>
        <div className="panel orange">
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

        {/* Green Panels */}
        <div className="panel green">
          <h2>👋 Welcome Members</h2>
          <input value={welcomeName} onChange={(e) => setWelcomeName(e.target.value)} placeholder="Member name" />
          <button onClick={welcomeUser}>Welcome</button>
        </div>
        <div className="panel green">
          <h2>🎉 Welcomed Members</h2>
          <ul>
            {welcomed.map((user, i) => (
              <li key={i}>
                {user}
                <button onClick={() => undoWelcome(i)}>↩️</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Panels */}
        <div className="panel red">
          <h2>🚫 Kick/Ban User</h2>
          <input value={kickName} onChange={(e) => setKickName(e.target.value)} placeholder="Username" />
          <button onClick={kickUser}>Kick</button>
        </div>
        <div className="panel red">
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

        {/* Blue Panels */}
        <div className="panel blue">
          <h2>📅 Schedule New Event</h2>
          <input placeholder="Event Title" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
          <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} />
          <input type="time" value={eventData.time} onChange={(e) => setEventData({ ...eventData, time: e.target.value })} />
          <textarea placeholder="Description" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
          <button onClick={addEvent}>Add Event</button>
        </div>
        <div className="panel blue">
          <h2>📅 Upcoming Events</h2>
          <ul>
            {events.map((evt, i) => (
              <li key={i}>
                <strong>{evt.title}</strong> — {evt.date} @ {evt.time}
                <br />
                <em>{evt.description}</em>
                <br />
                <button onClick={() => editEvent(i)}>✏️</button>
                <button onClick={() => deleteEvent(i)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;
