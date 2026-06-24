"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 10;
const PARTICLE_LIFE = 300;

interface Particle {
  x: number;
  y: number;
  born: number;
  size: number;
  angle: number;
}

export default function SpiceCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmit.current < 40) return;
      lastEmit.current = now;

      const navHeight = 60;
      if (e.clientY < navHeight) return;

      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        born: now,
        size: 1.5 + Math.random() * 1.5,
        angle: Math.random() * Math.PI,
      });

      if (particles.current.length > MAX_PARTICLES) {
        particles.current.shift();
      }
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      const now = performance.now();
      particles.current = particles.current.filter(
        (p) => now - p.born < PARTICLE_LIFE
      );

      ctx.lineWidth = 0.5;
      for (const p of particles.current) {
        const age = (now - p.born) / PARTICLE_LIFE;
        const alpha = (1 - age) * 0.8;
        const len = 6 * (1 - age * 0.5);
        const dx = Math.cos(p.angle) * len;
        const dy = Math.sin(p.angle) * len;
        ctx.beginPath();
        ctx.moveTo(p.x - dx * 0.5, p.y - dy * 0.5);
        ctx.lineTo(p.x + dx * 0.5, p.y + dy * 0.5);
        ctx.strokeStyle = `rgba(180, 120, 40, ${alpha})`;
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
    />
  );
}
