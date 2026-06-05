import { getPost, getAllPosts, formatDate } from "@/lib/posts";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">

      <Link href="/blog" className="text-sm text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
        ← Blog
      </Link>

      <div className="mt-8">
        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{formatDate(post.date)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{post.title}</h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">{post.summary}</p>
        {post.author && (
          <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
            authored by: <span className="text-emerald-500 dark:text-emerald-400">{post.author}</span>
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800" />

      <div
        className="post-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <CopyButton />

    </main>
  );
}
