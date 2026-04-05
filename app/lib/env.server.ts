import type { AppLoadContext } from "@remix-run/cloudflare";
import type { CloudflareEnv } from "../../load-context";

const defaultEnv = {
  AIPIPE_BASE_URL: "https://aipipe.org/openrouter/v1",
  AIPIPE_MODEL: "openai/gpt-4.1-nano-2025-04-14",
} satisfies Partial<CloudflareEnv>;

function getNodeProcessEnv(): Partial<CloudflareEnv> {
  if (typeof process === "undefined") {
    return {};
  }

  return {
    AIPIPE_TOKEN: process.env.AIPIPE_TOKEN,
    AIPIPE_BASE_URL: process.env.AIPIPE_BASE_URL,
    AIPIPE_MODEL: process.env.AIPIPE_MODEL,
    BOOKING_NOTIFICATION_EMAIL: process.env.BOOKING_NOTIFICATION_EMAIL,
    BOOKING_WEBHOOK_URL: process.env.BOOKING_WEBHOOK_URL,
    APP_URL: process.env.APP_URL,
  };
}

export function getRuntimeEnv(context?: AppLoadContext): CloudflareEnv {
  return {
    ...defaultEnv,
    ...getNodeProcessEnv(),
    ...(context?.cloudflare?.env ?? {}),
  };
}
