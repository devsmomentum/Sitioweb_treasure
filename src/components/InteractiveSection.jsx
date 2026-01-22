import React, { useState, useEffect } from 'react';
import './InteractiveSection.css';

const InteractiveSection = () => {
    const [proximity, setProximity] = useState(0); // 0 to 100
    const [status, setStatus] = useState('FRIO');

    useEffect(() => {
        const interval = setInterval(() => {
            setProximity(prev => {
                const next = prev + 1;
                if (next > 100) return 0;
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (proximity < 25) setStatus('FRIO');
        else if (proximity < 50) setStatus('TIBIO');
        else if (proximity < 75) setStatus('CALIENTE');
        else setStatus('QUEMANDO');
    }, [proximity]);

    const getStatusDisplay = (s) => {
        const icons = { FRIO: '❄️', TIBIO: '🌡️', CALIENTE: '🔥', QUEMANDO: '🎯' };
        return `${s} ${icons[s] || ''}`;
    };

    return (
        <section className="interactive-section">
            <div className="container grid-2">
                <div className="interactive-text">
                    <h2>Siente el Calor</h2>
                    <p>
                        Nuestro sistema de rastreo por proximidad convierte tu búsqueda en una experiencia intensa.
                        Cuanto más te acercas al tesoro oculto, más "caliente" se vuelve tu dispositivo.
                    </p>
                    <div className="status-indicator">
                        Estado Actual: <span className={status.toLowerCase()}>{getStatusDisplay(status)}</span>
                    </div>
                </div>
                <div className="interactive-visual">
                    <div className="scanner-mockup glass">
                        <div className="scanner-glow" style={{
                            opacity: proximity / 100,
                            transform: `scale(${0.5 + (proximity / 100)})`
                        }}></div>
                        <div className="scanner-center">
                            <div className="pulse"></div>
                            <span>{proximity}%</span>
                        </div>
                        <div className="scanner-label">POTENCIA DE SEÑAL</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveSection;
