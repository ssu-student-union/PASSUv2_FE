import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tanstackRouter from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyUrl =
    env.VITE_API_PROXY_URL || "https://admin-dev.passu.sssupport.shop";
  return {
    server: {
      proxy: {
        "/api": {
          target: apiProxyUrl,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      tanstackRouter({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
