"use client";

import { useEffect } from "react";

/**
 * A subtle console discovery for technically curious visitors.
 * Runs once on mount.
 */
export function useConsoleEasterEgg() {
  useEffect(() => {
    // Ensure it only runs once per full page load, though React Strict Mode might trigger twice in dev.
    const win = window as Window & { __NARRATIVE_LAYER_MOUNTED__?: boolean };
    if (typeof window === "undefined" || win.__NARRATIVE_LAYER_MOUNTED__) return;
    win.__NARRATIVE_LAYER_MOUNTED__ = true;

    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);

    // Tonal direction: systems-oriented, narrative-aware, operational.
    console.group(
      `%c ■ [SYSTEM] %c${timestamp} %cNARRATIVE_LAYER_MOUNTED`,
      "color: #fff; font-weight: bold; font-family: monospace;",
      "color: #666; font-family: monospace;",
      "color: #888; font-weight: bold; font-family: monospace;",
    );

    console.log(
      "%cModule   %c NarrativeEngine/v2.4.0-stable",
      "color: #555; font-family: monospace;",
      "color: #999; font-family: monospace;",
    );

    console.log(
      "%cStatus   %c Fragments detected outside the primary logic gate",
      "color: #555; font-family: monospace;",
      "color: #999; font-family: monospace;",
    );

    console.log(
      "%cChecksum %c STORY_INTEGRITY_VERIFIED_0x9FA2",
      "color: #555; font-family: monospace;",
      "color: #999; font-family: monospace;",
    );

    console.log("\n");

    console.log(
      '%c"Systems are just stories told in silicon."',
      "color: #eee; font-style: italic; font-family: serif; font-size: 1.2em;",
    );

    console.log(
      "%cDiscovery: %cSome story fragments have escaped deployment and reside in the archive.",
      "color: #777; font-family: monospace;",
      "color: #777; font-family: monospace;",
    );

    console.log(
      "%cEndpoint:  %chttps://www.fanfiction.net/u/12959962/The-Dragonstaff-and-Technomage",
      "color: #555; font-family: monospace;",
      "color: #3b82f6; font-family: monospace; font-weight: bold; text-decoration: underline;",
    );

    console.groupEnd();
  }, []);
}
