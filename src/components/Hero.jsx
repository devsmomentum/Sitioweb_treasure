import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // CONNECTED ROCKSTAR PARALLAX
    const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.3, 1.7]);
    const bgOpacity = useTransform(smoothScroll, [0.7, 1], [1, 0]); 
    const bgBlur = useTransform(smoothScroll, [0.6, 1], ["blur(0px)", "blur(20px)"]);
    
    const logoScale = useTransform(smoothScroll, [0, 0.3], [1, 0.7]);
    const logoY = useTransform(smoothScroll, [0, 0.5], [0, -100]);
    const logoOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);
    
    const tagY = useTransform(smoothScroll, [0, 0.5], [0, 100]);
    const tagOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

    const overlayOpacity = useTransform(smoothScroll, [0.4, 0.9], [0, 0.8]);
    const contentScale = useTransform(smoothScroll, [0, 0.4], [1, 0.85]);

    const scrollToTrailer = () => {
        const trailerSection = document.getElementById('trailer');
        if (trailerSection) {
            trailerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero-rockstar-container" ref={containerRef} style={{ height: '250vh' }}>
            {/* Background Layer - Cinematic Scale */}
            <div className="hero-sticky-wrapper">
                <motion.div
                    className="hero-cinematic-bg"
                    style={{ 
                        scale: bgScale, 
                        opacity: bgOpacity,
                        filter: bgBlur,
                        backgroundImage: `url('/hero.png')` 
                    }}
                />
                
                {/* Cinematic Overlays */}
                <motion.div className="hero-cinematic-overlay" style={{ opacity: overlayOpacity }} />
                <div className="hero-cinematic-vignette" />
                
                {/* Floating Particles/Elements */}
                <div className="hero-dust-particles">
                    {[...Array(15)].map((_, i) => (
                        <motion.div 
                            key={i} 
                            className="dust-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                y: useTransform(smoothScroll, [0, 1], [0, (Math.random() - 0.5) * 500])
                            }}
                        />
                    ))}
                </div>

                {/* Main Content - Sticky Center */}
                <motion.div
                    className="hero-cinematic-content"
                    style={{ scale: contentScale }}
                >
                    <motion.div 
                        className="hero-logo-wrapper"
                        style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}
                    >
                        <img src="/logo-maphunter.png" alt="MapHunter Logo" className="hero-logo-img-main" />
                    </motion.div>
                    
                    <motion.div 
                        className="hero-tagline-wrapper"
                        style={{ y: tagY, opacity: tagOpacity }}
                    >
                        <span className="hero-tagline-text">EL TESORO ESTÁ EN TU CIUDAD</span>
                    </motion.div>

                    <motion.div 
                        className="hero-actions-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <button className="btn-rockstar primary" onClick={scrollToTrailer}>Ver Tráiler</button>
                        <button className="btn-rockstar secondary" onClick={() => window.location.href = 'https://prueba.maphunter.online'}>Empezar</button>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    className="hero-scroll-indicator"
                    style={{ opacity: useTransform(smoothScroll, [0, 0.1], [1, 0]) }}
                >
                    <div className="mouse-icon">
                        <motion.div 
                            className="mouse-wheel"
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                    </div>
                    <span>DESCUBRE</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
