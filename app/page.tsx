import { getAllPosts, formatDate } from "@/lib/posts";
import HomeContent from "@/components/HomeContent";
import GitHubGraph from "@/components/GitHubGraph";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ed Gracia",
  url: "https://edgracia.dev",
  jobTitle: "Software Engineering Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Miami",
  },
  knowsAbout: [
    "Software Engineering",
    "Systems Programming",
    "C++",
    "Graphics",
    "React",
    "TypeScript",
    "Next.js",
  ],
};

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    formattedDate: formatDate(post.date),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent recentPosts={recentPosts} githubGraph={<GitHubGraph />} />
    </>
  );
}
