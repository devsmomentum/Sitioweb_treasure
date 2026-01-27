import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './TrailerSection.css';

const TrailerSection = () => {
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
                    <h2>Tráiler <span>Oficial</span></h2>
                    <p>Descubre la emoción de MapHunter en acción</p>
                </motion.div>

                <motion.div
                    className="video-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="video-glow"></div>
                    <div className="video-frame">
                        <video
                            controls
                            className="main-trailer"
                        >
                            <source src="/trailer.mp4" type="video/mp4" />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TrailerSection;
