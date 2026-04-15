# AWAR3 Cloudflare Pages repo

This repository layout is designed to create a **Cloudflare Pages** project (not a Worker) when you use **Git integration**.

## Structure

- `public/` — deploy-ready static site files for AWAR3

## Cloudflare Pages settings

When importing this GitHub repository into Cloudflare Pages:

- **Framework preset:** None
- **Production branch:** `main`
- **Build command:** `exit 0`
- **Build output directory:** `public`
- **Root directory:** leave blank

## Notes

- The live contact email is already set to `info@awar3.com`.
- The `_headers`, `404.html`, `robots.txt`, and shared assets are already included inside `public/`.

## Local Git commands

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```
