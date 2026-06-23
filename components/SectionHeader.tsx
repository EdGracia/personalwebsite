"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "./Glyph";
import type { GlyphName } from "./glyphs";

interface SectionHeaderProps {
  glyph: GlyphName;
  title: string;
  number?: string;
}

export default function SectionHeader({ glyph, title, number }: SectionHeaderProps) {
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
    <div ref={ref} className="group mb-10 flex items-center gap-4">
      <span
        className="text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:rotate-[15deg]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? undefined : "translateX(-8px)",
          transition: "opacity 0.5s, transform 0.5s, color 0.2s",
        }}
      >
        <Glyph name={glyph} size={20} />
      </span>
      <h2
        className="relative font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 delay-100"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        {title}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
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
