import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">Blog</h1>
      <p className="mt-3 font-body text-text-secondary">
        Thoughts on systems, graphics, and building things.
      </p>

      <div className="mt-12 flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-4 border-b border-border-subtle py-5 transition-all duration-200 first:border-t hover:pl-2"
          >
            <div className="flex items-baseline gap-4">
              <span className="hidden sm:inline shrink-0 font-mono text-[11px] tracking-wide text-text-tertiary">
                {formatDate(post.date)}
              </span>
              <div>
                <span className="font-display text-base font-medium text-text-primary transition-colors duration-200 group-hover:text-accent">
                  {post.title}
                </span>
                <p className="mt-0.5 font-body text-sm text-text-secondary sm:hidden">
                  {formatDate(post.date)}
                </p>
                <p className="mt-0.5 font-body text-sm text-text-tertiary">{post.summary}</p>
              </div>
            </div>
            <FiArrowUpRight className="shrink-0 text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </main>
  );
}
