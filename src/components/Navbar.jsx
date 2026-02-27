import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Observer for hiding navbar on trailer section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting);
      },
      { threshold: 0.25 } // Hide when 25% of trailer is visible
    );

    const trailerSection = document.getElementById('trailer');
    if (trailerSection) {
      observer.observe(trailerSection);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (trailerSection) {
        observer.unobserve(trailerSection);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container container">
        <div className="logo" data-text="MapHunter">
          MapHunter
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Características</a>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Tienda</a>
          <a href="https://prueba.maphunter.online" className="btn-nav" onClick={() => setMobileMenuOpen(false)}>Prueba Ahora</a>
        </div>

        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
