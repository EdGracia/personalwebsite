import FadeIn from "@/components/FadeIn";

export default function About() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">

      <FadeIn>
        <p className="text-sm text-emerald-500 dark:text-emerald-400">/* about */</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">About</h1>

        <p className="mt-6 max-w-xl leading-relaxed text-zinc-500 dark:text-zinc-400">
          I&apos;m a Software Engineering student at the University of Miami,
          originally from Houston, Texas. I care about building things at the
          lowest level possible — where performance is a craft, not an
          afterthought.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-zinc-500 dark:text-zinc-400">
          I speak English and Spanish natively, which has shaped how I think
          about communication in code as much as in conversation.
        </p>
      </FadeIn>

      <div className="mt-12 border-t border-zinc-100 dark:border-zinc-800" />

      <FadeIn>
        <div className="mt-10">
          <p className="text-sm text-emerald-500 dark:text-emerald-400">// currently</p>
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
                <span className="w-20 shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </span>
                <span className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

    </main>
  );
}
