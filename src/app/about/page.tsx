import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/Hero";

export const metadata: Metadata = {
    title: "Engineer — Systems that survive reality",
    description:
        "Product and Data Engineer building decision engines, automation pipelines, and platforms that keep operating under real-world constraints.",
    openGraph: {
        title: "Engineer — Systems that survive reality",
        description:
            "Decision engines, data pipelines, AEC platforms. Case studies, simulations, and research.",
    },
};

export default function Home() {
    return (
        <AboutHero />
    );
}
