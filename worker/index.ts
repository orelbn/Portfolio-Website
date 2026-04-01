import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();
const HTML_NONCE_PLACEHOLDER = "__NONCE__";

function createNonce() {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
}

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

function withDefaultSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

app.get("/api/", (c) => {
  return c.json({
    name: "Portfolio API",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (c) => {
  return c.json({ status: "ok", worker: "running" });
});

// Route all GET requests through the Worker so every HTML navigation gets
// the same nonce replacement and response headers.
app.get("*", async (c) => {
  const response = await c.env.ASSETS.fetch(c.req.raw);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    return withDefaultSecurityHeaders(response);
  }

  const nonce = createNonce();

  let html = await response.text();
  html = html.replaceAll(HTML_NONCE_PLACEHOLDER, nonce);

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Content-Type", "text/html; charset=utf-8");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
});

export default app;
