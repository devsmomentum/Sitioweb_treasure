import React from 'react';
import { motion } from 'framer-motion';
import './CharactersVideo.css';

const CharactersVideo = () => {
    return (
        <section className="characters-video-section">
            {/* Fondo Fijo que llena todo el espacio */}
            <div 
                className="characters-full-bg"
                style={{ 
                    backgroundImage: "url('/personajes_equipo.jpg')",
                    backgroundSize: '110%', /* Upscale slightly to crop out the watermark at the edges */
                    backgroundPosition: 'center 85%', 
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1
                }}
            />

            {/* Overlay para suavizar bordes y mejorar contraste */}
            <div className="characters-video-vignette"></div>

            {/* Contenido centrado o a la izquierda */}
            <div className="characters-video-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="characters-video-label">ELENCO DE HÉROES</div>
                    <h2 className="characters-video-title">PERSONAJES <span>LEYENDARIOS</span></h2>
                    <p className="characters-video-desc">
                        Cada cazador tiene habilidades únicas. Prepárate para la aventura con el mejor equipo.
                    </p>
                    <div className="characters-video-cta">
                        <button className="btn-characters-video">Conoce a tu Equipo</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CharactersVideo;
