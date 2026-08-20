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
      url: 'https://scheduler.zoom.us/Insurance-Made-Simple'
    },
    {
      text: '💻 45-Minute Zoom Meeting',
      url: 'https://scheduler.zoom.us/Insurance-Made-Simple'
    },
    {
      text: '🤝 1-Hour In-Person Meeting',
      url: 'https://scheduler.zoom.us/Insurance-Made-Simple'
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
