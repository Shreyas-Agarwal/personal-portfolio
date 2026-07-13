import { plexMono, serif } from "@/lib/fonts";

/** The closing prose moment — on paper, ink-dark text, centered like a pull-quote. */
export function ClosingQuote() {
  return (
    <div className="text-center py-12 max-w-xl mx-auto space-y-8 select-none">
      {/* Top Divider Line */}
      <div className="border-t border-[#1B1D1F]/10 w-16 mx-auto" />

      {/* Main Quote Paragraphs */}
      <div className={`${serif.className} text-xl md:text-2xl italic leading-relaxed text-[#1B1D1F]/80 space-y-4`}>
        <p>Every system begins as an attempt to explain something.</p>
        <p>The interesting ones eventually begin explaining us back.</p>
      </div>

      {/* Section Divider Mark */}
      <div className="text-lg text-[#1B1D1F]/30 leading-none">§</div>

      {/* Call to action text */}
      <div className={`${plexMono.className} text-[9px] uppercase tracking-[0.22em] text-[#1B1D1F]/40`}>
        Continue the conversation
      </div>

      {/* Bottom Divider Line */}
      <div className="border-b border-[#1B1D1F]/10 w-16 mx-auto" />
    </div>
  );
}
