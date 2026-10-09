import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, lazyPlugins } from "vite-plus";
import type { PluginOption } from "vite-plus";

// https://vite.dev/config/
export default defineConfig({
  plugins: lazyPlugins(async () => {
    const workerPlugins = process.env.VITEST ? [] : cloudflare();

    return [
      ...react(),
      await babel({ presets: [reactCompilerPreset()] }),
      ...workerPlugins,
      ...tailwindcss(),
    ] as PluginOption[];
  }),
  resolve: {
    tsconfigPaths: true,
  },
  lint: {
    ignorePatterns: ["dist/**", "worker-configuration.d.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ["dist/**", "worker-configuration.d.ts"],
  },
  html: {
    cspNonce: "__NONCE__",
  },
});
