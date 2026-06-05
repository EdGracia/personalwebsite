"use client";

import { useState } from "react";
import Typewriter from "@/components/Typewriter";

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        <Typewriter text="Ed Gracia" showCursor={hovered} />
      </h1>
      <p className="max-w-xl text-lg leading-loose text-zinc-500 dark:text-zinc-400">
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
