import React from 'react';
import './menuoverlay.css';

function MenuOverlay({ isOpen, onClose }) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
        <span>×</span>
      </button>
      <nav className="menu-content">
        <a href="#about" onClick={onClose}>About me</a>
        <a href="#work" onClick={onClose}>Work</a>
        <a href="#contact" onClick={onClose}>Contact</a>
        <a href="/resume.pdf" download onClick={onClose}>Download resume</a>
      </nav>
      <div className="social-links">
        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
        <a href="mailto:your.email@example.com">Email</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}

export default MenuOverlay;