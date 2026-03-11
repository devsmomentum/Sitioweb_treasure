import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [inView, setInView] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handlePurchase = (id) => {
        setActiveEffect(id);
        setLastPurchase(id);
        setTimeout(() => setActiveEffect(null), 3000);
    };

    return (
        <section id="shop" className={`shop-section ${!inView ? 'paused-animations' : ''} ${activeEffect === 'freeze' ? 'frozen-ui' : ''} ${activeEffect === 'ghost' ? 'ghostly-ui' : ''} ${activeEffect === 'blackout' ? 'blackout-ui' : ''}`} ref={containerRef}>
            {/* Efectos Globales... (Keep AnimatePresence code as is) */}
            <AnimatePresence>
                {activeEffect === 'blackout' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="effect-overlay blackout-effect" />
                )}
                {activeEffect === 'blur' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="effect-overlay blur-effect" />
                )}
                {activeEffect === 'freeze' && (
                    <>
                        <motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="effect-overlay ice-crack-effect" />
                        <div className="snow-container">
                            {[...Array(40)].map((_, i) => (
                                <motion.div key={i} className="snow-particle" initial={{ top: -20, left: `${Math.random() * 100}%`, opacity: 0 }} animate={{ top: '110%', opacity: [0, 1, 1, 0], x: [0, Math.random() * 60 - 30, 0] }} transition={{ duration: Math.random() * 1.5 + 1.5, repeat: Infinity, ease: "linear", delay: i * 0.05 }} />
                            ))}
                        </div>
                    </>
                )}
                {activeEffect === 'shield' && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 1] }} className="effect-overlay shield-flash"><div className="shield-hex">🛡️</div></motion.div>
                )}
                {activeEffect === 'ghost' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="effect-overlay ghost-mist" />}
                {activeEffect === 'vampire' && (
                    <div className="effect-overlay life-steal-effect">
                        {[...Array(3)].map((_, i) => (
                            <motion.div key={i} className="stolen-heart" initial={{ opacity: 0, scale: 0, y: 100 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1], y: -200, x: (i - 1) * 100 }} transition={{ duration: 1.5, delay: i * 0.2 }}>❤️</motion.div>
                        ))}
                    </div>
                )}
                {activeEffect === 'health' && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }} className="effect-overlay health-flash" />}
            </AnimatePresence>

            <div className="container">
                <div className="shop-header">
                    <div className="shop-badge">TIENDA LEGENDARIA</div>
                    <h2 className="section-title">El Bazar del <span>Alquimista</span></h2>
                    <p>Adquiere reliquias que alteran la realidad del juego</p>
                </div>

                <div className="shop-layout">
                    <div className="npc-container glass">
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
                    </div>

                    <div className="items-grid">
                        {powerUps.map((p) => (
                            <motion.div
                                key={p.id}
                                className={`shop-item glass ${activeEffect === p.id ? 'active-buy' : ''} ${p.featured ? 'featured-item' : ''}`}
                                whileHover={{ y: -10 }}
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

                                {lastPurchase === p.id && !activeEffect && (
                                    <motion.div className="purchase-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        ¡Adquirido!
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ShopSection;
