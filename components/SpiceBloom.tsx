"use client";

import { useRef, useCallback, type ReactNode } from "react";

const PARTICLE_COUNT = 18;
const PARTICLE_LIFE = 600;

interface BloomParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  size: number;
}

export default function SpiceBloom({ children, className = "" }: { children: ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<BloomParticle[]>([]);
  const raf = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);
    const now = performance.now();
    const isDark = document.documentElement.classList.contains("dark");

    particles.current = particles.current.filter((p) => now - p.born < PARTICLE_LIFE);

    for (const p of particles.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      const age = (now - p.born) / PARTICLE_LIFE;
      const alpha = (1 - age) * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - age * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(212, 162, 76, ${alpha})`
        : `rgba(180, 120, 40, ${alpha})`;
      ctx.fill();
    }

    if (particles.current.length > 0) {
      raf.current = requestAnimationFrame(draw);
    }
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
        const speed = 1 + Math.random() * 3;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          born: now,
          size: 1 + Math.random() * 2,
        });
      }

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(draw);
    },
    [draw]
  );

  return (
    <div className={`relative ${className}`} onMouseEnter={handleMouseEnter}>
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
        aria-hidden="true"
      />
    </div>
  );
}
