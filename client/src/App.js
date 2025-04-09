
import React, { useState } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "", description: "" });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.date && form.time) {
      setEvents([...events, form]);
      setForm({ title: "", date: "", time: "", description: "" });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://i.imgur.com/LbSHfMu.png"
          alt="Wolf HQ Logo"
          className="App-logo"
        />
        <div className="header-text">
          <div className="header-title">Welcome to Wolf HQ Dashboard</div>
          <div className="header-subtitle">Mod Tools — Real-Time Event Scheduler</div>
        </div>
      </header>

      <div className="Panel-container">
        <div className="Panel blue">
          <h2>📆 Schedule New Event</h2>
          <form onSubmit={handleEventSubmit}>
            <input name="title" placeholder="Event Title" value={form.title} onChange={handleFormChange} required />
            <input name="date" type="date" value={form.date} onChange={handleFormChange} required />
            <input name="time" type="time" value={form.time} onChange={handleFormChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} />
            <button type="submit">Add Event</button>
          </form>
        </div>

        <div className="Panel green">
          <h2>📅 Upcoming Events</h2>
          {events.length === 0 ? (
            <p>No events scheduled.</p>
          ) : (
            <ul className="event-list">
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
