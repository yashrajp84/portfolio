import React, { useState } from 'react';
import './hero.css';
import MenuOverlay from './menuoverlay';
import { useScramble } from 'use-scramble';
import ScrambleButton from './ScrambleButton'; // Import useScramble hook

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
      <div className="content-wrapper">
        <div className="title-button-container">
          <div className="hero-title">
            <h1 className="main-title" ref={ref}>
              Creative Digital Designer
            </h1>
          </div>
          <ScrambleButton text="Explore work" className="hero-button" onClick={() => {}} />
        </div>
        <div className="location-text">MELBOURNE, AU</div>
        <div className="scroll-text">SCROLL DOWN TO KNOW MORE</div>
        <ScrambleButton text="MUTE" className="mute-button" onClick={() => {}} />
      </div>
    </section>
  );
}

export default Hero;