import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="video-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        className="video-modal-container"
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Glow Effect */}
                        <div className="modal-glow"></div>

                        {/* Close Button */}
                        <motion.button
                            className="modal-close-btn"
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Video Header */}
                        <motion.div
                            className="video-header"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="play-icon-wrapper">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <h2>Tráiler Oficial de MapHunter</h2>
                        </motion.div>

                        {/* Video Player */}
                        <motion.div
                            className="video-wrapper"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <video
                                controls
                                autoPlay
                                className="trailer-video"
                                poster="/hero.png"
                            >
                                <source src="/trailer.mp4" type="video/mp4" />
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="modal-particles">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="particle"
                                    style={{
                                        left: `${(i * 12) + 10}%`,
                                        top: `${Math.random() * 100}%`
                                    }}
                                    animate={{
                                        y: [-20, 20, -20],
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
