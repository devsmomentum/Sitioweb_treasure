import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const stars = [];
    const shootingStars = [];
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 40 : 80;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Init stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        increasing: Math.random() > 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Twinkle effect
        if (star.increasing) {
          star.opacity += star.speed;
          if (star.opacity >= 0.8) star.increasing = false;
        } else {
          star.opacity -= star.speed;
          if (star.opacity <= 0.1) star.increasing = true;
        }
      });

      // Random chance for shooting star
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.5,
          y: Math.random() * canvas.height * 0.3,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 15 + 10,
          opacity: 1
        });
      }

      // Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ctx.beginPath();
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x + ss.length, ss.y + (ss.length * 0.5));
        grad.addColorStop(0, `rgba(255, 215, 0, ${ss.opacity})`);
        grad.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x + ss.length, ss.y + (ss.length * 0.5));
        ctx.stroke();

        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.opacity -= 0.02;

        if (ss.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="starfield"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
};

export default Starfield;
