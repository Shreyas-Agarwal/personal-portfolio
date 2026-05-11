export function DefaultFooter() {
    const socialLinks = [
        { label: "GitHub", href: "https://github.com/Shreyas-Agarwal" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/shreyasagarwal01/" },
        { label: "Email", href: "mailto:[EMAIL_ADDRESS]" },
    ];

    return (
        <footer className="border-t border-white/[0.06] bg-[#0B0D10]">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-center">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                    © {new Date().getFullYear()} — SHREYAS AGARWAL
                </p>
                <nav className="flex items-center gap-8">
                    {socialLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] tracking-[0.15em] text-white/25 transition-colors hover:text-white/70"
                        >
                            {l.label.toUpperCase()}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
