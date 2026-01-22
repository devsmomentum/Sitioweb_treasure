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

    // 5-LAYER PARALLAX SYSTEM
    const bgY = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1.1, 1.25]);

    const midY = useTransform(smoothScroll, [0, 1], ["0%", "40%"]);
    const midX = useTransform(smoothScroll, [0, 1], ["0%", "5%"]);

    const charY = useTransform(smoothScroll, [0, 1], ["0%", "-15%"]);
    const charScale = useTransform(smoothScroll, [0, 1], [1, 1.15]);

    const fgY = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
    const fgX = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);

    const textY = useTransform(smoothScroll, [0, 1], ["0%", "-60%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

    return (
        <section className="hero-rockstar-wide" ref={containerRef}>
            {/* Capa 1: Fondo de estrellas/nebulosa */}
            <motion.div
                className="parallax-layer l1-far-bg"
                style={{ y: bgY, scale: bgScale, backgroundImage: `url('/hero-bg.png')` }}
            />

            {/* Capa 2: Siluetas de ruinas */}
            <motion.div
                className="parallax-layer l2-midground"
                style={{ y: midY, x: midX, backgroundImage: `url('/midground.png')` }}
            />

            {/* Capa 3: Personaje principal */}
            <motion.div
                className="parallax-layer l3-character"
                style={{ y: charY, scale: charScale }}
            >
                <img src="/character.png" alt="Cazador" />
            </motion.div>

            {/* Capa 4: Elementos flotantes de primer plano */}
            <motion.div
                className="parallax-layer l4-foreground-left"
                style={{ y: fgY, x: fgX }}
            >
                <img src="/foreground-item.png" alt="Objeto" />
            </motion.div>

            <motion.div
                className="parallax-layer l4-foreground-right"
                style={{
                    y: useTransform(smoothScroll, [0, 1], ["0%", "-100%"]),
                    x: useTransform(smoothScroll, [0, 1], ["0%", "15%"])
                }}
            >
                <img src="/foreground-item.png" alt="Objeto" />
            </motion.div>

            {/* Superposiciones */}
            <div className="wide-vignette"></div>

            {/* Capa 5: Contenido de texto */}
            <motion.div
                className="hero-content-wide"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="logo-lockup">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Treasure Hunt
                    </motion.h1>
                    <span className="wide-tagline">LA NUEVA ERA DEL RPG MÓVIL</span>
                </div>

                <div className="hero-cta-group">
                    <button className="btn-rockstar-wide primary">Ver Tráiler</button>
                    <button className="btn-rockstar-wide secondary">Explorar Mundo</button>
                </div>
            </motion.div>

            <div className="scroll-hint">
                <span>DESLIZA PARA EXPLORAR</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default Hero;
