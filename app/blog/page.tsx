import { getAllPosts, formatDate } from "@/lib/posts";
import BlogContent from "@/components/BlogContent";

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
