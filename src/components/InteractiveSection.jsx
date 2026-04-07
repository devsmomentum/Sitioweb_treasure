import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import './InteractiveSection.css';

const InteractiveSection = () => {
    const [proximity, setProximity] = useState(0);
    const [status, setStatus] = useState('FRIO');
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // TACTICAL RADAR TRANSFORMS
    const radarTiltX = useTransform(smoothScroll, [0, 0.5, 1], [25, 0, -25]);
    const radarTiltY = useTransform(smoothScroll, [0, 0.5, 1], [-15, 0, 15]);
    const textShiftY = useTransform(smoothScroll, [0, 1], [60, -60]);
    const radarScale = useTransform(smoothScroll, [0, 0.5, 1], [0.8, 1.1, 0.8]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProximity(prev => {
                const next = prev + 1;
                if (next > 100) return 0;
                return next;
            });
        }, 100);
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

    return (
        <section className="interactive-section" ref={containerRef}>
            <div className="container radar-grid" style={{ perspective: "1200px" }}>
                <motion.div 
                    className="interactive-text"
                    style={{ y: textShiftY }}
                >
                    <div className="label-game">SISTEMA INTEGRADO</div>
                    <h2 className="section-title" style={{ textAlign: 'left' }}>Radar de <span>Proximidad</span></h2>
                    <p>
                        Nuestra tecnología exclusiva de rastreo convierte tu ciudad en un desafío de precisión. 
                        Siente el pulso de la búsqueda mientras tu dispositivo reacciona a los tesoros ocultos con señales tácticas en tiempo real.
                    </p>

                    <motion.div 
                        className="status-panel glass"
                        style={{ borderLeft: status === 'QUEMANDO' ? '4px solid #FF4757' : '4px solid #9b59b6' }}
                    >
                        <div className="status-row">
                            <span className="label">ESTADO DE SEÑAL:</span>
                            <motion.span 
                                key={status}
                                className={`value ${status.toLowerCase()}`}
                                animate={status === 'QUEMANDO' ? { opacity: [0.5, 1, 0.5] } : {}}
                                transition={{ repeat: Infinity, duration: 0.2 }}
                            >
                                {getStatusDisplay(status)}
                            </motion.span>
                        </div>
                        <div className="status-row">
                            <span className="label">PRECISIÓN GPS:</span>
                            <span className="value">ALTA (0.5m)</span>
                        </div>
                        <div className="status-row">
                            <span className="label">CARGA DE DATOS:</span>
                            <span className="value">{proximity}%</span>
                        </div>
                        <div className="radar-progress-bar">
                            <motion.div 
                                className="radar-progress-fill"
                                style={{ width: `${proximity}%`, backgroundColor: status === 'QUEMANDO' ? '#FF4757' : '#9b59b6' }}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="interactive-visual"
                    style={{ 
                        rotateX: radarTiltX, 
                        rotateY: radarTiltY,
                        scale: radarScale,
                        transformStyle: "preserve-3d"
                    }}
                >
                    <div className="radar-system">
                        <div className="radar-circles" style={{ transform: "translateZ(50px)" }}>
                            <div className="radar-circle radar-circle-1"></div>
                            <div className="radar-circle radar-circle-2"></div>
                            <div className="radar-circle radar-circle-3"></div>
                            <div className="radar-circle radar-circle-4"></div>
                            <div className="radar-axis-x"></div>
                            <div className="radar-axis-y"></div>
                        </div>

                        <motion.div 
                            className="radar-sweep"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div 
                            className="radar-blip"
                            style={{ 
                                top: '35%', 
                                left: '65%',
                                opacity: proximity > 75 ? 1 : 0.2,
                                transform: "translateZ(80px)"
                            }}
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3] 
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveSection;
