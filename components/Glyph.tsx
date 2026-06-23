import { glyphData, type GlyphName } from "./glyphs";

interface GlyphProps {
  name: GlyphName;
  size?: number;
  className?: string;
}

export default function Glyph({ name, size = 24, className = "" }: GlyphProps) {
  const data = glyphData[name];
  if (!data) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={data.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {data.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
