"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 300;
const BASE_WIND_X = 0.3;
const BASE_WIND_Y = 0.08;
const MOUSE_RADIUS = 200;
const FRICTION = 0.97;

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number;
}

function createGrains(w: number, h: number): Grain[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const layer = Math.random();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      size: layer < 0.33 ? 1 : layer < 0.66 ? 1.5 : 2.5,
      opacity: layer < 0.33 ? 0.2 : layer < 0.66 ? 0.35 : 0.55,
      layer,
    };
  });
}

export default function SandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grains = useRef<Grain[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });
  const raf = useRef(0);
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      dims.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (grains.current.length === 0) {
        grains.current = createGrains(rect.width, rect.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = t.clientX - rect.left;
      m.y = t.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mSpeed = Math.sqrt(
        (mx - mouse.current.prevX) ** 2 + (my - mouse.current.prevY) ** 2
      );
      const pushStrength = Math.min(mSpeed * 0.15, 8);

      for (const g of grains.current) {
        const layerMult = 0.3 + g.layer * 0.7;

        g.vx += BASE_WIND_X * layerMult * 0.1;
        g.vy += BASE_WIND_Y * layerMult * 0.1;

        const dx = g.x - mx;
        const dy = g.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * pushStrength * layerMult;
          g.vx += (dx / dist) * force;
          g.vy += (dy / dist) * force;
        }

        g.vx *= FRICTION;
        g.vy *= FRICTION;
        g.x += g.vx;
        g.y += g.vy;

        if (g.x > w + 10) { g.x = -10; g.vy = 0; }
        if (g.x < -10) { g.x = w + 10; g.vy = 0; }
        if (g.y > h + 10) { g.y = -10; g.vx = 0; }
        if (g.y < -10) { g.y = h + 10; g.vx = 0; }
      }

      const sandColor = isDark ? "210, 190, 160" : "160, 140, 110";

      ctx.beginPath();
      for (const g of grains.current) {
        ctx.moveTo(g.x + g.size, g.y);
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
      }
      ctx.fillStyle = isDark
        ? `rgba(${sandColor}, 0.35)`
        : `rgba(${sandColor}, 0.4)`;
      ctx.fill();

      const brightGrains = grains.current.filter(g => g.layer > 0.66);
      if (brightGrains.length > 0) {
        ctx.beginPath();
        for (const g of brightGrains) {
          ctx.moveTo(g.x + g.size * 0.6, g.y);
          ctx.arc(g.x, g.y, g.size * 0.6, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark
          ? "rgba(212, 162, 76, 0.2)"
          : "rgba(26, 111, 181, 0.15)";
        ctx.fill();
      }

      mouse.current.prevX = mx;
      mouse.current.prevY = my;

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
