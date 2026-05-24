"use client";

import { motion } from "framer-motion";
import { Cpu, Layers3, MessageSquare, Webhook } from "lucide-react";
import { DistributionNode, HorizontalFlow, MiniService } from "./SharedComponents";

export function AsyncEventSpine() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      viewport={{ once: true }}
      className="mb-16 rounded-[32px] border border-amber-500/10 bg-amber-500/[0.03] p-8"
    >
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-amber-200/40">
            ASYNCHRONOUS_EVENT_SPINE
          </span>

          <h3 className="mt-3 text-2xl font-medium text-white/90">
            Distributed Event Ingestion & Routing
          </h3>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-white/40">
          Incoming webhook traffic was normalized, enriched with metadata, and distributed through
          broadcast or directed delivery channels depending on routing semantics.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_120px_1fr_120px_1fr]">
        {/* SOURCES */}
        <div className="space-y-4">
          <MiniService icon={<Webhook size={16} />} title="Autodesk Webhooks" />

          <MiniService icon={<MessageSquare size={16} />} title="WhatsApp Events" />

          <MiniService icon={<Layers3 size={16} />} title="External Integrations" />
        </div>

        {/* FLOW */}
        <HorizontalFlow />

        {/* LAMBDA */}
        <div className="flex items-center justify-center">
          <div className="w-full rounded-2xl border border-white/[0.08] bg-black/30 p-6 text-center">
            <Cpu className="mx-auto mb-4 text-amber-300/70" />

            <h4 className="text-lg font-medium text-white/90">Lambda Processing</h4>

            <p className="mt-2 text-sm leading-relaxed text-white/40">
              Metadata enrichment, routing logic, event normalization, orchestration.
            </p>
          </div>
        </div>

        {/* FLOW */}
        <HorizontalFlow />

        {/* DISTRIBUTION */}
        <div className="grid gap-4">
          <DistributionNode title="SNS Fanout" subtitle="Broadcast delivery to multiple clusters" />

          <DistributionNode title="SQS Queues" subtitle="Directed tenant-specific routing" />
        </div>
      </div>
    </motion.div>
  );
}
