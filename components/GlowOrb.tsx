"use client";

import { useEffect, useRef } from "react";

export default function GlowOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp toward target — lower = lazier
      current.current.x += (pos.current.x - current.current.x) * 0.05;
      current.current.y += (pos.current.y - current.current.y) * 0.05;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(120,120,140,0.35) 0%, transparent 65%)",
      }}
    />
  );
}
