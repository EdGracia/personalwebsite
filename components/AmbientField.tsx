"use client";

import { useEffect, useRef } from "react";

export default function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouse.current = { x: touch.clientX, y: touch.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const SPACING = 48;
    const LENS_RADIUS = 140;
    const LENS_STRENGTH = 28;

    const displace = (x: number, y: number) => {
      const dx = x - mouse.current.x;
      const dy = y - mouse.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= LENS_RADIUS || d === 0) return { x, y };
      const t = 1 - d / LENS_RADIUS;
      const factor = LENS_STRENGTH * t * t;
      return {
        x: x + (dx / d) * factor,
        y: y + (dy / d) * factor,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      const isDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDark ? "rgba(200, 190, 170, 0.06)" : "rgba(180, 170, 155, 0.12)";

      for (let gx = 0; gx <= canvas.width + SPACING; gx += SPACING) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const p = displace(gx, y);
          y === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (let gy = 0; gy <= canvas.height + SPACING; gy += SPACING) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const p = displace(x, gy);
          x === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
