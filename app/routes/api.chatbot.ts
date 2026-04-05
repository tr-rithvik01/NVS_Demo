import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { z } from "zod";
import { ChatbotSchema } from "~/lib/api-schemas";
import { getChatbotReply } from "~/lib/chatbot.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  try {
    const payload = ChatbotSchema.parse(await request.json());
    const reply = await getChatbotReply(context, payload.message, payload.history);
    return Response.json({ reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 });
    }

    return Response.json(
      {
        reply:
          "I can help with NVS services, fleet options, school bus safety, corporate transport, or cab rentals. Please try asking again.",
      },
      { status: 500 }
    );
  }
};
