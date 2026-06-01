import { getPost, getAllPosts } from "@/lib/posts";
import Link from "next/link";

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

      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        ← Blog
      </Link>

      {/* Header */}
      <div className="mt-8">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-zinc-500">{post.summary}</p>
      </div>

      <div className="mt-8 border-t border-zinc-100" />

      {/* Content */}
      <div
        className="post-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

    </main>
  );
}
