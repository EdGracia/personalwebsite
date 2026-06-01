"use client";

import { useState, useRef } from "react";
import Typewriter from "@/components/Typewriter";

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const triggerGlitch = () => {
    setGlitching(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setGlitching(true));
    });
    setTimeout(() => setGlitching(false), 500);
  };

  return (
    <div
      className="flex flex-col gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1
        ref={h1Ref}
        className={`text-5xl font-bold tracking-tight text-zinc-900 cursor-default ${glitching ? "glitch-active" : ""}`}
        onMouseEnter={triggerGlitch}
      >
        <Typewriter text="Ed Gracia" showCursor={hovered} />
      </h1>
      <p className="max-w-xl text-xl leading-relaxed text-zinc-500">
        <Typewriter
          text="A student passionate about all things software who dives deep into low level systems, computer graphics, and game engine architecture."
          delay={800}
          speed={30}
          showCursor={hovered}
        />
      </p>
    </div>
  );
}
