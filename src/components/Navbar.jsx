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
          <a href="#about">Información</a>
          <a href="#features">Características</a>
          <a href="#shop">Tienda</a>
          <a href="#contact" className="btn-nav">Descargar Ahora</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
