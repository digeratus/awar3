import { describe, expect, it } from "vitest";
import {
  ANCHOR_DATE,
  VARIANTS,
  newYorkDateKey,
  selectionForRequest,
  variantForDate
} from "../functions/lib/rotation";

describe("daily rotation", () => {
  it("uses the documented fixed sequence from the August 3, 2026 anchor", () => {
    expect(ANCHOR_DATE).toBe("2026-08-03");
    expect(VARIANTS).toEqual([
      "field-station",
      "airborne-workshop",
      "living-systems",
      "industrial-hybrid"
    ]);
    expect(variantForDate("2026-08-03T16:00:00Z")).toBe("field-station");
    expect(variantForDate("2026-08-04T16:00:00Z")).toBe("airborne-workshop");
    expect(variantForDate("2026-08-05T16:00:00Z")).toBe("living-systems");
    expect(variantForDate("2026-08-06T16:00:00Z")).toBe("industrial-hybrid");
    expect(variantForDate("2026-08-07T16:00:00Z")).toBe("field-station");
  });

  it("changes at New York midnight during daylight saving time", () => {
    expect(newYorkDateKey("2026-08-04T03:59:59Z")).toBe("2026-08-03");
    expect(newYorkDateKey("2026-08-04T04:00:00Z")).toBe("2026-08-04");
    expect(variantForDate("2026-08-04T03:59:59Z")).toBe("field-station");
    expect(variantForDate("2026-08-04T04:00:00Z")).toBe("airborne-workshop");
  });

  it("changes at New York midnight during standard time", () => {
    expect(newYorkDateKey("2026-12-01T04:59:59Z")).toBe("2026-11-30");
    expect(newYorkDateKey("2026-12-01T05:00:00Z")).toBe("2026-12-01");
  });

  it("stays date-correct across DST transitions", () => {
    expect(newYorkDateKey("2026-03-08T04:59:59Z")).toBe("2026-03-07");
    expect(newYorkDateKey("2026-03-08T05:00:00Z")).toBe("2026-03-08");
    expect(newYorkDateKey("2026-11-01T03:59:59Z")).toBe("2026-10-31");
    expect(newYorkDateKey("2026-11-01T04:00:00Z")).toBe("2026-11-01");
  });

  it("uses calendar days correctly across leap day", () => {
    const leapDay = variantForDate("2028-02-29T17:00:00Z");
    const nextDay = variantForDate("2028-03-01T17:00:00Z");
    const leapIndex = VARIANTS.indexOf(leapDay);
    expect(nextDay).toBe(VARIANTS[(leapIndex + 1) % VARIANTS.length]);
  });

  it("allowlists valid overrides and ignores invalid values", () => {
    expect(
      selectionForRequest("https://awar3.com/?design=living-systems", "2026-08-03T16:00:00Z")
    ).toMatchObject({ variant: "living-systems", override: true });
    expect(
      selectionForRequest("https://awar3.com/?design=unknown", "2026-08-03T16:00:00Z")
    ).toMatchObject({ variant: "field-station", override: false });
  });
});
