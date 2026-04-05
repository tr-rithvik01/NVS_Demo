import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async (_args: ActionFunctionArgs) => {
  return Response.json(
    {
      error: "Cloudflare Pages deployment is read-only for CMS writes. Move this endpoint to a durable backend to enable editing.",
    },
    { status: 501 }
  );
};
