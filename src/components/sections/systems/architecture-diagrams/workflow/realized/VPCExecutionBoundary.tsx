"use client";

import { motion } from "framer-motion";
import { Server, Database, Cpu, Activity, Workflow, MessageSquare, Boxes } from "lucide-react";

export function VPCExecutionBoundary() {
    return (
        <div className="relative rounded-[48px] border border-white/[0.08] bg-white/[0.01] p-10 md:p-12">
            {/* VPC Label */}
            <div className="absolute -top-3 left-10 rounded-full border border-white/[0.1] bg-[#05070A] px-4 py-1">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Enterprise_VPC_Boundary</span>
            </div>

            <div className="grid gap-10 xl:grid-cols-2">
                
                {/* PLATFORM SERVER */}
                <ColocatedNode 
                    title="Platform Operational Node"
                    subtitle="Centralized Coordination & Auth"
                    accent="blue"
                    capabilities={[
                        { icon: <Activity size={14} />, label: "BullMQ Central" },
                        { icon: <Workflow size={14} />, label: "Coordination Logic" },
                        { icon: <Server size={14} />, label: "Auth Services" }
                    ]}
                />

                {/* PRODUCT SERVERS */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2 mb-2">
                        <Boxes size={16} className="text-emerald-400/60" />
                        <h5 className="font-mono text-[11px] tracking-wider text-white/40 uppercase">Enterprise Product Runtimes</h5>
                    </div>
                    
                    <ColocatedNode 
                        title="Product Execution Server"
                        subtitle="Multi-tenant Enterprise Runtime"
                        accent="emerald"
                        capabilities={[
                            { icon: <Cpu size={14} />, label: "Transformation Pipelines" },
                            { icon: <MessageSquare size={14} />, label: "Notification Workers" },
                            { icon: <Workflow size={14} />, label: "Workflow Runtime" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

function ColocatedNode({ 
    title, 
    subtitle, 
    accent, 
    capabilities 
}: { 
    title: string, 
    subtitle: string, 
    accent: "blue" | "emerald",
    capabilities: { icon: React.ReactNode, label: string }[]
}) {
    return (
        <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`relative overflow-hidden rounded-[36px] border ${
                accent === "blue" ? "border-blue-500/20 bg-blue-500/[0.02]" : "border-emerald-500/20 bg-emerald-500/[0.02]"
            } p-8`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <div>
                        <h4 className="text-lg font-medium text-white/90">{title}</h4>
                        <p className="text-xs text-white/40 mt-1">{subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {capabilities.map((cap) => (
                            <div key={cap.label} className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
                                <div className={accent === "blue" ? "text-blue-400/60" : "text-emerald-400/60"}>
                                    {cap.icon}
                                </div>
                                <span className="text-xs text-white/60">{cap.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLOCATED DATABASE */}
                <div className="md:w-48">
                    <div className={`rounded-3xl border ${
                        accent === "blue" ? "border-blue-500/30 bg-blue-500/10" : "border-emerald-500/30 bg-emerald-500/10"
                    } p-5 text-center`}>
                        <Database className={`mx-auto mb-3 ${accent === "blue" ? "text-blue-400" : "text-emerald-400"}`} size={24} />
                        <h5 className="text-sm font-medium text-white/90">Local Postgres</h5>
                        <p className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter">Colocated Persistence</p>
                        
                        <div className="mt-4 flex justify-center">
                            <div className={`h-1 w-12 rounded-full ${accent === "blue" ? "bg-blue-500/40" : "bg-emerald-500/40"}`} />
                        </div>
                    </div>
                    
                    <p className="mt-3 text-[10px] text-center text-white/20 italic">Shared process resources</p>
                </div>
            </div>
        </motion.div>
    );
}
