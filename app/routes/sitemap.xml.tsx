import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getAllBlogPosts } from "~/lib/blog";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const posts = getAllBlogPosts();

  const baseUrl = new URL(request.url).origin;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about/vision-values</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about/our-team</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/technology</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <priority>0.7</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8",
    },
  });
};
