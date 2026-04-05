import { blogPosts } from "~/data/blog-posts";

export function getAllBlogPosts() {
  return [...blogPosts].sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
