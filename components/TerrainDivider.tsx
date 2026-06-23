"use client";

interface TerrainDividerProps {
  seed?: number;
  className?: string;
}

function generateWavePath(seed: number, width: number): string {
  const points: string[] = [];
  const amplitude = 6 + (seed % 5);
  const frequency = 0.008 + (seed % 3) * 0.002;
  const phaseShift = seed * 1.7;

  points.push(`M0 ${20 + amplitude}`);
  for (let x = 0; x <= width; x += 4) {
    const y =
      20 +
      Math.sin(x * frequency + phaseShift) * amplitude +
      Math.sin(x * frequency * 2.3 + phaseShift * 0.7) * (amplitude * 0.3);
    points.push(`L${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

export default function TerrainDivider({
  seed = 1,
  className = "",
}: TerrainDividerProps) {
  const width = 1200;
  const path = generateWavePath(seed, width);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="absolute -top-2 left-0 right-0 h-2 pointer-events-none"
        style={{ animation: "heatShimmer 4s ease-in-out infinite" }}
      />
      <svg
        viewBox={`0 0 ${width} 40`}
        preserveAspectRatio="none"
        className="w-full h-6 text-border-subtle"
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
