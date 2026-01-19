import React from 'react';
import './Leaderboard.css';

const leaderboardData = [
    { rank: 1, name: 'ShadowHunter', lvl: 42, xp: '15,400', class: 'Assassin', avatar: '🥷' },
    { rank: 2, name: 'NeonKnight', lvl: 38, xp: '12,200', class: 'Warrior', avatar: '⚔️' },
    { rank: 3, name: 'MysticSky', lvl: 35, xp: '10,800', class: 'Mage', avatar: '🔮' },
    { rank: 4, name: 'CodeBreaker', lvl: 31, xp: '9,500', class: 'Technomancer', avatar: '💻' },
    { rank: 5, name: 'SilverFox', lvl: 29, xp: '8,100', class: 'Rogue', avatar: '🦊' }
];

const Leaderboard = () => {
    return (
        <section id="leaderboard" className="leaderboard-section">
            <div className="container">
                <h2 className="section-title">World Ranking</h2>
                <div className="leaderboard-container glass">
                    <div className="leaderboard-header">
                        <span>Rank</span>
                        <span>Player</span>
                        <span>Class</span>
                        <span>Level</span>
                        <span className="hide-mobile">Total XP</span>
                    </div>
                    <div className="leaderboard-list">
                        {leaderboardData.map((player, i) => (
                            <div key={i} className={`leaderboard-row ${i < 3 ? `top-${i + 1}` : ''}`}>
                                <div className="player-rank">
                                    {i === 0 ? '👑' : i + 1}
                                </div>
                                <div className="player-info">
                                    <span className="player-avatar">{player.avatar}</span>
                                    <span className="player-name">{player.name}</span>
                                </div>
                                <div className="player-class">{player.class}</div>
                                <div className="player-level">LVL {player.lvl}</div>
                                <div className="player-xp hide-mobile">{player.xp} XP</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
