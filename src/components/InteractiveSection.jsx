import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InteractiveSection.css';

const InteractiveSection = () => {
    const [proximity, setProximity] = useState(0); // 0 to 100
    const [status, setStatus] = useState('FRIO');

    useEffect(() => {
        const interval = setInterval(() => {
            setProximity(prev => {
                const next = prev + 1;
                if (next > 100) return 0;
                return next;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (proximity < 25) setStatus('FRIO');
        else if (proximity < 50) setStatus('TIBIO');
        else if (proximity < 75) setStatus('CALIENTE');
        else setStatus('QUEMANDO');
    }, [proximity]);

    const getStatusDisplay = (s) => {
        const icons = { FRIO: '❄️', TIBIO: '🌡️', CALIENTE: '🔥', QUEMANDO: '🎯' };
        return `${s} ${icons[s] || ''}`;
    };

    // Color interpolation
    const getBackgroundColor = () => {
        if (proximity < 50) {
            // Cold to Warm (Blue to Yellow)
            const ratio = proximity / 50;
            return `rgba(${108 + (255 - 108) * ratio}, ${92 + (177 - 92) * ratio}, ${231 - (231 - 66) * ratio}, 0.15)`;
        } else {
            // Warm to Burning (Yellow to Red)
            const ratio = (proximity - 50) / 50;
            return `rgba(255, ${177 - (177 - 71) * ratio}, ${66 - (66 - 87) * ratio}, 0.25)`;
        }
    };

    return (
        <section className="interactive-section" style={{
            backgroundColor: 'transparent',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Dynamic Background Layer */}
            <motion.div
                className="dynamic-bg"
                animate={{
                    backgroundColor: getBackgroundColor(),
                }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0
                }}
            />

            {/* Background Particles/Waves */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="energy-wave"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        background: proximity > 50
                            ? 'linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.3), transparent)'
                            : 'linear-gradient(90deg, transparent, rgba(92, 199, 231, 0.3), transparent)',
                        top: `${20 * i + 10}%`,
                        left: '-100%',
                        zIndex: 1
                    }}
                    animate={{
                        left: ['100%', '-100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                    }}
                />
            ))}

            <div className="container grid-2" style={{ position: 'relative', zIndex: 2 }}>
                <div className="interactive-text">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        Geolocalización
                    </motion.h2>
                    <p>
                        Nuestro sistema de rastreo por proximidad convierte tu búsqueda en una experiencia intensa.
                        Cuanto más te acercas al tesoro oculto, más "caliente" se vuelve tu dispositivo.
                    </p>
                    <div className="status-indicator">
                        Estado Actual: <motion.span
                            key={status}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={status.toLowerCase()}
                        >
                            {getStatusDisplay(status)}
                        </motion.span>
                    </div>
                </div>
                <div className="interactive-visual">
                    <div className="scanner-mockup glass">
                        <motion.div
                            className="scanner-glow"
                            animate={{
                                opacity: 0.2 + (proximity / 100) * 0.8,
                                scale: 0.8 + (proximity / 100) * 0.5,
                                background: proximity > 50
                                    ? 'radial-gradient(circle, #FF4757 0%, transparent 70%)'
                                    : 'radial-gradient(circle, #5CC7E7 0%, transparent 70%)'
                            }}
                        />
                        <div className="scanner-center">
                            <motion.div
                                className="pulse"
                                animate={{
                                    borderColor: proximity > 50 ? '#FF4757' : '#5CC7E7',
                                    scale: [1, 1.5],
                                    opacity: [1, 0]
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                            <span>{proximity}%</span>
                        </div>
                        <div className="scanner-label">POTENCIA DE SEÑAL</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveSection;
