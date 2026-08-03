export const variants = [
  "field-station",
  "airborne-workshop",
  "living-systems",
  "industrial-hybrid"
] as const;

export type Variant = (typeof variants)[number];

export const variantNames: Record<Variant, string> = {
  "field-station": "Pastoral Field Station",
  "airborne-workshop": "Airborne Workshop",
  "living-systems": "Living Systems",
  "industrial-hybrid": "Industrial Hybrid"
};

export function isVariant(value: string | null | undefined): value is Variant {
  return variants.includes(value as Variant);
}
