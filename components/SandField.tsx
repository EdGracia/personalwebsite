"use client";

import { useEffect, useRef } from "react";

const DESKTOP_COUNT = 400;
const MOBILE_COUNT = 200;
const SPICE_RATIO = 0.15;
const BASE_WIND_X = 0.3;
const BASE_WIND_Y = 0.08;
const FRICTION = 0.97;

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number;
  isSpice: boolean;
}

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function createGrains(w: number, h: number): Grain[] {
  const count = isMobile() ? MOBILE_COUNT : DESKTOP_COUNT;
  return Array.from({ length: count }, () => {
    const layer = Math.random();
    const isSpice = Math.random() < SPICE_RATIO;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      size: isSpice ? 1 : layer < 0.33 ? 0.6 : layer < 0.66 ? 1 : 1.5,
      opacity: isSpice ? 0.4 : layer < 0.33 ? 0.12 : layer < 0.66 ? 0.2 : 0.35,
      layer,
      isSpice,
    };
  });
}

export default function SandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grains = useRef<Grain[]>([]);
  const raf = useRef(0);
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dims.current = { w: window.innerWidth, h: window.innerHeight };
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (grains.current.length === 0) {
        grains.current = createGrains(window.innerWidth, window.innerHeight);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const progress = parseFloat(
        document.documentElement.style.getPropertyValue("--scroll-progress") || "0"
      );

      const densityMultiplier = 1.0 - progress * 0.6;

      const spiceIntensity =
        progress < 0.2 ? 0.2 :
        progress < 0.4 ? 0.5 + (progress - 0.2) * 2.5 :
        progress < 0.6 ? 1.0 :
        progress < 0.8 ? 1.0 - (progress - 0.6) * 2.5 :
        0.2;

      for (const g of grains.current) {
        const layerMult = 0.3 + g.layer * 0.7;
        const windMult = g.isSpice ? 0.6 : 1;

        g.vx += BASE_WIND_X * layerMult * 0.1 * windMult;
        g.vy += BASE_WIND_Y * layerMult * 0.1 * windMult;

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
      const sandAlpha = (isDark ? 0.25 : 0.3) * densityMultiplier;
      const sandGrains = grains.current.filter((g) => !g.isSpice);
      ctx.beginPath();
      for (const g of sandGrains) {
        ctx.moveTo(g.x + g.size, g.y);
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(${sandColor}, ${sandAlpha})`;
      ctx.fill();

      const spiceGrains = grains.current.filter((g) => g.isSpice);
      if (spiceGrains.length > 0) {
        ctx.beginPath();
        for (const g of spiceGrains) {
          ctx.moveTo(g.x + g.size, g.y);
          ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark
          ? `rgba(212, 162, 76, ${0.2 * spiceIntensity})`
          : `rgba(180, 120, 40, ${0.15 * spiceIntensity})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ touchAction: "none" }}
    />
  );
}
