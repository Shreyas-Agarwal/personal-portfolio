"use client";

import { motion } from "framer-motion";
import { Database, Layers3, Server } from "lucide-react";
import { PlaneCard, MiniService, PipelineCapability, DistributionNode } from "./SharedComponents";

export function CentralTransformationPlane() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
            className="mb-16 rounded-[32px] border border-cyan-500/10 bg-cyan-500/[0.03] p-8"
        >
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-100/40">
                        CENTRAL_TRANSFORMATION_PLANE
                    </span>

                    <h3 className="mt-3 text-2xl font-medium text-white/90">
                        Shared Data Processing & Semantic Normalization
                    </h3>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-white/40">
                    Instead of duplicating transformation logic across product
                    deployments, operational data pipelines were centralized into
                    containerized scheduled processing infrastructure.
                </p>
            </div>

            {/* PLANE DESCRIPTION */}
            <div className="mb-10 grid gap-5 md:grid-cols-3">

                <PlaneCard
                    title="Transformation Ownership"
                    description="Canonical processing logic shared across enterprise environments."
                />

                <PlaneCard
                    title="Centralized Compute"
                    description="Heavy transformation workloads isolated from product runtimes."
                />

                <PlaneCard
                    title="Semantic Consistency"
                    description="Normalized operational outputs distributed downstream."
                />
            </div>

            {/* PIPELINE FLOW */}
            <div className="grid gap-8 xl:grid-cols-[1fr_4fr_1fr] xl:items-stretch">

                {/* INGESTION */}
                <div className="space-y-5">

                    <MiniService
                        icon={<Database size={16} />}
                        title="Raw Operational Data"
                    />

                    <MiniService
                        icon={<Layers3 size={16} />}
                        title="Cross-Product Inputs"
                    />
                </div>

                {/* ECS/FARGATE */}
                <div className="relative overflow-hidden rounded-[36px] border border-cyan-500/15 bg-black/30 p-10">
                    <div className="absolute inset-0">
                        <div className="absolute left-1/3 top-0 h-full w-px bg-white/[0.03]" />
                        <div className="absolute left-2/3 top-0 h-full w-px bg-white/[0.03]" />
                    </div>

                    <div className="absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
                    <div className="flex items-center gap-4">
                        <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/[0.05] p-3">
                            <Server className="text-cyan-300/70" size={22} />
                        </div>

                        <div>
                            <h4 className="text-xl font-medium text-white/90">
                                ECS / Fargate Processing Cluster
                            </h4>

                            <p className="mt-1 text-sm text-white/40">
                                Cron-triggered distributed transformation runtime
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 xl:grid-cols-4">

                        <PipelineCapability
                            title="Scheduled ETL / ELT"
                            detail="Centralized cron-triggered processing"
                        />

                        <PipelineCapability
                            title="Transformation Pipelines"
                            detail="Shared enterprise processing logic"
                        />

                        <PipelineCapability
                            title="Semantic Normalization"
                            detail="Cross-product operational consistency"
                        />

                        <PipelineCapability
                            title="Selective Distribution"
                            detail="Only relevant outputs sent downstream"
                        />
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <p className="text-sm leading-relaxed text-white/45">
                            Product environments no longer owned raw transformation
                            workloads independently. Instead, they consumed processed,
                            operationally-scoped outputs from a centralized processing
                            substrate.
                        </p>
                    </div>
                </div>

                {/* OUTPUT */}
                <div className="space-y-5">

                    <DistributionNode
                        title="Product-Specific Outputs"
                        subtitle="Scoped operational datasets"
                    />

                    <DistributionNode
                        title="Normalized Serving Data"
                        subtitle="Semantically transformed outputs"
                    />

                    <DistributionNode
                        title="Enterprise Delivery"
                        subtitle="Targeted downstream distribution"
                    />
                </div>
            </div>
        </motion.div>
    );
}
