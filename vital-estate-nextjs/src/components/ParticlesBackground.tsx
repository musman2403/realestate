"use client";

import { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
    id: string;
    intensity?: "low" | "medium" | "high";
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseVx: number;
    baseVy: number;
    size: number;
    opacity: number;
}

export default function ParticlesBackground({ id, intensity = "medium" }: ParticlesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

    const particleCount = intensity === "low" ? 60 : intensity === "medium" ? 90 : 120;
    const linkDistance = 100;
    const mouseRadius = 150;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const parent = canvas.parentElement;

        const resizeCanvas = () => {
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (parent) {
                const rect = parent.getBoundingClientRect();
                mouseRef.current.x = e.clientX - rect.left;
                mouseRef.current.y = e.clientY - rect.top;
                mouseRef.current.active = true;
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        if (parent) {
            parent.addEventListener("mousemove", handleMouseMove);
            parent.addEventListener("mouseleave", handleMouseLeave);
        }

        // Initialize particles with random velocities
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            const vx = (Math.random() - 0.5) * 1.5;
            const vy = (Math.random() - 0.5) * 1.5;
            particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: vx,
                vy: vy,
                baseVx: vx,
                baseVy: vy,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.4 + 0.3,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (mouse.active) {
                    // Mouse attraction when cursor is active
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseRadius && distance > 0) {
                        const force = (mouseRadius - distance) / mouseRadius;
                        p.vx += (dx / distance) * force * 0.03;
                        p.vy += (dy / distance) * force * 0.03;
                    }
                    // Friction when mouse is active
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                } else {
                    // Return to base random movement when cursor is away
                    p.vx += (p.baseVx - p.vx) * 0.01;
                    p.vy += (p.baseVy - p.vy) * 0.01;
                }

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0) { p.x = 0; p.vx *= -1; p.baseVx *= -1; }
                if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; p.baseVx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; p.baseVy *= -1; }
                if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; p.baseVy *= -1; }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
                ctx.fill();

                // Draw lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < linkDistance) {
                        const opacity = (1 - distance / linkDistance) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(192, 192, 192, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Draw lines to mouse when active
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseRadius) {
                        const opacity = (1 - distance / mouseRadius) * 0.4;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(220, 220, 220, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (parent) {
                parent.removeEventListener("mousemove", handleMouseMove);
                parent.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [particleCount]);

    return (
        <canvas
            ref={canvasRef}
            id={id}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
