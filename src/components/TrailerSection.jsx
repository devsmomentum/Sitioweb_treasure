import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './TrailerSection.css';

const videos = [
    {
        id: 1,
        src: "/lv_0_20260128150746.mp4",
        title: "Tráiler Oficial"
    },
    {
        id: 2,
        src: "/trailer_old.mp4",
        title: "En Acción"
    }
];

const TrailerSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // PARALLAX VALUES
    const bgY = useTransform(smoothScroll, [0, 1], ["-10%", "10%"]);
    const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.2]);
    const textY = useTransform(smoothScroll, [0, 1], ["10%", "-10%"]);
    const textOpacity = useTransform(smoothScroll, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

    const nextVideo = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <section id="trailer" className="trailer-hero-section" ref={containerRef}>
            {/* Full Screen Background Video */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="trailer-parallax-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ y: bgY, scale: bgScale }}
                >
                    <video
                        key={videos[currentIndex].src}
                        src={videos[currentIndex].src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="trailer-bg-video"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Cinematic Overlay */}
            <div className="trailer-vignette"></div>

            {/* Navigation Controls */}
            <div className="trailer-nav-controls">
                <button className="nav-btn-urban prev" onClick={prevVideo} aria-label="Video anterior">
                    <ChevronLeft size={40} />
                </button>
                <button className="nav-btn-urban next" onClick={nextVideo} aria-label="Siguiente video">
                    <ChevronRight size={40} />
                </button>
            </div>

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
                    <div className="trailer-label">TRAILER OFICIAL</div>
                    <h2 className="trailer-title">
                        {videos[currentIndex].title.split(' ')[0]} <span>{videos[currentIndex].title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="trailer-desc">
                        Vive la experiencia MapHunter en máxima calidad. Descubre los rincones más ocultos de tu ciudad y prepárate para la aventura de tu vida.
                    </p>

                    <div className="trailer-indicators-urban">
                        {videos.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator-urban ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Ir al video ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TrailerSection;
