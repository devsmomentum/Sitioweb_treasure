import React from 'react';
import { motion } from 'framer-motion';
import './ActionHero.css';

const ActionHero = () => {
    return (
        <section className="action-hero-container">
            <div 
                className="action-parallax-bg" 
                style={{ 
                    backgroundImage: "url('/hero.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            <div className="action-vignette"></div>

            <motion.div
                className="action-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="action-label">MODO MULTIJUGADOR</div>
                <h2 className="action-title">EVENTOS EN VIVO 24/7</h2>
                <p className="action-description">
                    Únete a desafíos globales cada semana. Desde cacerías relámpago hasta
                    misiones cooperativas en los puntos más emblemáticos de tu ciudad.
                    ¡Las recompensas legendarias te esperan!
                </p>
                <div className="action-cta">
                    <button className="btn-action">Ver Calendario</button>
                    <div className="live-indicator">
                        <span className="dot"></span>
                        AHORA: GRAN CACERÍA NEÓN
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ActionHero;
