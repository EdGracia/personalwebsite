"use client";

import { useEffect } from "react";

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
