"use server";

import { cookies } from "next/headers";
import { accessCookieName, checkPasscode, makeAccessToken } from "@/lib/publication/access";

export async function unlockPublication(
  id: string,
  passcode: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!checkPasscode(id, passcode)) {
    return { ok: false, error: "Incorrect passcode." };
  }

  const token = makeAccessToken(id);
  if (!token) {
    return { ok: false, error: "This publication isn't configured for access yet." };
  }

  const store = await cookies();
  store.set(accessCookieName(id), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/works/publications/${id}`,
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true };
}
