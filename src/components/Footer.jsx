import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        TREASURE<span>HUNT</span>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Juego</h4>
                            <a href="#">El Mundo</a>
                            <a href="#">Personajes</a>
                            <a href="#">Objetos</a>
                        </div>
                        <div className="link-group">
                            <h4>Comunidad</h4>
                            <a href="#">Ranking</a>
                            <a href="#">Eventos</a>
                            <a href="#">Soporte</a>
                        </div>
                        <div className="link-group">
                            <h4>Legal</h4>
                            <a href="#">Términos de Servicio</a>
                            <a href="#">Privacidad</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Treasure Hunt RPG. Todos los derechos reservados.</p>
                    <div className="social-links">
                        <a href="#">TW</a>
                        <a href="#">IG</a>
                        <a href="#">YT</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
