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

    // 4-LAYER URBAN PARALLAX SYSTEM
    // Layer 1: Stars/Far BG (Cityscape)
    const bgY = useTransform(smoothScroll, [0, 1], ["0%", "10%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1.1, 1.2]);

    // Layer 2: Character (The Urban Explorer)
    const charY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);
    const charScale = useTransform(smoothScroll, [0, 1], [1, 1.1]);

    // Layer 3: Foreground Items/Crystals (Fastest)
    const fgY = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
    const fgX = useTransform(smoothScroll, [0, 1], ["0%", "-15%"]);

    // Layer 4: Text Content
    const textY = useTransform(smoothScroll, [0, 1], ["0%", "-70%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

    return (
        <section className="hero-rockstar-urban" ref={containerRef}>
            {/* Capa 1: Ciudad Nocturna Cinemática */}
            <motion.div
                className="parallax-layer-urban l1-city-bg"
                style={{ y: bgY, scale: bgScale, backgroundImage: `url('/hero-bg.png')` }}
            />

            {/* Capa 2: Personaje Principal (Urban Explorer) */}
            <motion.div
                className="parallax-layer-urban l2-character-urban"
                style={{ y: charY, scale: charScale }}
            >
                <img src="/character.png" alt="Cazador Urbano" />
            </motion.div>

            {/* Capa 3: Artefactos Flotantes */}
            <motion.div
                className="parallax-layer-urban l3-item-left"
                style={{ y: fgY, x: fgX }}
            >
                <img src="/foreground-item.png" alt="Tesoro" />
            </motion.div>

            <motion.div
                className="parallax-layer-urban l3-item-right"
                style={{
                    y: useTransform(smoothScroll, [0, 1], ["0%", "-120%"]),
                    x: useTransform(smoothScroll, [0, 1], ["0%", "20%"])
                }}
            >
                <img src="/foreground-item.png" alt="Tesoro" />
            </motion.div>

            {/* Vignette y Efectos */}
            <div className="urban-vignette"></div>
            <div className="urban-glow-bottom"></div>

            {/* Capa 4: Contenido de texto */}
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

                <div className="hero-cta-group">
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
