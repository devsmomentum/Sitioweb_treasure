import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShopSection.css';

const powerUps = [
    { id: 'blackout', name: 'Pantalla Negra', desc: 'Oscurece la visión de tus rivales.', icon: '🌑', color: '#000000', price: 100 },
    { id: 'health', name: 'Vida', desc: 'Restaura tus puntos de salud al máximo.', icon: '❤️', color: '#ff4757', price: 50 },
    { id: 'return', name: 'Revertir el Poder', desc: 'Cambia el destino de un poder recibido.', icon: '🔄', color: '#2ed573', price: 90 },
    { id: 'blur', name: 'Pantalla Borrosa', desc: 'Confunde los sentidos del oponente.', icon: '🌫️', color: '#747d8c', price: 110 },
    { id: 'freeze', name: 'Congelar', desc: 'Detén el tiempo y a tus enemigos.', icon: '❄️', color: '#70a1ff', price: 50 },
    { id: 'shield', name: 'Escudo', desc: 'Bloquea el próximo ataque enemigo.', icon: '🛡️', color: '#ffa502', price: 150 },
    { id: 'vampire', name: 'Robo de Vida', desc: 'Drena la energía vital de otros.', icon: '🧛', color: '#541c1c', price: 130 },
    { id: 'ghost', name: 'Invisible', desc: 'Vuélvete una sombra indetectable.', icon: '👻', color: '#a29bfe', price: 100 }
];

const ShopSection = () => {
    const [activeEffect, setActiveEffect] = useState(null);

    const handlePurchase = (id) => {
        setActiveEffect(id);
        // Quitar el efecto después de 3 segundos
        setTimeout(() => setActiveEffect(null), 3000);
    };

    return (
        <section id="shop" className={`shop-section ${activeEffect === 'freeze' ? 'frozen-ui' : ''} ${activeEffect === 'ghost' ? 'ghostly-ui' : ''} ${activeEffect === 'blackout' ? 'blackout-ui' : ''}`}>
            {/* Efectos Globales de la Tienda */}
            <AnimatePresence>
                {activeEffect === 'blackout' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeIn" }}
                        className="effect-overlay blackout-effect"
                    />
                )}
                {activeEffect === 'blur' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="effect-overlay blur-effect"
                    />
                )}
                {activeEffect === 'freeze' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="effect-overlay ice-crack-effect"
                        />
                        <div className="snow-container">
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="snow-particle"
                                    initial={{ top: -20, left: `${Math.random() * 100}%`, opacity: 0 }}
                                    animate={{
                                        top: '110%',
                                        opacity: [0, 1, 1, 0],
                                        x: [0, Math.random() * 60 - 30, 0]
                                    }}
                                    transition={{
                                        duration: Math.random() * 1.5 + 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.05
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
                {activeEffect === 'shield' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.8, 1.1, 1],
                            rotate: 0
                        }}
                        exit={{ opacity: 0 }}
                        className="effect-overlay shield-flash"
                    >
                        <div className="shield-hex">🛡️</div>
                    </motion.div>
                )}
                {activeEffect === 'ghost' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="effect-overlay ghost-mist"
                    />
                )}
                {activeEffect === 'vampire' && (
                    <div className="effect-overlay life-steal-effect">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="stolen-heart"
                                initial={{ opacity: 0, scale: 0, y: 100 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.5, 1.2, 1],
                                    y: -200,
                                    x: (i - 1) * 100 // Spreads them out
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                ❤️
                            </motion.div>
                        ))}
                    </div>
                )}
                {activeEffect === 'health' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
                        exit={{ opacity: 0 }}
                        className="effect-overlay health-flash"
                    />
                )}
            </AnimatePresence>

            <div className="container">
                <div className="shop-header">
                    <h2 className="section-title">La Tiendita Mágica</h2>
                    <p>Prueba nuestros poderes dándole clic.</p>
                </div>

                <div className="shop-layout">
                    <div className="npc-container glass">
                        <motion.div
                            className="npc-avatar"
                            animate={activeEffect === 'freeze' ? { scale: 1, rotate: 0 } : {
                                scale: [1, 1.05, 1],
                                rotate: [0, -5, 5, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 4 }}
                        >
                            🧙‍♂️
                        </motion.div>
                        <div className="npc-speech">
                            {activeEffect === 'freeze' ? '"...Todo se ha detenido..." ' : '"Elige sabiamente, viajero. Estas reliquias determinarán tu destino."'}
                        </div>
                    </div>

                    <div className="items-grid">
                        {powerUps.map((p) => (
                            <motion.div
                                key={p.id}
                                className={`shop-item glass ${activeEffect === p.id ? 'active-buy' : ''}`}
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePurchase(p.id)}
                            >
                                <div className="item-icon-wrapper">
                                    <motion.div
                                        className="item-icon"
                                        animate={activeEffect === p.id ? {
                                            rotate: [0, 360],
                                            scale: [1, 1.5, 1]
                                        } : {}}
                                    >
                                        {p.icon}
                                    </motion.div>
                                    {activeEffect === p.id && (
                                        <motion.div
                                            className="icon-glow"
                                            style={{ backgroundColor: p.color }}
                                            layoutId="glow"
                                        />
                                    )}
                                </div>
                                <div className="item-info">
                                    <h4>{p.name}</h4>
                                    <p>{p.desc}</p>
                                </div>
                                <div className="item-price">
                                    <motion.span
                                        animate={activeEffect === p.id ? { color: '#fff' } : {}}
                                    >
                                        {p.price} 💰
                                    </motion.span>
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
