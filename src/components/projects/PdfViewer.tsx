"use client";

import { AlertCircle, ExternalLink, Eye, FileText, Shield } from "lucide-react";
import type React from "react";

interface PdfViewerProps {
  url: string;
  title: string;
}

export function PdfViewer({ url, title }: PdfViewerProps) {
  // Prevent default context menu (right-click) to disable "Save Page As", etc.
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Embed the PDF with flags to hide toolbar and nav panes
  // #toolbar=0&navpanes=0&statusbar=0&messages=0
  const secureUrl = `${url}#toolbar=0&navpanes=0&statusbar=0&messages=0`;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Secure context menu interception
    <div
      onContextMenu={handleContextMenu}
      className="group relative flex flex-col overflow-hidden rounded-none border border-white/[0.08] bg-[#05070A] transition-all duration-300 hover:border-white/[0.15]"
    >
      {/* Secure Header Banner */}
      <div className="flex flex-col gap-2 border-b border-white/[0.08] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400">
            <Shield className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-orange-400">
                SECURE_DOCUMENT_WORKSTATION
              </span>
            </div>
            <h4 className="font-mono text-[10px] tracking-wider text-white/70 mt-0.5">
              AU2025_DLF_CLASS_HANDBOOK.PDF
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-[8px] tracking-[0.15em] text-white/30">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-white/40" />
            READ_ONLY_PREVIEW
          </div>
          <div className="h-3 w-px bg-white/[0.08]" />
          <span className="text-emerald-400/90 font-bold">STATUS: COMPLIANT</span>
        </div>
      </div>

      {/* Warning Notice Banner */}
      <div className="flex flex-col gap-3 border-b border-white/[0.06] bg-orange-500/[0.02] px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="h-3.5 w-3.5 text-orange-400/80 shrink-0 mt-0.5" />
          <p className="font-mono text-[9px] leading-normal tracking-wide text-orange-400/70">
            This document is displayed in a secure sandboxed environment. Printing, downloading, and
            external replication are restricted to protect proprietary VDC implementation
            methodologies.
          </p>
        </div>
        <a
          href="https://www.autodesk.com/autodesk-university/class/DLFs-Journey-Toward-Smarter-Faster-Sharper-Construction-Delivery-Across-a-50-Million-Square-Foot-Portfolio-2025"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 shrink-0 font-mono text-[8px] tracking-[0.15em] text-orange-400/80 hover:text-orange-300 transition-colors uppercase"
        >
          AU_2025_Class_Portal
          <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* PDF Frame Container */}
      <div className="relative h-[650px] w-full bg-[#0E1013]">
        {/* Invisible Overlay Shield on the top of iframe to block browser's hover toolbar controls */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-transparent z-10 pointer-events-auto" />

        {/* Frame loading the presentation PDF */}
        <iframe src={secureUrl} className="h-full w-full border-none bg-zinc-950" title={title} />

        {/* Decorative corner indicators */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-sm bg-black/60 px-2.5 py-1.5 border border-white/[0.05] backdrop-blur-sm pointer-events-none">
          <FileText className="h-3.5 w-3.5 text-white/40" />
          <span className="font-mono text-[9px] tracking-wider text-white/55">
            DLF Contribution Page Reference
          </span>
        </div>
      </div>
    </div>
  );
}
