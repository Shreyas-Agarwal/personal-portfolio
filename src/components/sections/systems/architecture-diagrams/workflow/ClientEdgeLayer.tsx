"use client";

import { Users, Cloud, Boxes, Workflow } from "lucide-react";
import { ArchitectureSectionLabel, ArchitectureNode } from "./SharedComponents";

export function ClientEdgeLayer() {
    return (
        <div className="mb-16">
            <ArchitectureSectionLabel
                title="CLIENT_EDGE_LAYER"
                description="Ingress, frontend delivery, and unified API entry"
            />

            <div className="mt-8 grid gap-5 md:grid-cols-4">
                <ArchitectureNode
                    icon={<Users size={20} />}
                    title="Operational Clients"
                    subtitle="Enterprise users"
                />

                <ArchitectureNode
                    icon={<Cloud size={20} />}
                    title="CloudFront CDN"
                    subtitle="Global edge distribution"
                    accent="blue"
                />

                <ArchitectureNode
                    icon={<Boxes size={20} />}
                    title="S3 Frontend"
                    subtitle="Static application hosting"
                />

                <ArchitectureNode
                    icon={<Workflow size={20} />}
                    title="API Gateway"
                    subtitle="Unified ingress boundary"
                    accent="cyan"
                />
            </div>
        </div>
    );
}
