# AWAR3 Rotating Designs — Release Record

Status: locally validated; external preview and production release not performed

## Closing validation — 2026-08-03 EDT

| Check | Result |
| --- | --- |
| Dependency install | Passed with pnpm 11.9.0 and the frozen lockfile. |
| Astro check | Passed: 15 files, 0 errors, 0 warnings, 0 hints. |
| Unit/content/responsive tests | Passed: 4 files, 15 tests. |
| Production build | Passed: 5 static pages and 48 optimized image outputs. |
| Production dependency audit | Passed at the release threshold: 0 high/critical; 2 low and 2 moderate advisories validated as non-applicable to this implementation. |
| Cloudflare Pages Function | Passed locally through Wrangler 4.118.0 with the `ASSETS` binding. |
| Scheduled root | Passed: `X-AWAR3-Date: 2026-08-03`, `X-AWAR3-Variant: field-station`, revalidation enabled. |
| Valid override | Passed: Living Systems served with `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow`. |
| Invalid override | Passed: ignored and resolved to scheduled Field Station. |
| Static variant route | Passed through with static `no-store`/`noindex` policy. |
| In-app Browser matrix | Passed: 28/28 variant/viewport combinations. |
| Chrome cross-check | Passed: 8/8 representative desktop/mobile combinations. |
| Final Browser smoke | Passed: Field Station, 10 ordered sections, one H1, no broken images, no horizontal overflow, self-hosted menu script. |
| Security scan | Passed: no reportable findings. |
| Git diff check | Passed with no whitespace errors. |

## Validation corrections retained

- The first closing `pnpm` commands attempted to reconcile a virtual store created under a different runtime and stopped without a TTY. An offline frozen reinstall was then attempted, but one Fontsource tarball was absent from the local store. The approved networked frozen reinstall restored the exact lockfile graph.
- Direct command shims could not find a system `node`; final Astro and Vitest commands used the bundled Node 24.14.0 runtime directly. This is an environment correction, not a source change.
- The new responsive test initially treated decorative icons' legitimate `aria-hidden="true"` as hidden marketing content. The assertion was narrowed to canonical `<section data-copy-section>` elements and then passed.
- A sandboxed local Wrangler restart could not write its diagnostic log or bind its inspector port. The existing approved local worker remained available; the final header smoke test connected to it with the approved loopback access.

## Security record

- Report: `/private/tmp/codex-security-scans/awar3-github-pages-repo/f49a142_20260803T145621-0400/report.md`
- Reportable findings: none.
- Dependency disposition: Sharp high advisory remediated at `0.35.3`. Remaining advisories require Windows development-server exposure or Astro View Transition/hydration/dynamic-spread features absent from this project.
- Secret scan: no API token, GitHub secret, Cloudflare credential, or private value was found or recorded.

## Deployment state

- Starting/rollback commit: `f49a1427d41931094e4e4bfa5e586f992ef85396`.
- Local implementation commit: not created.
- GitHub pull request: not created.
- Cloudflare preview deployment: not created.
- Production deployment: not performed.
- Production deployment identifier and live response headers: not available until publication.
- Reason: the implementation is being handed off in the verified local preview before making an external GitHub/Cloudflare state change. The workflow is ready to create a preview from a pull request and to deploy production only from `main`.

## Post-publication smoke checklist

After an approved publication, record the deployed commit and Cloudflare deployment ID, then verify:

1. `https://awar3.com/` returns the expected scheduled `X-AWAR3-Variant`, revalidation policy, and production security headers.
2. Desktop and mobile on the same New York date have identical variant, section order, and normalized copy.
3. `https://www.awar3.com/` redirects to the canonical host.
4. All four `?design=` overrides render and return `no-store` plus `noindex`.
5. All four static `/variants/{variant}/` routes remain canonicalized to `/` and `noindex`.
6. Images, fonts, navigation, anchors, email CTAs, robots, sitemap, and social preview load without console or network errors.

## Rollback

Preferred rollback: restore the previous Cloudflare Pages deployment from the Pages deployment history. Repository rollback: revert the release commit or redeploy commit `f49a1427d41931094e4e4bfa5e586f992ef85396`. Re-run the scheduled-root and header smoke tests after rollback.

## 2026-08-03 16:20 EDT — Post-review fidelity reset

The visual implementation was corrected to follow the user's supplied original boards more closely. The page now uses measured native reference-art crops, a board-faithful cream/navy/rust system, and the shared canonical copy tree. The earlier Image 2.0 masters were retained but are not referenced by the refreshed page.

Post-reset local checks:

- Astro check: passed after the breakpoint and reference-art changes.
- Vitest/content/responsive tests: passed.
- Production build: passed.
- In-app Browser: 28/28 required variant/viewport checks; zero overflow and clipping after the 850px responsive correction; normalized desktop/mobile copy parity passed for all four variants.
- Local release state: preview only. No commit, PR, Cloudflare preview, or production deployment was created.

The release remains gated on user review of the refreshed local prototype. Rollback instructions above are unchanged; the pre-existing untracked deployment-summary file remains untouched.

## 2026-08-03 17:35 EDT — Desktop board pass release record

- Scope: four desktop visual experiences only — Pastoral Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid. Existing root rotation, QA routes, canonical metadata, and middleware were not changed.
- Local validation: Astro check passed with 0 diagnostics; Vitest passed with 15/15 tests; production build passed with 5 static pages and 52 optimized image outputs; `git diff --check` passed.
- Browser validation: 12/12 in-app Browser desktop cells (1440, 1280, 1024px × four variants) passed with one H1, ten sections, exact canonical-copy parity, zero horizontal overflow, no console errors, and no in-view broken images. Chrome and Computer Use cross-checked Industrial Hybrid at desktop width.
- Asset validation: eight Image 2.0 masters (four 1536×1024 heroes and four 1774×887 Work illustrations) are stored under `src/assets/desktop-art/` and served as optimized WebP derivatives. The Industrial Hybrid hero was regenerated once after a right-edge crop discrepancy and passed the retest.
- Evidence: final hero and contact captures are stored in `docs/qa/2026-08-03/desktop-pass/`; visual QA details are appended to `docs/rotating-designs-design-qa.md`.
- Mobile release status: intentionally deferred until the user inspects the desktop boards. No external preview, GitHub commit, Cloudflare deployment, or production release was created.
- Rollback: unchanged — use the prior Cloudflare Pages deployment or restore commit `f49a1427d41931094e4e4bfa5e586f992ef85396`.

## 2026-08-03 18:43 EDT — Exact supplied-board desktop release record

- Scope: local desktop correction only. Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid now use the supplied full-page boards as their exact desktop compositions. Mobile remains deferred.
- Validation: Astro check passed with 0 diagnostics; Vitest passed 15/15; production build passed with 5 static pages and 76 optimized image outputs; `git diff --check` passed.
- Visual QA: Chrome completed 12/12 desktop cells at 1440, 1280, and 1024px. All cells had zero overflow, one loaded visible board image, zero visible broken images, the exact source aspect ratio, and clean console logs. Four full-page 1440px captures and four same-input reference comparisons were accepted under `docs/qa/2026-08-03/exact-board-pass/`.
- Functional QA: Work navigation and smooth anchor positioning passed; confidential inquiry and email destinations are wired through transparent overlays aligned to the supplied board controls.
- Performance: only one exact board image is visible per desktop route. Responsive WebP outputs are approximately 521–741 kB at 1024px and 854 kB–1.4 MB at 1440px; the large PNG masters are build inputs only.
- Route/header smoke: every static variant route returned HTTP 200 with exactly one exact-board component and four responsive derivatives; existing HSTS, CSP, frame protection, permissions policy, `no-store`, and `noindex` behavior remained present.
- Environment note: the in-app Browser backend could not attach a fresh webview despite successful backend discovery. Chrome and Computer Use, both already authorized for this work, completed the visual and functional QA instead. The failure and recovery are preserved in the work log.
- Release state: local preview only. No commit, pull request, Cloudflare preview deployment, or production deployment was created.
- Rollback: restore commit `f49a1427d41931094e4e4bfa5e586f992ef85396` or use the prior Cloudflare Pages deployment. The existing untracked deployment summary remains unchanged at SHA-256 `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.

## 2026-08-03 19:12 EDT — Production release preflight

- Authorized target: Cloudflare Pages project `awar3-astro-skunkworks`, production branch `main`, serving `https://awar3.com/` and the four noindex static variant routes.
- Release path: scoped commit and push to the existing GitHub `main` branch; `.github/workflows/deploy-pages.yml` will validate and deploy using the repository's Cloudflare account/token secrets.
- Final local gate: Astro check 18 files / 0 diagnostics; Vitest 15/15; production audit passed the configured high-severity gate with 2 low and 2 moderate advisories; build 5 pages / 76 optimized images; deployment-summary hash unchanged.
- Local Wrangler fallback was not used because no authenticated local profile is configured. Rollback remains the previous Pages deployment or source commit `f49a1427d41931094e4e4bfa5e586f992ef85396`.

Closing handoff retest: final build/check/test completed successfully after the last Industrial Hybrid crop decision, the 12-cell desktop Browser matrix remained clean, and the local preview was left on the Field Station route. Mobile and external deployment remain deferred pending user inspection.

## 2026-08-03 18:05 EDT — Final local desktop release record

- Contact-art correction: four text-free Image 2.0 masters were added under `src/assets/desktop-art/` and delivered through Astro's responsive WebP pipeline. The old contact crops with baked CTA/email copy are no longer referenced.
- Validation: Astro check passed with 0 diagnostics; Vitest passed 15/15; production build passed with 5 static pages and 60 optimized image outputs; `git diff --check` passed.
- Browser/Chrome: the in-app Browser rechecked all four forced variants at 1440, 1280, and 1024px (12/12). The matrix confirmed one H1, ten sections, identical normalized canonical copy, no overflow, no console errors, and loaded contact artwork. Chrome/Computer Use rechecked Industrial Hybrid at a representative desktop width.
- Evidence: `docs/qa/2026-08-03/desktop-pass/*-hero-final.png` and `*-contact-final.png` are the current visual handoff captures. Mobile is intentionally deferred.
- Release state: local preview only. No Git commit, pull request, Cloudflare preview, or production deployment was created. The untracked deployment-summary file remains untouched.
- Rollback: unchanged — use the prior Cloudflare Pages deployment or restore commit `f49a1427d41931094e4e4bfa5e586f992ef85396`.

## 2026-08-03 20:54 EDT — Slim unpublished release candidate

- Scope: local asset and commit slimming only; production and the GitHub `main` branch remain unchanged.
- Before/after: tracked source art reduced from approximately 95 MB to 18.5 MiB; QA evidence from 80 MB / 137 files to 6.2 MiB / 12 files; social preview from 1.2 MB to 0.3 MiB; logical Pages build from approximately 31 MB to 24.0 MiB.
- Fidelity: all four generated exact-board masters are pixel-identical to the prior committed masters after decoding. Supporting WebP art uses quality 94 and passed quantitative error review plus rendered Browser inspection.
- Validation: Astro check 17 files / 0 diagnostics; Vitest 15/15; build 5 pages / 76 optimized images; asset budgets passed; in-app Browser passed four desktop and four mobile routes with zero overflow, no framework overlay, no console warnings/errors, loaded icon subset, and corrected desktop/mobile anchor behavior.
- Release state: ready to amend the unpublished local commit. No GitHub ref, Cloudflare deployment, custom domain, or production response changed in this pass.
- Rollback: the currently published site remains at `f49a1427d41931094e4e4bfa5e586f992ef85396`; the pre-slim local tree remains recoverable through the prior local commit until normal Git garbage collection.
- Closing rerun: direct bundled-Node execution passed board generation, Astro check (17 files / 0 diagnostics), Vitest (15/15), production build (5 pages / 76 image outputs), and the asset-budget gate. The rebuilt `dist/` measures 23.1 MiB.
- Local-environment note: two package-manager lifecycle wrappers requested a non-interactive virtual-store purge and were not used for the authoritative rerun; this did not alter source or dependency state.
- Commit result: the unpublished local commit was amended in place. Its unique new-blob payload relative to the published baseline is 25.3 MiB, approximately 86% smaller than the pre-slim commit. No remote ref or Cloudflare deployment changed.
- Cleanup result: Browser QA tabs and the local Wrangler preview were closed, task-created AWAR3 temporary files were removed, and port 8788 has no listener. Superseded Git objects remain recoverable through the local reflog until normal garbage collection.

## 2026-08-03 22:15 EDT — Four-board desktop-only local candidate

- Scope: exactly four new desktop WebPs plus source, tests, Pages rotation, and the existing live responsive fallback. No new mobile design images, supporting art families, font binaries, social raster, or in-repository screenshot evidence are part of the candidate.
- Size: four board files total 3.71 MiB. A clean 5-page production build totals 3.78 MiB, below the 4.10 MiB release budget and down from the prior 23.1 MiB candidate.
- Validation: Astro check 16 files / 0 diagnostics; Vitest 3 files / 13 tests; production build 5 pages; four-file asset allowlist passed; Browser desktop 4/4 and mobile fallback 4/4 passed with zero overflow and clean logs.
- Security: the restrictive self-hosted CSP is unchanged. Mobile progressive enhancement now loads from `/legacy-mobile.js`, allowed by `script-src 'self'`; no inline-script exception was added.
- QA evidence: prior 6.2 MB screenshot evidence was moved intact to the adjacent `AWAR3_QA_Archive_2026-08-03` folder. Current representative captures live in the Codex visualization directory and are not included in Git or Pages.
- Release state: local, unpublished candidate only. This pass did not push GitHub, trigger Actions, deploy Cloudflare Pages, change `awar3.com`, or modify the existing production deployment.
- Commit action: amend the existing unpublished `Deploy exact rotating AWAR3 designs` commit in place after final staged validation. Record the resulting SHA in the handoff; the published rollback baseline remains `f49a1427d41931094e4e4bfa5e586f992ef85396`.
- Rollback: because nothing was deployed, no production rollback is required. Locally, the published baseline can be checked out in a separate worktree or the amended candidate commit can be reverted; superseded local objects remain available through reflog until normal garbage collection.

Closing commit measurement: the unpublished candidate is approximately 4.00 MiB across 36 unique new blobs relative to published `origin/main`, which remains `f49a1427d41931094e4e4bfa5e586f992ef85396`. Only the three preserved pre-existing Markdown files remain untracked. No remote or Cloudflare state changed.

Closing local Cloudflare response smoke: scheduled `/` returned HTTP 200 with `X-AWAR3-Variant: field-station`, New York date `2026-08-03`, revalidation, HSTS, restrictive CSP, clickjacking protection, and the existing security headers. `?design=living-systems` returned HTTP 200, `X-AWAR3-Variant: living-systems`, `no-store`, and `noindex`. `/legacy-mobile.js` and all four static variant routes returned HTTP 200; every static route retained `no-store` and `noindex`. These are local Wrangler results, not a production deployment.

Closing cleanup: local Wrangler was stopped; its temporary log/state and repository scratch directories were removed; port 8788 and the Node/Workerd/Wrangler listener scan are clear. No production resource was stopped or changed.
