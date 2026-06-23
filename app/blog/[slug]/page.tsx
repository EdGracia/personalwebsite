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
    <main className="mx-auto w-full max-w-3xl px-6 py-24">

      <Link href="/blog" className="font-display text-sm text-text-tertiary transition-colors hover:text-accent">
        ← Writing
      </Link>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">{formatDate(post.date)}</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-text-primary">{post.title}</h1>
        <p className="mt-3 font-body text-text-secondary">{post.summary}</p>
        {post.author && (
          <p className="mt-2 font-mono text-[11px] text-text-tertiary">
            by <span className="text-accent">{post.author}</span>
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-border-subtle" />

      <div
        className="post-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <CopyButton />

    </main>
  );
}
