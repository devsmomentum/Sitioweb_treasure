import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CharactersSection.css';

const characters = [
    {
        id: 1,
        name: "Elena 'Sky' Ross",
        role: "Exploradora Clásica",
        description: "Experta en mapas antiguos y supervivencia. Nunca sale sin su brújula y su fiel pico.",
        color: "#f9ca24",
        icon: "🧭"
    },
    {
        id: 2,
        name: "Mia 'Byte' Chen",
        role: "Tecno-Maga",
        description: "Transforma la realidad aumentada en su patio de juegos. Su tablet es su arma más poderosa.",
        color: "#ff7675",
        icon: "📱"
    },
    {
        id: 3,
        name: "Kael 'Shadow' Thorne",
        role: "Cazador de Sombras",
        description: "Se mueve entre las sombras de los rascacielos. Ágil, letal y prácticamente invisible.",
        color: "#a29bfe",
        icon: "🥷"
    },
    {
        id: 4,
        name: "Nova 'Vision' Kim",
        role: "Exploradora VR",
        description: "Ve lo que otros ignoran. Sus gafas AR revelan los tesoros ocultos en las paredes de la ciudad.",
        color: "#00cec9",
        icon: "🥽"
    },
    {
        id: 5,
        name: "Marcus 'Old' Stone",
        role: "Minero Urbano",
        description: "No hay sótano o túnel que no haya explorado. Si hay oro bajo el asfalto, él lo encontrará.",
        color: "#fab1a0",
        icon: "⛏️"
    },
    {
        id: 6,
        name: "Leo 'Link' Walker",
        role: "Hacker de Redes",
        description: "Capaz de interceptar cualquier señal. Convierte la infraestructura urbana en su ventaja táctica.",
        color: "#74b9ff",
        icon: "🔗"
    },
    {
        id: 7,
        name: "Jax 'Saber' Voltz",
        role: "Caballero Cíber",
        description: "Protector de los buscadores. Su espada láser corta la seguridad más dura como si fuera mantequilla.",
        color: "#55efc4",
        icon: "⚔️"
    },
    {
        id: 8,
        name: "Zane 'Pulse' Ray",
        role: "Estratega Digital",
        description: "El cerebro detrás de la operación. Analiza datos en tiempo real para predecir el próximo drop.",
        color: "#a29bfe",
        icon: "📡"
    }
];

const CharactersSection = () => {
    const [selectedId, setSelectedId] = useState(1);

    const selectedChar = characters.find(c => c.id === selectedId);

    return (
        <section id="characters" className="characters-section">
            <div className="container">
                <motion.div
                    className="section-header-urban"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">EQUIPO DE <span>BÚSQUEDA</span></h2>
                    <p>Elige tu avatar y domina las calles</p>
                </motion.div>

                <div className="characters-grid-container">
                    {/* Left side: Character Selection */}
                    <div className="characters-nav">
                        {characters.map((char) => (
                            <motion.button
                                key={char.id}
                                className={`char-nav-item ${selectedId === char.id ? 'active' : ''}`}
                                onClick={() => setSelectedId(char.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="char-nav-icon" style={{ borderColor: char.color }}>
                                    {char.icon}
                                </div>
                                <div className="char-nav-text">
                                    <span className="char-nav-name">{char.name.split(' ')[0]}</span>
                                    <span className="char-nav-role">{char.role}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right side: Character Showcase */}
                    <div className="character-showcase">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                className="showcase-card glass"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="showcase-visual">
                                    <div className="char-glow" style={{ background: `radial-gradient(circle, ${selectedChar.color}33 0%, transparent 70%)` }}></div>
                                    <motion.div
                                        className="pixel-char-display"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    >
                                        {/* This represents the character from the image */}
                                        <div className="pixel-art-placeholder" style={{ backgroundColor: selectedChar.color }}>
                                            {selectedChar.icon}
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="showcase-content">
                                    <div className="char-tag" style={{ backgroundColor: selectedChar.color }}>{selectedChar.role}</div>
                                    <h3 className="char-name">{selectedChar.name}</h3>
                                    <p className="char-description">{selectedChar.description}</p>

                                    <div className="char-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">EXPLORACIÓN</span>
                                            <div className="stat-bar-bg"><motion.div className="stat-bar" initial={{ width: 0 }} animate={{ width: "85%" }} style={{ backgroundColor: selectedChar.color }}></motion.div></div>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">TECNOLOGÍA</span>
                                            <div className="stat-bar-bg"><motion.div className="stat-bar" initial={{ width: 0 }} animate={{ width: "70%" }} style={{ backgroundColor: selectedChar.color }}></motion.div></div>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">SIGILO</span>
                                            <div className="stat-bar-bg"><motion.div className="stat-bar" initial={{ width: 0 }} animate={{ width: "95%" }} style={{ backgroundColor: selectedChar.color }}></motion.div></div>
                                        </div>
                                    </div>

                                    <button className="btn-select-char" style={{ borderColor: selectedChar.color, color: selectedChar.color }}>
                                        SELECCIONAR PERSONAJE
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharactersSection;
