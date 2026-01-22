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
            {/* Layer 1: Stars/Far BG */}
            <motion.div
                className="parallax-layer l1-far-bg"
                style={{ y: bgY, scale: bgScale, backgroundImage: `url('/hero-bg.png')` }}
            />

            {/* Layer 2: Midground Silhouettes */}
            <motion.div
                className="parallax-layer l2-midground"
                style={{ y: midY, x: midX, backgroundImage: `url('/midground.png')` }}
            />

            {/* Layer 3: Main Character */}
            <motion.div
                className="parallax-layer l3-character"
                style={{ y: charY, scale: charScale }}
            >
                <img src="/character.png" alt="Hunter" />
            </motion.div>

            {/* Layer 4: Floating Foreground Items */}
            <motion.div
                className="parallax-layer l4-foreground-left"
                style={{ y: fgY, x: fgX }}
            >
                <img src="/foreground-item.png" alt="Crystal" />
            </motion.div>

            <motion.div
                className="parallax-layer l4-foreground-right"
                style={{
                    y: useTransform(smoothScroll, [0, 1], ["0%", "-100%"]),
                    x: useTransform(smoothScroll, [0, 1], ["0%", "15%"])
                }}
            >
                <img src="/foreground-item.png" alt="Crystal" />
            </motion.div>

            {/* Overlays */}
            <div className="wide-vignette"></div>

            {/* Layer 5: Text Content */}
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
                    <span className="wide-tagline">THE NEXT ERA OF MOBILE RPG</span>
                </div>

                <div className="hero-cta-group">
                    <button className="btn-rockstar-wide primary">Watch Trailer</button>
                    <button className="btn-rockstar-wide secondary">Explore World</button>
                </div>
            </motion.div>

            <div className="scroll-hint">
                <span>SCROLL TO EXPLORE</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default Hero;
