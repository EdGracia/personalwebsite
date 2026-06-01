export default function About() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">

      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      {/* Bio */}
      <p className="mt-6 max-w-xl leading-relaxed text-zinc-500">
        I&apos;m a Software Engineering student at the University of Miami,
        originally from Houston, Texas. I care about building things at the
        lowest level possible — where performance is a craft, not an
        afterthought.
      </p>
      <p className="mt-4 max-w-xl leading-relaxed text-zinc-500">
        I speak English and Spanish natively, which has shaped how I think
        about communication in code as much as in conversation.
      </p>

      {/* Divider */}
      <div className="mt-12 border-t border-zinc-100" />

      {/* Currently */}
      <div className="mt-10">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Currently
        </p>
        <div className="mt-6 flex flex-col gap-6">
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
            <div key={item.label} className="flex gap-8">
              <span className="w-20 shrink-0 text-sm font-medium text-zinc-900">
                {item.label}
              </span>
              <span className="text-sm leading-relaxed text-zinc-500">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
