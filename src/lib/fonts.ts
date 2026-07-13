import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

/**
 * Three type voices, each doing only its own job — scoped to homepage-v2
 * components so they never touch the existing pages.
 *
 * - Newsreader: prose, headings, quotes. The argument, in prose.
 * - IBM Plex Mono: metadata, code, specs — the instrument-reading register.
 * - Inter: UI chrome only (buttons, nav-like controls) — never reading content.
 */
export const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-serif",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
});
