"use client";

import { Layers3, Webhook } from "lucide-react";
import { ArchitectureNode, ArchitectureSectionLabel } from "./SharedComponents";

export function ExternalEventIngestion() {
  return (
    <div className="mb-16">
      <ArchitectureSectionLabel
        title="EXTERNAL_EVENT_INGESTION"
        description="Push-based operational integrations"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <ArchitectureNode
          icon={<Webhook size={20} />}
          title="External Webhook Events"
          subtitle="Ingress for push-based operational events"
          accent="blue"
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
