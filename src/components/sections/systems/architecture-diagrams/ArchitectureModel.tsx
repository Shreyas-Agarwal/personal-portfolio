"use client";

import { ArchitectureModelHeader } from "./workflow/ArchitectureModelHeader";
import { ClientEdgeLayer } from "./workflow/ClientEdgeLayer";
import { ExternalEventIngestion } from "./workflow/ExternalEventIngestion";
import { AsyncEventSpine } from "./workflow/AsyncEventSpine";
import { CentralTransformationPlane } from "./workflow/CentralTransformationPlane";
import { WorkerExecution } from "./workflow/WorkerExecution";
import { PlatformControlPlane } from "./workflow/PlatformControlPlane";
import { TenantExecutionClusters } from "./workflow/TenantExecutionClusters";
import { FederatedCoordination } from "./workflow/FederatedCoordination";
import { TelemetryControl } from "./workflow/TelemetryControl";
import { ArchitectureConnectorVertical } from "./workflow/SharedComponents";

export function ETISTechnicalArchitectureModel() {
    return (
        <section
            data-header-theme="dark"
            className="relative overflow-hidden bg-[#05070A] px-6 py-32 md:px-12"
        >
            {/* Background Grid */}
            <div className="absolute inset-0">
                <div className="absolute left-[20%] top-0 h-full w-px bg-white/[0.03]" />
                <div className="absolute left-[40%] top-0 h-full w-px bg-white/[0.03]" />
                <div className="absolute left-[60%] top-0 h-full w-px bg-white/[0.03]" />
                <div className="absolute left-[80%] top-0 h-full w-px bg-white/[0.03]" />
            </div>

            {/* Ambient */}
            <div className="absolute left-1/2 top-[18%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                <ArchitectureModelHeader />

                {/* MAIN ARCHITECTURE CANVAS */}
                <div className="relative rounded-[40px] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">

                    {/* TOP FLOW */}
                    <ArchitectureConnectorVertical top="120px" />

                    <ClientEdgeLayer />
                    <ExternalEventIngestion />
                    <AsyncEventSpine />
                    <CentralTransformationPlane />
                    <WorkerExecution />

                    <TelemetryControl />

                    {/* PLATFORM + PRODUCT SPLIT */}
                    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
                        <PlatformControlPlane />
                        <TenantExecutionClusters />
                    </div>

                    <FederatedCoordination />
                </div>

                {/* CLOSING */}
                <div className="mt-28 border-t border-white/[0.06] pt-10">
                    <div className="max-w-4xl">
                        <p className="text-lg font-light leading-relaxed text-white/60">
                            The architecture was designed around a fundamental
                            systems assumption:
                        </p>

                        <p className="mt-5 text-lg font-light leading-relaxed text-white/60">
                            enterprise operational environments should remain
                            executionally isolated while still participating in
                            a centralized coordination and governance model.
                        </p>

                        <p className="mt-5 text-lg font-light leading-relaxed text-white/60">
                            The objective was not merely cloud scalability.

                            <span className="text-white/90">
                                {" "}
                                It was preserving coherent operational flow
                                across independently evolving systems.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}