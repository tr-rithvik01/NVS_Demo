import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { z } from "zod";
import { ContactSchema } from "~/lib/api-schemas";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const data = ContactSchema.parse(await request.json());
    console.log("Contact form submission:", data);
    return Response.json({ message: "Success", data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
