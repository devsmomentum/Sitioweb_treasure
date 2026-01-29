import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Features.css';

const features = [
    {
        title: 'Exploración Real',
        description: 'Usa tu teléfono para encontrar tesoros físicos en tu ciudad. El mundo real es tu tablero.',
        icon: '/ubicacion.png',
        color: '#6C5CE7',
        id: 'exploration'
    },
    {
        title: 'Puzzles con QR',
        description: 'Escanea códigos ocultos para desbloquear pistas, resolver acertijos y avanzar en la historia.',
        icon: '/camara.png',
        color: '#FF6B9D',
        id: 'qr'
    },
    {
        title: 'Rastreo FRÍO o CALIENTE',
        description: 'Siente la emoción de la búsqueda con nuestro sistema de proximidad en tiempo real.',
        icon: '/fuego.png',
        color: '#FFB142',
        id: 'tracking'
    },
    {
        title: 'Ranking Competitivo',
        description: 'Sube a la cima de la tabla regional y gana recompensas exclusivas por tus logros.',
        icon: '/trofeo.png',
        color: '#FFD700',
        id: 'ranking'
    }
];

const Features = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <section id="features" className="features">
            <div className="container">
                <h2 className="section-title">Domina la Búsqueda</h2>
                <div className="features-grid">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="feature-card glass animate-fade-in"
                            style={{ animationDelay: `${0.1 * i}s` }}
                            onHoverStart={() => setHoveredCard(f.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="feature-icon" style={{ backgroundColor: `${f.color}22`, color: f.color }}>
                                <motion.div
                                    animate={hoveredCard === f.id ? {
                                        y: f.id === 'exploration' ? [-5, 5, -5] : 0,
                                        scale: f.id === 'qr' ? [1, 1.3, 1] :
                                            f.id === 'tracking' ? [1, 1.2, 1, 1.2, 1] :
                                                f.id === 'ranking' ? [1, 1.1, 1] : 1,
                                        rotate: f.id === 'ranking' ? [0, -10, 10, -10, 0] : 0
                                    } : {}}
                                    transition={{
                                        duration: f.id === 'tracking' ? 0.6 : 0.5,
                                        repeat: hoveredCard === f.id ? Infinity : 0,
                                        repeatDelay: f.id === 'qr' ? 0.5 : 0
                                    }}
                                >
                                    <img
                                        src={f.icon}
                                        alt={f.title}
                                        className={`feature-icon-img ${f.id === 'qr' ? 'camera-icon' : ''} ${f.id === 'ranking' ? 'trophy-icon' : ''}`}
                                    />
                                </motion.div>

                                {/* Camera Flash Effect */}
                                <AnimatePresence>
                                    {hoveredCard === 'qr' && f.id === 'qr' && (
                                        <motion.div
                                            className="camera-flash"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.7 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Fire Glow Effect */}
                                <AnimatePresence>
                                    {hoveredCard === 'tracking' && f.id === 'tracking' && (
                                        <motion.div
                                            className="fire-glow"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: [0.5, 1, 0.5],
                                                scale: [0.8, 1.2, 0.8]
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, repeat: Infinity }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Confetti Effect */}
                                <AnimatePresence>
                                    {hoveredCard === 'ranking' && f.id === 'ranking' && (
                                        <div className="confetti-container">
                                            {[...Array(12)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="confetti"
                                                    style={{
                                                        left: `${Math.random() * 100}%`,
                                                        backgroundColor: ['#FFD700', '#FF6B9D', '#6C5CE7', '#FFB142'][idx % 4]
                                                    }}
                                                    initial={{ y: 0, opacity: 1, rotate: 0 }}
                                                    animate={{
                                                        y: 100,
                                                        opacity: [1, 1, 0],
                                                        rotate: Math.random() * 360,
                                                        x: (Math.random() - 0.5) * 50
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: idx * 0.1,
                                                        repeat: Infinity,
                                                        repeatDelay: 0.5
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
