import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization for background
    let animationFrameId;
    let isVisible = true;

    const stars = [];
    const shootingStars = [];
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 30 : 60; // Reduced count

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resizeCanvas();

    // Init stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        speed: 0.003 + Math.random() * 0.007, // Slower speed for smoother feeling
        increasing: Math.random() > 0.5
      });
    }

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Draw background explicitly (faster than clearRect for alpha:false)
      ctx.fillStyle = '#0a0a0b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // OPTIMIZATION: Draw stars in batches by size/color to reduce overhead
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Base star color
      
      stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle effect logic kept as is
        if (star.increasing) {
          star.opacity += star.speed;
          if (star.opacity >= 0.8) star.increasing = false;
        } else {
          star.opacity -= star.speed;
          if (star.opacity <= 0.1) star.increasing = true;
        }
      });
      
      ctx.globalAlpha = 1.0; // Reset for shooting stars

      // Randomized shooting stars
      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.4,
          length: Math.random() * 60 + 30,
          speed: Math.random() * 12 + 8,
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
        ss.opacity -= 0.025;

        if (ss.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
        pointerEvents: 'none'
      }}
    />
  );
};

export default Starfield;

