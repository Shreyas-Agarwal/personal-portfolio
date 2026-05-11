import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
    { label: "Systems", href: "/systems" },
    { label: "Research", href: "/research" },
    { label: "Notes", href: "/notes" },
    { label: "Identity", href: "/about" },
];

const socialLinks = [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Email", href: "mailto:hello@example.com" },
];

export function HomeFooter() {
    return (
        <footer className="relative overflow-hidden bg-[#F3F1EC]">
            {/* Transition band — same structural rules as the section above */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            {/* Dark closing band */}
            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:px-12">

                {/* Top rule */}
                <div className="mb-16 h-px w-full bg-black/[0.08]" />

                {/* Main footer grid */}
                <div className="grid gap-16 md:grid-cols-[1fr_auto_auto]">

                    {/* Brand column */}
                    <div className="max-w-xs">
                        <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-black/30">
                            SHREYAS_AGARWAL //
                        </p>
                        <p className="text-sm leading-relaxed text-black/50">
                            Data &amp; systems engineer building decision engines,
                            automation pipelines, and platforms that keep operating
                            under real-world constraints.
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-col gap-3">
                        <span className="mb-1 font-mono text-[9px] tracking-[0.2em] text-black/25">
                            SECTIONS
                        </span>
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="group flex items-center gap-1 text-sm text-black/45 transition-colors hover:text-black"
                            >
                                {l.label}
                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        ))}
                    </nav>

                    {/* Social links */}
                    <nav className="flex flex-col gap-3">
                        <span className="mb-1 font-mono text-[9px] tracking-[0.2em] text-black/25">
                            CONTACT
                        </span>
                        {socialLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1 text-sm text-black/45 transition-colors hover:text-black"
                            >
                                {l.label}
                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Bottom rule + colophon */}
                <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/[0.06] pt-8 md:flex-row md:items-center">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-black/25">
                        © {new Date().getFullYear()} — BUILT AS A SYSTEM, NOT A PORTFOLIO.
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-black/20">
                        DATA_INFRASTRUCTURE / OPERATIONAL_SYSTEMS
                    </p>
                </div>
            </div>
        </footer>
    );
}
