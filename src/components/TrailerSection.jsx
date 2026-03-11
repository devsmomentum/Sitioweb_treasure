import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import './TrailerSection.css';

const TrailerSection = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [inView, setInView] = useState(false);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const bgY = useTransform(smoothScroll, [0, 1], ["-10%", "10%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.2]);
    const textY = useTransform(smoothScroll, [0, 1], ["10%", "-10%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        if (videoRef.current) {
            if (inView) videoRef.current.play().catch(() => {});
            else videoRef.current.pause();
        }
    }, [inView]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section id="trailer" className="trailer-hero-section" ref={containerRef}>
            <motion.div
                className="trailer-parallax-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ y: bgY, scale: bgScale }}
            >
                {inView && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                        className="trailer-bg-video"
                        poster="/hero.png"
                    >
                        <source src="/jdynaza.mp4" type="video/mp4" />
                    </video>
                )}
            </motion.div>


            {/* Cinematic Overlay */}
            <div className="trailer-vignette"></div>

            {/* Sound Control */}
            <button
                className="sound-toggle-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            {/* Content Overlay */}
            <motion.div
                className="trailer-content-overlay"
                style={{ y: textY, opacity: textOpacity }}
            >
                <motion.div
                    className="trailer-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="trailer-label">EXPERIENCIA MAPHUNTER</div>
                    <h2 className="trailer-title">
                        MapHunter <span>Experience</span>
                    </h2>
                    <p className="trailer-desc">
                        Vive la experiencia MapHunter en máxima calidad. Descubre los rincones más ocultos de tu ciudad y prepárate para la aventura de tu vida.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TrailerSection;

