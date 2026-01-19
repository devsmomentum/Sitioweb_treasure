import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="logo">
          TREASURE<span>HUNT</span>
        </div>
        <div className="nav-links">
          <a href="#about">The Game</a>
          <a href="#features">Features</a>
          <a href="#shop">Shop</a>
          <a href="#contact" className="btn-nav">Download Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
