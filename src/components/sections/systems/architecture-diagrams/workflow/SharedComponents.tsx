"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ArchitectureSectionLabel({
    title,
    description,
    accent,
}: {
    title: string;
    description: string;
    accent?: "amber" | "blue";
}) {
    return (
        <div>
            <span
                className={`font-mono text-[10px] tracking-[0.22em] ${accent === "amber"
                    ? "text-amber-100/40"
                    : accent === "blue"
                        ? "text-blue-100/40"
                        : "text-white/25"
                    }`}
            >
                {title}
            </span>

            <p className="mt-3 text-sm leading-relaxed text-white/42">
                {description}
            </p>
        </div>
    );
}

export function ArchitectureNode({
    icon,
    title,
    subtitle,
    accent,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    accent?: "blue" | "cyan";
}) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className={`rounded-3xl border p-5 transition-all ${accent === "cyan"
                ? "border-cyan-500/15 bg-cyan-500/[0.04]"
                : accent === "blue"
                    ? "border-blue-500/15 bg-blue-500/[0.04]"
                    : "border-white/[0.06] bg-black/20"
                }`}
        >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-white/75">
                {icon}
            </div>

            <h4 className="text-sm font-medium text-white/90">
                {title}
            </h4>

            <p className="mt-2 text-xs leading-relaxed text-white/40">
                {subtitle}
            </p>
        </motion.div>
    );
}

export function MiniService({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-4">
            <div className="text-amber-300/70">
                {icon}
            </div>

            <span className="text-sm text-white/75">
                {title}
            </span>
        </div>
    );
}

export function DistributionNode({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl border border-white/[0.06] bg-black/20 p-5"
        >
            <h4 className="text-sm font-medium text-white/90">
                {title}
            </h4>

            <p className="mt-2 text-xs leading-relaxed text-white/40">
                {subtitle}
            </p>
        </motion.div>
    );
}

export function ServiceRow({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/20 px-5 py-4"
        >
            <div className="flex items-center gap-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-blue-300/70">
                    {icon}
                </div>

                <span className="text-sm text-white/75">
                    {label}
                </span>
            </div>

            <ArrowRight size={14} className="text-white/20" />
        </motion.div>
    );
}

export function DeploymentTier({
    tier,
    status,
    desc,
    highlight
}: {
    tier: string;
    status: string;
    desc: string;
    highlight?: boolean;
}) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className={`rounded-2xl border p-4 transition-all ${highlight
                ? "border-cyan-500/30 bg-cyan-500/[0.08]"
                : "border-white/[0.06] bg-white/[0.02]"
                }`}
        >
            <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${highlight ? "text-cyan-400" : "text-white/40"
                    }`}>
                    {tier}
                </span>
                <div className={`h-1.5 w-1.5 rounded-full ${highlight ? "bg-cyan-400 animate-pulse" : "bg-white/20"
                    }`} />
            </div>

            <h4 className="mt-2 text-sm font-medium text-white/90">{status}</h4>
            <p className="mt-1 text-[11px] leading-snug text-white/40">{desc}</p>
        </motion.div>
    );
}

export function FederatedCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="rounded-3xl border border-white/[0.06] bg-black/20 p-6"
        >
            <h4 className="text-base font-medium text-white/90">
                {title}
            </h4>

            <p className="mt-3 text-sm leading-relaxed text-white/40">
                {description}
            </p>
        </motion.div>
    );
}

export function HorizontalFlow() {
    return (
        <div className="hidden items-center justify-center xl:flex">
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent">
                <motion.div
                    animate={{
                        x: ["-120%", "120%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-300/80"
                />
            </div>
        </div>
    );
}

export function ArchitectureConnectorVertical({
    top,
}: {
    top: string;
}) {
    return (
        <div
            className="absolute left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent xl:block"
            style={{
                top,
                height: "85%",
            }}
        />
    );
}

export function PlaneCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="rounded-3xl border border-white/[0.06] bg-black/20 p-6"
        >
            <h4 className="text-base font-medium text-white/90">
                {title}
            </h4>

            <p className="mt-3 text-sm leading-relaxed text-white/40">
                {description}
            </p>
        </motion.div>
    );
}

export function PipelineCapability({
    title,
    detail,
}: {
    title: string;
    detail: string;
}) {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <h5 className="text-sm font-medium text-white/85">
                {title}
            </h5>

            <p className="mt-2 text-xs leading-relaxed text-white/40">
                {detail}
            </p>
        </div>
    );
}

export function WorkerTask({
    label,
}: {
    label: string;
}) {
    return (
        <motion.div
            whileHover={{ x: 3 }}
            className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
        >
            <span className="text-sm text-white/75">
                {label}
            </span>

            <div className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
        </motion.div>
    );
}
