import React, { useState } from 'react';
import './Hero.css';
import Menuoverlay     from './Menuoverlay';
import { useScramble } from 'use-scramble';
import ScrambleButton from './ScrambleButton';
import { useTheme } from '../context/ThemeContext';
import "@theme-toggles/react/css/Simple.css";
import { Simple } from "@theme-toggles/react";

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Use the useScramble hook
  const { ref } = useScramble({ // Removed replay
    text: 'Creative Digital Designer Crafting <br/> Impactful UX & UI Experiences',
    speed: 1,
    step: 0.2,
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
            <h1 className="main-title">
              <div>Creative Digital Designer</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="who-just-loves">WHO JUST <br></br> LOVES</div>
                <div className="blank-box"></div>
                <div style={{ fontStyle: 'italic' }}>Crafting Impactful</div>
              </div>
              <div>UX & UI Experiences</div>
            </h1>
          </div>
          <ScrambleButton text="Explore work" className="hero-button" onClick={() => {}} />
        </div>
        <div className="location-text">MELBOURNE, AU</div>
        <div className="scroll-text">SCROLL DOWN TO KNOW MORE</div>
        <div className="theme-toggle-button">
          <Simple
            duration={750}
            toggled={isDarkMode}
            onToggle={toggleTheme}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;