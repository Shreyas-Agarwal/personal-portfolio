// ─────────────────────────────────────────────────────────────────────────────
// Access gate for `locked` publications
//
// A locked publication isn't secured by obscurity alone: visiting its direct
// URL renders a passcode prompt instead of the content. The passcode lives
// in an env var (never in the repo, since publication.json is committed to
// a public repo) and a correct submission sets a signed, httpOnly cookie
// scoped to that one publication's path.
//
// This is intentionally lightweight — a shareable-with-specific-people gate,
// not a login system. The signature only prevents forging the cookie without
// knowing the server secret; it does not rate-limit passcode attempts.
// ─────────────────────────────────────────────────────────────────────────────

import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_PREFIX = "pub_access_";

export function accessCookieName(id: string): string {
  return `${COOKIE_PREFIX}${id}`;
}

function sign(id: string): string | null {
  const secret = process.env.PUBLICATION_LOCK_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(id).digest("hex");
}

/** Token to store in the access cookie once a passcode check succeeds. */
export function makeAccessToken(id: string): string | null {
  return sign(id);
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isValidAccessToken(id: string, token: string | undefined): boolean {
  const expected = sign(id);
  if (!expected || !token) return false;
  return timingSafeStringEqual(expected, token);
}

function passcodeEnvVar(id: string): string {
  return `PUB_PASSCODE_${id.toUpperCase().replace(/-/g, "_")}`;
}

export function checkPasscode(id: string, passcode: string): boolean {
  const expected = process.env[passcodeEnvVar(id)];
  if (!expected || !passcode) return false;
  return timingSafeStringEqual(expected, passcode);
}
