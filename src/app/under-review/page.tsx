import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Under Review",
    description: "This architectural documentation is currently being formalized.",
};

export default function UnderReviewPage() {
    return (
        <div data-header-theme="light" className="flex min-h-screen items-center justify-center bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10 px-6 py-24 md:px-12">
            <main className="w-full max-w-2xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
                        <FileSearch className="h-8 w-8 text-neutral-400" />
                    </div>
                </div>
                
                <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-5xl">
                    Documentation Under Review
                </h1>
                
                <p className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-neutral-600">
                    The technical documentation for this architecture is currently being formalized and reviewed. This process ensures high-fidelity representation of the operational system. Please check back later.
                </p>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium tracking-tight text-neutral-700 shadow-sm transition-all hover:border-black hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Return to Archive
                    </Link>
                </div>
            </main>
        </div>
    );
}
