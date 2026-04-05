import { cloudflareDevProxyVitePlugin, vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { getLoadContext } from "./load-context";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = {
    ...process.env,
    ...env,
  };

  return {
    plugins: [
      cloudflareDevProxyVitePlugin({ getLoadContext }),
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
    ssr: {
      resolve: {
        externalConditions: ["workerd", "worker"],
      },
    },
  };
});
