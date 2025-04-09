import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [announcementInput, setAnnouncementInput] = useState('');
  const [newMembers, setNewMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [kickedUsers, setKickedUsers] = useState([]);
  const [kickUserInput, setKickUserInput] = useState('');

  // Load from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    const storedMembers = JSON.parse(localStorage.getItem('newMembers')) || [];
    const storedKicked = JSON.parse(localStorage.getItem('kickedUsers')) || [];
    setEvents(storedEvents);
    setAnnouncements(storedAnnouncements);
    setNewMembers(storedMembers);
    setKickedUsers(storedKicked);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('announcements', JSON.stringify(announcements));
    localStorage.setItem('newMembers', JSON.stringify(newMembers));
    localStorage.setItem('kickedUsers', JSON.stringify(kickedUsers));
  }, [events, announcements, newMembers, kickedUsers]);

  const addEvent = () => {
    if (!title || !date || !time) return;
    const newEvent = { title, date, time, description };
    setEvents([...events, newEvent]);
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');
  };

  const postAnnouncement = () => {
    if (!announcementInput) return;
    setAnnouncements([...announcements, { message: announcementInput, timestamp: new Date().toISOString() }]);
    setAnnouncementInput('');
  };

  const welcomeMember = () => {
    if (!memberName) return;
    setNewMembers([...newMembers, { name: memberName, joined: new Date().toISOString() }]);
    setMemberName('');
  };

  const kickUser = () => {
    if (!kickUserInput) return;
    setKickedUsers([...kickedUsers, { name: kickUserInput, kicked: new Date().toISOString() }]);
    setKickUserInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/LbSHfMu.png" alt="Wolf HQ Logo" className="App-logo" />
        <div>
          <h1>Welcome to Wolf HQ Dashboard</h1>
          <p>The central command for all Warzone missions!</p>
        </div>
      </header>

      <div className="panel-row">
        <div className="panel panel-orange">
          <h2>📢 Post Announcement</h2>
          <input
            type="text"
            placeholder="Announcement"
            value={announcementInput}
            onChange={(e) => setAnnouncementInput(e.target.value)}
          />
          <button onClick={postAnnouncement}>Post</button>
          <ul>
            {announcements.map((a, idx) => (
              <li key={idx}>{a.message}</li>
            ))}
          </ul>
        </div>

        <div className="panel panel-green">
          <h2>🟢 Welcome Members</h2>
          <input
            type="text"
            placeholder="New Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <button onClick={welcomeMember}>Welcome</button>
          <ul>
            {newMembers.map((m, idx) => (
              <li key={idx}>{m.name}</li>
            ))}
          </ul>
        </div>

        <div className="panel panel-red">
          <h2>🚫 Kick/Ban User</h2>
          <input
            type="text"
            placeholder="Username to Kick"
            value={kickUserInput}
            onChange={(e) => setKickUserInput(e.target.value)}
          />
          <button onClick={kickUser}>Kick/Ban</button>
          <ul>
            {kickedUsers.map((k, idx) => (
              <li key={idx}>{k.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel-row">
        <div className="panel panel-blue">
          <h2>📅 Schedule New Event</h2>
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>

        <div className="panel panel-green">
          <h2>📅 Upcoming Events</h2>
          {events.length === 0 ? (
            <p>No events scheduled.</p>
          ) : (
            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  <strong>{event.title}</strong> — {event.date} at {event.time}
                  <br />
                  <em>{event.description}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
