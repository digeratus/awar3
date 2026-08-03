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
