import React, { useRef, useState, useEffect } from 'react';
import './designjourney.css'; // Import the CSS file for styling
import circularVector from '/src/Circular_vector.svg'; // Update with the correct path to your image
import { useScramble } from 'use-scramble'; // Import useScramble hook

const journeyData = [
  {
    year: "2021",
    role: "Web Designer",
    company: "KRAFTYSOCIO"
  },
  {
    year: "2022",
    role: "UI/UX Designer",
    company: "ARINTRA"
  },
  {
    year: "2023",
    role: "Product Designer",
    company: "MDIT, RMIT"
  }
];

function DesignJourney() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const yearRef = useScramble({
    text: journeyData[currentIndex].year,
    speed: 0.8,
    step: 1,
  });

  const roleRef = useScramble({
    text: journeyData[currentIndex].role,
    speed: 0.7,
    step: 1,
  });

  const companyRef = useScramble({
    text: journeyData[currentIndex].company,
    speed: 0.6,
    step: 1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % journeyData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="journey-section">
      <div className="journey-content">
        <h3 className="journey-heading">MY DESIGN JOURNEY</h3>
        <div className="journey-item">
          <div className="journey-box">
            <img src={circularVector} alt="Journey background" className="journey-background" />
            <div className="journey-text-group">
              <div className="journey-year" ref={yearRef.ref}>{journeyData[currentIndex].year}</div>
              <div className="journey-role" ref={roleRef.ref}>{journeyData[currentIndex].role}</div>
              <div className="journey-company" ref={companyRef.ref}>{journeyData[currentIndex].company}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignJourney;
