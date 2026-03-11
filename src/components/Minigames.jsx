import React from 'react';
import { motion } from 'framer-motion';
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

const Minigames = () => {
    return (
        <section className="minigames-section">
            <div className="container">
                <div className="label-centered">SISTEMA DE ENTRENAMIENTO</div>
                <h2 className="section-title">Minijuegos de <span>Habilidad</span></h2>
                
                <div className="minigames-grid">
                    {minigames.map((m, i) => (
                        <motion.div 
                            key={i} 
                            className="cartridge-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="cartridge-top">
                                <div className="cartridge-ribbon" style={{ backgroundColor: m.color }}></div>
                                <div className="cartridge-label">GAME SYSTEM</div>
                            </div>
                            
                            <div className="cartridge-body">
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Minigames;
