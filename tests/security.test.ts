import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { Hono } from "hono";
import { describe, expect, it } from "vite-plus/test";
import security from "../src/middleware/01.security";

const document = readFileSync(new URL("../index.html", import.meta.url), "utf8");

describe("HTML security", () => {
  it("gives each document a fresh matching nonce and prevents caching the transformed HTML", async () => {
    const app = new Hono();
    app.use(security);
    app.get(
      "/",
      () =>
        new Response(document, {
          headers: {
            "content-type": "text/html",
            "cache-control": "public, max-age=3600",
            "content-length": String(Buffer.byteLength(document)),
            etag: '"original-document"',
          },
        }),
    );

    const first = await app.request("/");
    const second = await app.request("/");
    const policy = first.headers.get("content-security-policy") ?? "";
    const nonce = policy.match(/'nonce-([^']+)'/)?.[1];

    expect(nonce).toBeTruthy();
    expect(await first.text()).toContain(`nonce="${nonce}"`);
    expect(await second.text()).not.toContain(`nonce="${nonce}"`);
    expect(policy).toContain("frame-ancestors 'none'");
    expect(first.headers.get("x-frame-options")).toBe("DENY");
    expect(first.headers.get("cache-control")).toBe("no-store");
    expect(first.headers.get("etag")).toBeNull();
    expect(first.headers.get("content-length")).toBeNull();
  });

  it("preserves partial media responses and their cache validators", async () => {
    const app = new Hono();
    app.use(security);
    app.get(
      "/stride-demo.mp4",
      () =>
        new Response("video segment", {
          status: 206,
          headers: {
            "content-type": "video/mp4",
            "content-range": "bytes 0-12/1000",
            "content-length": "13",
            etag: '"stride-video"',
          },
        }),
    );

    const response = await app.request("/stride-demo.mp4");

    expect(response.status).toBe(206);
    expect(await response.text()).toBe("video segment");
    expect(response.headers.get("content-range")).toBe("bytes 0-12/1000");
    expect(response.headers.get("content-length")).toBe("13");
    expect(response.headers.get("etag")).toBe('"stride-video"');
    expect(response.headers.get("content-security-policy")).toBeNull();
  });
});
