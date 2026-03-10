import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(() => {
  return {
    plugins: [
      remix({
        ssr: true,
        future: {
          v3_fetcherPersist: true,
          v3_throwAbortReason: true,
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "~": path.resolve(process.cwd(), "./app"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
