import Link from "next/link";
import { FiGithub } from "react-icons/fi";

async function getContributions() {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/EdGracia?y=last",
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.contributions as { date: string; count: number; level: number }[];
  } catch {
    return [];
  }
}

export default async function GitHubGraph() {
  const contributions = await getContributions();
  const weeks: { date: string; count: number; level: number }[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const levelColors: Record<number, string> = {
    0: "bg-bg-surface",
    1: "bg-[rgba(212,162,76,0.2)]",
    2: "bg-[rgba(212,162,76,0.4)]",
    3: "bg-[rgba(212,162,76,0.65)]",
    4: "bg-[rgba(212,162,76,0.9)]",
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-3">
        <Link
          href="https://github.com/EdGracia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-text-tertiary transition-all duration-200 hover:text-accent hover:scale-125"
        >
          <FiGithub className="text-base" />
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
          GitHub Activity
        </p>
      </div>
      <div className="flex gap-px">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-px">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} contributions`}
                className={`w-[9px] h-[9px] rounded-[1px] ${levelColors[day.level] ?? levelColors[0]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
