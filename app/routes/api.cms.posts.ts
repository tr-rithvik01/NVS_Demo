import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getAllBlogPosts } from "~/lib/blog";

export const loader = async () => {
  return Response.json(getAllBlogPosts());
};

export const action = async (_args: ActionFunctionArgs) => {
  return Response.json(
    {
      error: "Cloudflare Pages deployment is read-only for CMS writes. Move this endpoint to a durable backend to enable editing.",
    },
    { status: 501 }
  );
};
