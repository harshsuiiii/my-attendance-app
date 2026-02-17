import React, { useState, useEffect } from "react";
import "./App.css";

const StatusBadge = ({ isWorking }) => (
  <div className={`status-badge ${isWorking ? "status-active" : "status-idle"}`}>
    <span className="status-dot"></span>
    {isWorking ? "Working" : "Offline"}
  </div>
);

const UserProfile = () => (
  <div className="user-profile">
    {/* Updated Avatar to 'H' for Harsh */}
    <div className="avatar">H</div> 
    <div className="user-info">
      {/* Updated Name to Harsh */}
      <span className="name">Harsh</span>
      <span className="role">Software Engineer</span>
    </div>
  </div>
);

export default function AttendanceApp() {
  const [isWorking, setIsWorking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState(0);

  // Main Clock Interval
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Session Timer Interval
  useEffect(() => {
    let sessionInterval;
    if (isWorking) {
      sessionInterval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    } else {
      // Optional: Reset session duration when clocking out
      setSessionDuration(0);
    }
    return () => clearInterval(sessionInterval);
  }, [isWorking]);

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => setIsWorking(!isWorking);

  return (
    <div className="dashboard-container">
      <main className="attendance-card">
        <header className="card-header">
          <UserProfile />
          <StatusBadge isWorking={isWorking} />
        </header>

        <div className="display-area">
          <div className="time-display">
            <span className="label">Current Time</span>
            <h1 className="main-clock">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              <span className="seconds">
                :{currentTime.getSeconds().toString().padStart(2, '0')}
              </span>
            </h1>
            <p className="date-subtext">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {isWorking ? (
            <div className="session-tracker active">
              <span className="label">Session Duration</span>
              <div className="timer-count">{formatDuration(sessionDuration)}</div>
            </div>
          ) : (
            <div className="session-tracker idle">
              <p className="date-subtext">Please check in to start work</p>
            </div>
          )}
        </div>

        <footer className="card-footer">
          <button
            onClick={handleToggle}
            className={`action-btn ${isWorking ? "btn-stop" : "btn-start"}`}
          >
            {isWorking ? "Clock Out" : "Clock In Now"}
          </button>
        </footer>
      </main>
    </div>
  );
}