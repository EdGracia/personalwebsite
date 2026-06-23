const education = [
  {
    degree: "B.S. Software Engineering",
    school: "University of Miami",
    date: "Expected May 2028",
    notes: ["Canes Achievement Award — $12,000/year merit scholarship"],
  },
];

const experience = [
  {
    title: "Summer Engineering Intern",
    org: "Ensel Technologies LLC",
    date: "May 2024 – July 2025",
    bullets: [
      "Assisted engineers in monitoring and maintaining factory production systems and machinery operations.",
    ],
  },
  {
    title: "President & Lead Analyst",
    org: "Loomis Chaffee ESG Investment Fund",
    date: "Sept 2022 – May 2023",
    bullets: [
      "Led a team of student researchers analyzing equities for a $150,000 investment portfolio.",
      "Presented investment recommendations to the board of trustees alongside the CFO.",
    ],
  },
];

const projects = [
  {
    title: "3D Game Engine",
    tech: "C++, raylib",
    bullets: [
      "Building a custom 3D engine from scratch as the foundation for an original game.",
      "Handles rendering, scene management, and core engine architecture.",
    ],
  },
  {
    title: "2D Platformer",
    tech: "C++, raylib",
    bullets: [
      "Built a custom 2D platformer with hand-rolled collision detection, camera systems, enemy AI, and player movement.",
      "Structured with OOP principles, header files, and Makefiles. Version controlled with Git.",
    ],
  },
];

const skills = {
  Languages: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
  Tools: ["Git", "GitHub", "Makefiles", "raylib", "React", "Next.js"],
};

const coursework = [
  "ECE 218: Data Structures (C++)",
  "ECE 118: Introduction to Programming (C++)",
  "ENG 123: Computing and Digital Solutions (Python)",
];

const awards = [
  {
    title: "Canes Achievement Award",
    org: "University of Miami",
    date: "June 2024",
    detail: "$12,000/year for four years. Maintained 3.0 GPA with full-time course load.",
  },
  {
    title: "Barry M. Moran Mathematics Award",
    org: "The Loomis Chaffee School",
    date: "May 2024",
    detail: "Top of class in Mathematics for the 2023–2024 school year.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-accent whitespace-nowrap">
        {children}
      </p>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}

export default function Resume() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">Eduardo Gracia Panini</h1>
          <p className="mt-1 font-body text-text-secondary">Software Engineering Student</p>
        </div>
        <div className="text-right font-mono text-[11px] text-text-tertiary">
          <p>Exg2332@miami.edu</p>
          <p>832-533-6990</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">

        <section>
          <SectionHeading>Education</SectionHeading>
          {education.map((e) => (
            <div key={e.degree} className="flex justify-between gap-4">
              <div>
                <p className="font-display font-medium text-text-primary">{e.degree}</p>
                <p className="font-body text-sm text-text-secondary">{e.school}</p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-1 font-body text-sm text-text-tertiary">{n}</p>
                ))}
              </div>
              <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{e.date}</p>
            </div>
          ))}
        </section>

        <section>
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {experience.map((e) => (
              <div key={e.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display font-medium text-text-primary">{e.title}</p>
                  <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{e.date}</p>
                </div>
                <p className="font-body text-sm text-text-secondary">{e.org}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {e.bullets.map((b) => (
                    <li key={b} className="font-body text-sm text-text-secondary pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Projects</SectionHeading>
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <div key={p.title}>
                <div className="flex items-baseline gap-2">
                  <p className="font-display font-medium text-text-primary">{p.title}</p>
                  <p className="font-mono text-[11px] text-text-tertiary">{p.tech}</p>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="font-body text-sm text-text-secondary pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Skills</SectionHeading>
          <div className="flex flex-col gap-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-8">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">{category}</span>
                <span className="font-body text-sm text-text-secondary">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Coursework</SectionHeading>
          <div className="flex flex-col gap-1">
            {coursework.map((c) => (
              <p key={c} className="font-body text-sm text-text-secondary">{c}</p>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Awards</SectionHeading>
          <div className="flex flex-col gap-4">
            {awards.map((a) => (
              <div key={a.title} className="flex justify-between gap-4">
                <div>
                  <p className="font-display font-medium text-text-primary">{a.title}</p>
                  <p className="font-body text-sm text-text-secondary">{a.org}</p>
                  <p className="mt-1 font-body text-sm text-text-tertiary">{a.detail}</p>
                </div>
                <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{a.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
