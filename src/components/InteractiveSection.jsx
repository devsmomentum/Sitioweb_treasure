import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InteractiveSection.css';

const InteractiveSection = () => {
    const [proximity, setProximity] = useState(0);
    const [status, setStatus] = useState('FRIO');
    const [inView, setInView] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        
        const interval = setInterval(() => {
            setProximity(prev => {
                const next = prev + 1;
                if (next > 100) return 0;
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [inView]);

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
        <section className={`interactive-section ${!inView ? 'paused-animations' : ''}`} ref={containerRef}>
            <div className="container radar-grid">
                <motion.div 
                    className="interactive-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="label-game">SISTEMA INTEGRADO</div>
                    <h2 className="section-title" style={{ textAlign: 'left' }}>Radar de <span>Proximidad</span></h2>
                    <p>
                        Nuestra tecnología exclusiva de rastreo convierte tu ciudad en un desafío de precisión. 
                        Siente el pulso de la búsqueda mientras tu dispositivo reacciona a los tesoros ocultos con señales tácticas en tiempo real.
                    </p>

                    <div className="status-panel glass">
                        <div className="status-row">
                            <span className="label">ESTADO DE SEÑAL:</span>
                            <motion.span 
                                key={status}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`value ${status.toLowerCase()}`}
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
                    </div>
                </motion.div>

                <div className="interactive-visual">
                    <div className="radar-system">
                        <div className="radar-circles">
                            <div className="radar-circle radar-circle-1"></div>
                            <div className="radar-circle radar-circle-2"></div>
                            <div className="radar-circle radar-circle-3"></div>
                            <div className="radar-circle radar-circle-4"></div>
                            <div className="radar-axis-x"></div>
                            <div className="radar-axis-y"></div>
                        </div>

                        {/* Radar Sweep Animation */}
                        <motion.div 
                            className="radar-sweep"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Blip (The Treasure) */}
                        <motion.div 
                            className="radar-blip"
                            style={{ 
                                top: '35%', 
                                left: '65%',
                                opacity: proximity > 75 ? 1 : 0.2
                            }}
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3] 
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />

                        {/* Secondary Blips */}
                        <div className="radar-blip-secondary" style={{ top: '20%', left: '20%', opacity: 0.1 }}></div>
                        <div className="radar-blip-secondary" style={{ top: '70%', left: '40%', opacity: 0.1 }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveSection;
