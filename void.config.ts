import { defineConfig } from "void/config";

export default defineConfig({
  sourceDir: "src",
  target: "cloudflare",
  inference: { appType: "void" },
  routing: {
    isr: false,
    notFound: "single-page-application",
    rewrites: { "/api/": "/api" },
    headers: {
      "/*": ["X-Content-Type-Options: nosniff", "Referrer-Policy: strict-origin-when-cross-origin"],
    },
  },
  worker: { compatibility_date: "2026-10-19" },
  cloudflare: {
    name: "portfolio-website",
    account_id: "3ed90c45b6b16fdc865cfb55a6fbad2f",
    workers_dev: false,
    preview_urls: false,
    assets: {
      not_found_handling: "single-page-application",
      run_worker_first: true,
      binding: "ASSETS",
    },
    observability: { enabled: true },
    routes: [
      { pattern: "orelbn.ca", custom_domain: true },
      { pattern: "www.orelbn.ca", custom_domain: true },
    ],
  },
});
