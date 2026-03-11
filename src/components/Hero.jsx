import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // SIMPLE URBAN PARALLAX SYSTEM
    const bgY = useTransform(smoothScroll, [0, 1], ["0%", "20%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1.0, 1.15]);

    const textY = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

    const scrollToTrailer = () => {
        const trailerSection = document.getElementById('trailer');
        if (trailerSection) {
            trailerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero-rockstar-urban" ref={containerRef}>
            <motion.div
                className="parallax-layer-urban l1-city-bg"
                style={{ y: bgY, scale: bgScale, backgroundImage: `url('/hero.png')` }}
            />

            <div className="urban-vignette"></div>
            <div className="urban-glow-bottom"></div>

            <motion.div
                className="hero-content-urban"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="logo-lockup-urban">
                    <motion.div
                        className="hero-logo-container"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <img src="/logo-maphunter.png" alt="MapHunter Logo" className="hero-logo-img" />
                    </motion.div>
                    <span className="urban-tagline">LA BÚSQUEDA DEL TESORO EN TU CIUDAD</span>
                </div>

                <div className="hero-actions-urban">
                    <button
                        className="btn-urban primary"
                        onClick={scrollToTrailer}
                    >
                        Ver Tráiler
                    </button>
                    <button className="btn-urban secondary" onClick={() => window.location.href = 'https://prueba.maphunter.online'}>Empezar Búsqueda</button>
                </div>
            </motion.div>

            <div className="scroll-hint-urban">
                <span>DESCUBRE LOS SECRETOS</span>
                <div className="scroll-bar"></div>
            </div>
        </section>
    );
};

export default Hero;
