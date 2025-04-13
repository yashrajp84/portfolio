import React, { useState } from 'react';
import './Footer.css';
import ScrambleButton from './ScrambleButton';
import { FaLinkedin, FaEnvelope, FaDribbble } from 'react-icons/fa';

function Footer() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="footer">
      <p>Great design <br /> reflects within <br /> simplicity</p>
      {hovered ? (
        <div className="icon-buttons">
          <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="YOUR_EMAIL_URL" target="_blank" rel="noopener noreferrer">
            <FaEnvelope />
          </a>
          <a href="YOUR_DRIBBBLE_URL" target="_blank" rel="noopener noreferrer">
            <FaDribbble />
          </a>
        </div>
      ) : (
        <ScrambleButton 
          text="Let's Connect" 
          className="hero-button" 
          onClick={() => {}}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      )}
    </footer>
  );
}

export default Footer;