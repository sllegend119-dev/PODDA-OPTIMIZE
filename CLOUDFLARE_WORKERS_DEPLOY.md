# PODDA OPTIMIZE — Correct Cloudflare Workers deployment

This is the **source project** for the existing Worker URL:

`https://podda-optimizer-top.sllegend119-ae7.workers.dev/`

## Important: do not use the “Upload and deploy” asset picker for this ZIP

That screen expects already-built static files. This ZIP contains a React + Vite source project and needs a build step. The warning in the screenshot is expected when source files and `wrangler.jsonc` are uploaded there.

## Recommended phone-friendly method: Cloudflare Workers Builds (Git integration)

1. Extract this ZIP and put the project files at the root of a GitHub repository (not inside an extra nested folder).
2. In Cloudflare Dashboard open **Workers & Pages** → **Create application** → **Workers** → **Connect to Git** (wording may vary).
3. Connect GitHub and select the repository containing these files.
4. Use these settings:
   - Root directory: `/`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Build environment variable: `NODE_VERSION` = `22`
5. Confirm the Worker name is exactly **`podda-optimizer-top`** before deploying. This preserves the existing `workers.dev` address. Do not leave a generated name such as `tight-flower-9722`.
6. Deploy and wait for the build/deployment to finish. If Cloudflare says the Worker name already exists, choose the existing Worker/project or use its existing Git integration rather than creating a second Worker.

## If using a computer terminal

From the extracted project directory run:

```bash
npm install
npm run build
npx wrangler login
npx wrangler deploy
```

The `wrangler.jsonc` file is configured for **Workers Static Assets**, not Pages Direct Upload. It publishes the Vite `dist/` folder as static assets and enables SPA fallback.

## What not to do

- Do not upload this source ZIP in the **Upload and deploy** file picker shown in your screenshot.
- Do not deploy with a new random Worker name.
- Do not delete the existing Worker before confirming the replacement deployment is successful.

## Notes

The project must complete its dependency installation and Vite production build in Cloudflare's build environment. I could not run that build in this environment because dependency installation timed out, so the package is configured for Cloudflare to build and deploy; it is not represented as a locally build-verified artifact.
