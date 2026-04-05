<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy on Cloudflare Pages

This project now targets Cloudflare Pages with Remix on the Cloudflare runtime.

View your app in AI Studio: https://ai.studio/apps/167a73f6-0fd3-497c-bf63-35844a645f2e

## Run Locally

**Prerequisites:** Node.js and Wrangler

1. Install dependencies:
   `npm install`
2. For local development, put your AI Pipe settings in `.env.local`.
3. Start the Remix dev server with the Cloudflare proxy:
   `npm run dev`
4. Preview the Pages build locally:
   `npm run preview`

## Local Environment

- `npm run dev` reads `.env.local`
- `npm run preview` is closest to Cloudflare Pages and should use `.dev.vars`
- You can copy `.dev.vars.example` to `.dev.vars` if you want Wrangler preview to use the same values

## Deploy

1. Push the repo to GitHub.
2. Create a Cloudflare Pages project pointing at this repo.
3. Use:
   Build command: `npm run build`
   Build output directory: `build/client`
4. Add the same environment variables in Cloudflare Pages settings.

## Notes

- The previous Express server and Prisma SQLite blog store were removed because they are not suitable for Cloudflare Pages.
- Blog content now ships as typed local data.
- Booking notifications are sent through `BOOKING_WEBHOOK_URL`, which should point to your email/webhook backend.
