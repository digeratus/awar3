# AWAR3 Rotating Designs Work Log

This is the append-only implementation record for the four-design AWAR3 rebuild. It intentionally excludes credentials, tokens, and private environment values.

## 2026-08-03 13:50 EDT — Starting state

- Objective: begin implementation of the approved Pastoral Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid site variants.
- Repository: `digeratus/awar3`, local branch `main`.
- Starting commit: `f49a1427d41931094e4e4bfa5e586f992ef85396`.
- Starting worktree: clean apart from the pre-existing untracked `AWAR3_Astro_Cloudflare_Deployment_Summary_2026-04-26.md`; this file will remain untouched.
- Remote: `https://github.com/digeratus/awar3.git`.
- Runtime discovery: bundled Node.js `v24.14.0`; bundled pnpm `11.9.0`; shell `npm` is unavailable. Existing installed Astro version is `6.1.9`.
- Existing architecture: Astro static output, one `src/pages/index.astro`, shared `src/layouts/BaseLayout.astro`, global stylesheet, and GitHub Actions Direct Upload to Cloudflare Pages project `awar3-astro-skunkworks` on pushes to `main`.
- Existing public headers: `X-Content-Type-Options`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- Existing deployment workflow: Node 22, `npm ci`, `npm run build`, then `cloudflare/wrangler-action@v3` with the existing repository secrets.
- Product Design saved-context preflight: no saved context file exists, so the approved concepts and supplied plan are the source of truth.
- Failed attempt retained for the record: the first saved-context preflight used the plugin-level `scripts/` path; the actual script lives under `skills/user-context/scripts/`. The corrected command completed successfully.
- Browser baseline capture: pending in the next log entry before source implementation begins.

## 2026-08-03 13:53 EDT — Browser baseline

- Objective: preserve the current live desktop and mobile experience before source changes.
- Tool: Codex in-app Browser, explicitly selected as required by the project plan.
- Captures: `docs/qa/2026-08-03/baseline-live-desktop-1440-viewport.png` and `docs/qa/2026-08-03/baseline-live-mobile-390-viewport.png`.
- Additional diagnostic full-page captures: `baseline-live-desktop-1440.png` and `baseline-live-mobile-390.png`.
- Observation: the existing reveal-on-scroll implementation leaves hero content very faint in the desktop capture, and full-page capture repeats the sticky header/hero. This confirms the planned progressive-enhancement fix: content must be visible by default and the final QA must use stable viewport/section captures for comparison.

## File-change ledger

| Path | Change | Purpose |
| --- | --- | --- |
| `docs/rotating-designs-work-log.md` | Added | Append-only implementation history and file-change ledger. |
| `docs/rotating-designs-design-qa.md` | Added | Responsive matrix, comparison evidence, findings, and retest history. |
| `docs/rotating-designs-release-record.md` | Added | Build, preview, production, security, and rollback record. |
| `docs/qa/2026-08-03/` | Added | Dated visual evidence for baseline and final QA. |
| `docs/qa/2026-08-03/baseline-live-*.png` | Added | Browser evidence of the pre-redesign live site at desktop and mobile sizes. |

## 2026-08-03 14:01 EDT — Source and deployment audit

- Objective: recover the previous implementation decisions and map the current Astro, GitHub Actions, Cloudflare Pages, SEO, and security setup before changing product code.
- Files examined: `README.md`, `package.json`, `astro.config.mjs`, `src/`, `public/`, `.github/workflows/deploy-pages.yml`, `.gitignore`, and the Git history. The pre-existing untracked deployment summary was observed but not edited.
- Tools and commands: `rg --files`, `git log`, `git status`, `git diff`, package metadata inspection, and the in-app Browser.
- Result: confirmed a static Astro 6 site, production deployment from `main`, and a direct Cloudflare Pages upload. The redesign could retain the repository and deployment architecture while adding Pages Functions routing.
- Decision: retain Industrial Hybrid as the static `/` failure-open output and serve the scheduled variant only at the Cloudflare edge.

## 2026-08-03 14:10 EDT — Canonical content and shared page architecture

- Objective: prevent copy drift between four designs and all responsive breakpoints.
- Files added: `src/content/site.ts`, `src/lib/variants.ts`, `src/components/VariantPage.astro`, and `src/pages/variants/[variant].astro`.
- Files changed: `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, and `src/styles/global.css`.
- Result: all four variants and the root fallback render the same Candidate 1B content object through one semantic component. The component includes a skip link, one H1, landmarks, shared navigation, ten canonical copy sections, visible focus states, minimum touch targets, and reduced-motion handling.
- Decision: responsive behavior is CSS-only. No marketing section is conditionally rendered, shortened, replaced, or hidden for mobile.
- Navigation correction: the Astro client router and reveal dependency were removed. Content is visible without JavaScript; a small self-hosted enhancement only manages the mobile disclosure menu.

## 2026-08-03 14:19 EDT — Four design systems and image production

- Objective: build four materially different compositions while preserving their approved desktop/mobile design families.
- Visual references copied to `docs/qa/2026-08-03/concepts/` so the build can be audited without relying on ephemeral image locations.
- Slot measurement: hero art is rendered in an approximately `620 × 660` desktop frame and a `390 × 420` mobile frame. A square master with central safe area supports both without enlarging or CSS stretching.
- Tool: built-in Image 2.0 workflow. Each selected master is `1254 × 1254` PNG, text-free, and used through Astro's image pipeline.
- Common production brief: high-resolution editorial concept illustration; crisp focal subject and coherent geometry; safe composition for the measured desktop and mobile slots; no copy, labels, logos, icons, watermarks, or accidental text.
- `field-station-hero.png`: remote mountain-meadow field station with observatory, solar, antennas, and weathered naturalist/technical character; cream, navy, rust, and field green; centered/right-weighted subject with atmospheric space. Reference: `concepts/field-station-{desktop,mobile}.png`. Source: `exec-3170bc18-11b0-4406-a5e2-371c13a60de4.png`. Final size: 2.8 MB. Used by Pastoral Field Station.
- `airborne-workshop-hero.png`: an airborne workshop/hangar in cloud, retrofitted aircraft and mechanical laboratory, coherent aviation geometry, navy/rust/cream, and bright sky opening. Reference: `concepts/airborne-workshop-{desktop,mobile}.png`. Source: `exec-9b461833-52c1-4f73-a017-25c33d4a0552.png`. Final size: 2.4 MB. Used by Airborne Workshop.
- `living-systems-hero.png`: a botanical and biological systems assemblage interwoven with sensors and radio infrastructure; herbarium/cellular motifs; ivory, forest, dusty rose, and navy. Reference: `concepts/living-systems-{desktop,mobile}.png`. Source: `exec-e4f234a0-87e2-4459-84f4-bdae715cc339.png`. Final size: 3.0 MB. Used by Living Systems.
- `industrial-hybrid-hero.png`: compact robotic workcell/skunkworks machine on a technical grid; white, black, red, yellow, and navy; crisp axonometric engineering geometry. Reference: `concepts/industrial-hybrid-{desktop,mobile}.png`. Source: `exec-3c522038-7fd1-40ae-bfc9-a027ce09b5aa.png`. Final size: 2.8 MB. Used by Industrial Hybrid and the root failure-open page.
- Social asset: `public/og/awar3-social.png`, `1200 × 630`, 1.2 MB, stable across variants.
- Inspection: every master was opened at native resolution and checked for focal sharpness, compression artifacts, halos, warped geometry, accidental text/logos/watermarks, crop safety, and family consistency. All selected masters passed. No mobile replacement image was needed because each safe crop preserved the same subject and balance.
- Optimization result: Astro generated 32 AVIF/WebP outputs plus PNG fallbacks at 480, 720, 960, and 1254 widths, with explicit dimensions and responsive `srcset`s. Below-fold images remain lazy; the hero is high priority.
- Fonts/icons: self-hosted Newsreader, Source Sans 3, Barlow Condensed, and IBM Plex Mono packages; Phosphor supplies interface icons.

## 2026-08-03 14:34 EDT — Daily rotation, security headers, and SEO

- Objective: make the New York calendar date the only scheduled-variant input and keep static QA routes non-indexable.
- Files added: `functions/lib/rotation.ts`, `functions/_middleware.ts`, `public/_routes.json`, `public/sitemap.xml`, and `public/site.js`.
- Files changed: `public/_headers`, `public/robots.txt`, and `src/layouts/BaseLayout.astro`.
- Result: `/` is intercepted for GET/HEAD; the date maps through Field Station → Airborne Workshop → Living Systems → Industrial Hybrid from the 2026-08-03 anchor. Static `/variants/{variant}/` routes pass through unchanged.
- Overrides: only the four exact identifiers are accepted. Valid `?design=` requests are `no-store` and `noindex`; invalid values use the schedule. Responses expose `X-AWAR3-Variant` and `X-AWAR3-Date` and normal responses require revalidation.
- Security result: HSTS, CSP, clickjacking protection, MIME sniffing protection, referrer policy, and the existing restrictive permissions policy are applied at the edge. All images, fonts, scripts, and styles are self-hosted.
- SEO result: the sitemap exposes only `/`; variant routes canonicalize to `https://awar3.com/` and are `noindex`; robots and sitemap now agree.
- Correction retained: an initial inline mobile-menu script was blocked by the strict CSP. It was replaced with `public/site.js` loaded from the same origin. Chrome then confirmed anchor selection closes the menu, Escape closes and restores focus, and no CSP or console errors remain.

## 2026-08-03 14:42 EDT — Dependency and workflow migration

- Objective: make local and CI installs deterministic and add validation plus pull-request previews.
- Files changed: `package.json`, `tsconfig.json`, `.github/workflows/deploy-pages.yml`, and `.gitignore`.
- Files added: `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vitest.config.ts`, and the test suite.
- Failed attempt retained: the first sandboxed `pnpm install` could not reach the package registry (`ENOTFOUND`). The approved networked retry completed.
- Failed attempt retained: variable Fontsource package names did not exist. They were replaced with the available static font packages listed above.
- Correction retained: pnpm 11 ignored lifecycle configuration placed in `package.json`; allowed native builds and the Sharp override were moved to `pnpm-workspace.yaml` and the install was repeated with the bundled Node runtime.
- Dependency correction: the audit found a high-severity advisory in the original Sharp range. Direct Sharp was upgraded and overridden to `0.35.3`; the high-level production audit then passed.
- `pnpm list` diagnostic failed because its internal SQLite state was unavailable. Exact installed versions were instead read from installed package metadata: Astro 6.4.8, Sharp 0.35.3, Vitest 4.1.10, Wrangler 4.118.0, TypeScript 5.9.3, and `@astrojs/check` 0.9.10.
- Workflow result: pull requests and `main` both run frozen install, Astro check, unit/content tests, high-level production audit, build, and artifact upload. Same-repository pull requests deploy a Cloudflare preview branch; pushes to `main` retain production deployment.
- Hygiene correction: local Wrangler output contained machine-local absolute build paths. `.wrangler/` was added to `.gitignore`; it is not part of the product or release artifact.

## 2026-08-03 14:50 EDT — Automated and local edge validation

- Objective: prove rotation boundaries, allowlisting, headers, canonical content use, and responsive copy invariants.
- Tests added: `tests/rotation.test.ts`, `tests/function.test.ts`, `tests/content-integrity.test.ts`, and `tests/responsive-copy-parity.test.ts`.
- Coverage includes: fixed sequence, daylight/standard New York midnight, both DST transitions, leap day, valid and invalid overrides, non-root pass-through, GET/HEAD behavior, method rejection, response headers, the ten-section shared semantic component, normalized copy parity at all seven widths, and detection of rules that hide canonical copy sections.
- Local Cloudflare Pages Function was exercised through Wrangler at `http://127.0.0.1:8788/` with its `ASSETS` binding.
- Header result: scheduled 2026-08-03 root resolved to Field Station; a valid Living Systems override returned `no-store` and `noindex`; an invalid override resolved to the scheduled variant; static variant routes passed through.

## 2026-08-03 15:00 EDT — Browser, Chrome, and visual comparison QA

- Objective: verify every variant at every required viewport and compare the implementation with the approved concepts.
- In-app Browser matrix: 4 variants × 7 widths (`1440`, `1280`, `1024`, `768`, `430`, `390`, `320`) = 28 explicit checks. Evidence is in `docs/qa/2026-08-03/matrix/`.
- Chrome cross-check: every variant at `1440` and `390` = 8 explicit checks. Evidence is in `docs/qa/2026-08-03/chrome/`.
- Automated browser assertions at each matrix point: normalized Candidate 1B snapshot, ten visible sections and ordering, one H1, navigation parity, valid anchor targets, image load state and responsive source, minimum type sizes, overflow, clipping, touch targets, and console errors.
- Result: 28/28 in-app Browser combinations and 8/8 Chrome combinations passed. Desktop/mobile normalized marketing copy is identical for every variant. Root desktop/mobile selected the same Field Station design and copy on the same New York date.
- Interaction result: menu disclosure, Method anchor, mail link, focus behavior, Escape, and reduced-motion paths work. Browser and Chrome consoles were clean.
- Visual inspection: representative Work, Method, and Contact sections for every design at desktop and mobile were saved in `docs/qa/2026-08-03/sections/` and inspected. Hero reference/implementation pairs in `comparisons/` were reviewed together for palette, type, composition, framing/material language, and responsive continuity.
- Fidelity correction: Airborne Workshop initially read too dark and Industrial Hybrid too yellow. Their surfaces, grids, borders, and accent distribution were adjusted toward the cream/navy/rust and cream/navy/red references, then recaptured and rechecked.
- Failed capture retained: Browser `screenshot({path})` returned image bytes but did not write files in this environment. The correction saved the returned byte arrays explicitly.
- Failed capture retained: the first section-scroll capture used animated smooth scrolling and mislabeled intermediate positions. The sequence was repeated with instant scrolling after fonts and images loaded.
- Failed capture retained: Browser full-page captures repeat sticky viewport layers and are unsuitable for pixel-by-pixel fidelity judgment. They remain in `comparisons/` as diagnostic evidence; the accepted visual review uses matched hero comparisons and stable section captures.
- Intentional deviations: newly generated, text-free production illustrations replace the concepts' composite imagery; complete Candidate 1B copy makes the production pages longer than the concept boards; the shared semantic tree fixes section order across designs. No deviation changes the approved design family or marketing copy.

## 2026-08-03 15:08 EDT — Security scan and advisory disposition

- Objective: complete the requested standard repository security review after implementation.
- Tool: Codex Security standard single-pass scan with inventory, discovery, threat-model review, validation, attack-path closure, and final reporting.
- Scope: all source, configuration, workflow, test, and authored documentation files; generated build wrappers and binary asset metadata were reviewed; `.git`, `node_modules`, `dist`, and local Wrangler state were excluded as repository metadata, installed dependencies, generated output, and ignored local state.
- Correction retained: the system Python preflight lacked `tomllib`/`tomli`; the bundled Python runtime completed the prescribed preflight. It warned that three worker slots were available versus six suggested, so the small codebase received a complete parent review without delegation.
- Secret-pattern scan: no credentials or private values found.
- Result: no reportable vulnerabilities. Four dependency advisory candidates were validated as non-applicable: the esbuild item applies to an exposed Windows development server, and three Astro items require View Transitions, hydration directives, or untrusted dynamic attribute spreading that this static site does not use.
- Final report: `/private/tmp/codex-security-scans/awar3-github-pages-repo/f49a142_20260803T145621-0400/report.md`.

## 2026-08-03 15:13 EDT — Closing state and preservation check

- Objective: finalize the auditable record before the closing validation run.
- Pre-existing untracked deployment summary: unchanged and outside all edit targets. Closing control SHA-256: `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.
- No API tokens, GitHub secrets, Cloudflare credentials, or private environment values were written to project files or this log.

## Final file-change ledger continuation

| Path | Change | Purpose |
| --- | --- | --- |
| `.github/workflows/deploy-pages.yml` | Modified | Validate PRs/main and create Cloudflare PR previews while keeping main-only production. |
| `.gitignore` | Modified | Ignore machine-local Wrangler build state. |
| `package.json` | Modified | Add deterministic pnpm scripts, fonts, icons, tests, Wrangler, Astro checks, and patched Sharp. |
| `pnpm-lock.yaml` | Added | Locked dependency graph. |
| `pnpm-workspace.yaml` | Added | Native-build allowlist and Sharp security override. |
| `tsconfig.json` | Modified | TypeScript configuration for Astro, functions, and tests. |
| `vitest.config.ts` | Added | Unit-test configuration. |
| `functions/_middleware.ts` | Added | Root interception, variant serving, cache policy, diagnostics, and security headers. |
| `functions/lib/rotation.ts` | Added | Allowlisted variant model and New York daily rotation. |
| `public/_headers` | Modified | Static security and cache defaults. |
| `public/_routes.json` | Added | Limit Pages Function invocation to the root. |
| `public/robots.txt` | Modified | Align crawler rules with the public root-only sitemap. |
| `public/sitemap.xml` | Added | Expose only the canonical root. |
| `public/site.js` | Added | Progressive mobile-menu close/focus behavior under the self-hosted CSP. |
| `public/og/awar3-social.png` | Added | Stable high-resolution social preview. |
| `src/assets/variants/*.png` | Added | Four selected high-resolution Image 2.0 hero masters. |
| `src/content/site.ts` | Added | Single Candidate 1B content source. |
| `src/lib/variants.ts` | Added | Shared variant metadata, labels, and art mapping. |
| `src/components/VariantPage.astro` | Added | Shared accessible semantic page tree for all designs. |
| `src/layouts/BaseLayout.astro` | Modified | Canonical/noindex metadata, self-hosted assets, and social metadata. |
| `src/pages/index.astro` | Modified | Industrial Hybrid static failure-open root. |
| `src/pages/variants/[variant].astro` | Added | Four generated static QA routes. |
| `src/styles/global.css` | Modified | Four responsive visual systems, accessibility, and shared layout rules. |
| `tests/*.ts` | Added | Rotation, middleware, content-integrity, and responsive copy-parity coverage. |
| `scripts/create-qa-comparisons.mjs` | Added | Reproducible reference/implementation comparison composites. |
| `docs/rotating-designs-work-log.md` | Modified | Append-only implementation history and complete ledger. |
| `docs/rotating-designs-design-qa.md` | Modified | Final matrix, visual review, discrepancies, and retests. |
| `docs/rotating-designs-release-record.md` | Modified | Closing validation, release state, and rollback instructions. |
| `docs/qa/2026-08-03/**` | Added | Baseline, concepts, matrix, Chrome, section, and comparison evidence. |
| `design-qa.md` | Added | Product Design pass marker after the closing checks. |

No tracked file was removed. The prior implementation inside modified files was replaced only where required for the redesign, routing, security, or build pipeline.

## 2026-08-03 16:20 EDT — Reference-board fidelity reset

- Objective: respond to the design review that the first four production variants had drifted too far from the supplied original boards. The visual target was reset to the attached reference layouts: cream/navy/rust technical systems, ruled panel rhythm, original typography hierarchy, diagram-like art direction, and materially distinct compositions.
- Files examined: the supplied board images in the temporary attachment directory and the preserved copies under `docs/qa/2026-08-03/concepts/`; `src/components/VariantPage.astro`; `src/styles/global.css`; the prior `src/assets/variants/*.png` masters; and the Product Design image-to-code guidance.
- Decision: use the supplied board imagery as the source of truth for this fidelity pass. The earlier Image 2.0 masters remain in the repository for history/rollback but are no longer used by the page. No new Image 2.0 generation was necessary because the user supplied the desired high-resolution reference art.
- Files added: `scripts/create-reference-art.mjs` and `src/assets/reference-art/**` (20 native PNG crops: five art slots per variant, with separate hero art direction for desktop/mobile).
- Asset method: measured each source board and extracted hero, Real Work, Larger Opportunity, Why AWAR3, and Contact slots with Sharp. Crops were kept at or above their rendered dimensions; no low-resolution enlargement or CSS stretching was introduced. Native-resolution inspections were performed with the image viewer and in the live page slots.
- Files changed: `src/components/VariantPage.astro` now uses the reference-art map, a native responsive hero `<picture>`, and shared semantic art figures; `src/styles/global.css` was replaced with board-faithful shared rules plus four variant systems. Marketing copy remains selectable HTML from the canonical content module.
- Browser correction: the first refreshed matrix exposed horizontal overflow at the 768px breakpoint. The responsive transition was moved from `767px` to `850px`, then rechecked at all seven required widths. A later 320px inspection confirmed zero remaining overflow or clipped text.
- Visual correction retained: early crops carried too much adjacent diagram edge. Slot crops were tightened, then hero and deep-section captures were reviewed again beside the source boards. Some source diagram labels remain intentionally inside the supplied technical illustrations; no marketing CTA, navigation, or page copy is rasterized.
- Verification: Astro check, Vitest, and production build passed after the fidelity reset. The refreshed in-app Browser matrix covered 28 variant/viewport combinations with one H1, ten canonical sections, identical normalized desktop/mobile copy, zero overflow, and zero clipped text. The preview remains local; no GitHub, Cloudflare, or production state was changed.

## Final file-change ledger continuation — fidelity reset

| Path | Change | Purpose |
| --- | --- | --- |
| `scripts/create-reference-art.mjs` | Added | Reproducible measured crops from the supplied reference boards. |
| `src/assets/reference-art/**` | Added | Crisp, art-directed board crops used in the four visual variants. |
| `src/components/VariantPage.astro` | Modified | Shared responsive reference-art placement while preserving canonical HTML copy. |
| `src/styles/global.css` | Modified | Restore the original boards' typography, palette, panel rhythm, and responsive compositions. |
| `docs/rotating-designs-work-log.md` | Appended | Record the design feedback, corrections, asset provenance, and final fidelity QA. |
| `docs/rotating-designs-design-qa.md` | Appended | Record the refreshed Browser matrix and reference comparison retest. |
| `docs/rotating-designs-release-record.md` | Appended | Record the post-reset build/check and local release state. |

No existing deployment-summary file, credentials, tokens, or private environment values were changed.

## 2026-08-03 18:05 EDT — Text-free contact-art correction and final desktop retest

- Objective: remove baked marketing copy from the contact illustrations while keeping each board's visual language and improving the final image quality.
- Files examined: the four prior contact crops in `src/assets/reference-art/`, the four supplied board references, `src/components/VariantPage.astro`, and the desktop contact slots in the in-app Browser.
- Image 2.0 generation: four separate 1774×887 PNG masters were generated from the supplied boards with text-free prompts and a right-weighted subject composition. The prompts required no labels, numbers, logos, diagrams, UI, CTA, marketing copy, watermark, or lettering; the HTML contact copy remains selectable in the shared component.

| Variant | Reference design | Prompt subject / composition | Final master | Delivery / use |
| --- | --- | --- | --- | --- |
| Field Station | Pastoral alpine field-station board | Mountain observatory, stream, conifers, secure field lock on the right; calm cream negative space on the left | `src/assets/desktop-art/field-station/contact.png` | Astro WebP derivatives; desktop Contact image |
| Airborne Workshop | Pastoral airborne-workshop board | Airship workshop over a coastal mountain town; mechanical detail on the right and calm cream/sky left | `src/assets/desktop-art/airborne-workshop/contact.png` | Astro WebP derivatives; desktop Contact image |
| Living Systems | Pastoral living-systems board | Alpine greenhouse, stream, meadow, mountains, botanical foreground weighted right | `src/assets/desktop-art/living-systems/contact.png` | Astro WebP derivatives; desktop Contact image |
| Industrial Hybrid | Pasted navy/cream/red technical board | Secure channel panel, circular lock, cyan status lights, red confidential panel weighted right | `src/assets/desktop-art/industrial-hybrid/contact.png` | Astro WebP derivatives; desktop Contact image |

- Native inspection: all four masters were opened at native resolution and then reviewed in their rendered desktop slots. No accidental lettering, watermark, blur, halo, or compression artifact was accepted. Astro's WebP pipeline reduced the rendered contact derivatives to approximately 18–286 kB depending on width.
- Implementation: `VariantPage.astro` now imports the four contact masters and serves `[768, 1024, 1536]` responsive widths. The old baked-copy contact imports were removed. `global.css` keeps the Industrial Hybrid `contain` fallback through 1350px so the machine remains fully visible on lower desktop widths; the 1440px target retains the denser board framing.
- Browser verification: all four forced variants were reloaded in the in-app Browser at 1440, 1280, and 1024px after the contact correction. One H1, ten canonical sections, one normalized copy snapshot, zero overflow, zero console logs, and loaded contact images were confirmed in the 12/12 matrix. Chrome/Computer Use was rechecked on Industrial Hybrid at a representative desktop width; navigation, headings, CTA, sharp artwork, and full semantic page content were present.
- Evidence: refreshed hero/contact screenshots are stored in `docs/qa/2026-08-03/desktop-pass/`; the full-page screenshot mode was retained only as a diagnostic because its sticky viewport behavior repeats tiles in this browser environment, so it is not used as fidelity evidence.
- Commands/results after this correction: `pnpm check` passed (16 files, 0 diagnostics); `pnpm test -- --run` passed (4 files, 15 tests); `pnpm build` passed (5 static pages, 60 optimized image outputs); `git diff --check` passed. No GitHub, Cloudflare, or production deployment was performed.

## Final file-change ledger continuation — contact-art correction

| Path | Change | Purpose |
| --- | --- | --- |
| `src/assets/desktop-art/field-station/contact.png` | Added | Image 2.0 text-free Field Station contact master. |
| `src/assets/desktop-art/airborne-workshop/contact.png` | Added | Image 2.0 text-free Airborne Workshop contact master. |
| `src/assets/desktop-art/living-systems/contact.png` | Added | Image 2.0 text-free Living Systems contact master. |
| `src/assets/desktop-art/industrial-hybrid/contact.png` | Added | Image 2.0 text-free Industrial Hybrid secure-channel master. |
| `src/components/VariantPage.astro` | Modified | Replaces baked-copy contact crops with optimized text-free masters. |
| `src/styles/global.css` | Modified | Extends the lower-desktop Industrial Hybrid no-crop fallback to 1350px, then retains dense 1440px framing. |
| `docs/qa/2026-08-03/desktop-pass/*` | Updated | Refreshed hero/contact evidence after the correction. |
| `docs/rotating-designs-work-log.md` | Appended | Records prompts, asset QA, correction history, and final checks. |
| `docs/rotating-designs-design-qa.md` | Appended | Records the final 12-cell desktop matrix and contact-art review. |
| `docs/rotating-designs-release-record.md` | Appended | Records the final local-only release validation. |

The untracked deployment-summary file remains unchanged.

## 2026-08-03 18:43 EDT — Exact supplied-board desktop correction

- Objective: correct the desktop implementation after the user confirmed that the three pastoral designs and Industrial Hybrid must match the supplied full-page boards exactly, rather than reinterpret their ingredients in new HTML layouts.
- Source-of-truth references: Field Station `exec-b440af3d-8c91-48ce-9dfa-42422943744e.png` (793×1983), Airborne Workshop `exec-987c37b7-d897-4741-97e7-3f4d8bee6603.png` (829×1897), Living Systems `exec-d5e6954e-621c-4692-9798-4a1214ef0316.png` (853×1844), and the supplied Industrial Hybrid clipboard board (748×2103).
- Decision: render each supplied board as the desktop composition itself. This intentionally supersedes the earlier reassembled desktop layouts because regenerating or reconstructing them would change proportions, line breaks, illustrations, and panel rhythm. The existing semantic responsive implementation remains unchanged below 851px until the separately requested mobile phase.
- Asset preparation: preserved exact source PNGs under `src/assets/exact-boards/source/`; created deterministic 2× Lanczos masters with a mild sharpen pass under `src/assets/exact-boards/master/`. No generative repaint was used in this correction because exact visual identity had higher priority than introducing new pixels. Astro serves one responsive WebP board per route at 1024, 1280, or 1440px; the 1440px outputs range from 854 kB to 1.4 MB.
- Implementation: added `src/components/ExactBoard.astro`; inserted it into the shared variant page; added desktop-only presentation rules that display the exact board at its native aspect ratio with transparent functional hotspots over Work, Rethink, Method, Contact, both inquiry CTAs, and the email address. No public selector or mobile change was added.
- Files added: `scripts/create-exact-board-masters.mjs`, four exact source PNGs, four sharpened master PNGs, and the evidence set under `docs/qa/2026-08-03/exact-board-pass/`.
- Files changed: `src/components/VariantPage.astro`, `src/styles/global.css`, this work log, the design-QA log, the release record, and the root `design-qa.md` status marker.
- Build verification before browser review: Astro check passed with 0 diagnostics; Vitest passed 15/15; production build passed with 5 static pages and 76 optimized image outputs; `git diff --check` passed.
- Browser setup correction retained: the in-app Browser backend was selected and made visible, but three fresh-tab attempts timed out while waiting for its webview to attach. The bootstrap troubleshooting procedure confirmed the backend was available but could not attach. Because the user had also enabled Computer Use and the approved plan explicitly calls for Chrome cross-checks, the visual pass continued in the existing Chrome AWAR3 tab.
- Chrome verification: all 12 desktop cells passed (1440, 1280, and 1024px × four variants). Every cell showed the exact board, one loaded visible image, zero visible broken images, zero horizontal overflow, four working anchor targets, and seven functional hotspots. Aspect-ratio drift was at most 0.000306. Console logs were empty.
- Interaction verification: the Field Station Work hotspot changed the URL to `#work` and completed a smooth scroll with the target at the top of the viewport; the inquiry hotspot resolves to `mailto:info@awar3.com?subject=AWAR3%20confidential%20inquiry`.
- Visual comparison: each supplied reference and its rendered Chrome capture were placed side by side in the same comparison image. All four pairs matched in composition, crop, typography, line breaks, illustration, color, and panel boundaries. Full-page 1440px Chrome captures were also opened and reviewed.
- Local route/header smoke: all four `/variants/{variant}/` routes returned HTTP 200, contained exactly one matching exact-board component, exposed four responsive exact-board assets, and retained the existing restrictive security headers and `noindex` QA policy.
- Failed command retained: the first shell matrix used zsh's read-only `status` variable and stopped; the corrected command used `http_code` and passed. A sandboxed Wrangler start could not bind loopback, while the already-running approved preview was confirmed by an escalated read-only loopback request.
- External state: no commit, pull request, Cloudflare preview deployment, or production deployment was created. The untracked deployment-summary file remains byte-identical at SHA-256 `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.

## File-change ledger continuation — exact supplied-board correction

| Path | Change | Purpose |
| --- | --- | --- |
| `scripts/create-exact-board-masters.mjs` | Added | Reproducibly create sharp 2× masters without changing the supplied artwork. |
| `src/assets/exact-boards/source/*.png` | Added | Preserve the four approved desktop boards as the source of truth. |
| `src/assets/exact-boards/master/*.png` | Added | High-resolution sharpened masters for responsive production encoding. |
| `src/components/ExactBoard.astro` | Added | Exact full-board rendering plus functional navigation and contact hotspots. |
| `src/components/VariantPage.astro` | Modified | Mount the exact desktop board before the retained semantic responsive page. |
| `src/styles/global.css` | Modified | Select the exact board at desktop widths and retain the prior mobile implementation below 851px. |
| `docs/qa/2026-08-03/exact-board-pass/*` | Added | Chrome full-page captures, top captures, and side-by-side reference comparisons. |
| `docs/rotating-designs-work-log.md` | Appended | Preserve this correction, tests, decisions, and failed attempts. |
| `docs/rotating-designs-design-qa.md` | Appended | Record the final 12-cell exact-board desktop matrix. |
| `docs/rotating-designs-release-record.md` | Appended | Record the local-only exact-board release state and rollback. |
| `design-qa.md` | Updated | Set the Product Design QA status to the required final marker. |

### Closing verification

- The direct Astro check initially attempted to initialize telemetry in a protected Preferences directory and stopped with `EPERM`. Re-running with the project-standard `ASTRO_TELEMETRY_DISABLED=1` setting passed: 18 files, 0 errors, 0 warnings, 0 hints.
- The final Vitest run passed all 15 tests across four files. The final production build passed with five pages and 76 optimized image outputs. `git diff --check` passed.
- The scheduled local root returned HTTP 200, `X-AWAR3-Variant: field-station`, `Cache-Control: public, max-age=0, must-revalidate`, the restrictive self-hosted CSP, and the exact Field Station board.
- The final deployment-summary SHA-256 remained `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.
- The Chrome tab handoff helper was exposed on the wrapper prototype but was not callable in this extension session. The viewport reset and final navigation had already completed, so the verified Chrome tab was left open on Field Station and its URL, title, and empty console were rechecked directly.

## 2026-08-03 18:54 EDT — Local-preview availability follow-up

- User report: the handed-off `http://127.0.0.1:8788/variants/field-station/` preview appeared unavailable.
- Action: attempted to start a new persistent Wrangler Pages preview on port 8788. Wrangler reported `Address already in use`, establishing that another preview process still owned the requested port.
- Verification: an approved read-only loopback request returned HTTP 200, `Content-Type: text/html`, `Cache-Control: no-store`, `x-robots-tag: noindex, nofollow`, and the `exact-board-field-station` marker.
- Browser retest: Chrome navigated to the exact route and confirmed the desktop board was displayed, the board image was fully loaded, horizontal overflow was zero, and the page title was correct. A fresh viewport capture was inspected successfully.
- Resolution: the preview URL is live again/confirmed live on port 8788; Chrome was left on the Field Station route for review. No source, deployment, or production state changed during this follow-up.

## 2026-08-03 19:00 EDT — Internal Browser attachment failure

- User request: open and inspect the Field Station route specifically in the internal ChatGPT Browser.
- Browser state: the internal Browser backend remained discoverable, but reported zero attached tabs, zero open tabs, and `visibility: false`. Calling the Browser visibility capability with `true` returned without error but the state remained false.
- Recovery attempts: retried visibility after a delay and retried creating a fresh internal Browser tab. The fresh-tab call again timed out while waiting for the Browser webview to attach.
- Computer Use recovery: attempted only to bring the Codex Browser panel into view, not to substitute another browser. The environment rejected control of `com.openai.codex` for safety reasons, so no UI action was taken.
- Result: the local route itself remains HTTP 200 and previously passed Chrome inspection, but the internal Browser webview cannot currently attach in this task. No source, local-server, deployment, or production state changed.

## 2026-08-03 19:08 EDT — Production deployment preflight

- User authorization: deploy all four variants to Cloudflare production, test the production links and visual rendering, and update the durable implementation/release logs.
- Starting source state: branch `main`, commit `f49a1427d41931094e4e4bfa5e586f992ef85396`, remote `https://github.com/digeratus/awar3.git`, with the complete redesign work still uncommitted. The existing deployment-summary file remains untracked and excluded from publication.
- Deployment configuration: `.github/workflows/deploy-pages.yml` validates pushes to `main`, installs pnpm 11.9.0 and Node 22, runs Astro check, Vitest, production audit, and build, then deploys `dist` to Cloudflare Pages project `awar3-astro-skunkworks` with `--branch=main` using repository secrets.
- Cloudflare tooling: Wrangler 4.118.0 is installed. The first sandboxed version check printed the version but could not write Wrangler's Preferences log (`EPERM`). An approved `wrangler whoami` network check then confirmed that the local Wrangler profile is not authenticated.
- Deployment decision: use the repository's established GitHub Actions → Cloudflare Pages production path instead of creating new local Cloudflare credentials. Cloudflare's current Pages documentation confirms that a `main`/production-branch deployment updates the Pages production environment and attached custom domains.
- GitHub tooling: the optional `gh` CLI is not installed, but a read-only `git ls-remote origin HEAD` succeeded and matched the local starting SHA, confirming the configured Git remote can be reached. Because this is an explicitly authorized production push rather than a pull-request workflow, publication will use scoped local `git` staging/commit/push and the existing Actions workflow.
- Final production preflight: Astro check passed across 18 files with 0 diagnostics; Vitest passed 15/15 tests; the production dependency audit completed with no high or critical advisory (2 low and 2 moderate remain as previously dispositioned); the production build passed with five pages and 76 optimized image outputs.
- Commit-scope note: `docs/rotating-designs-design-qa 2.md` is an older iCloud-conflict duplicate that still says QA is blocked and references superseded concepts. It will remain untracked and excluded from the release alongside the preserved deployment-summary file; the authoritative QA record is `docs/rotating-designs-design-qa.md`.

## 2026-08-03 18:07 EDT — Closing handoff check

- Final source state was rebuilt after the Industrial Hybrid framing decision: dense `cover` at the 1440px board target, `contain` fallback through 1350px for lower desktop widths.
- Final in-app Browser run: 12/12 forced desktop routes (1440, 1280, 1024px × four variants), one normalized copy snapshot, one H1, ten sections, zero overflow, and clean console logs. Final hero/contact evidence was refreshed and the Browser was left on the Field Station 1440px preview.
- Final commands: Astro check passed (16 files, 0 diagnostics), Vitest passed (15/15), production build passed (5 pages, 60 optimized image outputs), and `git diff --check` passed.
- Chrome/Computer Use remained read-only and representative; no external state, GitHub, Cloudflare, or production deployment was changed. Deployment-summary SHA-256 remains `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.

## 2026-08-03 17:35 EDT — Four-board desktop implementation pass

- Objective: implement the user's selected Pastoral Trio plus the pasted Industrial Hybrid board as four desktop-first visual routes, keeping the existing canonical copy, route model, and daily-rotation behavior unchanged for later mobile review.
- References: Pastoral Field Station (`exec-b440af3d-8c91-48ce-9dfa-42422943744e.png`), Airborne Workshop (`exec-987c37b7-d897-4741-97e7-3f4d8bee6603.png`), Living Systems (`exec-d5e6954e-621c-4692-9798-4a1214ef0316.png`), and the pasted Industrial Hybrid board (`/var/folders/w6/xxyc877s6b79zc5tgdybxdnm0000gn/T/codex-clipboard-1613586a-37e7-400e-b83b-faa9db41ff75.png`).
- Files examined: `src/components/VariantPage.astro`, `src/styles/global.css`, `src/content/site.ts`, existing reference-board crops, the four concept boards, and the preserved deployment summary. The deployment summary remained byte-identical (SHA-256 `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`).
- Implementation: added a desktop-art master set under `src/assets/desktop-art/{field-station,airborne-workshop,living-systems,industrial-hybrid}/`; wired hero and Real Work slots into the shared Astro component; switched those slots to Astro image optimization with explicit sizes, WebP output, eager hero loading, and lazy deep art; added board-specific desktop composition overrides for the pastoral, airborne, living-systems, and dark technical industrial systems.
- Image 2.0 production assets: eight accepted masters were generated from the supplied boards with text-free prompts, no logos/labels/CTAs, crisp native detail, and explicit subject-safe composition. Hero masters are 1536×1024: `field-station/hero.png` (alpine observatory), `airborne-workshop/hero.png` (airborne workshop), `living-systems/hero.png` (living field station), and the Industrial Hybrid `hero.png` (isometric systems core). Work masters are 1774×887: one text-free systems/workshop illustration per design. All are stored in the project and delivered through Astro's responsive WebP pipeline; build output showed 37–441 kB optimized derivatives from 2.5–3.3 MB PNG masters.
- Failed attempt retained: the first Industrial Hybrid hero master cropped the machine at the right edge in Chrome. A CSS `contain` correction produced excessive letterboxing, so the master was regenerated with an 8% subject safety margin and final `object-position: right center` framing. The final Browser/Chrome capture shows the full machine with no edge crop.
- Verification tools: bundled Node/pnpm runtime for Astro check, Vitest, and build; in-app Browser at 1440, 1280, and 1024px for all four forced variants; Chrome desktop cross-check for Industrial Hybrid; Computer Use accessibility tree and screenshot for the same route; `git diff --check`.
- Browser result: 12/12 final desktop matrix cells passed structural checks (one H1, ten canonical sections, no horizontal overflow, no console logs, canonical-copy parity, and in-view image loads). Hero and deep contact captures were saved under `docs/qa/2026-08-03/desktop-pass/`. Mobile behavior was intentionally not re-approved in this pass and remains the next review phase.
- Commands/results: `pnpm check` passed (15 files, 0 errors/warnings/hints); `pnpm test -- --run` passed (4 files, 15 tests); `pnpm build` passed (5 static pages, 52 optimized image outputs); `git diff --check` passed. No GitHub, Cloudflare, or production deployment was performed.
- Audit note: a closing `pnpm audit --prod --audit-level high` attempt was retained as a failed network preflight because the sandbox could not resolve `registry.npmjs.org` (`ENOTFOUND`); the prior completed security scan and dependency disposition remain the authoritative security record.

## Final file-change ledger continuation — desktop board pass

| Path | Change | Purpose |
| --- | --- | --- |
| `src/assets/desktop-art/field-station/hero.png` | Added | Image 2.0 high-resolution Pastoral Field Station hero master. |
| `src/assets/desktop-art/field-station/work.png` | Added | Image 2.0 text-free field operations illustration. |
| `src/assets/desktop-art/airborne-workshop/hero.png` | Added | Image 2.0 high-resolution Airborne Workshop hero master. |
| `src/assets/desktop-art/airborne-workshop/work.png` | Added | Image 2.0 text-free airborne workshop illustration. |
| `src/assets/desktop-art/living-systems/hero.png` | Added | Image 2.0 high-resolution Living Systems hero master. |
| `src/assets/desktop-art/living-systems/work.png` | Added | Image 2.0 text-free living-systems workshop illustration. |
| `src/assets/desktop-art/industrial-hybrid/hero.png` | Added/replaced | Image 2.0 technical machine master; final version regenerated after the first crop failed Chrome review. |
| `src/assets/desktop-art/industrial-hybrid/work.png` | Added | Image 2.0 text-free industrial work-system illustration. |
| `src/components/VariantPage.astro` | Modified | Uses the new masters for desktop hero/work slots and Astro-optimized delivery. |
| `src/styles/global.css` | Modified | Adds distinct desktop compositions and the final Industrial Hybrid framing correction. |
| `docs/qa/2026-08-03/desktop-pass/*` | Added | Final four-variant desktop hero/contact evidence captures. |
| `docs/rotating-designs-work-log.md` | Appended | Records this implementation pass, generation prompts, correction history, and ledger. |
| `docs/rotating-designs-design-qa.md` | Appended below | Records the desktop-only matrix, visual review, and mobile deferral. |
| `docs/rotating-designs-release-record.md` | Appended below | Records local-only desktop release validation and rollback state. |

## 2026-08-03 17:39 EDT — Final narrow-desktop art-direction correction

- Objective: retest Industrial Hybrid at the lower desktop boundary after the regenerated full-subject master was accepted at 1440px.
- Finding: the 1024–1250px panel is materially narrower than the 3:2 master; `cover` preserved density but cropped the circular intake. The final responsive desktop rule uses `contain` and right alignment in that range so the entire technical machine remains visible. The 1440px board target keeps the denser `cover` framing.
- Retest: 1440px remains full and balanced; 1024px shows the complete machine with intentional cream breathing room, zero overflow, and no clipping. The correction is CSS-only; no content or route behavior changed.

## 2026-08-03 20:25 EDT — Interrupted deployment cleanup and size audit

- Context: the production publish attempt was interrupted before the authenticated GitHub integration assembled the final tree or advanced `main`. The remote production branch and Cloudflare deployment therefore remained unchanged. The prepared local commit is `b4b346f` (`Deploy exact rotating AWAR3 designs`).
- Size audit: the workspace measured approximately 985 MB: `node_modules/` 604 MB (local dependencies, ignored and never deployed), `.git/` 173 MB (unpacked local Git objects created by the image-heavy local commit), `src/assets/` 95 MB (production masters plus duplicated source/reference sets), `docs/qa/` 80 MB (screenshots and comparison boards retained as evidence), and `dist/` 31 MB (actual production build output).
- Primary cause: the repository currently retains original concept/source images, 2× sharpened exact-board masters, additional desktop/mobile art masters, generated responsive derivatives in `dist`, and a large QA screenshot archive. The exact-board masters alone are about 34 MB, while redundant or historical artwork and visual evidence account for most of the remaining image weight.
- Runtime cleanup: found a six-hour-old local Wrangler preview tree holding `127.0.0.1:8788`: wrapper PID 79091, Wrangler PID 79098, esbuild PID 79099, and workerd PIDs 79103 and 82884. Sent `SIGTERM` to those exact PIDs only. Verification showed port 8788 closed and no AWAR3/Wrangler/workerd/Astro/Vite/pnpm process remained.
- Temporary-file cleanup: removed only the task-created `/private/tmp/awar3-github-upload.8kUvrX` (43 MB interrupted blob staging) and `/private/tmp/awar3-wrangler-state` (6.2 MB preview state). These generated temporary files are not recoverable, but contained no source-of-record data.
- Preserved files: no project source or user-authored untracked file was removed. `AWAR3_Astro_Cloudflare_Deployment_Summary_2026-04-26.md`, `design-qa 2.md`, and `docs/rotating-designs-design-qa 2.md` remain untracked and untouched.
- Follow-up recommendation: before the next publish, amend the unpublished local commit to exclude most `docs/qa/` images, remove unused duplicate asset families, generate 2× board masters during the build from one canonical source set, subset the 2.9 MB Phosphor SVG bundle, and retain only representative QA captures. This can materially reduce both GitHub transfer size and the 31 MB Pages bundle without reducing the displayed board sharpness.

## 2026-08-03 15:19 EDT — Final validation and local handoff

- Objective: validate the exact closing source tree and leave the working Cloudflare preview open for review.
- Passed: Astro check across 15 files with 0 errors, 0 warnings, and 0 hints.
- Passed: Vitest across 4 files with 15 tests, including responsive copy parity.
- Passed: production build of 5 static pages and 48 optimized image outputs.
- Passed: `pnpm audit --prod --audit-level high` with no high or critical advisory; 2 low and 2 moderate non-applicable advisories remain documented in the security record.
- Passed: final Cloudflare header smoke for the scheduled root, valid override, invalid override, and static QA route.
- Passed: final in-app Browser root check at `1440 × 1000`: scheduled Field Station, ten ordered sections, one H1, no broken images, no horizontal overflow, and `/site.js` loaded from the same origin.
- Passed: `git diff --check` with no whitespace errors.
- Closing failures/corrections retained: pnpm initially requested a non-interactive virtual-store rebuild; an offline reinstall lacked one cached font tarball; the approved frozen network reinstall restored 382 packages. Direct shims lacked a system Node, so the bundled runtime executed the final commands. The first responsive hidden-content assertion included decorative `aria-hidden` icons; it was narrowed to canonical section elements and passed. A sandboxed Wrangler restart could not bind, while the existing approved local worker was confirmed listening and passed the escalated loopback smoke tests.
- Release decision: no Git commit, pull request, Cloudflare preview, or production deployment was created during this handoff. The verified local preview remains the review target; the prepared workflow will create a PR preview and preserve main-only production when publication is approved.

## 2026-08-03 20:54 EDT — Asset-set and unpublished-commit slimming

- User authorization: reduce the oversized asset set and amend the unpublished redesign commit without changing the four approved desktop boards or touching the preserved untracked deployment-summary/conflict files.
- Starting measurement: workspace approximately 985 MB; `node_modules/` 604 MB, `.git/` 173 MB of unpacked local objects, `src/assets/` 95 MB, `docs/qa/` 80 MB, and `dist/` approximately 31 MB. The unpublished commit required about 176 MiB of blob transfer.
- Exact boards: retained the four canonical supplied boards under `src/assets/exact-boards/source/`; removed the four committed 2× PNG derivatives. `scripts/create-exact-board-masters.mjs` now deterministically creates lossless WebP masters in the ignored `src/assets/exact-boards/master/` directory before both check and build. Decoded-pixel SHA-256 comparison against commit `b4b346f` proved all four regenerated masters pixel-identical to the prior committed PNG masters.
- Supporting art: converted the twelve used `src/assets/desktop-art/` PNG masters to WebP quality 94 (35 MB to 7.0 MB, measured PSNR 35.49–43.44 dB), converted the twelve used reference illustrations to WebP quality 94 (2.2 MB to 0.5 MB, PSNR 38.36–45.68 dB), and removed 28 unused reference illustrations plus the unused 11 MB `src/assets/variants/` family.
- Social asset: replaced the 1.2 MB PNG social preview with a 1200×630 high-quality 4:4:4 JPEG at approximately 0.3 MB and updated canonical metadata.
- Icons: replaced the full multi-format Phosphor stylesheet payload (including a 2.9 MB SVG font) with the official 144 KB Phosphor WOFF2 plus CSS mappings for only the eight used glyphs. Corrected two invalid legacy class names (`ph-nodes`, `ph-radar`) to valid library glyphs (`ph-graph`, `ph-crosshair`). The package runtime dependency was removed and its MIT license retained under `docs/licenses/`.
- QA evidence: reduced `docs/qa/` from 137 files / 80 MB to 12 files / 6.2 MB. Retained two live baselines, four final 1440px desktop boards, four final 390px responsive captures, one 1024px Industrial Hybrid framing capture, and a README explaining the evidence set. All intermediate crops, superseded comparisons, and duplicate captures remain documented historically in the append-only logs but are no longer committed.
- Guardrail: added `scripts/check-asset-budget.mjs`, a `check:assets` package script, and a GitHub Actions gate. Current budgets pass: tracked source assets 18.5/22 MiB, QA evidence 6.2/8 MiB, social assets 0.3/0.5 MiB, and production build 24.0/25 MiB.
- Rendered QA: the in-app Browser loaded all four forced routes at 1440px and 390px. Desktop used the exact board with a loaded 1440px derivative, zero overflow, no overlay, and clean logs. Mobile used the shared semantic site, the subset font loaded, all four area icons produced real glyph content, zero overflow, and clean logs.
- Link correction discovered during QA: the hidden desktop board and mobile semantic content duplicated `work`, `rethink`, `method`, and `contact` IDs. Desktop-only board hotspots now target distinct `#exact-*` anchors. Retest: the mobile Method link reaches `#method` with the section at the viewport and no duplicate IDs; the desktop Work hotspot reaches `#exact-work` with its anchor at the viewport and no duplicate IDs.
- Failed checks retained: the first lifecycle invocation could not find a global `node` in this Codex shell, and the first direct Astro invocation tried to create a telemetry preferences directory outside the sandbox. The bundled Node runtime plus `ASTRO_TELEMETRY_DISABLED=1` completed the authoritative check. GitHub Actions supplies Node 22 on `PATH`, so normal lifecycle hooks remain portable.
- Final local validation before commit amendment: Astro check passed (17 files, 0 diagnostics), Vitest passed 15/15, production build passed (5 pages, 76 optimized image outputs), Browser desktop/mobile checks passed, and the asset-budget gate passed. Production remained unchanged.

### Slimming file-change ledger

| Path | Change | Purpose |
| --- | --- | --- |
| `src/assets/exact-boards/source/*` | Retained | Single canonical supplied board source per design. |
| `src/assets/exact-boards/master/*` | Removed from Git / generated | Pixel-identical lossless build derivatives, ignored after generation. |
| `src/assets/desktop-art/**/*.webp` | Added | Quality-94 replacements for twelve large PNG masters. |
| `src/assets/reference-art/*.webp` | Added | Only the twelve referenced mobile/opportunity/why illustrations. |
| `src/assets/variants/` | Removed | Unused 11 MB legacy hero family. |
| `src/assets/fonts/phosphor-regular.woff2` | Added | Official single-format Phosphor icon font. |
| `src/styles/phosphor-subset.css` | Added | Eight used icon mappings only. |
| `public/og/awar3-social.jpg` | Added | Smaller stable social preview. |
| `docs/qa/2026-08-03/` | Pruned | Representative evidence set retained; 126 redundant files removed. |
| `scripts/check-asset-budget.mjs` | Added | Prevents future source, QA, social, and build bloat. |
| `scripts/create-exact-board-masters.mjs` | Modified | Generates ignored lossless WebP masters from canonical sources. |
| `.github/workflows/deploy-pages.yml` | Modified | Enforces asset budgets after production build. |

### 2026-08-03 21:04 EDT — Closing validation correction

- Two package-manager lifecycle attempts stopped before executing because the local `node_modules` virtual-store metadata requested a non-interactive purge. No source or dependency files were changed by either attempt. The same repository scripts were then run directly with the bundled Node runtime.
- Authoritative closing results: exact-board generation passed; Astro check passed across 17 files with 0 diagnostics; Vitest passed 15/15; the production build passed with 5 pages and 76 optimized image outputs; and the asset-budget gate passed.
- The fresh production build measures 23.1 MiB, improving on the earlier approximately 24.0 MiB measurement. Source, QA, and social budgets remain 18.5/22 MiB, 6.2/8 MiB, and 0.3/0.5 MiB respectively.

### 2026-08-03 21:08 EDT — Commit amendment and cleanup completed

- Amended the unpublished local `Deploy exact rotating AWAR3 designs` commit in place. The slim commit contains 25.3 MiB across 76 unique new blobs relative to the published baseline, down from approximately 176 MiB (about an 86% reduction). Nothing was pushed or deployed.
- Rechecked the preserved deployment-summary file at SHA-256 `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`; it and the two pre-existing conflict-suffixed Markdown files remain untracked and unchanged.
- Closed the in-app Browser QA tabs, stopped the local Wrangler preview, removed the task-created AWAR3 temporary files, and confirmed no Node/Workerd/Wrangler listener remains. Port 8788 is closed.
- The local `.git/` directory still retains the superseded commit objects through Git's reflog for recovery. Those objects do not belong to the new commit and will disappear through normal future garbage collection; they were intentionally not force-pruned.

### 2026-08-03 22:15 EDT — Desktop-only reduction from 23.1 MiB to four boards

- User authorization: reduce the unpublished redesign to exactly four new desktop design files—Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid. Do not create or retain new mobile design files. Keep the already-published responsive site as the temporary sub-851px experience until mobile design work is separately approved.
- Starting state: published Git/Cloudflare baseline remained `f49a1427d41931094e4e4bfa5e586f992ef85396`; unpublished local commit was `f51db98bb70dec92dbb6d9a50ce00e49d05d5d90`; the prior candidate build measured 23.1 MiB and its unique new-blob payload measured 25.3 MiB. No remote ref or Cloudflare deployment was changed during this pass.
- Production desktop files retained under `public/designs/`:

| Variant | File | Dimensions | Bytes | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Field Station | `field-station.webp` | 1440×3601 | 1,082,910 | `39f8efd8f7eadab50965c6beef298508b6d7b6843ca7ef9449edbd6ceeb466d3` |
| Airborne Workshop | `airborne-workshop.webp` | 1440×3295 | 984,810 | `c0d2e2cf2625a32e5916f7db27711d2ac8d80678e11715b20e2b2a1e410cd49d` |
| Living Systems | `living-systems.webp` | 1440×3113 | 1,052,390 | `01d81fdcc08a05f3a51b17d1f08b0eeb50239d4c74d68a4e82571d7492264d47` |
| Industrial Hybrid | `industrial-hybrid.webp` | 1440×4049 | 767,980 | `7c39b23c9a7355f06888338da2e2c8a89443a18e5af0291c3563dbf1814717f7` |

- The four files total 3.71 MiB. They are the previously approved 1440px exact-board outputs copied byte-for-byte; this pass did not regenerate or reinterpret their artwork.
- Removed every other new raster family from the publishable tree: exact-board PNG sources and generated masters, desktop supporting art, reference art, mobile hero art, variant archives, social preview, icon font, and all generated responsive derivatives. Removed the four self-hosted font packages and the direct Sharp dependency because the desktop board itself contains the approved typography.
- Restored the pre-redesign live page as `LegacyMobile.astro` and display it only below 851px. It contains no raster `<img>` files and therefore adds no new mobile design artwork. The desktop `<picture>` uses a one-pixel data placeholder below 851px, so the four desktop boards are not requested by the mobile fallback.
- Security correction: Browser QA found the restored mobile navigation script was inline and therefore blocked by the existing `script-src 'self'` Content Security Policy. Moved the 2.5 kB progressive-enhancement code to `public/legacy-mobile.js`; the menu, anchor closing behavior, reveal effects, and mission tabs then worked without loosening CSP.
- QA archive: moved the 6.2 MB `docs/qa/2026-08-03/` evidence directory intact to the adjacent non-deployable path `/Users/riceandrobots/Library/Mobile Documents/com~apple~CloudDocs/Files/AWAR3_site/AWAR3_QA_Archive_2026-08-03`. The move is recoverable and keeps the evidence out of Git and Cloudflare. `docs/qa/README.md` records the archive location; no screenshot binaries remain in the repository.
- Guardrail: rewrote `scripts/check-asset-budget.mjs` to require exactly the four approved WebPs, cap them at 3.80 MiB total, reject files under `src/assets`, retain only the QA README, and cap the complete `dist/` directory at 4.10 MiB. Updated the CI step label to describe the desktop-asset tests.
- Test-suite scope: replaced now-inapplicable Candidate 1B responsive-copy tests with `tests/desktop-only-assets.test.ts`, which asserts the exact four-file allowlist, desktop/fallback composition, no Astro asset pipeline, no new mobile art references, and the 851px cutoff. Rotation and Pages Function tests remain intact.
- Failed attempts retained: the first sandboxed Wrangler preview could not create its log, exceeded file-watch resources, and could not bind its inspector. It was replaced with an approved loopback-only Wrangler preview. Two package-manager wrapper checks then requested a non-interactive module purge; the sandboxed frozen install could not resolve the registry. An approved frozen install restored all 377 locked packages from cache, after which direct bundled-Node validation was authoritative.
- Final local validation: Astro check passed across 16 files with 0 diagnostics; Vitest passed 13/13 across 3 files; Astro built 5 pages; the asset gate passed at 3.71 MiB of boards and 3.78 MiB for the complete production build.
- Browser validation: all four forced routes passed at 1440×900 with the correct 1440px board, hidden legacy fallback, zero overflow, and no console logs. All four passed at 390×844 with the board hidden, the existing live page visible, zero raster images in that fallback, a one-pixel desktop placeholder, zero overflow, and no console logs. The Field Station desktop Work hotspot scrolled to `#exact-work`; the mobile menu opened, its Contact link reached `#contact`, and the menu closed.
- Evidence retained outside the deployable repository: `awar3-desktop-only-desktop.png` and `awar3-desktop-only-mobile.png` under `/Users/riceandrobots/.codex/visualizations/2026/08/03/019fc883-5bdf-7f10-888c-ba99fa0b39a7/`.
- Preserved files: `AWAR3_Astro_Cloudflare_Deployment_Summary_2026-04-26.md`, `design-qa 2.md`, and `docs/rotating-designs-design-qa 2.md` remain untracked and unchanged. No credentials, tokens, private environment values, or secret material were recorded.

#### File-change ledger — desktop-only reduction

| Path | Change | Purpose |
| --- | --- | --- |
| `public/designs/*.webp` | Added (4) | Only new production design images. |
| `src/components/ExactBoard.astro` | Simplified | Directly serves one allowed board at desktop widths; mobile receives a data placeholder. |
| `src/components/LegacyMobile.astro` | Added | Preserves the existing live responsive experience below 851px without new mobile art. |
| `public/legacy-mobile.js` | Added | CSP-compatible progressive enhancement for the fallback page. |
| `src/components/VariantPage.astro` | Simplified | Composes only the exact desktop board and existing live fallback. |
| `src/layouts/BaseLayout.astro` | Simplified | Removes new font/icon/social/client payloads and selects the correct skip link by viewport. |
| `src/styles/global.css` | Replaced/simplified | Restores live-site responsive styling and adds the desktop-board breakpoint/hotspots. |
| `src/assets/` | Removed | Eliminates all supporting, mobile, source, generated, and font assets from the candidate. |
| `public/og/awar3-social.jpg`, `public/site.js` | Removed | Eliminates nonessential raster and obsolete client payload. |
| `scripts/check-asset-budget.mjs` | Rewritten | Enforces the four-file and total-build limits. |
| `tests/desktop-only-assets.test.ts` | Added | Prevents reintroduction of extra desktop/mobile asset families. |
| `tests/content-integrity.test.ts`, `tests/responsive-copy-parity.test.ts` | Removed | Removes tests for the deferred semantic redesign implementation. |
| `docs/qa/2026-08-03/` | Moved outside repository | Keeps 6.2 MB of prior evidence recoverable but unpublished. |
| `docs/qa/README.md` | Updated | Documents the external archive and four-file production policy. |
| `package.json`, `pnpm-lock.yaml` | Slimmed | Removes unused fonts, Sharp, and board-generation lifecycle scripts. |
| `.github/workflows/deploy-pages.yml` | Updated | Names the remaining validation gate accurately. |

### 2026-08-03 22:20 EDT — Commit measurement before final record amendment

- Amended the existing unpublished commit in place. Relative to published `origin/main` (`f49a1427d41931094e4e4bfa5e586f992ef85396`), the candidate contained approximately 4.00 MiB across 36 unique new blobs before this final record entry—down from 25.3 MiB and the original approximately 176 MiB candidate.
- The working tree contained only the three preserved, pre-existing untracked Markdown files. The deployment-summary SHA-256 remained `84f57d5090f1c446a73f779ccb2bba7a42970ba7e17ceb731af3f7e368901b0b`.
- Nothing was pushed or deployed. The repository's current commit is the authoritative final candidate identifier after the closing documentation amendment.

### 2026-08-03 22:25 EDT — Closing cleanup

- During the locked dependency-directory recreation, the already-running Wrangler watcher temporarily reported missing Astro/Wrangler files and continued serving its last successfully built worker. After dependency restoration and the clean build, it reloaded successfully; the final Browser and HTTP checks above used the recovered worker.
- Stopped the exact local Wrangler preview session, removed its task-created `/private/tmp/awar3-desktop-only-wrangler-state` log/state directory and repository-local `.wrangler/` scratch directory, and confirmed port 8788 has no listener. A listener scan returned only its column header and no Node, Workerd, Wrangler, Astro, Vite, or pnpm process row.
- Cleanup removed generated preview state only; source, the four boards, external QA archive, and the three preserved untracked Markdown files were not removed.

### 2026-08-03 22:42 EDT — Local storage and process cleanup

- User authorization: measure the complete local AWAR3 folder, remove unnecessary generated files, and stop the `replayd` and Node processes created by the design/Browser work.
- Starting local measurement: AWAR3 folder 774 MB; repository 767 MB. The main contributors were `node_modules/` 574 MB, loose `.git/objects` 185.05 MiB, `dist/` 4.0 MB, the retained external QA archive 6.2 MB, and the four production boards 3.7 MB.
- Removed only rebuildable local outputs: repository `node_modules/`, `dist/`, and `.astro/`. These can be recreated from the locked dependencies and build scripts and were not tracked or deployed. The complete AWAR3 folder fell from 774 MB to 196 MB before Git-history cleanup.
- Process cleanup: stopped the stuck AWAR3 frozen-install Node process and three AWAR3-specific ChatGPT Node kernels (two orphaned older kernels plus the current Browser/Node REPL kernel). Process working directories and commands were checked first. Node kernels belonging to unrelated Codex tasks in other directories were deliberately left untouched.
- `replayd` cleanup: the user-owned `/usr/libexec/replayd` process ignored `SIGTERM`, so its exact PID was force-stopped. macOS launchd immediately created a fresh instance, reducing the process to approximately 15 MB RSS. The service was not disabled because it is an operating-system-managed screen-recording service and may be needed by other applications.
- Git integrity correction: removed an invalid iCloud-conflict ref named `.git/refs/heads/main 2`. It contained the already-preserved published commit `f49a1427d41931094e4e4bfa5e586f992ef85396`, also stored at `origin/main`; deleting the malformed duplicate removed no unique commit and restored `git fsck`/history traversal.
- Git object audit: all loose objects total 187.55 MiB across 435 objects; current branches require 4.25 MiB across 103 objects. Approximately 183 MiB belongs only to superseded local image-heavy redesign commits retained by reflog. After this record amendment, expire only unreachable reflog entries and run Git garbage collection; retain the current candidate and published baseline.
- Intentionally retained: the 6.2 MB adjacent `AWAR3_QA_Archive_2026-08-03`, four production boards, source/tests/logs, and three pre-existing untracked Markdown files.

#### Closing measurement after cleanup

- Expired reflog entries for superseded unreachable commits and ran Git garbage collection with immediate unreachable-object pruning. This permanently removed the obsolete image-heavy commit objects while retaining the current candidate and published `origin/main` baseline.
- Final complete AWAR3 folder: 14 MB, down from 774 MB. Final repository: 8.2 MB. Final Git database: 3.9 MB in one 3.87 MiB pack containing 103 reachable objects, down from 185 MB of loose objects. `git fsck --full` returned clean.
- Final retained non-repository evidence: 6.2 MB QA archive. Final retained production imagery: four WebPs totaling 3.7 MB.
- Final process verification: no Node, pnpm, Workerd, Wrangler, Astro, or Vite process has the AWAR3 working directory. The fresh launchd-managed `replayd` instance settled to approximately 2.3 MB RSS. Unrelated Node kernels whose working directories belong to other Codex tasks were not stopped.
- Final working-tree state still contains only the three preserved pre-existing untracked Markdown files; no tracked source changed as a side effect of deleting generated dependencies/build output or pruning Git history.

### 2026-08-03 23:07 EDT — Release tooling installation and Astro decision

- User authorization: stop all remaining user-level Node processes, install Homebrew and GitHub CLI properly, then continue toward the production Cloudflare deployment.
- Astro review: the lockfile already resolves Astro 6.4.8. Astro 7.1.4 is available, but the release candidate remains on the already-tested Astro 6 version. This project emits five small static pages and uses an independent Cloudflare Pages Function; Astro 7's primary build-pipeline, Markdown, and Workers/SSR benefits do not justify adding a major-version regression risk immediately before production deployment. A future Astro 7 evaluation should be isolated on a separate branch after release.
- Process cleanup: stopped all user-level Node and ChatGPT Node REPL/kernel processes before installation. Computer Use temporarily started one Node REPL and one Node kernel solely to inspect the macOS Installer UI; both exact processes were stopped after installation, and a final process scan found no Node/Node REPL/kernel process.
- Homebrew installation: downloaded the official Homebrew installer script from `Homebrew/install` and recorded SHA-256 `8ff338091a5e10bb5fc040b38316648110f42feff057ecf9feaab51fd0a13ef9`. The script could not obtain non-interactive sudo authorization, so installation completed through Homebrew's official macOS package and the normal macOS Installer authorization flow. Verified Homebrew 6.0.15 at `/opt/homebrew/bin/brew`.
- Shell integration: added the standard `eval \"$(/opt/homebrew/bin/brew shellenv)\"` entry to `/Users/riceandrobots/.zprofile`; a fresh login shell resolves both `brew` and `gh` under `/opt/homebrew/bin`.
- GitHub CLI installation: installed the Homebrew bottle for GitHub CLI 2.97.0 and verified `brew list --versions gh` reports `gh 2.97.0`.
- Cleanup: deleted the task-created `/private/tmp/Homebrew.pkg` (approximately 144 MB) and `/private/tmp/homebrew-install.sh` after installation. These temporary downloads are not recoverable, but both can be downloaded again from the official sources.
- Authentication status: `gh auth status` reports no authenticated GitHub host. No token, credential, private environment value, Git push, GitHub change, or Cloudflare deployment occurred during this entry. GitHub OAuth authorization requires the user's explicit confirmation and participation before publishing can continue.

### 2026-08-03 23:12 EDT — GitHub CLI authorization completed

- With explicit user confirmation, started GitHub CLI's browser-based OAuth device flow for `github.com` using HTTPS Git operations. The user completed GitHub's approval step; `gh auth status` then confirmed the active account `digeratus`, with the credential stored in the macOS keyring.
- No one-time device code, OAuth token, credential value, or private environment value is retained in this work log.
- Final publishing preflight confirmed local `main` is one prepared commit ahead of `origin/main`; the only tracked working-tree change is this append-only record. The three preserved untracked Markdown files remain excluded from the release.

### 2026-08-03 23:20 EDT — GitHub push, Cloudflare production deployment, and live smoke

- Amended the unpublished release commit with the installation/authentication record, producing final site-changing commit `8a0be233462bd83dc2b2169d7751b7832c259900`. Explicitly staged only `docs/rotating-designs-work-log.md`; the three preserved untracked Markdown files were not staged.
- Pushed local `main` to `origin/main`, advancing GitHub from `f49a1427d41931094e4e4bfa5e586f992ef85396` to `8a0be233462bd83dc2b2169d7751b7832c259900` and triggering production workflow `30874086073`.
- GitHub Actions completed successfully: repository checkout, pnpm setup, dependency installation, Astro type checking, unit/desktop-asset tests, production audit, build, asset budgets, artifact upload, Pages Function build, and production deploy all passed. A non-blocking runner annotation noted Node-20-targeting actions were forced to Node 24.
- Cloudflare Pages project `awar3-astro-skunkworks` uploaded 14 files and deployed `_headers`, `_routes.json`, and the Functions bundle. Deployment identifier/URL: `ad0eeb51` / `https://ad0eeb51.awar3-astro-skunkworks.pages.dev`.
- Production HTTP smoke passed for the canonical root, `www` redirect, all four static variant routes, valid and invalid overrides, robots, sitemap, stylesheet, favicon, mobile script, and all four design images. Root selected Field Station; variant/cache/SEO/security headers matched the planned behavior.
- Downloaded each live board and compared SHA-256 with the approved local source. All four pairs matched exactly. Desktop and iPhone user agents received the same Field Station variant and, after normalizing Cloudflare's randomized email-obfuscation tokens, byte-identical HTML.
- Failed attempt preserved: the in-app Browser could not reconnect after the user-requested shutdown of every Node process, because that shutdown included the Browser plugin's helper. Reconnection and reset calls returned a closed transport. No post-deployment visual/interactive Browser pass is claimed; the successful pre-deployment Browser matrix remains the visual baseline, and production visual/click QA is explicitly pending a Browser-helper restart.
- No credential, OAuth token, one-time authorization code, Cloudflare secret, GitHub secret, or private environment value was written to the repository.

### 2026-08-04 09:18 EDT — Rotation confirmation, public-repository review, and security record

- User-visible rotation confirmed: the public repository is `digeratus/awar3` and is intentionally public. The Cloudflare root response on this date returned `X-AWAR3-Date: 2026-08-04` and `X-AWAR3-Variant: airborne-workshop`; the response also returned the planned HSTS, CSP, anti-framing, MIME-sniffing, Permissions-Policy, and referrer-policy headers.
- Rotation explanation recorded for posterity: the Pages Function converts the current instant to the `America/New_York` calendar date, applies the fixed sequence anchored on 2026-08-03, and selects independently of device or viewport. The expected sequence is Field Station on Aug 3, Airborne Workshop on Aug 4, Living Systems on Aug 5, Industrial Hybrid on Aug 6, then Field Station again on Aug 7 and repeat. The change occurs at New York midnight, not at a browser refresh interval.
- Read-only public-repository security review repeated against pushed commit `8a0be233462bd83dc2b2169d7751b7832c259900`: tracked-tree secret-pattern scan found no API keys, Cloudflare credentials, GitHub tokens, passwords, private keys, or other credential values. The four published design boards and the static site code contain no embedded image author/software/path metadata.
- Security conclusion: nothing publicly pushed provides an attacker with company access or a direct production-control credential. One low-impact privacy disclosure remains in the public release history: a few local workstation paths/tool identifiers and the host-derived Git author email. These do not grant access, but future release notes should use repository-relative paths and the GitHub noreply identity. Removing them from already-published history would require a deliberate history rewrite and was not performed.
- Workflow hardening items recorded separately from confirmed exposure: protect `main`, enable GitHub vulnerability/Dependabot alerts, scope `deployments: write` only to the deploy job, disable checkout credential persistence in validation jobs, bind deployment to the validated artifact, and pin third-party Actions to reviewed full commit SHAs. These are defense-in-depth improvements; the review found no evidence that the push exposed a secret or that an upstream Action tag was compromised.
- The in-app Browser control helper remains unavailable because the earlier user-authorized shutdown stopped its Node helper. The live HTTP/header check and the pre-deployment Browser visual matrix remain recorded evidence; restarting ChatGPT/Codex is required before another automated in-app Browser pass can run.

## 2026-08-04 10:05 EDT — Mobile candidate branch and scope lock

- Objective: implement the approved local-only Mobile Candidate Pass without changing desktop routes, root rotation, production headers, or live mobile fallback behavior.
- Branch: created local `mobile-candidates` from commit `3651d50497f0deb11911e78635742bd6824cf...`. No GitHub push, pull request, Cloudflare preview, or production deployment was made.
- Starting worktree: preserved the three pre-existing untracked Markdown files unchanged: `AWAR3_Astro_Cloudflare_Deployment_Summary_2026-04-26.md`, `design-qa 2.md`, and `docs/rotating-designs-design-qa 2.md`.
- Runtime: locked dependency installation completed with bundled Node `v24.14.0`, pnpm `11.9.0`, Astro `6.4.8`, `@astrojs/check` `0.9.10`, TypeScript `5.9.3`, Vitest `4.1.10`, and Wrangler `4.118.0`. The first offline install failed because one tarball was absent from the local store; the approved networked retry completed. No credentials or private environment values were written.
- Scope decision: eight routes only — `/mobile-candidates/{field-station|airborne-workshop|living-systems|industrial-hybrid}/{a|b}/`. Candidate A is the compressed board stack; Candidate B is the fieldbook composition. All routes are local noindex candidates and are not wired into `/` rotation.

## 2026-08-04 10:17 EDT — Shared candidate structure and security correction

- Files added: `src/components/MobileCandidatePage.astro`, `src/lib/mobile-candidates.ts`, `src/pages/mobile-candidates/[variant]/[candidate].astro`, `public/mobile-candidates.js`, and `tests/mobile-candidates.test.ts`.
- Files changed: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, and `scripts/check-asset-budget.mjs`.
- Result: all eight pages consume `src/content/site.ts` directly for the complete Candidate 1B copy, section order, CTAs, anchors, and `info@awar3.com`. The shared tree renders one H1, ten canonical sections, semantic landmarks, skip navigation, visible focus, 44px controls, and reduced-motion behavior. The candidate route passes `skipTarget="candidate"` so it does not inherit nonexistent desktop/mobile skip targets.
- Security correction retained: the first implementation used an inline menu script. Because the site CSP is `script-src 'self'`, it was moved to the same-origin `public/mobile-candidates.js` file. The final static HTML contains no inline script body; the external script opens/closes the menu and restores its accessible state after anchor navigation.
- Asset gate: `scripts/check-asset-budget.mjs` now distinguishes strict production mode from `AWAR3_MOBILE_CANDIDATES=1` local candidate mode. Candidate-only raster files are rejected by default and allowed only with the explicit local flag.

## 2026-08-04 10:29 EDT — Artwork crop correction and asset decision

- Objective: keep the four supplied desktop boards as the only raster payload while making decorative mobile art crisp and free from accidental adjacent panel copy.
- Asset decision: no new Image 2.0 raster assets were generated. The existing four optimized board WebPs remain the only art payload (`3.71 MiB` total); their source resolution is substantially above the rendered mobile slots. This avoids recreating the large asset increase that the user previously rejected.
- Initial visual finding retained: naïve background crops exposed neighboring board labels and marketing copy inside the hero, work, and deep-section slots. The crop strategy was replaced with per-slot, per-variant positions (`hero`, `work`, `rethink`, `why`, and `contact`) so the visible artwork follows each supplied board's subject framing. Technical diagram labels that are part of the supplied artwork remain intentionally inside those illustrations; page copy and CTAs stay selectable HTML.
- Responsive correction retained: Candidate B's higher-specificity two-column rules initially overrode the mobile single-column media query, causing the fieldbook hero to collapse into a narrow text column beside the image at 390px. Explicit Candidate B single-column overrides were added below 760px.
- Tablet correction retained: at 768–850px the taller hero slot revealed the next board panel title. A 761–900px rule increases the background scale for hero, feature, and contact slots, keeping the focal scene sharp and preventing the adjacent panel title from entering the art frame.

## 2026-08-04 10:41 EDT — Local build and automated validation

- Commands/tools: `pnpm check`, `pnpm test`, `pnpm build`, `pnpm run check:assets`, and `git diff --check`, all run with the bundled Node runtime; local Wrangler Pages preview served the built `dist/` directory on port `8788`.
- Results: Astro check `0 errors / 0 warnings / 0 hints`; Vitest `4 files / 17 tests passed`; static build `13 pages` (the existing root, four desktop variant routes, and eight mobile candidates); asset gate passed with `3.71 MiB` desktop boards and `3.91 MiB` production build; `git diff --check` passed.
- Candidate integrity tests cover the exact A/B allowlist, four-variant route generation, canonical content expressions, no-inline-script CSP compatibility, and the absence of candidate raster assets in the production tree.
- Failed local preview attempt retained: the first sandboxed Wrangler start could not write its user log and could not bind its inspector/watchers (`EPERM`, `EMFILE`, and loopback permission errors). The retry used the approved elevated local-preview permission and started successfully on `127.0.0.1:8788`; no production resource was affected.

## 2026-08-04 10:45 EDT — In-app Browser and Chrome candidate QA

- In-app Browser matrix: eight routes × five widths (`320`, `390`, `430`, `768`, `850px`) = `40/40` completed. Every cell had one H1, ten sections, five art slots with a resolved background, four matching navigation destinations, zero horizontal overflow, and zero console errors/warnings.
- Copy parity: normalized main-content snapshots were identical for all eight routes at 390px (`6,080` characters after removing only the candidate-identification line). The canonical `src/content/site.ts` content is present without breakpoint hiding, shortening, duplication, or replacement.
- Interaction check: at 390px the menu button resolved uniquely, opened with `aria-expanded="true"`, exposed all four destinations, navigated to `#work`, closed the menu, and placed the work section at the viewport top. Mailto CTAs and skip-link targets were verified in the DOM snapshot.
- Chrome matrix: eight routes × `390` and `768px` = `16/16` cross-checks. Every cell had one H1, ten sections, five art slots, four nav links, zero overflow, and zero console errors/warnings.
- Visual review: Candidate A and B hero/section captures were inspected in the in-app Browser at mobile and tablet widths. Candidate B now preserves a single-column fieldbook flow below 760px; tablet art is scaled to retain a clean focal subject. Representative captures are saved outside the deployable repository under `../AWAR3_QA_Archive_2026-08-04/mobile-candidates/` (32 PNGs: eight routes × Browser/Chrome × 390/768).
- Release state: local-only and unpublished. The Wrangler preview remains available for user inspection; no Git commit, GitHub push, Cloudflare deployment, or root-rotation change was performed.

## Mobile candidate file-change ledger continuation

| Path | Change | Purpose |
| --- | --- | --- |
| `src/components/MobileCandidatePage.astro` | Added | Shared semantic A/B candidate page using canonical copy and variant themes. |
| `src/lib/mobile-candidates.ts` | Added | A/B allowlist, names, palettes, board sources, and per-slot crop positions. |
| `src/pages/mobile-candidates/[variant]/[candidate].astro` | Added | Eight static noindex candidate routes. |
| `public/mobile-candidates.js` | Added | Same-origin CSP-compatible mobile navigation enhancement. |
| `tests/mobile-candidates.test.ts` | Added | Route, copy-source, CSP, and production-asset integrity tests. |
| `src/layouts/BaseLayout.astro` | Modified | Candidate-specific skip-link target without changing existing desktop/legacy behavior. |
| `src/styles/global.css` | Modified | Candidate A/B layouts, four visual systems, responsive media rules, focus, and reduced-motion styling. |
| `scripts/check-asset-budget.mjs` | Modified | Explicit local candidate asset mode and strict production rejection. |
| `AWAR3_QA_Archive_2026-08-04/mobile-candidates/` | Added outside repo | Browser/Chrome evidence captures; not shipped to GitHub or Cloudflare. |

No tracked desktop board, root rotation function, Cloudflare header, or live fallback file was removed or modified by this candidate pass. No generated asset was accepted, so there is no new Image 2.0 asset record beyond the explicit no-generation decision above.

## 2026-08-04 10:55 EDT — Local gallery handoff

- Added `src/pages/mobile-candidates/index.astro` as a noindex local gallery linking to all eight candidates. It reuses the variant metadata, shows the A/B naming, and keeps the canonical contact email selectable.
- A first gallery screenshot exposed a low-contrast inherited global heading color on the navy gallery canvas. The gallery H1 was explicitly set to the light paper color, then Astro check, Vitest, production build, asset gate, and `git diff --check` were rerun successfully.
- The in-app Browser is left on `http://127.0.0.1:8788/mobile-candidates/` for review. The Wrangler preview is local-only; no deployment or GitHub publication occurred.
## 2026-08-04 — Supersede crop-based mobile art

- Objective: Respond to visual review of the first eight local mobile candidates.
- Finding: The candidates reused four desktop full-page composite boards as CSS crops. At mobile sizes, those crops exposed unrelated labels, panel borders, and neighboring artwork, so the images did not feel designed for the mobile composition.
- Decision: Supersede the crop-based art approach with a dedicated mobile image family for each design. Generate purpose-built artwork before rebuilding the mobile layouts around the new image slots. Keep the four desktop routes, desktop board files, daily rotation, Cloudflare behavior, GitHub state, and live mobile fallback unchanged.
- Scope: Local-only `mobile-candidates` branch; no GitHub push and no Cloudflare deployment.
- Correction: Existing crop-based candidate CSS/assets remain in history as a failed attempt; the next pass will replace only the candidate art path and responsive composition.

## 2026-08-04 11:15–12:15 EDT — Dedicated mobile art pass

- Objective: create a coherent mobile image family before redesigning the eight local candidates.
- Tool: built-in ChatGPT Image 2.0 image-generation workflow. No source copy, labels, logos, diagrams, navigation, CTAs, or watermarks were baked into any generated image; all meaningful wording remains HTML from `src/content/site.ts`.
- Asset strategy: two images per design (hero and supporting detail), shared by Candidates A and B. This avoids the failed desktop-board crop approach and keeps the candidate art set small enough to review and optimize.
- Generation prompts (applied once per design family, with the detail prompt using the matching hero as its visual reference):
  - Field Station hero: “sharp, professional mobile hero illustration … compact alpine research outpost beside a clear stream, timber operations cabin, solar panels, field instruments, distant mountains; portrait 4:5; cream paper, forest green, alpine blue, warm rust; crisp hand-inked field-notes detail; no text or signage.”
  - Field Station detail: “same Field Station family … interior fieldwork planning shelter opening onto an alpine stream, timber workbench, maps and instruments, weather mast; portrait 4:5; match hero linework/palette; maps contain no readable writing; no text or logos.”
  - Airborne Workshop hero: “sharp, professional mobile hero illustration … compact engineering airship workshop above a coastal town and blue water, exposed decks, propeller, cables, test craft; portrait 4:5; parchment, sky blue, navy, rust, brass; crisp aviation field-notes detail; no text.”
  - Airborne Workshop detail: “same Airborne Workshop family … interior work deck with suspended drafting table, propeller test rig, cable runs, instruments, and coastline below; portrait 4:5; match hero; no text or signage.”
  - Living Systems hero: “sharp, professional mobile hero illustration … ecological sensing station with glasshouse, water channels, field sensors, solar array, observation platform in a botanical landscape; portrait 4:5; warm paper, botanical green, sage, lake blue, terracotta; crisp botanical field-notes detail; no text.”
  - Living Systems detail: “same Living Systems family … botanical workroom with plant samples, instruments, glasshouse frame, water channels, and sensors outside; portrait 4:5; match hero; no readable writing, text, or logos.”
  - Industrial Hybrid hero: “sharp, professional mobile hero illustration … mechanical operations test bay with rugged machine core, cable trays, control console, diagnostic instruments, and industrial yard; portrait 4:5; navy, cream, rust, slate blue, brass; crisp blueprint/technical detail; no text.”
  - Industrial Hybrid detail: “same Industrial Hybrid family … secure systems integration room with modular workbench, mechanical cross-section model, cable trays, test instruments, heavy door to machine bay; portrait 4:5; match hero; no text or signage.”
- Native masters inspected: Field Station hero/detail `1122×1402`; Airborne hero `1003×1568`, detail `1122×1402`; Living Systems hero `1003×1568`, detail `1122×1402`; Industrial hero `1003×1568`, detail `887×1774`. Each accepted master had a crisp focal subject, coherent geometry, visible detail at native resolution, and no accidental typography or watermark.
- Optimization: copied only accepted outputs into `public/mobile-candidates/assets/`; converted PNG masters to AVIF (quality 48, effort 7) and WebP (quality 75, effort 6) with Sharp 0.35.3, then removed project-local PNG masters. Final candidate asset set is 16 files / approximately 3.8 MiB total; generated masters remain outside the repository in the Codex generated-image archive.
- Final paths and use:

  | Design | Hero AVIF/WebP | Detail AVIF/WebP | Used in |
  | --- | --- | --- | --- |
  | Field Station | `public/mobile-candidates/assets/field-station-hero.{avif,webp}` | `public/mobile-candidates/assets/field-station-detail.{avif,webp}` | Hero panel and work/rethink supporting panels for both candidates |
  | Airborne Workshop | `public/mobile-candidates/assets/airborne-workshop-hero.{avif,webp}` | `public/mobile-candidates/assets/airborne-workshop-detail.{avif,webp}` | Hero panel and work/rethink supporting panels for both candidates |
  | Living Systems | `public/mobile-candidates/assets/living-systems-hero.{avif,webp}` | `public/mobile-candidates/assets/living-systems-detail.{avif,webp}` | Hero panel and work/rethink supporting panels for both candidates |
  | Industrial Hybrid | `public/mobile-candidates/assets/industrial-hybrid-hero.{avif,webp}` | `public/mobile-candidates/assets/industrial-hybrid-detail.{avif,webp}` | Hero panel and work/rethink supporting panels for both candidates |

- Source changes: added `src/components/MobileCandidateArt.astro`, replaced crop metadata in `src/lib/mobile-candidates.ts` with explicit asset metadata and alt text, and rebuilt `src/components/MobileCandidatePage.astro` around full uncropped `<picture>` panels. Candidate A remains copy-first Board Stack; Candidate B remains art-first Fieldbook. A contact seal replaces the repeated contact crop so the page has two purposeful image moments rather than repeated desktop fragments.
- Responsive correction: raised the mobile composition breakpoint to `900px`. At 320–850px the candidates use deliberate single-column image/text stacking, while A/B still differ in order and panel rhythm. This keeps the mobile art family visible without forcing a crowded tablet two-column crop.
- Asset gate correction: `scripts/check-asset-budget.mjs` now allows candidate raster files and a 12 MiB local build only when `AWAR3_MOBILE_CANDIDATES=1`; strict production mode still rejects candidate assets and the 4.10 MiB production budget remains unchanged.
- Build/test results: Astro check passed (24 files, 0 diagnostics); Vitest passed (4 files, 17 tests); local candidate asset gate passed (desktop boards 3.71 MiB, candidate build 7.65 MiB / 12 MiB, 16 candidate assets); `git diff --check` passed. Strict production asset gate intentionally failed with the expected candidate-only rejection, so these routes remain unpublished.
- Browser QA: in-app Browser completed `40/40` route/viewport cells at `320`, `390`, `430`, `768`, and `850px`; every cell had one H1, ten sections, four navigation links, three image elements with explicit dimensions/alt text, no hidden canonical copy, no horizontal overflow, and no console warnings/errors. After scrolling to the page end, all lazy images loaded with `naturalWidth > 0` at every tested width. Normalized canonical copy parity across all eight routes at `390px` was identical (`6,215` characters after removing only the candidate-identification line). Menu open/close and `#work` anchor navigation passed.
- Chrome QA: `16/16` route/viewport cells at `390` and `768px`; after page-end scroll all images completed with `naturalWidth > 0`, four navigation links were present, ten sections and one H1 rendered, overflow was false, and console warnings/errors were empty.
- Evidence: final representative captures saved outside the repository under `../AWAR3_QA_Archive_2026-08-04/mobile-art-pass/` (32 PNGs: Browser 390px and Chrome 768px for all eight candidates, including final-revision filenames).
- Release state: still local-only on `mobile-candidates`; no commit, GitHub push, Cloudflare deployment, desktop route change, rotation change, or live fallback change.

## 2026-08-04 — Third-image completion begins

- Objective: add the missing unique Rethink-panel image for each of the four local mobile design families.
- Confirmed source state: the current candidate sequence is `hero → detail → detail`; only the Rethink panel repeats the approved supporting detail image. Existing hero/detail assets, copy, layout structure, desktop routes, rotation, and deployment state are approved and will remain unchanged.
- Decision: generate four new text-free Image 2.0 Rethink scenes, optimize each to AVIF/WebP, wire only the Rethink panel to `kind="rethink"`, and re-run the full local Browser/Chrome verification before presenting the gallery again.
- Scope: local-only `mobile-candidates` branch. No commit, GitHub push, Cloudflare preview, or production deployment is authorized in this pass.

## 2026-08-04 13:13 EDT — Third-image completion accepted locally

- Objective: finish the mobile image family with one unique, purpose-built Rethink-panel scene per design. Existing hero/detail art, canonical copy, layout structure, desktop routes, root rotation, Cloudflare behavior, GitHub state, and live mobile behavior remain unchanged.
- Generation workflow: built-in ChatGPT Image 2.0, with each current approved detail WebP supplied as the style reference. All four accepted masters were inspected at native resolution before optimization. Meaningful text remains HTML; no labels, logos, diagrams, signage, watermarks, or CTAs were accepted in the raster art.
- Accepted generation records:

  | Design | Prompt / composition | Native master | Result and final use |
  | --- | --- | --- | --- |
  | Field Station | “Alpine operations overlook with a connected mountain stream, visible footpaths, field instruments, sensor posts, small station infrastructure, and a distant operations shelter; portrait 4:5; calm left edge; parchment, forest green, slate blue, rust; no text.” | `exec-7abc71e3-572a-425b-82a5-33292f8d1153.png`, `1003×1568` | Accepted: crisp mountain, stream, instruments, and paths; no accidental typography. Rethink panel. |
  | Airborne Workshop | “Airborne coordination/navigation deck with instruments, route-planning surface without readable marks, tethered equipment, rigging, and coastal town/sea beyond; portrait 4:5; calm left edge; sky blue, parchment, navy, copper; no text.” | `exec-233afaa9-daec-44a5-a2fb-9f66628c9308.png`, `1003×1568` | Accepted: sharp deck hardware, navigation instruments, and coastal context; blank planning surface. Rethink panel. |
  | Living Systems | “Interconnected watershed and ecological monitoring landscape with linked habitats, flowing water channels, wetland pools, plants, habitat structures, and discreet sensor nodes; portrait 4:5; calm left edge; warm paper, botanical greens, terracotta, slate water; no text.” | `exec-68ee6cb7-ba29-4a6a-b5cd-116963ce5310.png`, `1003×1568` | Accepted: crisp water, plants, habitat links, and sensor nodes; no accidental typography. Rethink panel. |
  | Industrial Hybrid | “Systems-control and integration floor with linked machine modules, central console, cable trunks, test fixtures, gauges, and subsystem connections; portrait 4:5; calm dark left edge; navy, cream, rust, cobalt; blank non-linguistic displays; no text.” | `exec-686fbf26-67c3-4452-a8ec-394bee93f93d.png`, `1122×1402` | Accepted after regeneration: crisp machinery and cable routing with blank abstract displays. Rethink panel. |

- Failed attempt retained: `exec-1dd6f579-ea00-4d6d-8311-30989d8aad79.png` (Industrial Hybrid) was rejected because tiny console/floor glyphs could read as accidental text. It was not copied into the repository or optimized. The stricter blank-display prompt produced the accepted replacement above.
- Optimization: each accepted master was converted with Sharp 0.35.3 using WebP `quality: 75, effort: 6` and AVIF `quality: 48, effort: 7`; PNG masters were removed from the repository after conversion. Final Rethink dimensions are Field Station `1003×1568`, Airborne Workshop `1003×1568`, Living Systems `1003×1568`, and Industrial Hybrid `1122×1402`. The eight new files total approximately `1.7 MiB`.
- Asset count correction: the existing set had 16 files (four designs × hero/detail × AVIF/WebP). Adding four new masters in both formats adds eight files, so the correct resulting set is 24 files—not 20. The implementation and integrity test enforce the required two-format set of 24; the plan’s “20” count was internally inconsistent with its AVIF + WebP requirement.
- Source changes: extended `MobileArtKind` with `rethink`; added Rethink metadata/alt text and paths for all four themes; changed only the Rethink `<MobileCandidateArt>` call from `kind="detail"` to `kind="rethink"`; updated candidate asset-integrity tests from 16 to 24 and require hero/detail/rethink pairs. No desktop/live source file changed.
- File-change ledger continuation:

  | Path | Change | Purpose |
  | --- | --- | --- |
  | `public/mobile-candidates/assets/{field-station,airborne-workshop,living-systems,industrial-hybrid}-rethink.{avif,webp}` | Added | Optimized, purpose-built Rethink artwork; local candidate-only assets. |
  | `src/lib/mobile-candidates.ts` | Modified | Add `rethink` art kind, dimensions, URLs, and accessible alt text. |
  | `src/components/MobileCandidatePage.astro` | Modified | Use the unique Rethink asset in both A/B candidates. |
  | `tests/mobile-candidates.test.ts` | Modified | Enforce 24 two-format assets and unique Rethink wiring. |
  | `AWAR3_QA_Archive_2026-08-04/mobile-art-pass-v2/` | Added outside repo | Browser top-viewport and Chrome full-page evidence for all eight routes. |

- Automated results: Astro check `0 errors / 0 warnings / 0 hints` (24 files); Vitest `4 files / 17 tests passed`; static build `14 pages`; local candidate asset gate passed (`24` files, `9.37 MiB / 12 MiB` local build); `git diff --check` passed. Strict production asset gate intentionally failed with candidate-only assets, `24 / 0` strict candidate count, and the unchanged 4.10 MiB production budget, confirming publication remains blocked.
- In-app Browser QA: `40/40` cells passed for all eight routes at `320`, `390`, `430`, `768`, and `850px`. Every cell had one H1, ten sections, four navigation links, three unique loaded image URLs per design after page-end scroll, explicit image dimensions/alt text, no hidden canonical sections, no horizontal overflow, and no console errors/warnings. Normalized canonical main-copy snapshots were identical across all eight routes (`6,136` characters after removing only the candidate-identification line).
- Chrome QA: `16/16` cells passed for all eight routes at `390` and `768px`; page-end lazy images loaded, three URLs were unique, copy/section structure matched, overflow was absent, and console warnings/errors were empty.
- Interaction/accessibility checks: unique menu control opened and exposed four destinations, Work anchor resolved to `#work` and closed the menu, canonical `mailto:info@awar3.com` inquiry links remained present, skip-link/main/nav landmarks were present, and the reduced-motion stylesheet branch remained active. The Browser viewport capture at 390px and Chrome full-page captures at 768px were visually inspected; all four new Rethink scenes remain sharp and cohesive in their actual slots.
- Evidence: `/Users/riceandrobots/Library/Mobile Documents/com~apple~CloudDocs/Files/AWAR3_site/AWAR3_QA_Archive_2026-08-04/mobile-art-pass-v2/` contains 16 Browser captures (eight top-viewport plus eight post-scroll full-page diagnostics) and eight Chrome full-page captures, 24 PNGs total, including lazy-image evidence.
- Release state: local-only on `mobile-candidates`. No commit, push, preview deployment, production deployment, rotation change, desktop board change, or live mobile change occurred. Local Wrangler remains available on `127.0.0.1:8788`; the gallery handoff will be left open for review.

## 2026-08-04 15:46 EDT — Responsive root release implementation and local verification

- Objective: implement the approved release plan without changing the four desktop board designs, canonical copy, or existing desktop variant routes. The production root now serves the scheduled desktop board above 850px and the same design family's scheduled mobile candidate at 850px and below.
- Schedule decision: the existing New York date-based variant sequence remains unchanged. A new date-based candidate sequence is anchored on `2026-08-03`: Candidate A / Board Stack on August 3, Candidate B / Fieldbook on August 4, then alternate daily. Selection is based only on the New York calendar date and is independent of viewport, user agent, cookies, and personalization.
- Source changes: added `CANDIDATES`, `candidateForDate`, and candidate diagnostics to `functions/lib/rotation.ts`; the root Pages Function now fetches `/variants/{variant}/{candidate}/` and returns `X-AWAR3-Variant`, `X-AWAR3-Candidate`, and `X-AWAR3-Date`. Added `ResponsiveVariantPage.astro`, eight static responsive routes, responsive breakpoint presentation, and a responsive skip target. Existing `/variants/{variant}/` desktop QA routes and `/mobile-candidates/{variant}/{a|b}/` review routes remain reachable and noindex.
- Asset-gate decision: promoted exactly the four desktop WebPs plus 24 approved mobile AVIF/WebP files (hero/detail/rethink for each of four designs). Production budget is now 12 MiB; the gate rejects any additional raster set, source assets, or QA files. No candidate PNG masters were added.
- Test correction: a deterministic function-test clock was added at the August 3 anchor so assertions do not drift with the current date. No user data, secrets, tokens, or private environment values were logged.
- Automated checks: first pass exposed an inverted mobile-raster allowlist condition and non-deterministic date assertions; both were corrected. Final local result: Astro check 0 diagnostics (26 files), Vitest 19/19, static build 22 pages, production asset gate 9.51 MiB / 12 MiB with 24/24 candidate files, and `git diff --check` clean.
- Browser verification: local Wrangler Pages preview at `http://127.0.0.1:8788/`. In-app Browser completed 40/40 candidate cells at 320, 390, 430, 768, and 850px. All cells passed one H1, ten sections, four navigation links, three unique loaded image URLs after page-end scrolling, complete copy, no hidden sections, no overflow, and clean console logs. Normalized copy was stable across widths for every candidate. Root checks passed at 390px (mobile candidate visible, board hidden) and 1440px (board visible, mobile candidate hidden), with matching scheduled `airborne-workshop` / Candidate B selection on the current New York date. Menu, four-destination exposure, `#work` anchor, mailto links, and skip link passed.
- Chrome verification: Chrome completed 16/16 candidate cells at 390 and 768px after a two-step page-end scroll; all cells passed the same image, copy, structure, overflow, navigation, and console checks. A first scroll-only attempt left lazy images pending; the retest used a second page-end scroll and passed. This correction is preserved here rather than silently discarded.
- Evidence: eight representative Browser full-page captures are in `AWAR3_QA_Archive_2026-08-04/release-v1-local-browser/` outside the repository. The current local gallery/preview remains available for handoff; preserved untracked deployment-summary Markdown files remain untouched.
- Release state: implementation is verified locally but not yet committed, pushed, or deployed. Next action is scoped staging, the full CI-equivalent audit/build, direct `main` push, then Cloudflare production smoke and post-deployment Browser/Chrome checks.

## 2026-08-04 16:05 EDT — Production deployment and smoke verification

- Objective: publish the verified responsive release through the existing GitHub Actions → Cloudflare Pages pipeline and verify the live site without recording credentials or private environment values.
- Commit/push: committed as `f93dda3` (`Release responsive daily mobile designs`), fast-forwarded local `main`, and pushed `main` to `https://github.com/digeratus/awar3.git`. The repository is public (`private: false` in the public GitHub metadata); the commit contains no tokens, secrets, or private environment values. The three preserved untracked Markdown files remain outside the commit.
- CI/deployment: GitHub Actions run `30945366914` completed successfully. Both `Check, test, audit, and build` and `Deploy Cloudflare Pages` jobs completed with success. Dependency audit passed the configured high-severity gate with the existing `2 low / 2 moderate` advisories. GitHub deployment record `5750569630` reports success for `f93dda3`; Cloudflare Pages deployment UUID is `15e4d481-571c-44eb-ba47-6f628c5b21cb`, preview URL `https://15e4d481.awar3-astro-skunkworks.pages.dev`.
- Live root: `https://awar3.com/` returned HTTP 200 on `2026-08-04`, `X-AWAR3-Variant: airborne-workshop`, `X-AWAR3-Candidate: b`, `X-AWAR3-Date: 2026-08-04`, `Cache-Control: public, max-age=0, must-revalidate`, HSTS, restrictive self-hosted CSP, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff`. Desktop and iPhone user-agent requests returned the same variant/candidate/date.
- Overrides and public QA URLs: valid `?design=field-station` returned Field Station + Candidate B with no-store/noindex; invalid overrides returned the scheduled Airborne Workshop + Candidate B with normal revalidation. All eight `/mobile-candidates/{variant}/{a|b}/` URLs and all eight responsive `/variants/{variant}/{a|b}/` URLs returned HTTP 200, no-store, and `X-Robots-Tag: noindex, nofollow`. The four existing `/variants/{variant}/` desktop URLs also returned HTTP 200/noindex. `www.awar3.com` returned the expected 301 to `https://awar3.com/`; robots allows root and disallows `/variants/`; sitemap exposes only the root.
- Asset integrity: all 24 deployed mobile AVIF/WebP files were fetched from production and matched the local release SHA-256 byte-for-byte (5,708,852 bytes total). Desktop boards, favicon, stylesheet, mobile script, and responsive assets returned the expected status/MIME types.
- Live Browser QA: in-app Browser checked all eight public candidate URLs at 390px (8/8), with three loaded images after page-end scroll, one H1, ten sections, four nav links, no overflow, mailto/email-protection links, noindex meta, and clean consoles. Root checks at 390px and 1440px confirmed the same Airborne Workshop/Candidate B selection, mobile/desktop visibility switching, correct board source, one H1, ten mobile sections, no overflow, and clean consoles. A first Airborne Rethink lazy-image observation was pending; a second page-end scroll/load wait passed all three images and is recorded in the QA log.
- Live Chrome QA: all eight public candidate URLs at 390px and 768px passed 16/16 with three loaded unique images, complete structure/copy, no overflow, navigation/email/skip links, and clean consoles. Root checks at 390px and 1440px passed the same responsive visibility and diagnostics. Representative painted Browser/Chrome root captures are in `AWAR3_QA_Archive_2026-08-04/release-v1-production/` outside the repository.
- Release decision: production is live and the scheduled root will remain Airborne Workshop / Fieldbook through the current New York date; the next New York date selects Living Systems / Board Stack. Rollback target is Cloudflare deployment `ad0eeb51` / source commit `8a0be233462bd83dc2b2169d7751b7832c259900` until this deployment is accepted as the new baseline.
