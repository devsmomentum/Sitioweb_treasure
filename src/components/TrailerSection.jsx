import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './TrailerSection.css';

const videos = [
    {
        id: 1,
        src: "/trailer.mp4",
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

    const nextVideo = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <section id="trailer" className="trailer-section">
            <div className="container">
                <motion.div
                    className="trailer-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="play-badge">
                        <Play size={24} fill="currentColor" />
                    </div>
                    <h2>Tráiler <span>{videos[currentIndex].title}</span></h2>
                    <p>Descubre la emoción de MapHunter en acción</p>
                </motion.div>

                <div className="carousel-container">
                    <button className="nav-btn prev" onClick={prevVideo} aria-label="Video anterior">
                        <ChevronLeft size={32} />
                    </button>

                    <motion.div
                        className="video-container"
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="video-glow"></div>
                        <div className="video-frame">
                            <video
                                controls
                                className="main-trailer"
                                key={videos[currentIndex].src} // Recreate video element on change
                            >
                                <source src={videos[currentIndex].src} type="video/mp4" />
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </motion.div>

                    <button className="nav-btn next" onClick={nextVideo} aria-label="Siguiente video">
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="carousel-indicators">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Ir al video ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrailerSection;
