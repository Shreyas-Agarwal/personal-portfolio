import type { Metadata } from "next";
import { SystemEvolution } from "@/components/sections/system-evolution/SystemEvolution";

export const metadata: Metadata = {
  title: "System Evolution",
  description:
    "Documenting the major architectural pivots and operational failures that forced the system to evolve from a simple monolith into a distributed workflow platform.",
};

export default function SystemEvolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0D10] text-foreground">
      <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                html, body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            `}</style>
      <SystemEvolution />
    </main>
  );
}
