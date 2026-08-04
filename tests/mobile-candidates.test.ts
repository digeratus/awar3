import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { siteContent } from "../src/content/site";
import { mobileCandidates, mobileCandidateNames, mobileThemes } from "../src/lib/mobile-candidates";
import { variants, variantNames } from "../src/lib/variants";

const component = readFileSync(
  new URL("../src/components/MobileCandidatePage.astro", import.meta.url),
  "utf8"
);
const route = readFileSync(
  new URL("../src/pages/mobile-candidates/[variant]/[candidate].astro", import.meta.url),
  "utf8"
);
const responsiveRoute = readFileSync(
  new URL("../src/pages/variants/[variant]/[candidate].astro", import.meta.url),
  "utf8"
);
const responsiveComponent = readFileSync(
  new URL("../src/components/ResponsiveVariantPage.astro", import.meta.url),
  "utf8"
);
const gallery = readFileSync(
  new URL("../src/pages/mobile-candidates/index.astro", import.meta.url),
  "utf8"
);
const css = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");

describe("local mobile candidates", () => {
  it("defines exactly two candidates for every desktop variant", () => {
    expect(mobileCandidates).toEqual(["a", "b"]);
    expect(Object.keys(mobileThemes).sort()).toEqual([...variants].sort());
    expect(Object.keys(mobileCandidateNames).sort()).toEqual(["a", "b"]);
    expect(route).toContain("return variants.flatMap");
    expect(route).toContain("mobileCandidates.map");
    expect(gallery).toContain("mobile-candidates/${variant}/${candidate}/");
    expect(gallery).toContain('robots="noindex,nofollow,noarchive"');
  });

  it("uses the canonical content module for every required section", () => {
    for (const expression of [
      "content.hero",
      "content.realWork",
      "content.largerOpportunity",
      "content.areas",
      "content.builds",
      "content.why",
      "content.bringIn",
      "content.method",
      "content.principles",
      "content.contact",
      "content.footer"
    ]) {
      expect(component).toContain(expression);
    }
    expect(component).toContain("content.hero.note");
    expect(component).toContain("content.footer.location");
    expect(component).toContain("content.contact.email");
    expect(component).toContain("<h1>{content.hero.title}</h1>");
    expect(component).toContain("id=\"work\"");
    expect(component).toContain("id=\"rethink\"");
    expect(component).toContain("id=\"method\"");
    expect(component).toContain("id=\"contact\"");
    expect(Object.keys(variantNames)).toHaveLength(4);
    expect(siteContent.contact.email).toBe("info@awar3.com");
  });

  it("keeps the production responsive route paired by variant and candidate", () => {
    expect(responsiveRoute).toContain("ResponsiveVariantPage");
    expect(responsiveRoute).toContain("return variants.flatMap");
    expect(responsiveRoute).toContain("mobileCandidates.map");
    expect(responsiveRoute).toContain('skipTarget="responsive"');
    expect(responsiveComponent).toContain("<ExactBoard variant={variant} />");
    expect(responsiveComponent).toContain("<MobileCandidatePage variant={variant} candidate={candidate} showCandidateLabel={false} />");
    expect(responsiveComponent).toContain('id="responsive-main"');
    expect(css).toContain(".responsive-desktop-board");
    expect(css).toContain(".responsive-mobile-candidate");
  });

  it("keeps candidate interaction compatible with the site CSP", () => {
    const script = readFileSync(new URL("../public/mobile-candidates.js", import.meta.url), "utf8");
    expect(component).toContain('<script is:inline src="/mobile-candidates.js" defer></script>');
    expect(script).toContain("data-mobile-menu-button");
    expect(script).toContain("aria-expanded");
    expect(component).not.toContain("<script is:inline>");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps a small, explicit local-only image family per design", () => {
    const assetNames = readdirSync(new URL("../public/mobile-candidates/assets/", import.meta.url)).sort();
    expect(assetNames).toHaveLength(24);
    for (const variant of variants) {
      expect(assetNames).toContain(`${variant}-hero.avif`);
      expect(assetNames).toContain(`${variant}-hero.webp`);
      expect(assetNames).toContain(`${variant}-detail.avif`);
      expect(assetNames).toContain(`${variant}-detail.webp`);
      expect(assetNames).toContain(`${variant}-rethink.avif`);
      expect(assetNames).toContain(`${variant}-rethink.webp`);
      const imageUrls = [mobileThemes[variant].art.hero.webp, mobileThemes[variant].art.detail.webp, mobileThemes[variant].art.rethink.webp];
      expect(new Set(imageUrls).size).toBe(3);
    }
    expect(component).toContain("MobileCandidateArt");
    expect(component).toContain("mobile-candidate-contact-seal");
    expect(component).toContain('kind="rethink"');
    expect(readFileSync(new URL("../src/components/MobileCandidateArt.astro", import.meta.url), "utf8")).toContain("loading={kind === \"hero\" ? \"eager\" : \"lazy\"}");
    expect(css).not.toContain("var(--mobile-board)");
  });
});
