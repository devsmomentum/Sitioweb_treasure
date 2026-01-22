import React from 'react';
import './Features.css';

const features = [
    {
        title: 'Exploración Real',
        description: 'Usa tu teléfono para encontrar tesoros físicos en tu ciudad. El mundo real es tu tablero.',
        icon: '📍',
        color: '#6C5CE7'
    },
    {
        title: 'Puzzles con QR',
        description: 'Escanea códigos ocultos para desbloquear pistas, resolver acertijos y avanzar en la historia.',
        icon: '📷',
        color: '#FF6B9D'
    },
    {
        title: 'Rastreo FÍO o CALIENTE',
        description: 'Siente la emoción de la búsqueda con nuestro sistema de proximidad en tiempo real.',
        icon: '🔥',
        color: '#FFB142'
    },
    {
        title: 'Ranking Competitivo',
        description: 'Sube a la cima de la tabla regional y gana recompensas exclusivas por tus logros.',
        icon: '🏆',
        color: '#FFD700'
    }
];

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <h2 className="section-title">Domina la Búsqueda</h2>
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
