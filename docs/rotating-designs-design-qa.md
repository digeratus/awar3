# AWAR3 Rotating Designs — Design QA

Status: passed

## Source visual truth

The approved boards are preserved under `docs/qa/2026-08-03/concepts/` for all four desktop and mobile designs. The working captures are under `matrix/`, `chrome/`, and `sections/`; matched reference/implementation hero composites are under `comparisons/`.

## Viewport matrix

Each Browser cell represents four forced variants. Chrome cross-checks all four at the representative desktop and mobile widths.

| Width | In-app Browser | Chrome | Copy parity | Overflow/clipping | Visual-family fidelity |
| ---: | --- | --- | --- | --- | --- |
| 1440 | 4/4 passed | 4/4 passed | Passed | Passed | Passed |
| 1280 | 4/4 passed | — | Passed | Passed | Passed |
| 1024 | 4/4 passed | — | Passed | Passed | Passed |
| 768 | 4/4 passed | — | Passed | Passed | Passed |
| 430 | 4/4 passed | — | Passed | Passed | Passed |
| 390 | 4/4 passed | 4/4 passed | Passed | Passed | Passed |
| 320 | 4/4 passed | — | Passed | Passed | Passed |

Totals: 28/28 in-app Browser combinations passed; 8/8 Chrome combinations passed.

## Assertions applied at every matrix point

- Complete Candidate 1B copy, punctuation, ten-section order, links, CTAs, and `info@awar3.com` matched the canonical source.
- Normalized marketing-copy snapshots were identical between desktop and mobile.
- All ten canonical sections were present and visible; none was shortened, duplicated, replaced, or breakpoint-hidden.
- Desktop and mobile navigation exposed the same destinations.
- One H1, semantic landmarks, skip link, visible focus, minimum type sizes, and 44px mobile targets were present.
- No horizontal overflow, clipped/overlapping text, cropped CTA, broken image, failed responsive source, or console error was detected.
- The 1254px masters and AVIF/WebP responsive sources remained crisp at rendered size; no CSS enlargement was used.
- Reduced-motion behavior, mobile menu, anchor navigation, Escape/focus return, and mail links worked.

## Scheduled-root parity

The local Cloudflare Pages root was checked at desktop and mobile on 2026-08-03. Both responses selected `field-station`, exposed the same `X-AWAR3-Variant`, rendered the same section order and normalized copy, and remained visually within the Pastoral Field Station family.

## Visual comparison review

Reference and implementation captures were inspected together at native viewport size. The accepted comparisons cover:

1. Palette and contrast.
2. Typography, hierarchy, and density.
3. Hero composition and subject balance.
4. Framing, grid, border, and material language.
5. Desktop/mobile design identity and content continuity.

The matched hero composites and stable deep-section captures are the accepted fidelity evidence. Browser full-page composites remain in the archive as a failed diagnostic attempt because sticky viewport layers repeat during that capture mode; they were not used to declare a pass.

## Discrepancies, fixes, and retests

| Finding | Correction | Retest |
| --- | --- | --- |
| Airborne Workshop first pass was too dark relative to its cream/navy/rust board. | Lightened primary surfaces and rebalanced navy/rust technical framing. | Matched desktop/mobile hero captures and deep sections passed. |
| Industrial Hybrid first pass overused the yellow art accent as the page canvas. | Restored cream/navy/red technical surfaces; kept yellow concentrated in the illustration. | Matched desktop/mobile hero captures and deep sections passed. |
| Inline menu enhancement violated the self-hosted CSP and did not close after mobile anchor selection. | Moved behavior to same-origin `public/site.js`. | Browser and Chrome showed closed disclosure, correct anchor position, focus restoration, and clean consoles. |
| First section screenshot sequence caught animated intermediate positions. | Repeated with instant scrolling after fonts/images loaded. | All 24 stable section captures were inspected. |
| Browser `screenshot({path})` did not persist files in this environment. | Persisted returned image bytes explicitly. | Evidence files were created and opened successfully. |

## Copy diff and intentional deviations

Copy diff: none. Candidate 1B wording is identical across all variants and viewports because every page uses `src/content/site.ts` through one shared semantic component.

Intentional visual deviations are limited to production needs: new crisp, text-free illustrations replace composite board imagery; the full Candidate 1B page is longer than concept boards that used sample content; and the shared semantic tree fixes section order. Responsive composition changes placement, never the design family or copy.

Final result: passed

## 2026-08-03 16:20 EDT — Reference-board fidelity retest

The original supplied boards were used as the visual source for a corrective pass after review feedback that the first generated scenes had drifted from the intended designs. The new pass uses measured native crops from those boards for the hero and five deep art slots per variant, with one shared HTML content tree unchanged across breakpoints.

| Retest | Result |
| --- | --- |
| In-app Browser matrix | 28/28 forced variant/viewport combinations completed. |
| Required widths | 1440, 1280, 1024, 768, 430, 390, and 320px. |
| H1 / canonical sections | 1 H1 and all 10 sections at every point. |
| Desktop/mobile copy parity | Passed for all four variants; normalized snapshot length matched at 6151 characters. |
| Overflow / clipping | 0 horizontal overflow and 0 clipped text after the breakpoint correction. |
| Image fidelity | Reference crops inspected at native resolution and in hero/deep page slots; no CSS enlargement. |
| Design review | Cream/navy/rust systems, panel rhythm, image framing, and each variant's identity reviewed beside the supplied boards. |

Correction retained: the first responsive retest showed overflow at 768px in the multi-column opportunity/why/contact treatments. The responsive transition moved to 850px and the complete matrix was rerun; the 320px follow-up also measured zero overflow.

The prior generated masters remain archived in `src/assets/variants/` for history, but the refreshed page now references `src/assets/reference-art/` so the visual language follows the supplied originals. Source diagram labels that are part of the supplied illustrations remain inside those illustrations; all Candidate 1B marketing copy and CTAs remain selectable HTML.

## 2026-08-03 17:35 EDT — Desktop-only four-board retest

This retest covers the user's selected Pastoral Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid boards. Mobile is intentionally deferred to the next inspection phase.

| Desktop width | In-app Browser | H1 / sections | Copy parity | Overflow | Console | Image load |
| ---: | ---: | --- | --- | --- | --- | --- |
| 1440 | 4/4 | 1 / 10 each | Passed | 0 | Clean | Hero + Work loaded; deep art lazy by design |
| 1280 | 4/4 | 1 / 10 each | Passed | 0 | Clean | Hero + Work loaded; deep art lazy by design |
| 1024 | 4/4 | 1 / 10 each | Passed | 0 | Clean | Hero + Work loaded; deep art lazy by design |

The final captures are in `docs/qa/2026-08-03/desktop-pass/`. Each route was inspected at the hero, Real Work, Areas of Work, Method, and Contact treatments against its supplied board. The four variants retain distinct composition, palette, type, imagery, and panel language while using the same canonical HTML content tree.

Discrepancy and correction: the first Industrial Hybrid Image 2.0 hero master clipped the machine at the right edge. A regenerated 1536×1024 master with explicit subject margin plus `object-position: right center` was accepted after Browser and Chrome reinspection. The final machine is fully visible, sharp, and served as an optimized WebP derivative.

Final result for this pass: desktop passed; mobile QA deferred by user request.

## 2026-08-04 — Mobile candidate matrix (local-only)

This pass covers the eight unpublished mobile candidates requested for review: Candidate A (Board Stack) and Candidate B (Fieldbook) for Field Station, Airborne Workshop, Living Systems, and Industrial Hybrid. Desktop routes, root rotation, and the existing live mobile fallback remain unchanged.

| Width | In-app Browser | Chrome cross-check | Copy parity | Overflow / clipping | Console |
| ---: | ---: | ---: | --- | --- | --- |
| 320 | 8/8 | — | Pass | 0 | Clean |
| 390 | 8/8 | 8/8 | Pass | 0 | Clean |
| 430 | 8/8 | — | Pass | 0 | Clean |
| 768 | 8/8 | 8/8 | Pass | 0 | Clean |
| 850 | 8/8 | — | Pass | 0 | Clean |

Totals: `40/40` in-app Browser cells and `16/16` Chrome cells passed. Every route rendered one H1, all ten canonical sections, five art slots, four navigation destinations, the complete selectable Candidate 1B copy, and the canonical confidential-inquiry/email links. At 390px, normalized main-content snapshots matched across all eight routes at 6,080 characters after removing only the A/B identification line.

### Evidence

Representative Browser and Chrome viewport captures are stored outside the deployable repository at:

`AWAR3_QA_Archive_2026-08-04/mobile-candidates/`

The archive contains 32 PNGs: each of the eight routes at 390px and 768px in both Browser and Chrome. These are local inspection artifacts only and are not included in the GitHub or Cloudflare payload.

### Discrepancies, fixes, and retests

| Finding | Correction | Retest |
| --- | --- | --- |
| Full-board background crops exposed neighboring board copy in the decorative hero/work/deep art slots. | Added per-variant, per-slot crop positions and inspected each scene in its actual mobile slot. | Browser matrix rerun: 40/40; hero, work, rethink, why, and contact crops retained clean focal art. |
| Candidate B's two-column specificity overrode the mobile single-column rule, causing narrow text beside the art at 390px. | Added explicit Candidate B single-column overrides below 760px. | Browser and Chrome 390px screenshots; zero clipping or overlap. |
| Taller 768–850px hero slots revealed the next board panel title. | Increased background scale for hero, feature, and contact slots in the 761–900px range. | Browser/Chrome 768px checks and Browser 850px checks; zero adjacent-panel leakage in the accepted tablet captures. |
| Inline menu enhancement conflicted with the restrictive self-hosted CSP. | Moved the behavior to `public/mobile-candidates.js`. | All 8 routes loaded with zero console errors/warnings; menu/anchor test passed. |
| First Wrangler preview attempt hit local log/inspector/watch limits. | Restarted the local preview with the approved elevated permission and an explicit compatibility date. | Preview served all eight routes on `127.0.0.1:8788`; Browser and Chrome matrices completed. |

### Asset and fidelity review

No new raster asset was generated in this pass. The four supplied, optimized desktop WebPs remain the only art payload (3.71 MiB total), and the mobile art slots use high-resolution, deliberately selected crops. This keeps the local candidate set small while retaining each desktop sibling's palette, subject language, technical annotations, and contrast. All marketing copy remains HTML; no CTA, navigation, label, or contact detail is baked into a newly generated asset.

Final result: local candidate pass passed. The gallery is ready for user selection; no candidate is approved for publication yet.

### Gallery handoff retest

The local noindex gallery at `/mobile-candidates/` was added after the matrix pass and opened in the in-app Browser. It exposes all eight routes as distinct Candidate A/B cards. The first capture found the gallery H1 inheriting a dark global heading color against the navy canvas; the heading color was explicitly corrected, then Astro check, Vitest, build, asset budget, and diff-check were rerun with no failures. The in-app Browser remains on the gallery route for selection.

## 2026-08-03 18:05 EDT — Contact-art correction and final desktop evidence

The prior contact crops contained board-baked CTA/email text, which duplicated the shared HTML copy. Four new Image 2.0 contact masters were generated at 1774×887, inspected at native resolution, and wired into the same semantic contact section. Each master leaves the copy area calm and places the design-specific subject on the right; no text, labels, logos, UI, or watermark is rasterized.

| Variant | 1440 | 1280 | 1024 | Contact art | Chrome cross-check |
| --- | --- | --- | --- | --- | --- |
| Field Station | Pass | Pass | Pass | Text-free, sharp, alpine field station | — |
| Airborne Workshop | Pass | Pass | Pass | Text-free, sharp, airborne workshop | — |
| Living Systems | Pass | Pass | Pass | Text-free, sharp, living field station | — |
| Industrial Hybrid | Pass | Pass | Pass | Text-free, sharp, secure-channel panel | Pass (Computer Use) |

The final Browser evidence is under `docs/qa/2026-08-03/desktop-pass/` as `*-hero-final.png` and `*-contact-final.png`. The Industrial Hybrid lower-desktop crop rule was widened to 1350px after the representative Chrome review; 1440px retains the denser framing while 1280/1024 show the full machine without clipping. Full-page screenshot output remains archived only as a diagnostic because sticky viewport layers repeat tiles in this environment.

Final result: desktop passed; mobile remains intentionally deferred for the next user review.

Closing retest after the final Industrial Hybrid framing rule: 12/12 Browser cells still pass, with the 1440px image using dense board framing and 1280/1024px retaining the complete machine via the contain fallback. Final evidence files were refreshed after the production build.

## 2026-08-03 18:43 EDT — Exact supplied-board desktop QA

This pass supersedes the earlier desktop visual-fidelity verdict. The approved references are now rendered directly as the desktop compositions, with deterministic sharpening and responsive encoding only; there is no layout reinterpretation at desktop widths.

| Variant | 1440 | 1280 | 1024 | Visible images | Overflow | Console |
| --- | --- | --- | --- | --- | --- | --- |
| Field Station | Pass | Pass | Pass | 1 loaded / 0 broken | 0 | Clean |
| Airborne Workshop | Pass | Pass | Pass | 1 loaded / 0 broken | 0 | Clean |
| Living Systems | Pass | Pass | Pass | 1 loaded / 0 broken | 0 | Clean |
| Industrial Hybrid | Pass | Pass | Pass | 1 loaded / 0 broken | 0 | Clean |

At every matrix point, the board and rendered image dimensions matched, the exact source aspect ratio was preserved (maximum measured drift 0.000306), and four anchor targets plus seven interactive hotspots were present. The responsive `<picture>` selected a 1440, 1280, or 1024px WebP derivative appropriate to the viewport.

Visual evidence:

- `docs/qa/2026-08-03/exact-board-pass/*-chrome-full-1440.png` — four complete rendered pages.
- `docs/qa/2026-08-03/exact-board-pass/*-reference-vs-chrome.png` — supplied reference on the left and live Chrome rendering on the right in a single comparison input.
- `docs/qa/2026-08-03/exact-board-pass/*-chrome-top.png` — representative Chrome/Computer Use top-of-page captures.

The four side-by-side comparisons were opened and inspected. Composition, crop, colors, artwork, typography, labels, line breaks, panel boundaries, and footer treatments match the supplied boards. The full-page captures were also reviewed and showed no missing or repeated panel.

Functional evidence: the Field Station Work hotspot changed the fragment to `#work` and scrolled the anchor to viewport top; the inquiry link resolves to the canonical confidential-inquiry `mailto:` URL. All four QA routes returned HTTP 200 and the Chrome console remained empty.

Desktop result: passed. Mobile remains intentionally deferred by the user's instruction.

## 2026-08-03 20:54 EDT — Post-slimming visual regression QA

The asset pass changed storage formats and removed redundant evidence, not the approved desktop composition. All four regenerated lossless WebP board masters decode to pixel-identical RGBA buffers versus the PNG masters in commit `b4b346f`.

| Variant | Desktop 1440 | Mobile 390 | Overflow | Console | Icons |
| --- | --- | --- | --- | --- | --- |
| Field Station | Pass | Pass | 0 | Clean | Subset loaded |
| Airborne Workshop | Pass | Pass | 0 | Clean | Subset loaded |
| Living Systems | Pass | Pass | 0 | Clean | Subset loaded |
| Industrial Hybrid | Pass | Pass | 0 | Clean | Subset loaded |

Desktop rendered one complete 1440px exact-board derivative with the responsive semantic page hidden. Mobile rendered the shared semantic page with the exact board hidden, one H1, the complete canonical content tree, the official subset Phosphor font, and valid glyph content for all four Areas of Work icons. Lazy images below the initial viewport remained correctly deferred.

Interaction retest fixed and passed an ID collision uncovered in this run: mobile `Method` now targets the visible `#method` section (`scrollTop` 6387, target approximately 76px below the sticky header), while the desktop Work hotspot targets `#exact-work` (`scrollTop` 766, target at viewport top). No duplicate IDs remain.

The retained evidence set is documented in `docs/qa/README.md`; prior references to removed intermediate captures remain historical log entries rather than current file promises.

## 2026-08-03 22:15 EDT — Four-board desktop-only QA

This pass intentionally changes the release scope. The four approved boards are desktop-only at 851px and wider. Below 851px, each route shows the existing published responsive site while new mobile art direction remains deferred. Therefore this pass does not claim desktop/mobile design or Candidate 1B copy parity; it proves that no unapproved mobile design assets are present or loaded.

| Variant | 1440×900 desktop | 390×844 fallback | Overflow | Console | Desktop board fetched on mobile |
| --- | --- | --- | ---: | --- | --- |
| Field Station | Pass; 1440px board | Pass; existing live page | 0 | Clean | No |
| Airborne Workshop | Pass; 1440px board | Pass; existing live page | 0 | Clean | No |
| Living Systems | Pass; 1440px board | Pass; existing live page | 0 | Clean | No |
| Industrial Hybrid | Pass; 1440px board | Pass; existing live page | 0 | Clean | No |

Desktop checks confirmed the selected board path, native width of 1440px, hidden fallback, zero horizontal overflow, and a functional Work hotspot. Mobile checks confirmed the board container is hidden, its responsive image resolves only to a one-pixel data placeholder, the fallback contains zero raster `<img>` elements, and all four routes show the same existing-live H1 (`Make the impossible buildable.`). The mobile navigation menu opened, exposed Contact, navigated to `#contact`, and closed with correct `aria-expanded` state.

The first mobile interaction failed because CSP blocked the component's inline module. The script was externalized to `/legacy-mobile.js`; the same test then passed with no console entries and without changing the restrictive CSP.

Visual captures were inspected and retained outside the deployable repository:

- `/Users/riceandrobots/.codex/visualizations/2026/08/03/019fc883-5bdf-7f10-888c-ba99fa0b39a7/awar3-desktop-only-desktop.png`
- `/Users/riceandrobots/.codex/visualizations/2026/08/03/019fc883-5bdf-7f10-888c-ba99fa0b39a7/awar3-desktop-only-mobile.png`

Result: the four desktop designs pass this reduced scope; the existing live mobile fallback passes functional smoke testing. New mobile designs remain unimplemented by explicit user direction.

## 2026-08-03 23:20 EDT — Production HTTP QA and pending visual pass

- Production commit `8a0be233462bd83dc2b2169d7751b7832c259900` deployed successfully to `awar3.com` through Cloudflare Pages deployment `ad0eeb51`.
- All four static variant routes and all four approved WebPs returned HTTP 200. Production image hashes match the locally approved board files exactly, proving that deployment did not alter or recompress the designs.
- Root selection is device-independent: desktop and iPhone user agents both received Field Station on the same New York date. After normalization of Cloudflare's per-request email-protection tokens, their full HTML responses were identical.
- Anchors, stylesheet, favicon, mobile script, security headers, `www` redirect, robots, sitemap, valid override, and invalid-override fallback passed direct production checks.
- Post-deployment in-app Browser visual and click QA is pending. The earlier all-Node process cleanup requested by the user terminated the Browser plugin's helper. Reconnection attempts returned a closed transport, so no production screenshot, console inspection, rendered-overflow check, menu click, hotspot click, or email-link click is claimed in this entry. The already-completed local Browser matrix remains the visual baseline until the in-app Browser helper is restarted and the live routes are rechecked.

## 2026-08-04 11:15–12:15 EDT — Dedicated mobile image-family QA

The crop-based candidate art is superseded. Each design now has a purpose-built Image 2.0 hero and supporting detail image, delivered as AVIF with WebP fallback. The mobile layout uses full uncropped image panels; no desktop composite board is used by the candidate routes.

### Matrix

| Surface | Widths | Routes | Result |
| --- | --- | ---: | --- |
| In-app Browser | 320, 390, 430, 768, 850px | 8 | 40/40 passed |
| Chrome | 390, 768px | 8 | 16/16 passed |

Every cell rendered one H1, ten canonical sections, four navigation destinations, three purpose-built image panels with explicit dimensions and alt text, no hidden canonical copy, no horizontal overflow, and no console errors or warnings. After scrolling to the page end, all lazy images completed with a positive natural width at every tested viewport.

### Copy and interaction

- Normalized main-content snapshots across all eight routes at 390px were identical (`6,215` characters after removing only the candidate-identification line).
- Candidate A and Candidate B preserve the same wording, punctuation, section order, CTAs, anchors, email link, and contact details from `src/content/site.ts`.
- The mobile menu opened with `aria-expanded="true"`, exposed all four destinations, the Work anchor changed the fragment to `#work`, and the menu closed. The skip link and mailto CTAs remained present in the DOM.

### Image/fidelity review

- Field Station: alpine cabin, stream, sensors, and field shelter share the cream/forest/alpine palette; crisp focal cabin and stream at native size.
- Airborne Workshop: airship workshop and interior deck share parchment/sky/navy/rust palette; mechanical rig and cable detail remain readable on mobile.
- Living Systems: ecological station and botanical workroom share warm paper/green/sage palette; plant and water detail remains coherent without baked labels.
- Industrial Hybrid: machine test bay and integration room share navy/cream/rust blueprint treatment; control console, cable trays, and machine geometry remain sharp.
- Visual review found no accidental text, logos, watermarks, warped structures, blur, or unrelated desktop-panel remnants.

### Mismatch ledger and correction

| Evidence | Mismatch | Correction | Retest |
| --- | --- | --- | --- |
| First candidate screenshots | Desktop board crops exposed neighboring labels and panel borders. | Generated two dedicated text-free images per design and rebuilt the art slots around them. | Browser/Chrome matrices passed. |
| Chrome 768 screenshot after first rebuild | Two-column composition made the mobile title and art feel crowded at tablet width. | Raised the candidate stacking breakpoint from 760px to 900px; A/B still differ in art/text order. | Fresh 40-cell Browser and 16-cell Chrome matrices passed. |
| Chrome lazy-load check | One below-fold detail image was still pending immediately after navigation. | Kept `loading="lazy"` and retested after scrolling to the page end; it loaded cleanly at every width. | All lazy images `complete=true`, `naturalWidth>0`. |

### Evidence

Final representative captures are outside the deployable repository under `../AWAR3_QA_Archive_2026-08-04/mobile-art-pass/` (32 PNGs: Browser 390px and Chrome 768px for all eight candidates). This remains a local review pass; no candidate is approved for publication.

## 2026-08-04 13:13 EDT — Unique Rethink-panel art retest

The repeated `detail` image in the Rethink panel was replaced with a purpose-built image for each design family. Candidate A and Candidate B remain structurally and semantically identical; only their approved ordering/rhythm differs. Desktop boards and production routes were not touched.

### Image review

| Design | Rethink scene | Native size | Inspection |
| --- | --- | ---: | --- |
| Field Station | Alpine operations overlook with connected stream, paths, field instruments, and station infrastructure | 1003×1568 | Pass: sharp mountain/stream/instrument detail, calm left edge, no text or watermark |
| Airborne Workshop | Airborne coordination/navigation deck connected to coastal operating environment | 1003×1568 | Pass: crisp rigging, instruments, blank planning surface, sea/coast context, no text |
| Living Systems | Interconnected watershed with habitats, water channels, plants, and sensor nodes | 1003×1568 | Pass: crisp water/plant detail and clear ecological connections, no text |
| Industrial Hybrid | Systems-control floor with linked machines, console, cables, and testing fixtures | 1122×1402 | Pass after regeneration: crisp machinery and blank abstract displays, no accidental glyphs |

The first Industrial Hybrid generation was rejected because tiny console/floor glyphs could read as accidental typography. The failed master remains outside the repository for history; only the regenerated blank-display master was optimized. All accepted masters were inspected at native resolution and in the rendered Rethink slot.

### Matrix retest

| Surface | Widths | Routes | Result |
| --- | --- | ---: | --- |
| In-app Browser | 320, 390, 430, 768, 850px | 8 | 40/40 passed |
| Chrome | 390, 768px | 8 | 16/16 passed |

Every cell rendered one H1, ten sections, four navigation destinations, three unique image URLs per design, explicit dimensions/alt text, complete canonical copy, no hidden sections, no horizontal overflow, and no console errors/warnings. The page-end scroll retest confirmed all lazy images completed with positive natural width.

Normalized main-content copy parity across all eight routes was identical at `6,136` characters after removing only the A/B candidate-identification line. Menu open/close, four-destination exposure, `#work` anchor, inquiry mailto links, skip link, reduced-motion branch, and landmarks passed.

### Evidence and mismatch ledger

- Browser 390px captures and Chrome 768px post-scroll full-page captures: `../AWAR3_QA_Archive_2026-08-04/mobile-art-pass-v2/` (24 PNGs total: eight Browser top views, eight Browser post-scroll diagnostics, and eight Chrome full pages).
- A first full-page Browser screenshot taken before the lazy-image scroll showed blank below-fold panels and a tiled viewport artifact. Captures were regenerated after page-end scroll; Browser evidence is retained as top-viewport captures and Chrome evidence as full-page captures with all three images loaded.
- Asset count correction: 16 existing two-format files plus eight new AVIF/WebP Rethink files equals 24 actual candidate files. The test uses 24 because it reflects the required AVIF + WebP pair for each of four new scenes.

Release remains local-only and unpublished pending user approval; no GitHub or Cloudflare state changed.

## 2026-08-04 15:46 EDT — Responsive root release QA

### Local matrix

| Surface | Widths | Routes | Result |
| --- | --- | ---: | --- |
| In-app Browser | 320, 390, 430, 768, 850px | 8 mobile candidates | 40/40 passed |
| Chrome | 390, 768px | 8 mobile candidates | 16/16 passed |
| In-app Browser root | 390px, 1440px | scheduled responsive root | 2/2 passed |

Every candidate cell rendered one H1, ten sections, four navigation destinations, complete canonical copy, three unique loaded image URLs after page-end scroll, explicit dimensions/alt text, and no hidden sections or horizontal overflow. Console warnings/errors were empty. Normalized copy snapshots were stable across every candidate's tested widths and Candidate A/B structure remained identical apart from the candidate-identification line.

### Responsive-root checks

- Current New York date (`2026-08-04`) selected `airborne-workshop` with Candidate B / Fieldbook in both root viewports.
- At 390px, the mobile candidate was visible and the desktop board was hidden. At 1440px, the exact desktop board was visible and the mobile candidate was hidden. The paired route and diagnostic `data-responsive-*` values matched in both cases.
- The four-destination menu, `#work` anchor, inquiry `mailto:` links, skip link, and no-overflow checks passed on the mobile root. The desktop board retained its existing hotspot/anchor structure.

### Retest correction and evidence

- The first Browser capture pass was taken before the lazy Rethink image had completed; it was retested after three page-end scroll passes and all 40 cells then had three loaded images.
- The first Chrome cross-check used one scroll gesture and left the Rethink image pending. A second page-end scroll was added; the resulting 16/16 Chrome matrix had three loaded images in every cell and clean consoles. The failed intermediate is intentionally recorded rather than overwritten.
- Representative local Browser captures are outside the repository at `../AWAR3_QA_Archive_2026-08-04/release-v1-local-browser/`.

Release remains local-only until the scoped commit, GitHub Actions deployment, and production smoke/visual checks complete.
