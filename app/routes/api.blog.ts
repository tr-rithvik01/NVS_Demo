import { getAllBlogPosts } from "~/lib/blog";

export const loader = async () => {
  return Response.json(getAllBlogPosts());
};
