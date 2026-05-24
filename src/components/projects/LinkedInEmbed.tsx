"use client";

import { AlertCircle, PlayCircle } from "lucide-react";
import { useCallback, useState } from "react";

interface LinkedInEmbedProps {
  embedId: string;
  backupVideoPath: string;
  title: string;
}

type EmbedState = "loading" | "loaded" | "failed" | "empty";

export function LinkedInEmbed({ embedId, backupVideoPath, title }: LinkedInEmbedProps) {
  // If embedId is blank we go straight to video — no network round-trip needed
  const [state, setState] = useState<EmbedState>(embedId ? "loading" : "empty");

  const handleLoad = useCallback(() => {
    setState("loaded");
  }, []);

  const handleError = useCallback(() => {
    setState("failed");
  }, []);

  const showVideo = state === "failed" || state === "empty";

  // ── LinkedIn embed iframe ───────────────────────────────────────────────────
  if (!showVideo) {
    return (
      <div className="relative w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#05070A]">
        {/* Loading shimmer */}
        {state === "loading" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#05070A]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
              LOADING_EMBED
            </span>
          </div>
        )}

        <iframe
          src={`https://www.linkedin.com/embed/feed/update/${embedId}`}
          className="h-full min-h-[420px] w-full border-0"
          title={`LinkedIn: ${title}`}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }

  // ── Fallback: native HTML5 video ────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      {/* State badge */}
      <div className="flex items-center gap-2">
        {state === "failed" ? (
          <>
            <AlertCircle className="h-3.5 w-3.5 text-amber-500/70" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              EMBED_UNAVAILABLE — SHOWING_LOCAL_RECORDING
            </span>
          </>
        ) : (
          <>
            <PlayCircle className="h-3.5 w-3.5 text-white/30" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              DEMO_RECORDING
            </span>
          </>
        )}
      </div>

      <video
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-sm border border-white/[0.08] bg-[#05070A]"
        aria-label={`Demo recording: ${title}`}
      >
        <source src={backupVideoPath} type="video/mp4" />
        <track kind="captions" srcLang="en" label="English" default />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
