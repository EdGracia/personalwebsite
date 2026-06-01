import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-3 text-zinc-500">
        Thoughts on systems, graphics, and building things.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 py-6 px-4 rounded-2xl bg-white border border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
                {post.title}
              </span>
              <span className="shrink-0 text-xs font-bold text-zinc-400 uppercase tracking-widest">{post.date}</span>
            </div>
            <p className="text-sm text-zinc-500">{post.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
