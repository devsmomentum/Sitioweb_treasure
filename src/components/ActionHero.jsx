import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ActionHero.css';

const ActionHero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    // CONNECTED ROCKSTAR PARALLAX
    const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.4, 1.7]);
    const bgOpacity = useTransform(smoothScroll, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const bgBlur = useTransform(smoothScroll, [0, 0.1, 0.8, 1], ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"]);
    
    const textY = useTransform(smoothScroll, [0, 0.3, 0.7, 1], [150, 0, 0, -150]);
    const textOpacity = useTransform(smoothScroll, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
    const textScale = useTransform(smoothScroll, [0.2, 0.5, 0.8], [0.8, 1, 0.8]);

    return (
        <section 
            className="action-rockstar-container" 
            ref={containerRef} 
        >
            <div className="action-sticky-wrapper">
                <motion.div 
                    className="action-parallax-bg" 
                    style={{ 
                        backgroundImage: "url('/hero.png')",
                        scale: bgScale,
                        opacity: bgOpacity,
                        filter: bgBlur
                    }}
                />

                <div className="action-rockstar-vignette" />

                <motion.div
                    className="action-rockstar-content"
                    style={{ y: textY, opacity: textOpacity, scale: textScale }}
                >
                    <div className="action-label-rockstar">MODO MULTIJUGADOR</div>
                    <h2 className="action-title-rockstar">EVENTOS EN VIVO 24/7</h2>
                    <p className="action-desc-rockstar">
                        Únete a desafíos globales cada semana. Desde cacerías relámpago hasta
                        misiones cooperativas en los puntos más emblemáticos de tu ciudad.
                    </p>
                    <div className="action-actions-rockstar">
                        <button className="btn-rockstar primary">Ver Calendario</button>
                        <div className="live-status">
                            <span className="live-dot"></span>
                            AHORA: GRAN CACERÍA NEÓN
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ActionHero;
