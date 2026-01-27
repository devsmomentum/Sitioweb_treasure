import React from 'react';
import './Minigames.css';

const minigames = [
    { name: 'Pulso de Memoria', type: 'Intelecto', icon: '🧠', color: '#6C5CE7' },
    { name: 'Toque Veloz', type: 'Agilidad', icon: '⚡', color: '#FF6B9D' },
    { name: 'Acertijos', type: 'Sabiduría', icon: '🧩', color: '#00D9A3' },
    { name: 'Geo-Captura', type: 'Reflejos', icon: '🎯', color: '#FFB142' }
];

const Minigames = () => {
    return (
        <section className="minigames-section">
            <div className="container">
                <h2 className="section-title">Desafía tus Límites</h2>
                <div className="minigames-grid">
                    {minigames.map((m, i) => (
                        <div key={i} className="minigame-card glass">
                            <div className="minigame-inner">
                                <div className="minigame-front">
                                    <div className="mg-icon" style={{ color: m.color }}>{m.icon}</div>
                                    <h4>{m.name}</h4>
                                    <span className="mg-type" style={{ borderColor: m.color, color: m.color }}>{m.type}</span>
                                </div>
                                <div className="minigame-back">
                                    <p>Domina este desafío para ganar recompensas especiales y XP.</p>
                                    <button className="btn-play">Ver Demo</button>
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
