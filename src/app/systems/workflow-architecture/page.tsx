import type { Metadata } from "next";
import { ETISTechnicalArchitectureModel } from "@/components/sections/systems/architecture-diagrams/ArchitectureModel";
import { OperationallyRealizedRuntime } from "@/components/sections/systems/architecture-diagrams/workflow/OperationallyRealizedRuntime";

export const metadata: Metadata = {
    title: "Workflow Architecture",
    description: "Detailed technical architecture of the distributed coordination and workflow ingestion systems.",
};

export default function WorkflowArchitecturePage() {
    return (
        <main className="min-h-screen bg-[#05070A]">
            <ETISTechnicalArchitectureModel />
            <OperationallyRealizedRuntime />
        </main>
    );
}

