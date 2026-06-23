import RevealGroup from "@/components/RevealGroup";

export default function About() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <RevealGroup>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">About</h1>

        <p className="mt-8 max-w-2xl font-body leading-relaxed text-text-secondary">
          I&apos;m a Software Engineering student at the University of Miami,
          originally from Houston, Texas. I care about building things at the
          lowest level possible — where performance is a craft, not an
          afterthought.
        </p>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-text-secondary">
          I speak English and Spanish natively, which has shaped how I think
          about communication in code as much as in conversation.
        </p>
      </RevealGroup>

      <div className="mt-16 border-t border-border-subtle" />

      <RevealGroup className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary mb-6">Currently</h2>
        <div className="flex flex-col gap-5">
          {[
            {
              label: "Building",
              value: "A 3D game engine from scratch — the foundation for a game I'm designing.",
            },
            {
              label: "Studying",
              value: "B.S. Software Engineering, University of Miami",
            },
            {
              label: "Based in",
              value: "Miami, FL (from Houston, TX)",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-6">
              <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary pt-0.5">
                {item.label}
              </span>
              <span className="font-body text-sm leading-relaxed text-text-secondary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </RevealGroup>
    </main>
  );
}
