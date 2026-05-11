"use client";

import { motion } from "framer-motion";
import { Workflow, MessageSquare, Database, RadioTower } from "lucide-react";
import { MiniService, WorkerTask, DistributionNode } from "./SharedComponents";

export function WorkerExecution() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16 rounded-[32px] border border-emerald-500/10 bg-emerald-500/[0.03] p-8"
        >
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-100/40">
                        DISTRIBUTED_WORKER_EXECUTION
                    </span>

                    <h3 className="mt-3 text-2xl font-medium text-white/90">
                        Stateless Event-Driven Worker Infrastructure
                    </h3>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-white/40">
                    Worker execution was intentionally separated from product servers,
                    allowing asynchronous operational tasks to scale independently from
                    runtime application clusters.
                </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr_3fr_1fr]">

                {/* PRODUCT EVENTS */}
                <div className="space-y-5">

                    <MiniService
                        icon={<Workflow size={16} />}
                        title="Workflow Triggers"
                    />

                    <MiniService
                        icon={<MessageSquare size={16} />}
                        title="Notification Requests"
                    />

                    <MiniService
                        icon={<Database size={16} />}
                        title="Processing Outputs"
                    />
                </div>

                {/* SQS */}
                <div className="rounded-3xl border border-white/[0.08] bg-black/30 p-8">

                    <div className="flex items-center gap-4">
                        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] p-3">
                            <RadioTower
                                className="text-emerald-300/70"
                                size={22}
                            />
                        </div>

                        <div>
                            <h4 className="text-xl font-medium text-white/90">
                                Queue-Driven Worker Activation
                            </h4>

                            <p className="mt-1 text-sm text-white/40">
                                SQS-triggered serverless execution orchestration
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">

                        <WorkerTask label="Email Delivery Pipelines" />
                        <WorkerTask label="WhatsApp Messaging Workers" />
                        <WorkerTask label="Document Processing Jobs" />
                        <WorkerTask label="Notification Orchestration" />
                        <WorkerTask label="Background Operational Tasks" />
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <p className="text-sm leading-relaxed text-white/45">
                            Product clusters delegated asynchronous workloads into queue-driven
                            execution infrastructure, reducing server coupling and allowing
                            independent operational scalability.
                        </p>
                    </div>
                </div>

                {/* LAMBDA EXECUTION */}
                <div className="space-y-5">

                    <DistributionNode
                        title="Lambda Workers"
                        subtitle="Elastic serverless execution"
                    />

                    <DistributionNode
                        title="Independent Scaling"
                        subtitle="Execution detached from product runtimes"
                    />

                    <DistributionNode
                        title="Operational Outputs"
                        subtitle="Messaging, delivery, orchestration"
                    />
                </div>
            </div>
        </motion.div>
    );
}
