import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './RockstarExperience.css';

// Memoize the background layers if possible, though they depend on scroll
const RockstarExperience = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. Ajuste de física para máxima velocidad y respuesta instantánea
    const smoothScroll = useSpring(scrollYProgress, { 
        stiffness: 140, // Mucho más rígido para que la respuesta sea instantánea
        damping: 18,    // Menos freno para que termine rápido
        mass: 0.1,      // Menos peso para que no patine
        restDelta: 0.001 
    });

    // 1. HERO LOGO SECTION (0% - 25% del scroll)
    const heroBgScale = useTransform(smoothScroll, [0, 0.2], [1, 1.25]);
    const heroOpacity = useTransform(smoothScroll, [0.15, 0.25], [1, 0]);
    
    const logoScale = useTransform(smoothScroll, [0, 0.15], [1, 0.6]);
    const logoOpacity = useTransform(smoothScroll, [0.1, 0.2], [1, 0]);

    // 2. LIVE EVENTS SECTION (30% - 55% del scroll)
    const liveBgOpacity = useTransform(smoothScroll, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
    const liveBgScale = useTransform(smoothScroll, [0.3, 0.5], [1, 1.25]);
    const liveTextOpacity = useTransform(smoothScroll, [0.32, 0.38, 0.48, 0.53], [0, 1, 1, 0]);
    const liveTextY = useTransform(smoothScroll, [0.32, 0.53], [20, -20]);

    // 3. ADVENTURE TIMELINE (60% - 100% del scroll)
    const advLayer1Opacity = useTransform(smoothScroll, [0.55, 0.6, 0.72], [0, 1, 0]);
    const advLayer2Opacity = useTransform(smoothScroll, [0.7, 0.75, 0.88], [0, 1, 0]);
    const advLayer3Opacity = useTransform(smoothScroll, [0.85, 0.9, 1], [0, 1, 1]);
    
    const advScale = useTransform(smoothScroll, [0.6, 1], [1, 1.3]);
    
    // Adventure Texts
    const advText1Opacity = useTransform(smoothScroll, [0.62, 0.68, 0.74], [0, 1, 0]);
    const advText2Opacity = useTransform(smoothScroll, [0.76, 0.82, 0.88], [0, 1, 0]);
    const advText3Opacity = useTransform(smoothScroll, [0.9, 0.95, 1], [0, 1, 1]);


    return (
        <section className="rockstar-master-container" ref={containerRef}>
            <div className="rockstar-sticky-wrapper">
                
                {/* --- LAYER 1: HERO --- */}
                <motion.div 
                    className="rock-layer" 
                    style={{ backgroundImage: "url('/hero.png')", opacity: heroOpacity, scale: heroBgScale }} 
                />
                <motion.div className="rock-content" style={{ opacity: logoOpacity, scale: logoScale }}>
                    <img src="/logo-maphunter.png" alt="Logo" className="rock-logo-img" loading="eager" />
                    <span className="rock-tagline">LA BÚSQUEDA COMIENZA AQUÍ</span>
                </motion.div>

                {/* --- LAYER 2: LIVE EVENTS --- */}
                <motion.div 
                    className="rock-layer" 
                    style={{ 
                        backgroundImage: "url('/hero.png')", 
                        opacity: liveBgOpacity, 
                        scale: liveBgScale,
                        // Removed filter: brightness for better performance
                    }} 
                />
                {/* Dark overlay specifically for layer 2 to replace brightness filter */}
                <motion.div 
                    className="rock-layer dark-overlay" 
                    style={{ opacity: liveBgOpacity, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 2 }} 
                />

                <motion.div className="rock-content" style={{ opacity: liveTextOpacity, y: liveTextY }}>
                    <div className="rock-label">MODO MULTIJUGADOR</div>
                    <h2 className="rock-title">EVENTOS EN VIVO 24/7</h2>
                    <p className="rock-desc">Cacerías globales y misiones cooperativas en tiempo real.</p>
                </motion.div>

                {/* --- LAYER 3: ADVENTURE --- */}
                <motion.div className="rock-layer" style={{ backgroundImage: "url('/aventura1.png')", opacity: advLayer1Opacity, scale: advScale }} />
                <motion.div className="rock-layer" style={{ backgroundImage: "url('/aventura2.png')", opacity: advLayer2Opacity, scale: advScale }} />
                <motion.div className="rock-layer" style={{ backgroundImage: "url('/aventura1.png')", opacity: advLayer3Opacity, scale: advScale }} />
                
                {/* Content for adventure stages */}
                <motion.div className="rock-content" style={{ opacity: advText1Opacity }}>
                    <h2 className="rock-title">¿ESTÁS LISTO?</h2>
                    <p className="rock-desc">PREPÁRATE PARA LA GRAN BÚSQUEDA</p>
                </motion.div>
                <motion.div className="rock-content" style={{ opacity: advText2Opacity }}>
                    <h2 className="rock-title">EXPLORA EL PASADO</h2>
                    <p className="rock-desc">DESCUBRE SECRETOS BAJO LA CIUDAD</p>
                </motion.div>
                <motion.div className="rock-content" style={{ opacity: advText3Opacity }}>
                    <h2 className="rock-title">ENCUENTRA EL TESORO</h2>
                    <button className="btn-rockstar primary large" style={{ pointerEvents: 'auto' }}>ÚNETE AHORA</button>
                </motion.div>

                <div className="rock-vignette" />
            </div>
        </section>
    );
};

export default memo(RockstarExperience);

