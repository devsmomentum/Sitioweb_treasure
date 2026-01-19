import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <h1 className="animate-fade-in">Treasure Hunt<span>RPG</span></h1>
                <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Discover the ultimate real-life RPG experience. Explore your city, scan hidden QR codes,
                    and compete for glory in a world where every corner holds a secret.
                </p>
                <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <button className="btn-primary">Start Adventure</button>
                    <button className="btn-secondary">Watch Trailer</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
