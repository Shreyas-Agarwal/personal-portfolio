import { cache } from "react";

/**
 * Server-side utility to scrape the public GitHub contributions calendar
 * for Shreyas-Agarwal and parse the total count in the last year.
 * Leverages React cache and Next.js revalidation to cache for 1 hour.
 */
export const getGitHubContributions = cache(async (): Promise<number> => {
  try {
    const res = await fetch("https://github.com/users/Shreyas-Agarwal/contributions", {
      next: { revalidate: 3600 }, // revalidate at most once per hour
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) {
      console.warn(`GitHub fetch status: ${res.status}`);
      return 500; // fallback
    }
    const html = await res.text();
    // Match something like "500\n      contributions\n        in the last year"
    const match = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
    if (match) {
      const parsed = parseInt(match[1].replace(/,/g, ""), 10);
      return isNaN(parsed) ? 500 : parsed;
    }
    return 500;
  } catch (error) {
    console.error("Error scraping GitHub contributions:", error);
    return 500; // fallback
  }
});
