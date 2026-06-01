import { FiGithub } from "react-icons/fi";

type Week = { contributionDays: { contributionCount: number; date: string }[] };

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
    0: "bg-zinc-100 dark:bg-zinc-800",
    1: "bg-emerald-200 dark:bg-emerald-900",
    2: "bg-emerald-300 dark:bg-emerald-700",
    3: "bg-emerald-400 dark:bg-emerald-500",
    4: "bg-emerald-500 dark:bg-emerald-400",
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <FiGithub className="text-zinc-400 dark:text-zinc-500 text-sm" />
        <p className="text-sm text-zinc-400 dark:text-zinc-500">// github activity</p>
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
