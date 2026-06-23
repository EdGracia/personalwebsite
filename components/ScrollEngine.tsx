"use client";

import { useEffect } from "react";

const LIGHT_STOPS = [
  [244, 237, 228],  // #f4ede4 — morning parchment
  [250, 246, 240],  // #faf6f0 — high-noon sand
  [237, 224, 208],  // #ede0d0 — amber dusk
] as const;

const DARK_STOPS = [
  [10, 10, 18],   // #0a0a12 — pre-dawn blue
  [15, 16, 24],   // #0f1018 — midnight warm
  [18, 16, 10],   // #12100a — desert sunset
] as const;

function lerpColor(
  stops: readonly (readonly [number, number, number])[],
  t: number,
): string {
  const segment = t < 0.5 ? 0 : 1;
  const localT = segment === 0 ? t * 2 : (t - 0.5) * 2;
  const from = stops[segment];
  const to = stops[segment + 1];
  const r = Math.round(from[0] + (to[0] - from[0]) * localT);
  const g = Math.round(from[1] + (to[1] - from[1]) * localT);
  const b = Math.round(from[2] + (to[2] - from[2]) * localT);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ScrollEngine() {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = document.documentElement;
      root.style.setProperty("--scroll-progress", String(progress));

      const farOffset = reducedMotion ? 0 : scrollY * 0.2;
      const midOffset = reducedMotion ? 0 : scrollY * 0.5;
      root.style.setProperty("--scroll-far", `${farOffset}px`);
      root.style.setProperty("--scroll-mid", `${midOffset}px`);

      const isDark = root.classList.contains("dark");
      const stops = isDark ? DARK_STOPS : LIGHT_STOPS;
      root.style.setProperty("--bg-deep", lerpColor(stops, progress));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
