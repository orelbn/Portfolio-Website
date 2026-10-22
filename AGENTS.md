# AGENTS.md

Repo-specific guidance for this portfolio website.

## Commands

- Use `vp` for project commands when available.
- Prefer `vp check` for validation and formatting checks.
- Use `bunx`, not `npx`, for package executables.
- Use `vp run prepare` to regenerate Void types and `vp run deploy` to publish through Void.

## Stack

- Frontend: React 19 + TypeScript + Vite.
- Styling: Tailwind CSS v4 with shadcn/ui.
- Backend: Void on Cloudflare Workers, using Hono handlers and middleware.

## Repo Structure

- `src/` contains the frontend app.
- `src/routes/` contains Void API routes.
- `src/middleware/` contains Void request and response middleware.
- `public/` contains static assets.
- `void.config.ts` contains deployment and routing settings; commit `void.lock.json` when it changes.

## Task Guidance

- Keep this file focused on repo-specific instructions only.
- Prefer using skills for specialized workflows instead of embedding long generic instructions here.
