import type { Metadata } from "next";
import { SystemsHero } from "@/components/sections/systems/Hero";
import { ComplexityCoordinationSection } from "@/components/sections/systems/Complexity";
import { OperationalArtefactsSection } from "@/components/sections/systems/OperationalArtefacts";
import { OperationalObservationsSection } from "@/components/sections/systems/OperationalObservations";

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
        <>
            <SystemsHero />
            <ComplexityCoordinationSection />
            <OperationalArtefactsSection />
            <OperationalObservationsSection />
        </>
    );
}
