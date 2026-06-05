import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm text-emerald-500 dark:text-emerald-400">/* blog */</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Blog</h1>
      <p className="mt-3 text-zinc-500 dark:text-zinc-400">
        Thoughts on systems, graphics, and building things.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 py-6 px-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-400"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {post.title}
              </span>
              <span className="shrink-0 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{formatDate(post.date)}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{post.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
