import Glyph from "./Glyph";

export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "In Progress";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
        isActive
          ? "bg-signal-bg text-signal"
          : "bg-bg-surface text-text-tertiary"
      }`}
    >
      {isActive ? (
        <span className="h-1.5 w-1.5 rounded-full bg-signal" style={{ animation: "subtlePulse 2s ease-in-out infinite" }} />
      ) : (
        <Glyph name="tools" size={10} />
      )}
      {status}
    </span>
  );
}
