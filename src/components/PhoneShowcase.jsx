import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

import './PhoneShowcase.css';

const PhoneShowcase = () => {
    const [deviceMode, setDeviceMode] = React.useState('mobile'); // mobile -> tablet -> laptop
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // MOBILE SHOWCASE PARALLAX
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const phoneY = useTransform(smoothScroll, [0, 0.5, 1], [isMobile ? 0 : 300, 0, isMobile ? -50 : -200]);
    const phoneRotateY = useTransform(smoothScroll, [0, 0.3, 0.5, 0.7, 1], [40, 15, 0, -15, -40]);
    const phoneRotateX = useTransform(smoothScroll, [0, 0.3, 0.5, 1], [30, 10, 0, -20]);
    const phoneScale = useTransform(smoothScroll, [0, 0.4, 0.6, 1], [0.5, 1.1, 1, 0.8]);
    const phoneOpacity = useTransform(smoothScroll, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    
    // Floating objects differential parallax
    const floatY1 = useTransform(smoothScroll, [0, 1], [-50, 150]);
    const floatY2 = useTransform(smoothScroll, [0, 1], [100, -150]);

    const screens = [
        { label: "Inicia Sesión", desc: "Entra a tu cuenta y personaliza tu avatar" },
        { label: "Elige tu Aventura", desc: "Selecciona entre múltiples eventos activos" },
        { label: "Resuelve Minijuegos", desc: "Desafíos de lógica, matemáticas y más" },
        { label: "¡Gana Tesoros!", desc: "Compite por premios reales y trofeos" }
    ];

    const cycleDevice = () => {
        if (deviceMode === 'mobile') setDeviceMode('tablet');
        else if (deviceMode === 'tablet') setDeviceMode('laptop');
        else setDeviceMode('mobile');
    };

    // Device dimensions/styles - Responsive logic for mobile
    const getDeviceStyles = () => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        
        switch(deviceMode) {
            case 'tablet': 
                return { 
                    width: isMobile ? '260px' : '380px', 
                    height: isMobile ? '380px' : '520px', 
                    borderRadius: '25px', scale: 1 
                };
            case 'laptop': 
                return { 
                    width: isMobile ? '320px' : '620px', 
                    height: isMobile ? '220px' : '400px', 
                    borderRadius: '12px', scale: isMobile ? 0.9 : 0.8 
                };
            default: // mobile
                return { 
                    width: isMobile ? '220px' : '280px', 
                    height: isMobile ? '460px' : '580px', 
                    borderRadius: '45px', scale: 1 
                };
        }
    };




    return (
        <section className="phone-showcase-section" ref={containerRef}>
            <div className="phone-particles">
                {[...Array(6)].map((_, i) => (
                    <motion.div key={i} className="phone-particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, '--particle-size': `${Math.random() * 4 + 2}px` }} animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: Math.random() * 3 + 3, repeat: Infinity }} />
                ))}
            </div>

            <div className="phone-showcase-container container" style={{ perspective: "1500px" }}>
                <motion.div className="phone-text-side">
                    <div className="phone-section-label">PLATAFORMA TOTAL</div>
                    <h2 className="phone-section-title">
                        SÁCALE EL MÁXIMO PROVECHO <span>EN CUALQUIER LUGAR</span>
                    </h2>
                    <p className="phone-section-desc">
                        Interactúa con el dispositivo para ver cómo luce MapHunter en tu dispositivo favorito. 
                        Toca el dispositivo para transformarlo.
                    </p>

                    <div className="phone-steps">
                        {screens.map((screen, i) => (
                            <motion.div key={i} className="phone-step" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i + 0.5 }} viewport={{ once: true }} >
                                <div className="phone-step-number">{i + 1}</div>
                                <div className="phone-step-text"><strong>{screen.label}</strong><span>{screen.desc}</span></div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button className="btn-rockstar primary" whileHover={{ scale: 1.05 }} onClick={() => window.location.href = 'https://prueba.maphunter.online'} >
                        DESCARGAR AHORA
                    </motion.button>
                </motion.div>

                <div className="device-interactive-zone">
                    {/* --- THE MORPHING DEVICE --- */}
                    <motion.div
                        className="phone-3d-outer"
                        onClick={cycleDevice}
                        style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity, perspective: "1500px", transformStyle: "preserve-3d", cursor: 'pointer' }}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const mouseX = (e.clientX - rect.left) / rect.width;
                            const mouseY = (e.clientY - rect.top) / rect.height;
                            const rotY = (mouseX - 0.5) * 30;
                            const rotX = (mouseY - 0.5) * -30;
                            e.currentTarget.style.setProperty('--mouse-rotate-x', `${rotX}deg`);
                            e.currentTarget.style.setProperty('--mouse-rotate-y', `${rotY}deg`);
                        }}
                        onMouseLeave={(e) => { e.currentTarget.style.setProperty('--mouse-rotate-x', `0deg`); e.currentTarget.style.setProperty('--mouse-rotate-y', `0deg`); }}
                    >
                        <motion.div
                            className={`device-wrapper ${deviceMode}`}
                            animate={getDeviceStyles()}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            style={{ 
                                rotateY: phoneRotateY,
                                rotateX: phoneRotateX,
                                transform: "rotateX(var(--mouse-rotate-x, 0deg)) rotateY(var(--mouse-rotate-y, 0deg))",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <div className="phone-glow"></div>
                            
                            {/* Device Main Body */}
                            <motion.div className="phone-frame" layout style={{ transform: "translateZ(30px)", width: '100%', height: '100%', borderRadius: 'inherit' }}>
                                <div className="phone-notch"></div>
                                <div className="phone-screen">
                                    <img 
                                        src={
                                            deviceMode === 'laptop' ? '/laptop.png' : 
                                            deviceMode === 'tablet' ? '/tablet.png' : 
                                            '/phone-mockup.png'
                                        } 
                                        alt={`MapHunter ${deviceMode}`} 
                                        className="phone-screen-img" 
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <motion.div  className="phone-reflection" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }} />
                                </div>

                                <div className="phone-home-bar"></div>
                            </motion.div>

                            {/* Laptop Base (Only visible in laptop mode) */}
                            <AnimatePresence>
                                {deviceMode === 'laptop' && (
                                    <motion.div 
                                        className="laptop-base"
                                        initial={{ rotateX: -90, opacity: 0 }}
                                        animate={{ rotateX: -100, opacity: 1 }}
                                        exit={{ rotateX: -90, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                                    >
                                        <div className="laptop-keyboard">
                                            <div className="trackpad"></div>
                                            <div className="keys"></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
        
                            {/* Floating elements */}
                            <motion.div className="floating-game-element el-1" style={{ y: floatY1, transform: "translateZ(80px)" }}>🗺️</motion.div>
                            <motion.div className="floating-game-element el-2" style={{ y: floatY2, transform: "translateZ(100px)" }}>💎</motion.div>
                            <motion.div className="floating-game-element el-3" style={{ y: floatY1, transform: "translateZ(60px)" }}>🏆</motion.div>
                            <motion.div className="floating-game-element el-4" style={{ y: floatY2, transform: "translateZ(90px)" }}>⚔️</motion.div>
                        </motion.div>

                        <div className="device-hint">TOCA PARA TRANSFORMAR</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PhoneShowcase;

