"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ text, delay = 0, speed = 80 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-zinc-900">&nbsp;</span>
      )}
    </span>
  );
}
