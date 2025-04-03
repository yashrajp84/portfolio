import React, { useState, useEffect } from 'react';
import CountUp from './CountUp';
import { useTheme } from '../context/ThemeContext';
import './LoadingScreen.css';

function LoadingScreen({ onLoadComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 2500); // Total duration including the count animation

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div 
      className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}
      style={{
        '--bg-color': isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'
      }}>

      <div className="loading-content">
        <CountUp
          from={0}
          to={100}
          duration={2}
          className="loading-number"
          onEnd={() => {
            // Animation completed
          }}
        />
        <span className="loading-percent">%</span>
      </div>
    </div>
  );
}

export default LoadingScreen;