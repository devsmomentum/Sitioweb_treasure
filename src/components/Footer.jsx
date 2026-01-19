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
                            <h4>Game</h4>
                            <a href="#">The World</a>
                            <a href="#">Characters</a>
                            <a href="#">Power Items</a>
                        </div>
                        <div className="link-group">
                            <h4>Community</h4>
                            <a href="#">Leaderboard</a>
                            <a href="#">Events</a>
                            <a href="#">Support</a>
                        </div>
                        <div className="link-group">
                            <h4>Legal</h4>
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Treasure Hunt RPG. All Rights Reserved.</p>
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
