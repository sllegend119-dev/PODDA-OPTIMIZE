# PODDA OPTIMIZE — Cloudflare deployment

**Use the Workers Builds Git integration for this React + Vite source project.** Do not upload this source folder in the Dashboard's static “Upload and deploy” picker.

Follow `CLOUDFLARE_WORKERS_DEPLOY.md` for the exact steps. The existing Worker name is `podda-optimizer-top`; keep that name to preserve the current `workers.dev` URL.

This project builds to `dist/`, then Wrangler deploys that directory as Cloudflare Workers Static Assets using `wrangler.jsonc`.
