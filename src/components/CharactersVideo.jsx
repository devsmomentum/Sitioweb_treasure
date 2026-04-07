import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './CharactersVideo.css';

const CharactersVideo = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    // Rockstar Parallax
    const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.3]);
    const bgY = useTransform(smoothScroll, [0, 1], ["0%", "5%"]);
    const contentY = useTransform(smoothScroll, [0, 1], [100, -100]);
    const contentOpacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section className="characters-video-section" ref={containerRef}>
            {/* Background Parallax Layer */}
            <motion.div 
                className="characters-full-bg"
                style={{ 
                    backgroundImage: "url('/personajes_equipo.jpg')",
                    scale: bgScale,
                    y: bgY,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 85%', 
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1
                }}
            />

            {/* Cinematic Overlay */}
            <div className="characters-video-vignette"></div>

            {/* Parallax Content */}
            <motion.div 
                className="characters-video-content"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div>
                    <div className="characters-video-label">ELENCO DE HÉROES</div>
                    <h2 className="characters-video-title">PERSONAJES <span>LEGENDARIOS</span></h2>
                    <p className="characters-video-desc">
                        Cada cazador tiene habilidades únicas. Prepárate para la aventura con el mejor equipo.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default CharactersVideo;
