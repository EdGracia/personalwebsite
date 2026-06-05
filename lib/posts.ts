import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${m}/${d}/${y}`;
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

// Returns metadata for all posts, sorted newest first
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        author: data.author,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Returns a single post with its rendered HTML content
export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    author: data.author,
    contentHtml,
  };
}
