import React from 'react';
import '../styles/schedule.css';

export const Schedule: React.FC = () => {
  const zoomLink = 'https://scheduler.zoom.us/Insurance-Made-Simple';

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Schedule Your Consultation</h1>
        <p className="subtitle">Choose your preferred meeting time directly in our calendar below. We're here to help simplify your Medicare options!</p>
      </div>
      
      <div className="calendar-embed-container">
        <div className="calendar-info">
          <p className="calendar-text">
            Click the button below to open our Zoom booking calendar. Select your preferred date and time for:
          </p>
          
          <ul className="meeting-options-list">
            <li>📞 15-Minute Phone Consultation</li>
            <li>💻 45-Minute Virtual Zoom Meeting</li>
            <li>🤝 1-Hour In-Person Meeting (West Palm Area)</li>
          </ul>
          
          <a 
            href={zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="zoom-calendar-btn"
          >
            📅 Open Booking Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
