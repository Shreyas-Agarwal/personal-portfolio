export function Footer() {
    const links = [
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Email", href: "mailto:hello@example.com" },
        { label: "GitHub", href: "https://github.com" },
    ];
    return (
        <footer>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
                <p className="font-mono text-xs text-muted-foreground">
                    © {new Date().getFullYear()} — Built as a system, not a portfolio.
                </p>
                <nav className="flex items-center gap-6">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
