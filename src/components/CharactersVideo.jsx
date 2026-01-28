import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './CharactersVideo.css';

const CharactersVideo = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // PARALLAX VALUES
    const bgY = useTransform(smoothScroll, [0, 1], ["-10%", "10%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.2]);
    const textY = useTransform(smoothScroll, [0, 1], ["20%", "-20%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section className="characters-video-section" ref={containerRef}>
            {/* Full Screen Background Video */}
            <motion.div
                className="characters-video-parallax"
                style={{ y: bgY, scale: bgScale }}
            >
                <video
                    src="/personajes.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="characters-bg-video"
                />
            </motion.div>

            {/* Cinematic Overlay */}
            <div className="characters-video-vignette"></div>

            {/* Content Overlay */}
            <motion.div
                className="characters-video-content"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="characters-video-label">ELENCO DE HÉROES</div>
                <h2 className="characters-video-title">
                    CONOCE NUESTROS <span>PERSONAJES</span>
                </h2>
                <p className="characters-video-desc">
                    Cada cazador tiene una historia, una habilidad única y un destino que forjar en las calles. ¿Cuál será tu elección para la gran cacería?
                </p>
                <div className="characters-video-cta">
                    <button className="btn-characters-video">Explorar Habilidades</button>
                    <div className="characters-live-info">
                        <span className="live-dot"></span>
                        8 PERSONAJES DISPONIBLES
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CharactersVideo;
