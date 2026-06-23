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
    1: "bg-[rgba(212,162,76,0.2)] dark:bg-[rgba(212,162,76,0.15)]",
    2: "bg-[rgba(212,162,76,0.4)] dark:bg-[rgba(212,162,76,0.3)]",
    3: "bg-[rgba(212,162,76,0.65)] dark:bg-[rgba(212,162,76,0.5)]",
    4: "bg-[rgba(212,162,76,0.9)] dark:bg-[rgba(212,162,76,0.75)]",
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <FiGithub className="text-text-tertiary text-sm" />
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
          GitHub Activity
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-0.5" style={{ minWidth: "max-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} contributions`}
                  className={`w-2.5 h-2.5 rounded-sm ${levelColors[day.level] ?? levelColors[0]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
