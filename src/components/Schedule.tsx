import React from 'react';
import '../styles/schedule.css';

const Schedule: React.FC = () => {
  const scheduleOptions = [
    {
      icon: '📞',
      title: '15-Minute Phone Call',
      description: 'A quick introductory phone call to answer any immediate Medicare questions you might have.',
      link: 'https://scheduler.zoom.us/Insurance-Made-Simple',
      buttonText: 'Schedule Phone Call'
    },
    {
      icon: '💻',
      title: '45-Minute Virtual Meeting',
      description: 'Connect with me online via Zoom from the comfort of your home to review your Medicare options.',
      link: 'https://scheduler.zoom.us/Insurance-Made-Simple',
      buttonText: 'Schedule Zoom Meeting'
    },
    {
      icon: '🤝',
      title: '1-Hour In-Person Meeting',
      description: 'Meet with me face-to-face in the West Palm area to discuss your health coverage needs in detail.',
      link: 'https://scheduler.zoom.us/Insurance-Made-Simple',
      buttonText: 'Schedule In-Person'
    }
  ];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Schedule Your Consultation</h1>
        <p className="subtitle">Choose the meeting type that works best for you. Let's simplify your Medicare options!</p>
      </div>
      
      <div className="options-grid">
        {scheduleOptions.map((option, index) => (
          <div key={index} className="option-card">
            <div className="option-icon">{option.icon}</div>
            <h2 className="option-title">{option.title}</h2>
            <p className="option-desc">{option.description}</p>
            <a 
              href={option.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="schedule-btn"
            >
              {option.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
