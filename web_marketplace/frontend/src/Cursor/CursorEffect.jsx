// src/CursorEffect.jsx
import React, { useEffect, useRef } from 'react';

const CursorEffect = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: undefined, y: undefined });
    let animationFrameId;

    const config = {
        color: '255, 90, 6', // RGB for #ff6b2b (neon orange)
        baseSize: 6, // Base size of a star
        spawnCount: 2, // Number of stars to spawn per move
        lifespan: 40, // How many frames a star lives
        shrinkSpeed: 0.15, // How fast they shrink
        gravity: 0.3, // Slight downward pull
    };

    class Particle {
        constructor(x, y) {
            // Add some randomness to spawn position
            this.x = x + (Math.random() - 0.5) * 40;
            this.y = y + (Math.random() - 0.5) * 40;

            // INCREASED MINIMUM SIZE: Ensures even the smallest generated stars are visible
            this.size = Math.random() * config.baseSize + 3;

            this.life = config.lifespan;
            this.opacity = 1;
            this.rotation = Math.random() * Math.PI * 2;
        }

        update() {
            this.life--;
            this.opacity = Math.max(0, this.life / config.lifespan);
            this.size = Math.max(0, this.size - config.shrinkSpeed);
            this.y += config.gravity;
            this.rotation += 0.05;
        }

        draw(ctx) {
            if (this.size <= 0 || this.opacity <= 0) return;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            ctx.beginPath();
            const spikes = 4;
            const outerRadius = this.size;
            const innerRadius = this.size / 2.5;
            let rot = (Math.PI / 2) * 3;
            let step = Math.PI / spikes;
            ctx.moveTo(0, 0 - outerRadius);
            for (let i = 0; i < spikes; i++) {
                let x = Math.cos(rot) * outerRadius;
                let y = Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                x = Math.cos(rot) * innerRadius;
                y = Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(0, 0 - outerRadius);
            ctx.closePath();
            ctx.fillStyle = `rgba(${config.color}, ${this.opacity})`;
            ctx.shadowColor = `rgb(${config.color})`;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.restore();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            for (let i = 0; i < config.spawnCount; i++) {
                particles.current.push(new Particle(mouse.current.x, mouse.current.y));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw(ctx);

                if (particles.current[i].life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default CursorEffect;