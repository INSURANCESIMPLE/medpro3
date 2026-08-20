import React, { useState } from 'react';
import '../styles/calendar-dropdown.css';

const CalendarDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const calendarLinks = [
    {
      text: '📞 15-Minute Phone Call',
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1pimWMEwLGr6SJZi090q2-UlP7xT24yoioH1Ocsz-pCheCRRv48mux_ASCuXUb-IX264Tn_gLl'
    },
    {
      text: '💻 45-Minute Zoom Meeting',
      url: 'https://scheduler.zoom.us/jason-york-myyycn/45-mins-with-jason'
    },
    {
      text: '🤝 1-Hour In-Person Meeting',
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0g4-5B0nsiBamLw6znnDUddRvj-kHpzRhfQQc1xZf04owNrMzFAwFMWJFoMLKUvbUgUhP82vKg'
    }
  ];

  return (
    <div 
      className="calendar-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="calendar-dropbtn">📅 Calendar ▾</button>
      {isOpen && (
        <div className="calendar-dropdown-content">
          {calendarLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
