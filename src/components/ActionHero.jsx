import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ActionHero.css';

const ActionHero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // PARALLAX VALUES
    const bgY = useTransform(smoothScroll, [0, 1], ["-10%", "10%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.2]);

    const midY = useTransform(smoothScroll, [0, 1], ["0%", "-40%"]);
    const textY = useTransform(smoothScroll, [0, 1], ["20%", "-20%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

    return (
        <section className="action-hero-container" ref={containerRef}>
            {/* Capa de Fondo - Ciudad Panorámica */}
            <motion.div
                className="action-parallax-bg"
                style={{ y: bgY, scale: bgScale, backgroundImage: `url('/hero-rockstar-bg.png')` }}
            />


            {/* Overlay Cinemático */}
            <div className="action-vignette"></div>

            {/* Contenido de Texto */}
            <motion.div
                className="action-content"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="action-label">MODO MULTIJUGADOR</div>
                <h2 className="action-title">EVENTOS EN VIVO 24/7</h2>
                <p className="action-description">
                    Únete a desafíos globales cada semana. Desde cacerías relámpago hasta
                    misiones cooperativas en los puntos más emblemáticos de tu ciudad.
                    ¡Las recompensas legendarias te esperan!
                </p>
                <div className="action-cta">
                    <button className="btn-action">Ver Calendario de Eventos</button>
                    <div className="live-indicator">
                        <span className="dot"></span>
                        AHORA: GRAN CACERÍA NEÓN
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ActionHero;
