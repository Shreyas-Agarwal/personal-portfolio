"use client";

import { motion } from "framer-motion";
import { Server, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export function IngressRoutingSurface() {
    return (
        <div className="mb-16 flex flex-col items-center">
            <motion.div 
                whileHover={{ y: -2 }}
                className="relative rounded-3xl border border-blue-500/30 bg-blue-500/[0.03] p-8 max-w-md w-full"
            >
                {/* Badge */}
                <div className="absolute -top-3 left-6 flex items-center gap-2 rounded-full border border-blue-500/30 bg-[#05070A] px-3 py-1">
                    <Zap size={12} className="text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-blue-400">Custom Ingress Surface</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                        <Server className="text-blue-400" size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-white/90">EC2 Routing Engine</h4>
                        <p className="text-xs text-white/40 mt-1 leading-relaxed">
                            Acting as unified API Gateway, Load Balancer, and reverse proxy for all system traffic.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2 flex items-center gap-2">
                        <ShieldCheck size={12} className="text-blue-400/60" />
                        <span className="text-[10px] text-white/60 uppercase">API Gateway</span>
                    </div>
                    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2 flex items-center gap-2">
                        <ArrowRight size={12} className="text-blue-400/60" />
                        <span className="text-[10px] text-white/60 uppercase">Load Balancer</span>
                    </div>
                </div>
            </motion.div>
            
            <div className="flex h-12 w-px bg-gradient-to-b from-blue-500/40 to-white/10" />
        </div>
    );
}
