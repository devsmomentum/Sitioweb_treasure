import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clover } from 'lucide-react';
import './PlansSection.css';

const PlansSection = () => {
    const levels = [
        { title: "Plan Trébol", subtitle: "Bronce", color: "#CD7F32" },
        { title: "Plan Trébol", subtitle: "Plata", color: "#C0C0C0" },
        { title: "Plan Trébol", subtitle: "Oro", color: "#FFD700" }
    ];

    const benefits = [
        { name: "Página Web", levels: [true, true, true] },
        { name: "Instagram MapHunter", levels: [true, true, true] },
        { name: "Instagram JD", levels: [false, true, true] },
        { name: "Instagram Naza", levels: [false, true, true] },
        { name: "Instagram Narbis", levels: [false, false, true] },
        { name: "Poderes con respecto al patrocinante", levels: [false, false, true] },
        { name: "Tiempo de espera (antes de competencia)", levels: [false, true, true] },
        { name: "Banner patrocinante / Poderes (congelar/tiempo)", levels: [true, true, true] },
        { name: "Parte de espectadores publicidad", levels: [true, true, true] },
        { name: "Uniforme de las chicas (eventos)", levels: [false, false, true] },
        { name: "Stand de publicidad", levels: [false, false, true] },
        { name: "Promotora de publicidad", levels: [false, false, true] },
        { name: "Ads en espectadores (ver publicidad por algo)", levels: [true, false, true] },
        { name: "Ads en los users (videos)", levels: [false, true, true] },
        { name: "Banner publicitario (patrocinado por)", levels: [false, true, true] },
        { name: "Elementos en el puzzle (del patrocinador)", levels: [false, false, true] },
        { name: "Encuestas", levels: [false, true, true] },
        { name: "Notificaciones Push", levels: [false, false, true] },
        { name: "Emails", levels: [false, true, true] }
    ];

    return (
        <section className="plans-section" id="planes">
            <div className="container">
                <motion.div
                    className="plans-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Elige tu <span>Aliado</span></h2>
                    <p>Desbloquea niveles superiores de interacción y visibilidad en MapHunter.</p>
                </motion.div>

                <motion.div
                    className="matrix-container glass"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="matrix-wrapper">
                        <table className="benefit-matrix">
                            <thead>
                                <tr>
                                    <th>Activo / Beneficio</th>
                                    {levels.map((level, i) => (
                                        <th key={i} className={`level-header level-${i + 1}`}>
                                            <div className="level-label">{level.title}</div>
                                            <div className="level-subtitle" style={{ color: level.color }}>
                                                <Clover size={16} fill={level.color} style={{ marginRight: '6px' }} />
                                                {level.subtitle}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {benefits.map((benefit, i) => (
                                    <tr key={i}>
                                        <td className="benefit-name">{benefit.name}</td>
                                        {benefit.levels.map((included, j) => (
                                            <td key={j} className="benefit-status">
                                                {included ? (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        transition={{ delay: 0.1 + (j * 0.1) }}
                                                    >
                                                        <Check className="icon-check" size={20} />
                                                    </motion.div>
                                                ) : (
                                                    <span className="empty-status">—</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>


            </div>
        </section>
    );
};

export default PlansSection;
