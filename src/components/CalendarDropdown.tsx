import React from 'react';
import '../styles/calendar-dropdown.css';

const CalendarDropdown: React.FC = () => {
  const zoomLink = 'https://scheduler.zoom.us/Insurance-Made-Simple';

  const handleScheduleClick = () => {
    window.open(zoomLink, '_blank', 'noopener,noreferrer');
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
