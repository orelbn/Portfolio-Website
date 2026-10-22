import { defineMiddleware } from "void/handler";

const HTML_NONCE_PLACEHOLDER = "__NONCE__";

function buildContentSecurityPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self' https://cloudflareinsights.com",
    "frame-src https://www.youtube.com https://youtube.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default defineMiddleware(async (c, next) => {
  await next();

  if (!c.res.headers.get("content-type")?.includes("text/html")) return;

  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  const html = (await c.res.text()).replaceAll(HTML_NONCE_PLACEHOLDER, nonce);

  c.res = new Response(html, {
    status: c.res.status,
    statusText: c.res.statusText,
    headers: c.res.headers,
  });

  const headers = c.res.headers;
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));
  headers.set("Cache-Control", "no-store");
  headers.delete("Content-Length");
  headers.delete("ETag");
});
