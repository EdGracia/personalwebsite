"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionHeader({ number, title }: { number: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-10 flex items-center gap-4">
      <span
        className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-accent transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        {number}
      </span>
      <h2
        className="font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 delay-100"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        {title}
      </h2>
      <div
        className="h-px flex-1 bg-border-subtle origin-left transition-transform duration-700 delay-200"
        style={{
          transform: visible ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}
