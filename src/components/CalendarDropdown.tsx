import React, { useState } from 'react';
import '../styles/calendar-dropdown.css';

interface CalendarLink {
  text: string;
  url: string;
}

const CalendarDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const calendarLinks: CalendarLink[] = [
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.calendar-dropdown')) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="calendar-dropdown"
      onClick={handleClickOutside}
    >
      <button 
        className="calendar-dropbtn"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Calendar and scheduling options"
      >
        📅 Schedule ▾
      </button>
      
      {isOpen && (
        <div 
          className="calendar-dropdown-content"
          role="menu"
        >
          {calendarLinks.map((link, index) => (
            <button
              key={index}
              role="menuitem"
              className="dropdown-link"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleLinkClick(link.url)}
              style={{
                backgroundColor: hoveredIndex === index ? '#f4f7f6' : 'transparent'
              }}
            >
              {link.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
