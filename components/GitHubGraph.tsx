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
    1: "bg-accent-muted/40",
    2: "bg-accent-muted/70",
    3: "bg-accent/60",
    4: "bg-accent",
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
