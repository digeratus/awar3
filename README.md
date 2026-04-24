# AWAR3 Astro Skunkworks

Astro SPA-style launch site for AWAR3, designed for Cloudflare Pages.

## Project

- Project name: `awar3-astro-skunkworks`
- Framework: Astro static output with `ClientRouter`
- Canonical domain: `https://awar3.com`
- Contact: `info@awar3.com`
- Local legacy static export: `legacy-static-site/` (ignored by Git)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`.

## Cloudflare Pages

Use the Pages Git flow:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

Do not import this repository through the Workers build flow.

## Custom domain

After the Pages project deploys successfully:

1. Open the Pages project in Cloudflare.
2. Go to **Custom domains**.
3. Add `awar3.com`.
4. Add `www.awar3.com`.
5. Keep `awar3.com` canonical and redirect `www.awar3.com` to `https://awar3.com`.

Cloudflare Pages must associate the domain through the Pages Custom domains UI. Do not rely on a manually created CNAME alone.
