import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Minigames.css';

const minigames = [
    { 
        name: 'Pulso de Memoria', 
        type: 'Intelecto', 
        icon: '🧠', 
        color: '#9b59b6',
        desc: 'Memoriza secuencias binarias para hackear el sistema.'
    },
    { 
        name: 'Toque Veloz', 
        type: 'Agilidad', 
        icon: '⚡', 
        color: '#FF7675',
        desc: 'Reacciona antes de que la señal se pierda.'
    },
    { 
        name: 'Acertijos', 
        type: 'Sabiduría', 
        icon: '🧩', 
        color: '#00cec9',
        desc: 'Descifra códigos antiguos de las tribus urbanas.'
    },
    { 
        name: 'Geo-Captura', 
        type: 'Reflejos', 
        icon: '🎯', 
        color: '#FFD700',
        desc: 'Ubica con precisión el punto exacto del tesoro.'
    }
];

const TiltCard = ({ m, i }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Dynamic rotation based on mouse position
    const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 300, damping: 30 });

    // Glare position
    const glareX = useSpring(useTransform(x, [0, 1], ['0%', '100%']), { stiffness: 300, damping: 30 });
    const glareY = useSpring(useTransform(y, [0, 1], ['0%', '100%']), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width;
        const mouseY = (e.clientY - rect.top) / rect.height;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div 
            ref={cardRef}
            className="cartridge-card-wrapper"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div 
                className="cartridge-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                {/* Dynamic Glare Effect */}
                <motion.div 
                    className="card-glare"
                    style={{ 
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)` 
                    }}
                />

                <div className="cartridge-top">
                    <div className="cartridge-ribbon" style={{ backgroundColor: m.color }}></div>
                    <div className="cartridge-label">GAME SYSTEM</div>
                </div>
                
                <div className="cartridge-body" style={{ transform: "translateZ(30px)" }}>
                    <div className="mg-visual" style={{ background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)` }}>
                        <div className="mg-icon-large">{m.icon}</div>
                        <div className="mg-scanline"></div>
                    </div>
                    
                    <div className="mg-info">
                        <h4>{m.name}</h4>
                        <span className="mg-tag" style={{ color: m.color }}>{m.type}</span>
                        <p>{m.desc}</p>
                    </div>
                    
                    <button className="btn-cartridge" style={{ borderColor: m.color, color: m.color }}>
                        INICIAR SIMULACIÓN
                    </button>
                </div>
                
                <div className="cartridge-pins">
                    {[...Array(12)].map((_, idx) => <div key={idx} className="pin"></div>)}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Minigames = () => {
    return (
        <section className="minigames-section">
            <div className="container">
                <div className="label-centered">SISTEMA DE ENTRENAMIENTO</div>
                <h2 className="section-title">Minijuegos de <span>Habilidad</span></h2>
                
                <div className="minigames-grid">
                    {minigames.map((m, i) => (
                        <TiltCard key={i} m={m} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Minigames;

