import React from 'react';
import './Menuoverlay.css';
import ScrambleButton from './ScrambleButton';

function Menuoverlay({ isOpen, onClose }) {
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
      <ScrambleButton text="×" className="close-button" onClick={onClose} />
      <nav className="menu-content">
        <a href="#about" onClick={onClose}>About me</a>
        <a href="#work" onClick={onClose}>Work</a>
        <a href="#contact" onClick={onClose}>Contact</a>
        <a href="/resume.pdf" download onClick={onClose}>Download resume</a>
      </nav>
      <div className="social-links">
        <a href="https://dribbble.com/yashrajp84" target="_blank" rel="noopener noreferrer">Dribbble</a>
        <a href="mailto:yashrajp84@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/yashraj-patil-302a77108/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}

export default Menuoverlay;