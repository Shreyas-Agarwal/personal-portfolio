"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, Settings2, ShieldAlert, Terminal } from "lucide-react";

export function TelemetryControl() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-8 rounded-[32px] border border-white/[0.08] bg-gradient-to-r from-blue-500/[0.02] via-purple-500/[0.02] to-emerald-500/[0.02] p-8 relative"
    >
      {/* Background Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent hidden md:block" />

      <div className="relative z-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">
              TELEMETRY_AND_COMMAND_CONTROL
            </span>
            <h3 className="mt-3 text-2xl font-medium text-white/90">
              Unified Governance & Remote Control Loop
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/40">
            A bi-directional control plane ensuring that while product clusters execute
            independently, they remain strictly governed by platform-wide security and operational
            policies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* INBOUND: TELEMETRY */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <Activity size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
                Real-time Telemetry
              </span>
            </div>

            <div className="grid gap-3">
              <ControlCard
                icon={<Gauge size={16} />}
                title="Resource Monitoring"
                detail="Cross-tenant CPU/Mem saturation & billing quotas"
              />
              <ControlCard
                icon={<Terminal size={16} />}
                title="Operational Logs"
                detail="Centralized audit trails for all tenant activities"
              />
            </div>
          </div>

          {/* OUTBOUND: CONTROL */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <ShieldAlert size={14} className="text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
                Policy Injection
              </span>
            </div>

            <div className="grid gap-3">
              <ControlCard
                icon={<Settings2 size={16} />}
                title="Remote Config"
                detail="Feature toggles & environment overrides"
                highlight="emerald"
              />
              <ControlCard
                icon={<ShieldAlert size={16} />}
                title="Governance Enforcement"
                detail="Immediate kill-switch & RBAC policy sync"
                highlight="emerald"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ControlCard({
  icon,
  title,
  detail,
  highlight = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  highlight?: "blue" | "emerald";
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 flex items-start gap-4 hover:border-white/10 transition-colors">
      <div
        className={`mt-1 rounded-lg p-2 bg-white/[0.03] ${highlight === "blue" ? "text-blue-400/70" : "text-emerald-400/70"}`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-white/85">{title}</h4>
        <p className="mt-1 text-xs text-white/35 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}
