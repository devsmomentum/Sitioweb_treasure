import React from 'react';
import './ShopSection.css';

const powerUps = [
    { name: 'Freeze Crystal', desc: 'Stop your rivals in their tracks.', icon: '❄️' },
    { name: 'Golden Shield', desc: 'Protect your progress from attacks.', icon: '🛡️' },
    { name: 'Time Warp', desc: 'Earn extra time for difficult clues.', icon: '⏱️' },
    { name: 'X-Ray Vision', desc: 'See where the hidden items are.', icon: '💡' }
];

const ShopSection = () => {
    return (
        <section id="shop" className="shop-section">
            <div className="container">
                <div className="shop-header">
                    <h2 className="section-title">La Tiendita</h2>
                    <p>Equip yourself with powerful items to dominate the hunt.</p>
                </div>

                <div className="shop-layout">
                    <div className="npc-container glass">
                        <div className="npc-avatar">🧙‍♂️</div>
                        <div className="npc-speech">
                            "Choose wisely, traveler. These relics will determine your fate."
                        </div>
                    </div>

                    <div className="items-grid">
                        {powerUps.map((p, i) => (
                            <div key={i} className="shop-item glass">
                                <div className="item-icon">{p.icon}</div>
                                <div className="item-info">
                                    <h4>{p.name}</h4>
                                    <p>{p.desc}</p>
                                </div>
                                <div className="item-price">50 💰</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopSection;
