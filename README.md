# Portfolio Website

My personal portfolio website, built with React, TypeScript, Tailwind CSS, Vite+, and
[Void](https://void.cloud/), deployed to Cloudflare Workers.

Install dependencies with `vp install`. The install runs `void prepare` to generate
the route types in `.void/`. Regenerate them with `vp run prepare` when needed.

- `vp dev` starts the local app and API.
- `vp check` checks formatting, lint, and types.
- `vp test run` runs the security regression tests.
- `vp build` builds the frontend and Worker.
- `vp preview` previews the production build.
- `vp run deploy` builds and deploys through Void to the existing Cloudflare Worker.

The React UI lives in `src/components/`, API handlers in `src/routes/`, and HTML
security middleware in `src/middleware/`. `void.config.ts` preserves the Worker
name, custom domains, security headers, and SPA routing. Commit `void.lock.json`
after deployments; `.void/` and `.void-wrangler.jsonc` are generated and ignored.

Void's version-matched documentation and migration skills are available in
`node_modules/void/docs/` and `node_modules/void/skills/`.
