import React from 'react';
import './ShopSection.css';

const powerUps = [
    { name: 'Cristal Curativo', desc: 'Detén a tus rivales en seco.', icon: '❄️' },
    { name: 'Escudo Dorado', desc: 'Protege tu progreso de los ataques.', icon: '🛡️' },
    { name: 'Salto Temporal', desc: 'Gana tiempo extra para pistas difíciles.', icon: '⏱️' },
    { name: 'Visión Rayos-X', desc: 'Mira dónde están los objetos ocultos.', icon: '💡' }
];

const ShopSection = () => {
    return (
        <section id="shop" className="shop-section">
            <div className="container">
                <div className="shop-header">
                    <h2 className="section-title">La Tiendita</h2>
                    <p>Equípate con objetos poderosos para dominar la búsqueda.</p>
                </div>

                <div className="shop-layout">
                    <div className="npc-container glass">
                        <div className="npc-avatar">🧙‍♂️</div>
                        <div className="npc-speech">
                            "Elige sabiamente, viajero. Estas reliquias determinarán tu destino."
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
