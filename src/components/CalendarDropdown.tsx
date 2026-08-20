import React from 'react';
import '../styles/calendar-dropdown.css';

interface CalendarDropdownProps {
  onNavigateToSchedule?: () => void;
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({ onNavigateToSchedule }) => {
  const handleScheduleClick = () => {
    if (onNavigateToSchedule) {
      onNavigateToSchedule();
    }
  };

  return (
    <div className="calendar-dropdown">
      <button 
        className="calendar-dropbtn"
        onClick={handleScheduleClick}
        aria-label="Go to scheduling page"
      >
        📅 Schedule
      </button>
    </div>
  );
};

export default CalendarDropdown;
