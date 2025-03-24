import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import MenuOverlay from './menuoverlay';
import ScrambleButton from './ScrambleButton';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">YASHRAJ PATIL</Link>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ScrambleButton text="MENU" className="menu-button" onClick={() => setIsMenuOpen(true)} />
    </nav>
  );
}

export default Navigation;
