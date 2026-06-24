"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
interface SectionHeaderProps {
  title: string;
  number?: string;
  sectionId?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SectionHeader({ title, sectionId }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    () => () => {},
    prefersReducedMotion,
    () => false
  );
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  useEffect(() => {
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  const show = reducedMotion || visible;

  return (
    <div ref={ref} className="group mb-10 flex items-center gap-4">
      <h2
        className="relative font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 delay-100"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        {title}
        <span
          className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 ease-out group-hover:w-full ${inView ? "w-full" : "w-0"}`}
        />
      </h2>
      <div
        className="h-px flex-1 bg-border-subtle origin-left transition-transform duration-700 delay-200"
        style={{
          transform: show ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}
