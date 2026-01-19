import React, { useState, useEffect } from 'react';
import './InteractiveSection.css';

const InteractiveSection = () => {
    const [proximity, setProximity] = useState(0); // 0 to 100
    const [status, setStatus] = useState('COLD');

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
        if (proximity < 25) setStatus('COLD');
        else if (proximity < 50) setStatus('WARM');
        else if (proximity < 75) setStatus('HOT');
        else setStatus('BURNING');
    }, [proximity]);

    const getStatusDisplay = (s) => {
        const icons = { COLD: '❄️', WARM: '🌡️', HOT: '🔥', BURNING: '🎯' };
        return `${s} ${icons[s] || ''}`;
    };

    return (
        <section className="interactive-section">
            <div className="container grid-2">
                <div className="interactive-text">
                    <h2>Feel the Heat</h2>
                    <p>
                        Our proximity-based tracking system turns your search into an intense experience.
                        The closer you get to the hidden treasure, the hotter your device becomes.
                    </p>
                    <div className="status-indicator">
                        Current Status: <span className={status.toLowerCase()}>{getStatusDisplay(status)}</span>
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
                        <div className="scanner-label">SIGNAL STRENGTH</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveSection;
