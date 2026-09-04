import React from 'react';
import '../styles/calendar-dropdown.css';

const CalendarDropdown: React.FC = () => {
  const zoomLink = 'https://scheduler.zoom.us/Medicare-professor';

  const handleScheduleClick = () => {
    window.location.href = zoomLink;
  };

  return (
    <div className="calendar-dropdown">
      <button 
        className="calendar-dropbtn"
        onClick={handleScheduleClick}
        aria-label="Open booking calendar"
      >
        📅 Schedule
      </button>
    </div>
  );
};

export default CalendarDropdown;