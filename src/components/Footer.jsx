import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo" data-text="MapHunter">
                        MapHunter
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
                    <div className="copyright-info">
                        <p>&copy; 2026 MapHunter. Todos los derechos reservados.</p>
                        <p>Desarrollado por JD and Morna.tech</p>
                    </div>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                        <a href="#" aria-label="WhatsApp" className="whatsapp"><MessageCircle size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
