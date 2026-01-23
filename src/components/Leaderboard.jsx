import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Leaderboard.css';

const leaderboardData = [
    { rank: 1, name: 'ShadowHunter', lvl: 42, xp: '15,400', class: 'Asesino', avatar: '🥷', color: '#FFD700' },
    { rank: 2, name: 'NeonKnight', lvl: 38, xp: '12,200', class: 'Guerrero', avatar: '⚔️', color: '#C0C0C0' },
    { rank: 3, name: 'MysticSky', lvl: 35, xp: '10,800', class: 'Mago', avatar: '🔮', color: '#CD7F32' },
    { rank: 4, name: 'CodeBreaker', lvl: 31, xp: '9,500', class: 'Tecnomante', avatar: '💻', color: '#a29bfe' },
    { rank: 5, name: 'SilverFox', lvl: 29, xp: '8,100', class: 'Pícaro', avatar: '🦊', color: '#fab1a0' }
];

const Confetti = ({ count = 50 }) => {
    const colors = ['#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c', '#22a6b3', '#be2edd', '#4834d4'];

    return (
        <div className="confetti-container">
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    className="confetti-piece"
                    initial={{
                        top: "100%",
                        left: `${Math.random() * 100}%`,
                        scale: Math.random() * 0.5 + 0.5,
                        rotate: 0
                    }}
                    animate={{
                        top: "-10%",
                        left: `${(Math.random() * 100) + (Math.random() * 40 - 20)}%`,
                        rotate: Math.random() * 720,
                    }}
                    transition={{
                        duration: Math.random() * 2 + 2,
                        ease: "easeOut",
                        delay: Math.random() * 0.5
                    }}
                    style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                />
            ))}
        </div>
    );
};

const Leaderboard = () => {
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 3000);
        }, 8000); // Celebra cada 8 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="leaderboard" className="leaderboard-section">
            <AnimatePresence>
                {celebrate && <Confetti />}
            </AnimatePresence>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="leaderboard-header-main"
                >
                    <h2 className="section-title">Ranking Mundial</h2>
                    <p>Los mejores cazadores de la temporada</p>
                </motion.div>

                <div className="leaderboard-container glass">
                    <div className="leaderboard-header">
                        <span>Rango</span>
                        <span>Jugador</span>
                        <span>Clase</span>
                        <span>Nivel</span>
                        <span className="hide-mobile">XP Total</span>
                    </div>
                    <div className="leaderboard-list">
                        {leaderboardData.map((player, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className={`leaderboard-row ${i < 3 ? `top-${i + 1}` : ''}`}
                            >
                                <div className="player-rank">
                                    {i === 0 ? <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👑</motion.span> : i + 1}
                                </div>
                                <div className="player-info">
                                    <div className="avatar-frame" style={{ borderColor: player.color }}>
                                        <span className="player-avatar">{player.avatar}</span>
                                    </div>
                                    <span className="player-name">{player.name}</span>
                                </div>
                                <div className="player-class" style={{ color: player.color }}>{player.class}</div>
                                <div className="player-level">NIVEL {player.lvl}</div>
                                <div className="player-xp hide-mobile">
                                    <span className="xp-value">{player.xp}</span>
                                    <span className="xp-unit">XP</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="ranking-footer">
                    <button className="btn-celebrate" onClick={() => {
                        setCelebrate(true);
                        setTimeout(() => setCelebrate(false), 3000);
                    }}>
                        ¡Celebrar Victoria! 🎉
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
