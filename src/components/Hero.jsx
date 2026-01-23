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
    const bgScale = useTransform(smoothScroll, [0, 1], [1.1, 1.3]);

    const textY = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

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
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Treasure Hunt
                    </motion.h1>
                    <span className="urban-tagline">LA BÚSQUEDA DEL TESORO EN TU CIUDAD</span>
                </div>

                <div className="hero-actions-urban">
                    <button className="btn-urban primary">Ver Tráiler</button>
                    <button className="btn-urban secondary">Empezar Búsqueda</button>
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
