"use client";

import { Webhook, MessageSquare, Layers3 } from "lucide-react";
import { ArchitectureSectionLabel, ArchitectureNode } from "./SharedComponents";

export function ExternalEventIngestion() {
    return (
        <div className="mb-16">
            <ArchitectureSectionLabel
                title="EXTERNAL_EVENT_INGESTION"
                description="Push-based operational integrations"
            />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
                <ArchitectureNode
                    icon={<Webhook size={20} />}
                    title="Autodesk Webhooks"
                    subtitle="Broadcast operational events"
                />

                <ArchitectureNode
                    icon={<MessageSquare size={20} />}
                    title="WhatsApp Events"
                    subtitle="Directed communication events"
                />

                <ArchitectureNode
                    icon={<Layers3 size={20} />}
                    title="External Integrations"
                    subtitle="Third-party platform ingress"
                />
            </div>
        </div>
    );
}
