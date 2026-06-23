"use client";

function generateDuneContour(
  width: number,
  yCenter: number,
  seed: number,
): string {
  const points: string[] = [];
  const amplitude = 15 + (seed % 10);
  const freq = 0.003 + (seed % 5) * 0.001;
  const phase = seed * 2.1;

  points.push(`M0 ${yCenter}`);
  for (let x = 0; x <= width; x += 6) {
    const y =
      yCenter +
      Math.sin(x * freq + phase) * amplitude +
      Math.sin(x * freq * 1.7 + phase * 0.5) * (amplitude * 0.4);
    points.push(`L${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

export default function ParallaxLayer() {
  const width = 2000;
  const height = 4000;
  const contours = [
    { yCenter: 600, seed: 1 },
    { yCenter: 1400, seed: 7 },
    { yCenter: 2200, seed: 13 },
    { yCenter: 3200, seed: 19 },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        transform: "translateY(calc(var(--scroll-far, 0px) * -1))",
        willChange: "transform",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-[400vh] opacity-[0.04] text-text-tertiary"
        aria-hidden="true"
      >
        {contours.map(({ yCenter, seed }) => (
          <path
            key={seed}
            d={generateDuneContour(width, yCenter, seed)}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
}
