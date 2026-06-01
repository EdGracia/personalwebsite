import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
        Page not found
      </h1>
      <p className="mt-4 text-zinc-500">
        Looks like this page doesn&apos;t exist — or got lost somewhere in the stack.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Back home
      </Link>
    </main>
  );
}
