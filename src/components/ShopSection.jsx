import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import './ShopSection.css';

const powerUps = [
    { id: 'freeze', name: 'Congelar', category: 'Reliquias', desc: 'Detén el tiempo y a tus enemigos.', icon: '❄️', color: '#70a1ff', price: 50, featured: true },
    { id: 'shield', name: 'Escudo', category: 'Reliquias', desc: 'Bloquea el próximo ataque enemigo.', icon: '🛡️', color: '#ffa502', price: 150 },
    { id: 'blackout', name: 'Pantalla Negra', category: 'Pergaminos', desc: 'Oscurece la visión de tus rivales.', icon: '🌑', color: '#000000', price: 100 },
    { id: 'blur', name: 'Borroso', category: 'Pergaminos', desc: 'Confunde los sentidos del oponente.', icon: '🌫️', color: '#747d8c', price: 110 },
    { id: 'ghost', name: 'Invisible', category: 'Habilidades', desc: 'Vuélvete una sombra indetectable.', icon: '👻', color: '#a29bfe', price: 100 },
    { id: 'vampire', name: 'Robar Vidas', category: 'Habilidades', desc: 'Drena la energía vital de otros.', icon: '🧛', color: '#541c1c', price: 130 },
    { id: 'health', name: 'Vida', category: 'Consumibles', desc: 'Restaura tus puntos de salud.', icon: '❤️', color: '#ff4757', price: 50 },
    { id: 'return', name: 'Devolver', category: 'Reliquias', desc: 'Cambia el destino de un poder.', icon: '🪞', color: '#2ed573', price: 90 },
];

const ShopSection = () => {
    const [activeEffect, setActiveEffect] = useState(null);
    const [lastPurchase, setLastPurchase] = useState(null);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // SHOP PARALLAX TRANSFORMS
    const npcY = useTransform(smoothScroll, [0, 1], [0, 80]);
    const headerY = useTransform(smoothScroll, [0, 1], [0, -60]);
    
    // Items parallax (3 speeds for variety)
    const itemSpeedA = useTransform(smoothScroll, [0, 1], [50, -50]);
    const itemSpeedB = useTransform(smoothScroll, [0, 1], [30, -30]);
    const itemSpeedC = useTransform(smoothScroll, [0, 1], [70, -70]);
    const itemSpeeds = [itemSpeedA, itemSpeedB, itemSpeedC, itemSpeedA, itemSpeedB, itemSpeedC, itemSpeedA, itemSpeedB];

    const handlePurchase = (id) => {
        setActiveEffect(id);
        setLastPurchase(id);
        setTimeout(() => setActiveEffect(null), 3000);
    };

    return (
        <section id="shop" className={`shop-section ${activeEffect === 'freeze' ? 'frozen-ui' : ''}`} ref={containerRef}>
            {/* Global Effects (Keeping existing ones for visual impact) */}
            <AnimatePresence>
                {activeEffect === 'blackout' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="effect-overlay blackout-effect" />
                )}
                {activeEffect === 'blur' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="effect-overlay blur-effect" />
                )}
                {activeEffect === 'freeze' && (
                    <motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="effect-overlay ice-crack-effect" />
                )}
                {activeEffect === 'shield' && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 1] }} className="effect-overlay shield-flash"><div className="shield-hex">🛡️</div></motion.div>
                )}
            </AnimatePresence>

            <div className="container">
                <motion.div className="shop-header" style={{ y: headerY }}>
                    <div className="shop-badge">TIENDA LEGENDARIA</div>
                    <h2 className="section-title">El Bazar del <span>Alquimista</span></h2>
                    <p>Adquiere reliquias que alteran la realidad del juego</p>
                </motion.div>

                <div className="shop-layout">
                    <motion.div className="npc-container glass" style={{ y: npcY }}>
                        <motion.div
                            className="npc-avatar"
                            animate={activeEffect ? { scale: [1, 1.1, 1] } : { y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            🧙‍♂️
                        </motion.div>
                        <div className="npc-speech-bubble">
                            <p>
                                {activeEffect 
                                    ? "¡Una elección poderosa! Úsala con sabiduría..." 
                                    : "Acércate, viajero. Mis baratijas tienen más poder del que aparentan."}
                            </p>
                        </div>
                        <div className="npc-stats">
                            <div className="stat-item"><span>Oro:</span> 2,450 💰</div>
                            <div className="stat-item"><span>Items:</span> 8/12 📦</div>
                        </div>
                    </motion.div>

                    <div className="items-grid">
                        {powerUps.map((p, i) => (
                            <motion.div
                                key={p.id}
                                className={`shop-item glass ${activeEffect === p.id ? 'active-buy' : ''} ${p.featured ? 'featured-item' : ''}`}
                                style={{ y: itemSpeeds[i % itemSpeeds.length] }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                onClick={() => handlePurchase(p.id)}
                            >
                                {p.featured && <div className="featured-tag">RECOMENDADO</div>}
                                <div className="item-category">{p.category}</div>
                                
                                <div className="item-main">
                                    <div className="item-icon-wrapper">
                                        <div className="item-icon">{p.icon}</div>
                                        <div className="icon-platform"></div>
                                    </div>
                                    
                                    <div className="item-content">
                                        <h4>{p.name}</h4>
                                        <p>{p.desc}</p>
                                    </div>
                                </div>

                                <div className="item-footer">
                                    <div className="item-price">{p.price} <span>💰</span></div>
                                    <button className="btn-buy">ADQUIRIR</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopSection;
