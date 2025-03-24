import React, { useState } from 'react';
import { useScramble } from 'use-scramble';
import './ScrambleButton.css';

const ScrambleButton = ({ 
  text, 
  className = '', 
  onClick, 
  scrambleSpeed = 0.4,
  scrambleStep = 0.5
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, replay } = useScramble({
    text: text,
    speed: scrambleSpeed,
    step: scrambleStep,
    scramble: 3,
    seed: 1,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    replay();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate the width based on the original text
  const calculateWidth = () => {
    const buttonElement = document.querySelector(`.${className}`);
    if (buttonElement) {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = window.getComputedStyle(buttonElement).fontSize;
        tempSpan.style.fontFamily = window.getComputedStyle(buttonElement).fontFamily;
        tempSpan.style.textTransform = 'uppercase';
        tempSpan.innerText = text;
        document.body.appendChild(tempSpan);
        const width = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        return width;
    }
    return 0; // Default width if button is not found
  };

  return (
    <button
      className={`scramble-button ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        minWidth: `${calculateWidth()}px`,
        display: 'inline-block'
      }}
    >
      <span ref={ref}>{text}</span>
    </button>
  );
};

export default ScrambleButton;
