"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
    { to: "/", label: "Index" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/research", label: "Research" },
];

export function Header() {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                >
                    ./engineer
                </Link>
                <nav className="flex items-center gap-6">
                    {nav.map((n) => {
                        const isActive = pathname === n.to;
                        return (
                            <Link
                                key={n.to}
                                href={n.to}
                                className={cn(
                                    "text-xs uppercase tracking-[0.18em] transition-colors hover:text-foreground",
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {n.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
