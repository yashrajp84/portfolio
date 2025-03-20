import React, { useState } from 'react';
import './hero.css';
import MenuOverlay from './menuoverlay';
import { useScramble } from 'use-scramble'; // Import useScramble hook

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the useScramble hook
  const { ref } = useScramble({ // Removed replay
    text: 'Creative Digital Designer',
    speed: 0.4,
    step: 0.5,
  });

  return (
    <section className="hero">
      <div className="border-container">
        <div className="border-background"></div>
        <div className="border-gradient"></div>
      </div>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="content-wrapper">
        <nav className="hero-nav">
          <a href="/" className="hero-name">YASHRAJ PATIL</a>
          <button className="menu-button" onClick={() => setIsMenuOpen(true)}>MENU</button>
        </nav>
        <div className="title-button-container">
          <div className="hero-title">
            <h1 className="main-title" ref={ref}>
              Creative Digital Designer
            </h1>
          </div>
          <button className="hero-button">Explore work</button>
        </div>
        <div className="location-text">MELBOURNE, AU</div>
        <div className="scroll-text">SCROLL DOWN TO KNOW MORE</div>
        <button className="mute-button">MUTE</button>
      </div>
    </section>
  );
}

export default Hero;