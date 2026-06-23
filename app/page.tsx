import { getAllPosts, formatDate } from "@/lib/posts";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    formattedDate: formatDate(post.date),
  }));

  return <HomeContent recentPosts={recentPosts} />;
}
