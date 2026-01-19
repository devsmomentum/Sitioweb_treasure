import React from 'react';
import './Features.css';

const features = [
    {
        title: 'Real World Exploration',
        description: 'Use your phone to find physical locations in your city. The world is your game board.',
        icon: '📍',
        color: '#6C5CE7'
    },
    {
        title: 'Interactive QR Puzzles',
        description: 'Scan hidden codes to unlock clues, solve riddles, and advance in the story.',
        icon: '📷',
        color: '#FF6B9D'
    },
    {
        title: 'HOT & COLD Tracking',
        description: 'Experience the thrill of the hunt with our real-time proximity feedback system.',
        icon: '🔥',
        color: '#FFB142'
    },
    {
        title: 'Competitive Ranking',
        description: 'Rise to the top of the local leaderboard and earn exclusive rewards.',
        icon: '🏆',
        color: '#FFD700'
    }
];

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <h2 className="section-title">Master the Hunt</h2>
                <div className="features-grid">
                    {features.map((f, i) => (
                        <div key={i} className="feature-card glass animate-fade-in" style={{ animationDelay: `${0.1 * i}s` }}>
                            <div className="feature-icon" style={{ backgroundColor: `${f.color}22`, color: f.color }}>
                                {f.icon}
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
