"use client";

import { useEffect, useState } from "react";

const lines = [
  "> initializing...",
  "> loading modules",
  "> systems: ok",
  "> graphics: ok",
  "> ed.gracia — ready",
];

export default function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [shownLines, setShownLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("booted")) return;
    sessionStorage.setItem("booted", "1");
    setVisible(true);

    // Reveal each line with a delay
    lines.forEach((_, i) => {
      setTimeout(() => setShownLines(i + 1), i * 500);
    });

    // Fade out after lines finish
    setTimeout(() => setFading(true), lines.length * 500 + 600);

    // Remove from DOM after fade
    setTimeout(() => setVisible(false), lines.length * 500 + 1100);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center px-8 bg-zinc-950"
      style={{
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
      }}
    >
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-2">
        {lines.slice(0, shownLines).map((line, i) => (
          <p
            key={i}
            className="text-sm text-zinc-400"
            style={{ animation: "fadeUp 0.2s ease forwards" }}
          >
            {line}
            {i === shownLines - 1 && !fading && (
              <span className="ml-1 inline-block w-2 h-4 bg-zinc-400 animate-pulse align-middle" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
