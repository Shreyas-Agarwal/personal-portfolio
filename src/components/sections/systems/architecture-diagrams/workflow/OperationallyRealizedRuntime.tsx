"use client";

import { ArrowRightLeft, Info, Zap } from "lucide-react";
import { IngressRoutingSurface } from "./realized/IngressRoutingSurface";
import { VPCExecutionBoundary } from "./realized/VPCExecutionBoundary";

export function OperationallyRealizedRuntime() {
  return (
    <section className="relative overflow-hidden bg-[#05070A] px-6 py-32 md:px-12 border-t border-white/[0.05]">
      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-24 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-4xl">
            <span className="mb-5 block font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase">
              OPERATIONALLY_REALIZED_RUNTIME
            </span>

            <h2 className="max-w-5xl text-4xl font-medium leading-tight tracking-tight text-white/92 md:text-6xl">
              Unified Operational Runtime Surface
            </h2>
          </div>

          <div className="max-w-md md:pt-5">
            <p className="text-sm leading-relaxed text-white/42">
              The current runtime consolidates ingress, routing, and execution into a tightly
              integrated model. By utilizing colocated persistence and in-process queuing, the
              system minimizes infrastructure coordination costs while maintaining full enterprise
              VPC isolation.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-5">
              <div className="flex items-start gap-4">
                <Info size={18} className="mt-0.5 text-blue-400/70" />
                <div>
                  <h4 className="text-sm font-medium text-white/90">Architectural Evolution</h4>
                  <p className="mt-2 text-xs leading-relaxed text-blue-100/40">
                    This runtime represents the currently realized operational architecture, while
                    the previously shown federated coordination model represents the intended
                    long-term platform direction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VISUAL ARCHITECTURE */}
        <div className="relative rounded-[40px] border border-white/[0.06] bg-white/[0.01] p-8 md:p-16">
          <IngressRoutingSurface />
          <VPCExecutionBoundary />

          {/* RATIONALE CARDS */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <RationaleCard
              icon={<Zap size={16} />}
              title="Operational Velocity"
              text="Reducing external cloud service dependencies (SQS, Lambda, RDS) allows for immediate deployment and simpler debugging cycles during early maturation."
            />
            <RationaleCard
              icon={<ArrowRightLeft size={16} />}
              title="Infrastructure Consolidation"
              text="Custom EC2 routing provides fine-grained control over traffic steering and load balancing without the overhead of managed gateway services."
            />
          </div>
        </div>

        {/* COMPARISON GRID */}
        <div className="mt-32">
          <div className="mb-16 text-center">
            <span className="font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase">
              SYSTEM_EVOLUTION_MATRIX
            </span>
            <h3 className="mt-4 text-3xl font-medium text-white/90">
              Comparison of Architectural States
            </h3>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.01]">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] border-b border-white/[0.06] bg-white/[0.02]">
              <div className="px-8 py-5 text-xs font-mono tracking-widest text-white/25 uppercase">
                Capability
              </div>
              <div className="px-8 py-5 text-xs font-mono tracking-widest text-white/25 uppercase border-l border-white/[0.06]">
                Proposed Coordination
              </div>
              <div className="px-8 py-5 text-xs font-mono tracking-widest text-white/25 uppercase border-l border-white/[0.06]">
                Realized Runtime
              </div>
            </div>

            <ComparisonRow
              label="Ingress Surface"
              proposed="API Gateway / CloudFront"
              realized="Custom EC2 Routing Engine"
            />
            <ComparisonRow
              label="Event Routing"
              proposed="SNS / SQS / Lambda"
              realized="BullMQ / Internal Redis Bus"
            />
            <ComparisonRow
              label="Worker Execution"
              proposed="Decoupled Serverless"
              realized="Colocated Worker Threads"
            />
            <ComparisonRow
              label="Transformation Pipelines"
              proposed="Centralized ECS Cluster"
              realized="In-Process Transformation"
            />
            <ComparisonRow
              label="Database Strategy"
              proposed="Domain-Isolated RDS"
              realized="Colocated PostgreSQL"
            />
            <ComparisonRow
              label="Runtime Isolation"
              proposed="Physical VPC Isolation"
              realized="VPC-contained EC2 Nodes"
            />
            <ComparisonRow
              label="Operational Complexity"
              proposed="High (Optimized for Scale)"
              realized="Low (Optimized for Velocity)"
              last
            />
          </div>
        </div>

        {/* CLOSING */}
        <div className="mt-28 border-t border-white/[0.06] pt-10">
          <div className="max-w-4xl">
            <p className="text-lg font-light leading-relaxed text-white/60">
              Pragmatism in architecture is knowing when to optimize for scale and when to optimize
              for iteration.
              <span className="text-white/90 font-normal">
                {" "}
                The realized runtime surface is an intentional choice{" "}
              </span>
              to minimize operational surface area while the platform's semantic logic matures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RationaleCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="rounded-lg bg-white/[0.03] p-2 text-white/40">{icon}</div>
        <h4 className="text-sm font-medium text-white/90">{title}</h4>
      </div>
      <p className="text-xs leading-relaxed text-white/40">{text}</p>
    </div>
  );
}

function ComparisonRow({
  label,
  proposed,
  realized,
  last = false,
}: {
  label: string;
  proposed: string;
  realized: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] ${last ? "" : "border-b border-white/[0.06]"}`}
    >
      <div className="px-8 py-5 text-sm font-medium text-white/70 bg-white/[0.01]">{label}</div>
      <div className="px-8 py-5 text-xs text-white/40 border-l border-white/[0.06] flex items-center">
        {proposed}
      </div>
      <div className="px-8 py-5 text-xs text-white/40 border-l border-white/[0.06] flex items-center bg-blue-500/[0.01]">
        {realized}
      </div>
    </div>
  );
}
