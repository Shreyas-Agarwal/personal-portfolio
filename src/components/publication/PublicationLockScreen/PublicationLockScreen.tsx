"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { plexMono, serif } from "@/lib/fonts";
import { unlockPublication } from "./actions";

interface PublicationLockScreenProps {
  id: string;
  title: string;
}

export function PublicationLockScreen({ id, title }: PublicationLockScreenProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await unlockPublication(id, passcode);
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.error ?? "Incorrect passcode.");
      }
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1B1D1F] px-6 text-[#ECE5D4]">
      <div className="w-full max-w-sm border border-[#33373B] bg-[#24272A] rounded-sm p-8">
        <span
          className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}
        >
          Private
        </span>
        <h1 className={`${serif.className} mt-3 text-2xl text-[#ECE5D4] leading-snug`}>{title}</h1>
        <p className="mt-3 text-sm text-[#A0A5AD] leading-relaxed font-sans font-light">
          This publication isn't generally available. Enter the passcode you were given to read
          it.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError(null);
            }}
            placeholder="Passcode"
            className={`${plexMono.className} w-full border border-[#33373B] bg-[#1B1D1F] rounded-sm px-4 py-3 text-sm text-[#ECE5D4] placeholder:text-[#8A8F99] outline-none focus:border-[#DE4B31]/50 transition-colors`}
          />

          {error && <p className={`${plexMono.className} text-xs text-[#DE4B31]`}>{error}</p>}

          <button
            type="submit"
            disabled={isPending || !passcode}
            className={`${plexMono.className} w-full border border-[#DE4B31]/40 bg-[#DE4B31]/10 text-[#DE4B31] rounded-sm px-4 py-3 text-xs uppercase tracking-wider transition-colors hover:bg-[#DE4B31]/20 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {isPending ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </main>
  );
}
