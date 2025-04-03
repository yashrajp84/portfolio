import React, { useState, useEffect } from 'react';
import { useScramble } from 'use-scramble';
import './DesignJourney.css';

function DesignJourney() {
  const journeyGroups = [
    { year: '2022', role: 'Web Designer', company: 'KraftySocio' },
    { year: '2023', role: 'UI/UX Designer', company: 'Arintra' },
    { year: '2024', role: 'Web Designer', company: 'SSI' },
    { year: '2025', role: 'Engagement Assistant', company: 'NRCH' }
  ];

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = journeyGroups[currentGroupIndex];

  const yearScramble = useScramble({
    text: currentGroup.year,
    speed: 0.4,
    step: 0.5,
    scramble: 3,
    seed: 1,
  });

  const roleScramble = useScramble({
    text: currentGroup.role,
    speed: 0.4,
    step: 0.5,
    scramble: 3,
    seed: 1,
  });

  const companyScramble = useScramble({
    text: currentGroup.company,
    speed: 0.4,
    step: 0.5,
    scramble: 3,
    seed: 1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % journeyGroups.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    yearScramble.replay();
    roleScramble.replay();
    companyScramble.replay();
  }, [currentGroup]);

  return (
    <section className="journey-section">
      <div className="journey-content">
        <h3 className="journey-heading">MY DESIGN JOURNEY</h3>
        <div className="journey-item">
          <div className="journey-box">
            <img
              src="https://ynmpuwsryqdnjxhesexm.supabase.co/storage/v1/object/public/brand-assets//Group%2083.png"
              alt="Journey background"
              className="journey-background"
            />
            <div className="journey-text-group">
              <div className="journey-year" ref={yearScramble.ref}>{currentGroup.year}</div>
              <div className="journey-role" ref={roleScramble.ref}>{currentGroup.role}</div>
              <div className="journey-company" ref={companyScramble.ref}>{currentGroup.company}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignJourney;
