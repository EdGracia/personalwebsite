import { FiCheck } from "react-icons/fi";
import Glyph from "./Glyph";

const ACTIVE_STATUSES = ["In Progress", "En progreso"];
const COMPLETE_STATUSES = ["Complete", "Completo"];

export default function StatusBadge({ status }: { status: string }) {
  const isActive = ACTIVE_STATUSES.includes(status);
  const isComplete = COMPLETE_STATUSES.includes(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
        isActive
          ? "bg-signal-bg text-signal"
          : isComplete
            ? "bg-status-success-bg text-status-success"
            : "bg-status-danger-bg text-status-danger"
      }`}
    >
      {isActive ? (
        <span className="h-1.5 w-1.5 rounded-full bg-signal" style={{ animation: "subtlePulse 2s ease-in-out infinite" }} />
      ) : isComplete ? (
        <FiCheck style={{ fontSize: 10 }} />
      ) : (
        <Glyph name="tools" size={10} />
      )}
      {status}
    </span>
  );
}
