import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/posts";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing by Ed Gracia on software engineering, systems programming, and web development.",
  openGraph: {
    title: "Blog — Ed Gracia",
    description:
      "Technical writing on software engineering, systems programming, and web development.",
    url: "https://edgracia.dev/blog",
  },
};

export default function Blog() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    formattedDate: formatDate(post.date),
    summary: post.summary,
  }));

  return <BlogContent posts={posts} />;
}
