import { voidPlugin } from "void";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, lazyPlugins } from "vite-plus";
import type { PluginOption } from "vite-plus";

// https://vite.dev/config/
export default defineConfig({
  plugins: lazyPlugins(async () => {
    const workerPlugins = process.env.VITEST ? [] : voidPlugin();

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
    ignorePatterns: ["dist/**", ".void/**", ".void-wrangler.jsonc"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ["dist/**", ".void/**", ".void-wrangler.jsonc"],
  },
  html: {
    cspNonce: "__NONCE__",
  },
});
