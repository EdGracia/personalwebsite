"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ENTRANCE_KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(-12px)" },
  { opacity: 1, transform: "translateY(3px)", offset: 0.6 },
  { opacity: 1, transform: "translateY(-1px)", offset: 0.8 },
  { opacity: 1, transform: "translateY(0)" },
];

const ENTRANCE_OPTIONS: KeyframeAnimationOptions = {
  duration: 500,
  easing: "ease-out",
  fill: "forwards",
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.getAnimations().forEach((a) => a.cancel());
    el.animate(ENTRANCE_KEYFRAMES, ENTRANCE_OPTIONS);
  }, [pathname]);

  return (
    <div ref={ref} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
