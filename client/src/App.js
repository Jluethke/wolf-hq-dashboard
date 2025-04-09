import React, { useState } from 'react';
import './App.css';

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementInput, setAnnouncementInput] = useState('');

  const [welcomedMembers, setWelcomedMembers] = useState([]);
  const [memberInput, setMemberInput] = useState('');

  const [bannedUsers, setBannedUsers] = useState([]);
  const [banInput, setBanInput] = useState('');

  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  // Post Announcement
  const postAnnouncement = () => {
    if (announcementInput.trim()) {
      setAnnouncements([...announcements, announcementInput]);
      setAnnouncementInput('');
    }
  };

  const deleteAnnouncement = (index) => {
    const copy = [...announcements];
    copy.splice(index, 1);
    setAnnouncements(copy);
  };

  // Welcome Member
  const welcomeMember = () => {
    if (memberInput.trim()) {
      setWelcomedMembers([...welcomedMembers, memberInput]);
      setMemberInput('');
    }
  };

  const unWelcomeMember = (index) => {
    const copy = [...welcomedMembers];
    copy.splice(index, 1);
    setWelcomedMembers(copy);
  };

  // Kick/Ban
  const kickUser = () => {
    if (banInput.trim()) {
      setBannedUsers([...bannedUsers, banInput]);
      setBanInput('');
    }
  };

  const unbanUser = (index) => {
    const copy = [...bannedUsers];
    copy.splice(index, 1);
    setBannedUsers(copy);
  };

  // Schedule Event
  const addEvent = () => {
    const { title, date, time, description } = eventInput;
    if (title && date && time && description) {
      setEvents([...events, eventInput]);
      setEventInput({ title: '', date: '', time: '', description: '' });
    }
  };

  const deleteEvent = (index) => {
    const copy = [...events];
    copy.splice(index, 1);
    setEvents(copy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/LbSHfMu.png" alt="Wolf of Warzone Logo" className="App-logo" />
        <h1>Welcome to Wolf HQ Dashboard</h1>
        <p>The central command for all Warzone missions!</p>
      </header>

      <div className="dashboard-grid">

        {/* ORANGE */}
        <div className="panel orange">
          <h2>📢 Post Announcement</h2>
          <input
            type="text"
            value={announcementInput}
            onChange={(e) => setAnnouncementInput(e.target.value)}
            placeholder="Enter announcement"
          />
          <button className="green-btn" onClick={postAnnouncement}>Post</button>
        </div>
        <div className="panel orange">
          <h2>📄 Announcements</h2>
          <ul>
            {announcements.map((note, idx) => (
              <li key={idx}>
                {note}
                <button className="red-btn mini" onClick={() => deleteAnnouncement(idx)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>

        {/* GREEN */}
        <div className="panel green">
          <h2>👋 Welcome Members</h2>
          <input
            type="text"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            placeholder="Member name"
          />
          <button className="orange-btn" onClick={welcomeMember}>Welcome</button>
        </div>
        <div className="panel green">
          <h2>🎉 Welcomed Members</h2>
          <ul>
            {welcomedMembers.map((name, idx) => (
              <li key={idx}>
                {name}
                <button className="red-btn mini" onClick={() => unWelcomeMember(idx)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        {/* RED */}
        <div className="panel red">
          <h2>🚫 Kick/Ban User</h2>
          <input
            type="text"
            value={banInput}
            onChange={(e) => setBanInput(e.target.value)}
            placeholder="Username"
          />
          <button className="blue-btn" onClick={kickUser}>Kick</button>
        </div>
        <div className="panel red">
          <h2>🔨 Banned Users</h2>
          <ul>
            {bannedUsers.map((user, idx) => (
              <li key={idx}>
                {user}
                <button className="blue-btn mini" onClick={() => unbanUser(idx)}>↩️</button>
              </li>
            ))}
          </ul>
        </div>

        {/* BLUE */}
        <div className="panel blue">
          <h2>📅 Schedule New Event</h2>
          <input
            type="text"
            value={eventInput.title}
            onChange={(e) => setEventInput({ ...eventInput, title: e.target.value })}
            placeholder="Event Title"
          />
          <input
            type="date"
            value={eventInput.date}
            onChange={(e) => setEventInput({ ...eventInput, date: e.target.value })}
          />
          <input
            type="time"
            value={eventInput.time}
            onChange={(e) => setEventInput({ ...eventInput, time: e.target.value })}
          />
          <textarea
            value={eventInput.description}
            onChange={(e) => setEventInput({ ...eventInput, description: e.target.value })}
            placeholder="Description"
          />
          <button className="red-btn" onClick={addEvent}>Add Event</button>
        </div>
        <div className="panel blue">
          <h2>📅 Upcoming Events</h2>
          <ul>
            {events.map((event, idx) => (
              <li key={idx}>
                <strong>{event.title}</strong> — {event.date} at {event.time}
                <br />
                <em>{event.description}</em>
                <br />
                <button className="red-btn mini" onClick={() => deleteEvent(idx)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
