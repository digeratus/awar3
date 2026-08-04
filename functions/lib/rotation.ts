export const VARIANTS = [
  "field-station",
  "airborne-workshop",
  "living-systems",
  "industrial-hybrid"
] as const;

export type Variant = (typeof VARIANTS)[number];

export const CANDIDATES = ["a", "b"] as const;
export type Candidate = (typeof CANDIDATES)[number];

export const ANCHOR_DATE = "2026-08-03";
export const CANDIDATE_ANCHOR_DATE = "2026-08-03";
export const TIME_ZONE = "America/New_York";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export function isAllowedVariant(value: string | null): value is Variant {
  return VARIANTS.includes(value as Variant);
}

export function isAllowedCandidate(value: string | null): value is Candidate {
  return CANDIDATES.includes(value as Candidate);
}

export function newYorkDateKey(value: Date | string | number = new Date()): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError("A valid date is required");
  }

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value: partValue }) => [type, partValue]));
  return `${values.year}-${values.month}-${values.day}`;
}

function dateKeyToUtcDay(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function variantForDate(value: Date | string | number = new Date()): Variant {
  const dayOffset = dateKeyToUtcDay(newYorkDateKey(value)) - dateKeyToUtcDay(ANCHOR_DATE);
  const index = ((dayOffset % VARIANTS.length) + VARIANTS.length) % VARIANTS.length;
  return VARIANTS[index];
}

export function candidateForDate(value: Date | string | number = new Date()): Candidate {
  const dayOffset = dateKeyToUtcDay(newYorkDateKey(value)) - dateKeyToUtcDay(CANDIDATE_ANCHOR_DATE);
  return CANDIDATES[((dayOffset % CANDIDATES.length) + CANDIDATES.length) % CANDIDATES.length];
}

export function selectionForRequest(
  requestUrl: string | URL,
  value: Date | string | number = new Date()
): { variant: Variant; candidate: Candidate; override: boolean; dateKey: string } {
  const url = requestUrl instanceof URL ? requestUrl : new URL(requestUrl);
  const requested = url.searchParams.get("design");
  const dateKey = newYorkDateKey(value);

  if (isAllowedVariant(requested)) {
    return { variant: requested, candidate: candidateForDate(value), override: true, dateKey };
  }

  return { variant: variantForDate(value), candidate: candidateForDate(value), override: false, dateKey };
}
