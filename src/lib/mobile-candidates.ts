import type { Variant } from "./variants";

export type MobileCandidate = "a" | "b";

export const mobileCandidates = ["a", "b"] as const;

export const mobileCandidateNames: Record<MobileCandidate, string> = {
  a: "Board Stack",
  b: "Fieldbook"
};

export type MobileArtKind = "hero" | "detail" | "rethink";

export type MobileArt = {
  avif: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
};

type MobileTheme = {
  paper: string;
  paperAlt: string;
  ink: string;
  accent: string;
  accentSoft: string;
  dark: string;
  darkText: string;
  line: string;
  texture: string;
  label: string;
  art: Record<MobileArtKind, MobileArt>;
};

const art = (variant: Variant, kind: MobileArtKind, width: number, height: number, alt: string): MobileArt => ({
  avif: `/mobile-candidates/assets/${variant}-${kind}.avif`,
  webp: `/mobile-candidates/assets/${variant}-${kind}.webp`,
  width,
  height,
  alt
});

export const mobileThemes: Record<Variant, MobileTheme> = {
  "field-station": {
    paper: "#f2ead9",
    paperAlt: "#e7ddc5",
    ink: "#17354a",
    accent: "#ad4a31",
    accentSoft: "#cfb282",
    dark: "#214d48",
    darkText: "#f5eedf",
    line: "rgba(23, 53, 74, 0.25)",
    texture: "#d8c8aa",
    label: "Field Notes / The Operating Theater",
    art: {
      hero: art("field-station", "hero", 1122, 1402, "Alpine field station beside a stream with sensors, solar panels, and a timber operations cabin."),
      detail: art("field-station", "detail", 1122, 1402, "Fieldwork shelter with a workbench, instruments, weather station, and alpine stream beyond."),
      rethink: art("field-station", "rethink", 1003, 1568, "Alpine operations overlook with a connected stream, field instruments, paths, and a remote station infrastructure.")
    }
  },
  "airborne-workshop": {
    paper: "#f3efe4",
    paperAlt: "#e1ebef",
    ink: "#173750",
    accent: "#b84d31",
    accentSoft: "#9eb9c7",
    dark: "#163953",
    darkText: "#f6f2e7",
    line: "rgba(23, 55, 80, 0.25)",
    texture: "#b8d2dc",
    label: "Field Notes / The Airborne Workshop",
    art: {
      hero: art("airborne-workshop", "hero", 1003, 1568, "Airborne engineering workshop with a propeller, suspended decks, and a coastal town below."),
      detail: art("airborne-workshop", "detail", 1122, 1402, "Airship work deck with a drafting table, propeller test rig, cables, and sea beyond."),
      rethink: art("airborne-workshop", "rethink", 1003, 1568, "Airborne coordination deck with navigation instruments, workshop rigging, and a coastal operating environment below.")
    }
  },
  "living-systems": {
    paper: "#f5f0e3",
    paperAlt: "#e4e8d9",
    ink: "#1d3f51",
    accent: "#a84731",
    accentSoft: "#adc2a6",
    dark: "#294c42",
    darkText: "#f7f1e4",
    line: "rgba(29, 63, 81, 0.24)",
    texture: "#bdccb6",
    label: "Field Notes / Living Systems",
    art: {
      hero: art("living-systems", "hero", 1003, 1568, "Ecological sensing station with a glasshouse, water channels, solar array, and meadow plants."),
      detail: art("living-systems", "detail", 1122, 1402, "Botanical systems workroom with plant samples, instruments, glasshouse framing, and sensors outside."),
      rethink: art("living-systems", "rethink", 1003, 1568, "Interconnected watershed monitoring scene with habitats, flowing water channels, native plants, and sensor nodes.")
    }
  },
  "industrial-hybrid": {
    paper: "#f0e9d9",
    paperAlt: "#d8e0df",
    ink: "#102d43",
    accent: "#c24731",
    accentSoft: "#6f9ca9",
    dark: "#052438",
    darkText: "#f6ebd9",
    line: "rgba(16, 45, 67, 0.28)",
    texture: "#7898a1",
    label: "System Status / Ready to Frame",
    art: {
      hero: art("industrial-hybrid", "hero", 1003, 1568, "Mechanical operations test bay with a machine core, cable trays, control console, and industrial yard beyond."),
      detail: art("industrial-hybrid", "detail", 887, 1774, "Secure systems integration room with a modular workbench, test instruments, cable trays, and machine bay beyond."),
      rethink: art("industrial-hybrid", "rethink", 1122, 1402, "Systems-control floor with linked machine modules, a console, cable trunks, and testing fixtures.")
    }
  }
};
