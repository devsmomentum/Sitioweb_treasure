import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './PhoneShowcase.css';

const PhoneShowcase = () => {
    const [inView, setInView] = React.useState(false);
    const containerRef = useRef(null);

    React.useEffect(() => {
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

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

    const phoneRotateY = useTransform(smoothScroll, [0, 0.3, 0.5, 0.7, 1], [45, 15, 0, -5, -15]);
    const phoneRotateX = useTransform(smoothScroll, [0, 0.3, 0.5, 1], [20, 5, 0, -5]);
    const phoneScale = useTransform(smoothScroll, [0, 0.4, 0.6, 1], [0.6, 1, 1, 0.9]);
    const phoneOpacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
    const textX = useTransform(smoothScroll, [0, 0.4, 0.5], [-100, 0, 0]);
    const textOpacity = useTransform(smoothScroll, [0, 0.3, 0.5], [0, 0, 1]);

    const screens = [
        { label: "Inicia Sesión", desc: "Entra a tu cuenta y personaliza tu avatar" },
        { label: "Elige tu Aventura", desc: "Selecciona entre múltiples eventos activos" },
        { label: "Resuelve Minijuegos", desc: "Desafíos de lógica, matemáticas y más" },
        { label: "¡Gana Tesoros!", desc: "Compite por premios reales y trofeos" }
    ];

    return (
        <section className={`phone-showcase-section ${!inView ? 'paused-animations' : ''}`} ref={containerRef}>
            {/* Floating particles */}
            <div className="phone-particles">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="phone-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            '--particle-size': `${Math.random() * 4 + 2}px`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="phone-showcase-container container">
                {/* Left side: Text content */}
                <motion.div
                    className="phone-text-side"
                    style={{ x: textX, opacity: textOpacity }}
                >
                    <div className="phone-section-label">EXPERIENCIA MÓVIL</div>
                    <h2 className="phone-section-title">
                        TU AVENTURA EN LA <span>PALMA DE TU MANO</span>
                    </h2>
                    <p className="phone-section-desc">
                        Descarga MapHunter y transforma tu ciudad en un campo de aventuras.
                        Explora, compite y gana tesoros reales.
                    </p>

                    <div className="phone-steps">
                        {screens.map((screen, i) => (
                            <motion.div
                                key={i}
                                className="phone-step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i + 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="phone-step-number">{i + 1}</div>
                                <div className="phone-step-text">
                                    <strong>{screen.label}</strong>
                                    <span>{screen.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        className="btn-phone-cta"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = 'https://prueba.maphunter.online'}
                    >
                        Descargar Ahora
                    </motion.button>
                </motion.div>

                {/* Right side: 3D Phone */}
                <motion.div
                    className="phone-3d-wrapper"
                    style={{
                        rotateY: phoneRotateY,
                        rotateX: phoneRotateX,
                        scale: phoneScale,
                        opacity: phoneOpacity,
                    }}
                >
                    <div className="phone-glow"></div>
                    <div className="phone-frame">
                        <div className="phone-notch"></div>
                        <div className="phone-screen">
                            <img src="/phone-mockup.png" alt="MapHunter App" className="phone-screen-img" />
                        </div>
                        <div className="phone-home-bar"></div>
                    </div>
                    {/* Floating game elements around phone */}
                    <motion.div
                        className="floating-game-element el-1"
                        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        🗺️
                    </motion.div>
                    <motion.div
                        className="floating-game-element el-2"
                        animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                        💎
                    </motion.div>
                    <motion.div
                        className="floating-game-element el-3"
                        animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                    >
                        🏆
                    </motion.div>
                    <motion.div
                        className="floating-game-element el-4"
                        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                    >
                        ⚔️
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default PhoneShowcase;
