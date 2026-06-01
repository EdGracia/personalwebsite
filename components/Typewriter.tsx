"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ text, delay = 0, speed = 80, showCursor = true }: { text: string; delay?: number; speed?: number; showCursor?: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      <span className="ml-1 inline-block w-2.5 h-[1em] bg-zinc-900 align-middle" style={{ animation: "blink 1.5s steps(1) infinite" }} />
    </span>
  );
}
