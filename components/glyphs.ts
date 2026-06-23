export const glyphData: Record<string, { paths: string[]; viewBox: string }> = {
  home: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
      "M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    ],
  },
  capabilities: {
    viewBox: "0 0 24 24",
    paths: [
      "M8 6l4 6-4 6",
      "M12 6l4 6-4 6",
      "M16 6l4 6-4 6",
    ],
  },
  about: {
    viewBox: "0 0 24 24",
    paths: [
      "M4 12h16",
      "M18 4a8 8 0 0 1 0 16",
    ],
  },
  projects: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 2l8 10-8 10-8-10Z",
      "M12 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    ],
  },
  blog: {
    viewBox: "0 0 24 24",
    paths: [
      "M4 7h16M4 12h7M15 12h5M4 17h16",
    ],
  },
  resume: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3l9 18H3Z",
      "M12 9v4M8.5 15h7",
    ],
  },
  languages: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0",
      "M12 5v7M12 12l5 4M12 12l-5 4",
    ],
  },
  frameworks: {
    viewBox: "0 0 24 24",
    paths: [
      "M5 5h8v8H5Z",
      "M11 11h8v8h-8Z",
    ],
  },
  tools: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0",
      "M17 7l-5 5-3 5",
    ],
  },
};

export type GlyphName = keyof typeof glyphData;

export const GLYPH_NAMES = Object.keys(glyphData) as GlyphName[];
