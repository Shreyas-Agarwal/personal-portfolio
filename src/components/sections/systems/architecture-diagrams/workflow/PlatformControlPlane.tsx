"use client";

import { KeyRound, ShieldCheck, Network, Server, Workflow, Database } from "lucide-react";
import { ArchitectureSectionLabel, ServiceRow } from "./SharedComponents";

export function PlatformControlPlane() {
    return (
        <div className="rounded-[32px] border border-blue-500/10 bg-blue-500/[0.03] p-8">

            <ArchitectureSectionLabel
                title="PLATFORM_CONTROL_PLANE"
                description="Centralized governance and coordination authority"
                accent="blue"
            />

            <div className="mt-10 space-y-4">

                <ServiceRow
                    icon={<KeyRound size={16} />}
                    label="Authentication"
                />

                <ServiceRow
                    icon={<ShieldCheck size={16} />}
                    label="RBAC & Permissions"
                />

                <ServiceRow
                    icon={<Network size={16} />}
                    label="Tenant Governance"
                />

                <ServiceRow
                    icon={<Server size={16} />}
                    label="Licensing Services"
                />

                <ServiceRow
                    icon={<Workflow size={16} />}
                    label="Platform APIs"
                />
            </div>

            <div className="mt-8 rounded-3xl border border-white/[0.06] bg-black/20 p-5">
                <div className="flex items-center gap-4">
                    <Database className="text-blue-300/70" />

                    <div>
                        <h4 className="text-sm font-medium text-white/90">
                            Platform Database
                        </h4>

                        <p className="mt-1 text-xs leading-relaxed text-white/40">
                            Shared governance state, licensing,
                            tenancy metadata, platform
                            coordination records.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
