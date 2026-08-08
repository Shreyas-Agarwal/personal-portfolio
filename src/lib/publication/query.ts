// ─────────────────────────────────────────────────────────────────────────────
// Publication URL query helpers
//
// Reader mode (no sidebar) is carried purely as a query param (`sidebar=false`)
// on the same canonical publication URL — never a separate route. This module
// is the single place that builds/reads that param, so every in-publication
// link (sidebar nav, prev/next, breadcrumb, dry read) stays consistent.
// ─────────────────────────────────────────────────────────────────────────────

export function isReaderMode(sidebarParam: string | undefined): boolean {
  return sidebarParam === "false";
}

/**
 * Builds a publication-internal href, preserving reader mode (and any extra
 * params, e.g. `view=text` for the dry-read link) across navigation.
 */
export function withPublicationQuery(
  path: string,
  options: { readerMode?: boolean; extra?: Record<string, string> } = {},
): string {
  const params = new URLSearchParams(options.extra);
  if (options.readerMode) params.set("sidebar", "false");
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
