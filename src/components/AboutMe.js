import React from 'react';
import './AboutMe.css';
import ScrollReveal from './ScrollReveal';

function AboutMe() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h3 className="about-heading">ABOUT ME</h3>
        <div className="about-text">
          <ScrollReveal
            baseOpacity={0}
            baseRotation={2}
            blurStrength={3}
            enableBlur={true}
            containerClassName="about-reveal"
            textClassName="about-reveal-text"
          >
            Crafting seamless digital experiences through research-driven UX design, interaction storytelling, and human-centered innovation. Passionate about blending design, technology, and strategy to create intuitive and impactful solutions
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;