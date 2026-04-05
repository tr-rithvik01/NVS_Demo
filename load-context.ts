import type { AppLoadContext } from "@remix-run/cloudflare";

export type CloudflareEnv = {
  AIPIPE_BASE_URL?: string;
  AIPIPE_MODEL?: string;
  AIPIPE_TOKEN?: string;
  APP_URL?: string;
  BOOKING_NOTIFICATION_EMAIL?: string;
  BOOKING_WEBHOOK_URL?: string;
};

type CloudflareContext = {
  env: CloudflareEnv;
  [key: string]: unknown;
};

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: CloudflareContext & Record<string, unknown>;
  }
}

export function getLoadContext({
  context,
}: {
  request: Request;
  context: { cloudflare: CloudflareContext & Record<string, unknown> };
}): AppLoadContext {
  return context as AppLoadContext;
}
