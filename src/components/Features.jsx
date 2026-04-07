import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import './Features.css';

const features = [
    {
        title: 'Exploración Real',
        description: 'Usa tu teléfono para encontrar tesoros físicos en tu ciudad. El mundo real es tu tablero.',
        icon: '/ubicacion.png',
        color: '#9b59b6', // Brand Main
        id: 'exploration'
    },
    {
        title: 'Puzzles con QR',
        description: 'Escanea códigos ocultos para desbloquear pistas, resolver acertijos y avanzar en la historia.',
        icon: '/camara.png',
        color: '#c39bd3', // Brand Light
        id: 'qr'
    },
    {
        title: 'Rastreo FRÍO o CALIENTE',
        description: 'Siente la emoción de la búsqueda con nuestro sistema de proximidad en tiempo real.',
        icon: '/fuego.png',
        color: '#FFE16A', // Gold Light
        id: 'tracking'
    },
    {
        title: 'Ranking Competitivo',
        description: 'Sube a la cima de la tabla regional y gana recompensas exclusivas por tus logros.',
        icon: '/trofeo.png',
        color: '#FFD700', // Gold Main
        id: 'ranking'
    }
];

const Features = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // DIFERENTIAL PARALLAX FOR CARDS
    const titleY = useTransform(smoothScroll, [0, 1], [0, -50]);
    const cardY1 = useTransform(smoothScroll, [0, 1], [80, -80]);
    const cardY2 = useTransform(smoothScroll, [0, 1], [140, -140]);
    const cardY3 = useTransform(smoothScroll, [0, 1], [60, -60]);
    const cardY4 = useTransform(smoothScroll, [0, 1], [110, -110]);
    
    const cardsY = [cardY1, cardY2, cardY3, cardY4];

    const decY1 = useTransform(smoothScroll, [0, 1], ["0%", "80%"]);
    const decY2 = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
    const decRotate = useTransform(smoothScroll, [0, 1], [0, 120]);

    return (
        <section id="features" className="features" ref={containerRef}>
            {/* Background Parallax Decorations */}
            <div className="features-decorations">
                <motion.div className="f-dec dec-1" style={{ y: decY1, rotate: decRotate }}>🧭</motion.div>
                <motion.div className="f-dec dec-2" style={{ y: decY2, rotate: -decRotate }}>🗺️</motion.div>
                <motion.div className="f-dec dec-3" style={{ y: decY1, rotate: decRotate * 0.5 }}>📱</motion.div>
                <motion.div className="f-dec dec-4" style={{ y: decY2, rotate: -decRotate * 0.8 }}>💎</motion.div>
            </div>

            <div className="container">
                <motion.h2 className="section-title" style={{ y: titleY }}>Domina la Búsqueda</motion.h2>
                <div className="features-grid">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="feature-card glass"
                            style={{ 
                                y: cardsY[i],
                                transition: { delay: i * 0.1 },
                                transformStyle: "preserve-3d"
                            }}
                            onHoverStart={() => setHoveredCard(f.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            whileHover={{ 
                                scale: 1.05, 
                                zIndex: 20,
                                rotateX: 10,
                                rotateY: -10,
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)" 
                            }}
                        >
                            <div className="feature-icon" style={{ 
                                backgroundColor: `${f.color}22`, 
                                color: f.color,
                                transform: "translateZ(40px)"
                            }}>
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
                                        loading="lazy"
                                        decoding="async"
                                        className={`feature-icon-img ${f.id === 'qr' ? 'camera-icon' : ''} ${f.id === 'ranking' ? 'trophy-icon' : ''}`}
                                    />
                                </motion.div>
                                
                                {/* Effects like Flash, Glow, Confetti are kept same... */}
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

                                <AnimatePresence>
                                    {hoveredCard === 'ranking' && f.id === 'ranking' && (
                                        <div className="confetti-container">
                                            {[...Array(12)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="confetti"
                                                    style={{
                                                        left: `${Math.random() * 100}%`,
                                                        backgroundColor: ['#FFD700', '#c39bd3', '#9b59b6', '#B8860B'][idx % 4]
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
                            <h3 style={{ transform: "translateZ(20px)" }}>{f.title}</h3>
                            <p style={{ transform: "translateZ(10px)" }}>{f.description}</p>
                        </motion.div>

                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
