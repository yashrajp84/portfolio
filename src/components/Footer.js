import React from 'react';
import './footer.css';
import ScrambleButton from './ScrambleButton';

function Footer() {
  return (
    <footer className="footer">
      <p>Great design <br /> reflects within <br /> simplicity</p>
      <ScrambleButton text="Let's Connect" className="hero-button" onClick={() => {}} />
    </footer>
  );
}

export default Footer;