import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AdventureCTA.css';

const AdventureCTA = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // ROCKSTAR SEQUENCE - MANAGE 3 IMAGES IN ONE PINNED SECTION
    // Background 1 (Team)
    const bg1Opacity = useTransform(smoothScroll, [0, 0.3, 0.35], [1, 1, 0]);
    const bg1Scale = useTransform(smoothScroll, [0, 0.35], [1, 1.2]);
    
    // Background 2 (Camp)
    const bg2Opacity = useTransform(smoothScroll, [0.3, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
    const bg2Scale = useTransform(smoothScroll, [0.3, 0.65], [1.1, 1]);

    // Background 3 (Pyramid)
    const bg3Opacity = useTransform(smoothScroll, [0.6, 0.7, 1], [0, 1, 1]);
    const bg3Scale = useTransform(smoothScroll, [0.6, 1], [1, 1.3]);

    // Text Animations
    const text1Opacity = useTransform(smoothScroll, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
    const text2Opacity = useTransform(smoothScroll, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
    const text3Opacity = useTransform(smoothScroll, [0.65, 0.75, 0.9, 0.95], [0, 1, 1, 0]);

    return (
        <section className="adventure-rockstar-sequence" ref={containerRef}>
            <div className="adventure-sticky-sequence">
                {/* Image Layers */}
                <motion.div 
                    className="adv-layer" 
                    style={{ backgroundImage: "url('/aventura1.png')", opacity: bg1Opacity, scale: bg1Scale }} 
                />
                <motion.div 
                    className="adv-layer" 
                    style={{ backgroundImage: "url('/aventura2.png')", opacity: bg2Opacity, scale: bg2Scale }} 
                />
                <motion.div 
                    className="adv-layer" 
                    style={{ backgroundImage: "url('/aventura3.png')", opacity: bg3Opacity, scale: bg3Scale }} 
                />
                
                <div className="adv-cinematic-overlay" />

                {/* Text Scenarios */}
                <motion.div className="adv-text-scenario" style={{ opacity: text1Opacity }}>
                    <h2 className="adv-rock-title">¿ESTÁS LISTO?</h2>
                    <p className="adv-rock-sub">PARA LA GRAN AVENTURA</p>
                </motion.div>

                <motion.div className="adv-text-scenario" style={{ opacity: text2Opacity }}>
                    <h2 className="adv-rock-title">EXPLORA EL PASADO</h2>
                    <p className="adv-rock-sub">DESCUBRE SECRETOS ANCESTRALES</p>
                </motion.div>

                <motion.div className="adv-text-scenario" style={{ opacity: text3Opacity }}>
                    <h2 className="adv-rock-title">ENCUENTRA EL TESORO</h2>
                    <p className="adv-rock-sub">LA RECOMPENSA TE ESPERA</p>
                    <button className="btn-rockstar primary large">ÚNETE AHORA</button>
                </motion.div>
            </div>
        </section>
    );
};

export default AdventureCTA;
