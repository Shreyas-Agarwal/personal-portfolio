"use client";

import { Boxes } from "lucide-react";
import { ArchitectureSectionLabel, DeploymentTier } from "./SharedComponents";

export function TenantExecutionClusters() {
    return (
        <div className="rounded-[32px] border border-white/[0.06] bg-black/20 p-8">
            <ArchitectureSectionLabel
                title="TENANT_EXECUTION_CLUSTERS"
                description="Multi-tier product runtimes categorized by GTM strategy and SLAs"
            />

            <div className="mt-10 space-y-8">
                {/* Product Cluster Block (Repeatable for Pulse, Nudge, Track, etc.) */}
                {["Pulse (Analytics)", "Nudge (Notifications)", "Code (Workflow Automation)"].map((productName) => (
                    <div key={productName} className="space-y-4">
                        <div className="flex items-center gap-2 px-2">
                            <Boxes size={16} className="text-white/40" />
                            <h5 className="font-mono text-[11px] tracking-wider text-white/60 uppercase">
                                {productName} Cluster
                            </h5>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Tier 1: Standard */}
                            <DeploymentTier
                                tier="Standard"
                                status="Multi-tenant"
                                desc="Shared compute for core features"
                            />

                            {/* Tier 2: Advanced (The GTM Sweet Spot) */}
                            <DeploymentTier
                                tier="Advanced"
                                status="Optimized"
                                desc="Dedicated resources & premium hooks"
                                highlight
                            />

                            {/* Tier 3: Enterprise */}
                            <DeploymentTier
                                tier="Enterprise"
                                status="Isolated"
                                desc="Physical isolation & custom VPC"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
