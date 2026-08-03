import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { variants } from "../src/lib/variants";

describe("desktop-only design bundle", () => {
  it("contains exactly one optimized board per approved desktop design", () => {
    const files = readdirSync(new URL("../public/designs/", import.meta.url)).sort();
    expect(files).toEqual(variants.map((variant) => `${variant}.webp`).sort());
  });

  it("uses the approved boards on desktop and the pre-redesign live site on mobile", () => {
    const variantPage = readFileSync(
      new URL("../src/components/VariantPage.astro", import.meta.url),
      "utf8"
    );
    const exactBoard = readFileSync(
      new URL("../src/components/ExactBoard.astro", import.meta.url),
      "utf8"
    );
    const legacyMobile = readFileSync(
      new URL("../src/components/LegacyMobile.astro", import.meta.url),
      "utf8"
    );
    const legacyScript = readFileSync(
      new URL("../public/legacy-mobile.js", import.meta.url),
      "utf8"
    );
    const css = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");

    expect(variantPage).toContain("<ExactBoard variant={variant} />");
    expect(variantPage).toContain("<LegacyMobile />");
    expect(exactBoard).not.toContain("astro:assets");
    for (const variant of variants) {
      expect(exactBoard).toContain(`/designs/${variant}.webp`);
    }

    expect(legacyMobile).toContain("Make the impossible buildable.");
    expect(legacyMobile).not.toMatch(/mobile-hero|reference-art|desktop-art/);
    expect(legacyMobile).toContain('<script is:inline src="/legacy-mobile.js" defer></script>');
    expect(legacyScript).toContain('document.querySelector("[data-nav-toggle]")');
    expect(css).toContain("@media (min-width: 851px)");
    expect(css).toMatch(/\.legacy-mobile\s*\{\s*display:\s*none;/);
  });
});
