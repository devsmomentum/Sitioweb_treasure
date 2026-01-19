import React from 'react';
import './Minigames.css';

const minigames = [
    { name: 'Memory Pulse', type: 'Intel', icon: '🧠', color: '#6C5CE7' },
    { name: 'Speed Tap', type: 'Agility', icon: '⚡', color: '#FF6B9D' },
    { name: 'Riddle Solver', type: 'Wisdom', icon: '🧩', color: '#00D9A3' },
    { name: 'Geo-Catch', type: 'Reflex', icon: '🎯', color: '#FFB142' }
];

const Minigames = () => {
    return (
        <section className="minigames-section">
            <div className="container">
                <h2 className="section-title">Challenge Your Limits</h2>
                <div className="minigames-grid">
                    {minigames.map((m, i) => (
                        <div key={i} className="minigame-card glass">
                            <div className="minigame-inner">
                                <div className="minigame-front">
                                    <div className="mg-icon" style={{ color: m.color }}>{m.icon}</div>
                                    <h4>{m.name}</h4>
                                    <span className="mg-type" style={{ borderColor: m.color, color: m.color }}>{m.type}</span>
                                </div>
                                <div className="minigame-back" style={{ backgroundColor: m.color }}>
                                    <p>Master this challenge to earn special rewards and XP.</p>
                                    <button className="btn-play">Play Demo</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Minigames;
