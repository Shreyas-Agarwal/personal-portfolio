import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import Link from "next/link";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import { getAllPublications } from "@/lib/publication/loader";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Engineering case studies, technical specifications, and research notes on data systems, local-first computing, and architecture.",
  openGraph: {
    title: "Publications | Shreyas Agarwal",
    description: "Case studies, technical specifications, and architectural essays.",
  },
};

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] relative py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <DraftingGrid />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Header Header & Journal Subtitle */}
        <header className="space-y-6 border-b border-[#33373B] pb-12">
          <div className="flex items-center justify-between">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}
            >
              TECHNICAL PUBLICATIONS & PAPERS
            </span>
            <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
              VOLUMES I–II · {publications.length} WORKS
            </span>
          </div>

          <h1
            className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}
          >
            Engineering Publications
          </h1>

          <p className="text-lg text-[#A0A5AD] max-w-3xl leading-relaxed font-sans font-light">
            A curated collection of system architecture case studies, technical specifications, and
            research essays. Written across four altitudes — from vision papers and executive
            proposals to field-level specs.
          </p>
        </header>

        {/* Catalog List */}
        <div className="space-y-12">
          {publications.map((pub) => {
            const dateStr = new Date(pub.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <article
                key={pub.id}
                className="group relative bg-[#24272A] border border-[#33373B] hover:border-[#DE4B31]/40 transition-all duration-300 rounded-sm p-8 space-y-6 shadow-xl"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#33373B]/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`${plexMono.className} text-xs px-2.5 py-1 bg-[#2A2E33] border border-[#3E4349] text-[#DE4B31] font-medium uppercase tracking-wider rounded-xs`}
                    >
                      {pub.type.replace("-", " ")}
                    </span>
                    {pub.volume && (
                      <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
                        {pub.volume}
                      </span>
                    )}
                  </div>
                  <time className={`${plexMono.className} text-xs text-[#8A8F99]`}>{dateStr}</time>
                </div>

                {/* Main Content */}
                <div className="space-y-3">
                  <h2
                    className={`${serif.className} text-2xl sm:text-3xl text-[#ECE5D4] group-hover:text-[#DE4B31] transition-colors duration-200 leading-snug font-normal`}
                  >
                    <Link
                      href={`/projects/publications/${pub.id}`}
                      className="after:absolute after:inset-0 focus:outline-none"
                    >
                      {pub.title}
                    </Link>
                  </h2>
                  {pub.subtitle && (
                    <p className="text-base text-[#B0B5BE] italic font-sans font-light">
                      {pub.subtitle}
                    </p>
                  )}
                  {pub.abstract && (
                    <p className="text-sm text-[#8A8F99] leading-relaxed line-clamp-3 pt-2 font-sans">
                      {pub.abstract}
                    </p>
                  )}
                </div>

                {/* Footer Badges & Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#33373B]/60">
                  <div className="flex flex-wrap items-center gap-2">
                    {(pub.domains || []).map((domain) => (
                      <span
                        key={domain}
                        className={`${plexMono.className} text-[11px] px-2 py-0.5 bg-[#1B1D1F] border border-[#33373B] text-[#A0A5AD] rounded-xs`}
                      >
                        {domain}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`${plexMono.className} text-xs text-[#DE4B31] font-medium flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-200`}
                  >
                    <span>Read Publication</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
