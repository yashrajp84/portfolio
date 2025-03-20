import React from 'react';
import './aboutme.css';

function AboutMe() {
  return (
    <section className="about-section">
          <div className="about-content">
            <h3 className="about-heading">ABOUT ME</h3>
            <div className="about-text">
              Hey, I'm <span className="italic">Yashraj Patil!</span> I started my design journey as a self <br />
              <span className="italic">enthusiast</span>, turning my passion into a profession. I've had <br />the
              opportunity to collaborate with diverse teams,{' '}
              <span className="italic">creating impactful <br />designs that make a difference.</span>
            </div>
          </div>
        </section>
  );
}

export default AboutMe;