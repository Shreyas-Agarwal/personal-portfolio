export interface ImpactMetric {
  label: string;
  value: string;
}

export interface AppliedSystem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: "technical" | "implementation";
  order: number;
  techStack: string[];
  impactMetrics: ImpactMetric[];
  /** External CTA — only set when a live demo exists */
  liveUrl: string;
  /** LinkedIn post or video embed ID — leave "" until ready to fill in */
  linkedinEmbedId: string;
  /** Path relative to /public served as a static asset, e.g. /videos/foo.mp4 */
  backupVideoPath: string;
  challenge: string;
  /** NDA-compliant pseudocode / architecture block shown on the case study page */
  solutionCode?: string;
  impactNarrative: string;
  /** Path relative to /public served as a static asset, e.g. /images/foo.png */
  imagePath?: string;
  /** Optional URL to a presentation or related document */
  presentationUrl?: string;
  /** Systems this project implements or demonstrates */
  appliedSystems?: AppliedSystem[];
}

export const projects: Project[] = (
  [
    {
      id: "planned-vs-actual-4d",
      title: "Planned vs. Actual 4D Schedule Simulation Engine",
      subtitle:
        "Interactive 4D BIM timeline simulation engine utilizing WebGL/Three.js custom layers to map construction schedule milestones directly against native cloud models.",
      type: "technical",
      order: 1,
      techStack: ["Autodesk Platform Services (APS)", "Three.js", "WebGL", "Web Workers"],
      impactMetrics: [
        { label: "Sync Latency (ACC to View)", value: "Instant" },
        { label: "Third-party Dependencies", value: "Zero" },
        { label: "3D Element Matching Uptime", value: "99.8%" },
        { label: "Render Target frame-rate", value: "60 FPS" },
      ],
      liveUrl: "https://buildwithbim.in/planvactual",
      linkedinEmbedId: "",
      backupVideoPath: "/videos/planvactual_4d.mp4",
      imagePath: "/images/planvactual_4d.png",
      presentationUrl: "/videos/planvactual_4d.pdf",
      challenge:
        "Integrating 4D construction metadata traditionally requires rigid external middleware to bind project schedules to graphic elements. The challenge was to achieve dynamic schedule-to-model parsing natively within the browser, rendering complex timeline state adjustments at a buttery-smooth 60 FPS without introducing external database integrations or choking the browser's main execution thread.",
      solutionCode: `// Native ACC 4D Schedule Timeline Core
// NDA-compliant architectural abstraction

interface ACCScheduleTask {
  id: string;
  activityId: string;
  plannedStartDate: string;
  actualStartDate: string;
  percentComplete: number;
}

interface APSModelMapping {
  elementId: string;   // Native Viewer dbId / URN reference
  activityId: string;  // Linked ACC schedule parameter reference
}

class Timeline4DEngine {
  private activeViewer: any; // Primary WebGL / Three.js backed scene canvas
  private calculationWorker: Worker;

  constructor(apsViewerInstance: any) {
    this.activeViewer = apsViewerInstance;
    this.initTimelineWorker();
  }

  private initTimelineWorker() {
    // Shifting array filtering and date interpolation off the main thread
    this.calculationWorker = new Worker(new URL('./timelineProcessor.worker.ts', import.meta.url));
  }

  /**
   * Evaluates the active timeline epoch to compute visibility vectors.
   * Leverages Three.js layer visibility and state overrides for rendering.
   */
  public async setTimelineTargetEpoch(targetEpoch: number, tasks: ACCScheduleTask[], mappings: APSModelMapping[]) {
    // Post payload to background worker to avoid UI stuttering during slider drag
    this.calculationWorker.postMessage({ targetEpoch, tasks, mappings });

    this.calculationWorker.onmessage = (event: MessageEvent) => {
      const { visibleElementIds, hiddenElementIds } = event.data;

      // Batch visibility updates natively within the WebGL scene graph
      this.activeViewer.isolate(visibleElementIds); 
      
      // Request frame refresh on the underlying Three.js/WebGL context
      if (this.activeViewer.impl && typeof this.activeViewer.impl.invalidate === 'function') {
        this.activeViewer.impl.invalidate(true, true, false);
      }
    };
  }
}`,
      impactNarrative:
        "Eliminated the dependency on external third-party middleware suites by engineering a direct pipeline reading native parameters within Autodesk Construction Cloud. By offloading heavy date-interpolation calculations to a background Web Worker thread and batching element visibility transformations natively within the Three.js-backed WebGL canvas, the engine supports instantaneous, zero-latency timeline updates as the user interacts with the dashboard.",
    },

    {
      id: "powerbi-4d-viewer",
      title: "PowerBI 4D Analytics & Project Progress Tracking Pipeline",
      subtitle:
        "High-performance, zero-infrastructure enterprise data pipeline linking Autodesk Data Exchanges natively with Microsoft Cloud servers for instantaneous BI synchronization.",
      type: "technical",
      order: 5,
      techStack: ["PowerBI", "PowerQuery", "DAX", "Autodesk Data Connectors"],
      impactMetrics: [
        { label: "Infrastructure Cost", value: "Zero" },
        { label: "Server Maintenance", value: "None (Serverless)" },
        { label: "Data Sources Unified", value: "6" },
        { label: "Sync Latency", value: "Near Real-Time" },
      ],
      liveUrl: "https://www.5dvdc.com/Deliverables/custom-dashboards",
      linkedinEmbedId: "",
      backupVideoPath: "/videos/powerbi_4d.mp4",
      imagePath: "/images/powerbi_4d.jpg",
      challenge:
        "Traditional BI integrations require provisioning, securing, and maintaining on-prem databases or cloud servers to store intermediate model parameters. The challenge was to completely eliminate this middleware infrastructure layer by leveraging native PowerBI Connectors to stream data directly into the dashboard, requiring advanced PowerQuery and DAX modeling to harmonize complex 4D schedules with architectural parameters dynamically.",
      solutionCode: `// Advanced PowerQuery & DAX Data Modeling Pipeline
// NDA-compliant architectural abstraction

// 1. PowerQuery (M) - Harmonizing Autodesk Data Exchange parameters
let
    Source = AutodeskDataExchange.Contents("exchange_urn"),
    // Extract nested parameters from ACC Revit model
    ExpandedProperties = Table.ExpandRecordColumn(Source, "Properties", {"ElementId", "Category", "Volume", "Phase"}),
    
    // Clean and transform data types for calculation efficiency
    TypedData = Table.TransformColumnTypes(ExpandedProperties, {
        {"Volume", type number}, 
        {"Phase", type text}
    }),
    
    // Merge with Project Management Data (ACC Data Connector)
    ScheduleData = AutodeskDataConnector.Contents("project_id", "Schedule"),
    MergedQueries = Table.NestedJoin(TypedData, {"ElementId"}, ScheduleData, {"LinkedElementId"}, "ScheduleMetrics", JoinKind.LeftOuter)
in
    MergedQueries

// 2. DAX - Dynamic 4D Timeline Evaluation Measure
// Calculates total concrete volume poured up to the currently selected timeline epoch
CumulativeVolume = 
CALCULATE(
    SUM('ModelData'[Volume]),
    FILTER(
        ALL('Schedule'),
        'Schedule'[ActualStartDate] <= MAX('DateDimension'[Date])
    )
)

// 3. DAX - Schedule Variance Indicator (Planned vs Actual)
VarianceStatus = 
IF(
    ISBLANK(MAX('Schedule'[ActualStartDate])),
    "Not Started",
    IF(
        MAX('Schedule'[ActualStartDate]) > MAX('Schedule'[PlannedStartDate]),
        "Delayed",
        "On Track"
    )
)`,
      impactNarrative:
        "Architected a zero-middleware pipeline that streams granular variables straight from Autodesk Data Connectors directly into PowerBI. By eliminating custom webhooks and intermediate database serving layers entirely, this design relies on sophisticated PowerQuery M scripts and DAX measures to transform and link native architectural models with project management schedules. This completely slashed server maintenance overhead while ensuring enterprise-grade data security and instant dashboard refreshes.",
    },
    {
      id: "document-stamping",
      title: "State-Driven Document Stamping Engine",
      subtitle:
        "Deterministic engineering compliance engine converting fragile Autodesk markups into server-side burned cryptographic stamps with automated, field-scannable QR version tracking.",
      type: "technical",
      order: 3,
      techStack: [
        "Node.js",
        "TypeScript",
        "Finite State Machines (FSM)",
        "PDF-Lib",
        "Autodesk Cloud Webhooks",
      ],
      impactMetrics: [
        { label: "Document Compliance Integrity", value: "100% Immutable" },
        { label: "Unauthorized Stamp Usage", value: "0% (RBAC Guarded)" },
        { label: "On-Site Version Verification", value: "Instant via QR" },
        { label: "Review Cycle Acceleration", value: "~70%" },
      ],
      liveUrl: "",
      linkedinEmbedId: "",
      backupVideoPath: "/videos/automated_stamping.mp4",
      imagePath: "/images/automated_stamping.png",
      challenge:
        "Native cloud workflows treat drawing approvals as client-side vector markups. This introduces structural compliance risks: stamps can be accidentally edited or maliciously deleted by downstream vendors, stamp access cannot be gated by Roles, and printed field blueprints lack a dynamic mechanism to confirm if they represent the latest approved revision. The challenge lay in intercepting drawing approvals via webhooks, cryptographically flattening multi-party signatures permanently into the PDF binary, and embedding dynamic version-tracking metadata.",
      solutionCode: `// Server-Side Immutable FSM Drawing Stamper & Dynamic Version Controller
// NDA-compliant architectural abstraction

type StampState = "PENDING_REVIEWER" | "PENDING_AUTHORITY" | "STAMPED_APPROVED" | "REJECTED";

interface DrawingMetadata {
  documentId: string;
  version: number;
  isLatest: boolean;
  projectHub: "ENTERPRISE_A" | "ENTERPRISE_B";
}

class CryptographicStampingEngine {
  /**
   * Evaluates state machine transitions. 
   * Enforces strict RBAC to ensure unauthorized entities cannot execute high-clearance stamps.
   */
  public handleStampTransition(currentState: StampState, event: string, actorRole: string): StampState {
    const rbacMatrix: Record<StampState, { allowedRoles: string[]; nextState: StampState }> = {
      PENDING_REVIEWER: { allowedRoles: ["BIM_Coordinator", "VDC_Lead"], nextState: "PENDING_AUTHORITY" },
      PENDING_AUTHORITY: { allowedRoles: ["Project_Architect", "Consultant"], nextState: "STAMPED_APPROVED" },
      STAMPED_APPROVED: { allowedRoles: [], nextState: "STAMPED_APPROVED" },
      REJECTED: { allowedRoles: [], nextState: "REJECTED" }
    };

    const rules = rbacMatrix[currentState];
    if (!rules || !rules.allowedRoles.includes(actorRole)) {
      throw new Error(\`Security Violation: Role \${actorRole} cannot transition state from \${currentState}\`);
    }

    return event === "APPROVE" ? rules.nextState : "REJECTED";
  }

  /**
   * Modifies the underlying PDF binary. 
   * Burns the visual stamp asset permanently into the page layer to prevent downstream removal,
   * and appends a server-generated QR code linking to the live version verification registry.
   */
  public async burnImmutableStampAndQR(
    pdfBuffer: Buffer,
    actorName: string,
    metadata: DrawingMetadata
  ): Promise<Buffer> {
    // Abstraction using pdf-lib or native binary manipulation server-side
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    
    for (const page of pages) {
      const { width, height } = page.getSize();
      
      // 1. Burn permanent visual approval text directly onto the pixel coordinate map
      page.drawText(\`OFFICIALLY APPROVED BY: \${actorName} | DATE: \${new Date().toISOString()}\`, {
        x: 50,
        y: height - 50,
        size: 10,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica_Bold),
        color: rgb(0, 0.5, 0.1) // Compliant structural green
      });

      // 2. Generate and embed dynamic verification QR code payload
      // On-site construction crews scan this token to check 'isLatest' dynamically on mobile
      const verificationUrl = \`https://verify.platform-systems.example/verify/\${metadata.documentId}?v=\${metadata.version}\`;
      const qrImageBuffer = await this.generateQRBuffer(verificationUrl);
      const embeddedQr = await pdfDoc.embedPng(qrImageBuffer);
      
      page.drawImage(embeddedQr, {
        x: width - 120,
        y: height - 120,
        width: 70,
        height: 70
      });
    }

    return await pdfDoc.save();
  }

  private async generateQRBuffer(url: string): Promise<Buffer> {
    // Concrete serverless QR generation abstraction returning raw buffer stream
    return Buffer.from([]); 
  }
}`,
      impactNarrative:
        "Overhauled the insecure, manual Autodesk markup review cycle by designing an automated, server-side PDF manipulation engine. The platform listens for review approval states via webhooks, cryptographically flattens roles-verified stamp profiles directly into the drawing's binary layers to prevent tampering, and appends a dynamic verification QR code. This gives on-site field engineers instant security validation over blueprint recency, completely eliminating out-of-date documentation usage errors on active construction sites.",
    },

    {
      id: "whatsapp-chatbots",
      title: "Secure Agentic WhatsApp Conversational Enterprise Gateway",
      subtitle:
        "Token-optimized, multi-agent conversational architecture linking field operations to Autodesk APIs via an isolated intent-parsing firewall.",
      type: "technical",
      order: 6,
      techStack: ["Python", "Meta Cloud API", "Redis", "AutoGen", "Agno", "FastAPI"],
      appliedSystems: [
        {
          label: "Frontend–Backend Responsibility Boundaries",
          href: "/systems/analytics-semantic-layer-architecture",
        },
      ],
      impactMetrics: [
        { label: "LLM Token Cost Reduction", value: "~75%" },
        { label: "Direct API Data Exposure", value: "0% (Air-Gapped)" },
        { label: "Field Query Response Time", value: "< 3.5 s" },
        { label: "Manual Office Interventions", value: "Reduced 60%" },
      ],
      liveUrl: "",
      linkedinEmbedId: "",
      backupVideoPath: "/videos/whatsapp_chatbot.mp4",
      imagePath: "/images/whatsapp_chatbot.jpg",
      challenge:
        "Field engineers need real-time updates on active site Issues, drawing revisions, and RFIs, but lack access to heavy corporate BIM dashboards. Exposing underlying Autodesk APIs to open-ended LLMs via traditional Model Context Protocol (MCP) or tool-calling layers creates immense compliance vulnerabilities, risks data leaks, and introduces massive context-window token overhead that scales unsustainably with multi-user enterprise traffic.",
      solutionCode: `# Secure Multi-Agent Conversational Infrastructure Pipeline
# NDA-compliant architectural abstraction

from pydantic import BaseModel
from typing import Dict, Any

class IntentPayload(BaseModel):
    intent: str               # e.g., "QUERY_PENDING_ISSUES"
    target_user_id: str
    filters: Dict[str, Any]

class HTTPRequestSpec(BaseModel):
    method: str
    endpoint: str
    queryParams: Dict[str, Any]

class MultiAgentGateway:
    def __init__(self, redis_client, meta_api):
        self.redis = redis_client
        self.meta = meta_api

    async def orchestrate_field_query(self, incoming_text: str, phone_number: str) -> str:
        """
        Executes a decoupled 3-tier Agentic Pipeline to isolate corporate data pipelines.
        Prevents raw API payloads or sensitive credentials from entering LLM contexts.
        """
        # Tier 1: Intent Parser Agent (Symmetric Semantic Mapping)
        # Goal: Translate raw conversational vernacular into a strict schema without data lookups
        intent_payload: IntentPayload = await self.run_intent_parser_agent(incoming_text)
        
        # Tier 2: Query Constructor Agent (Token-Optimized Schema Generation)
        # Goal: Generates a declarative HTTP specification structure based on isolated rules
        request_spec: HTTPRequestSpec = await self.run_query_constructor_agent(intent_payload)

        # Core System Security Air-Gap:
        # The LLM is never given API tokens, nor does it make network requests. 
        # The underlying backend execution layer processes the safe, constructed schema.
        raw_api_response = await self.execute_secure_server_call(request_spec)

        # Tier 3: Answer Formatting Agent (Dynamic Persona Rendering)
        # Goal: Accepts raw JSON response variables and parses them into a human-readable text string
        user_friendly_response: str = await self.run_answer_formatter_agent(
            user_prompt=incoming_text, 
            data_context=raw_api_response
        )

        return user_friendly_response

    async def execute_secure_server_call(self, spec: HTTPRequestSpec) -> Dict[str, Any]:
        # Server-side microservice hydration layer injecting internal secure corporate credentials
        headers = { "Authorization": f"Bearer {self.get_vault_token('AUTODESK_APS')}" }
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=spec.method,
                url=f"https://developer.api.autodesk.com/{spec.endpoint}",
                params=spec.queryParams,
                headers=headers
            )
            return response.json()
`,
      impactNarrative:
        "Bypassed high-cost, structurally insecure Model Context Protocol (MCP) implementations by engineering a decoupled, three-tier multi-agent conversational engine built on AutoGen and Agno frameworks. By segmenting the system into isolated Intent-Parsing, Query-Construction, and Answer-Formatting agents, the LLM context is strictly limited to metadata formatting, reducing token consumption by 75% and establishing an air-gapped security boundary that prevents raw enterprise cloud data from ever being exposed to the public model provider.",
    },

    {
      id: "notification-broker",
      title: "Adaptive Compliance Guardian",
      subtitle:
        "Decoupled, asynchronous event processor intercepting webhooks to enforce compliance guardrails and distribute immediate field alerts.",
      type: "technical",
      order: 4,
      techStack: [
        "Node.js",
        "BullMQ",
        "Redis",
        "Autodesk Cloud Webhooks",
        "Circuit Breaker Pattern",
      ],
      appliedSystems: [
        {
          label: "Analytics Semantic Execution Model",
          href: "/systems/analytics-semantic-layer-architecture",
        },
      ],
      impactMetrics: [
        { label: "Event Delivery Guarantee", value: "Zero-Loss (At-Least-Once)" },
        { label: "Out-of-Bounds Folder Flags", value: "Instant (< 800ms)" },
        { label: "API Blocking Overhead", value: "0% (Fully Decoupled)" },
        { label: "Failed Channel Recovery", value: "Automatic Backoff" },
      ],
      liveUrl: "",
      linkedinEmbedId: "",
      backupVideoPath: "/videos/instant_whatsapp_alerts.mp4",
      imagePath: "/images/instant_whatsapp_alerts.jpg",
      presentationUrl: "/videos/instant_whatsapp_alerts.pdf",
      challenge:
        "Autodesk Construction Cloud lacks native folder-to-workflow restrictions, allowing users to accidentally route drawings from restricted directories into formal executive review cycles. Furthermore, legacy alerting mechanisms handled notifications synchronously within the main request execution thread. If a single external communications provider encountered latency, the entire primary API loop froze, resulting in silent message drops and structural compliance blind spots.",
      solutionCode: `// Decoupled Multi-Channel Notification Broker & Compliance Filter
// NDA-compliant architectural abstraction

interface AutodeskWebhookEvent {
  eventId: string;
  eventType: "dm.version.added" | "rf.review.created";
  payload: {
    projectHub: string;
    reviewId: string;
    folderUrn: string;
    documentId: string;
    initiatedBy: string;
  };
}

class HighAvailabilityNotificationBroker {
  private eventQueue: any; // Instantiated via BullMQ backed by high-throughput Redis

  constructor(bullQueueInstance: any) {
    this.eventQueue = bullQueueInstance;
  }

  /**
   * Ingestion Gateway. Receives webhooks from Autodesk Cloud servers.
   * Executes a fire-and-forget push to decouple processing from the webhook response window.
   */
  public async ingestAutodeskCloudWebhook(event: AutodeskWebhookEvent): Promise<void> {
    const idempotencyKey = crypto.createHash('sha256').update(event.eventId).digest('hex');
    
    // Enqueue event with deterministic priority queues and automated backoffs
    await this.eventQueue.add('ACC_EVENT_JOB', event, {
      jobId: idempotencyKey,
      priority: event.eventType === 'rf.review.created' ? 1 : 10, // Critical priority execution
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true
    });
  }

  /**
   * Worker Process Execution Engine.
   * Runs in an isolated thread pool to run structural auditing and fan-out notifications.
   */
  public async processQueueJob(jobData: AutodeskWebhookEvent) {
    const { payload, eventType } = jobData;

    // Step 1: Execute Proactive Compliance Audit Layer
    if (eventType === "rf.review.created") {
      const isFolderCompliant = await this.verifyFolderWorkflowPermissions(payload.folderUrn, payload.reviewId);
      
      if (!isFolderCompliant) {
        // Intercept workflow and dynamically rewrite event destination targeting Project Admins
        await this.dispatchFlaggedComplianceAlert(payload);
        return;
      }
    }

    // Step 2: Clean path execution - standard worker distribution loop across communication adapters
    await this.executeChannelFanout(jobData);
  }

  private async verifyFolderWorkflowPermissions(folderUrn: string, reviewId: string): Promise<boolean> {
    // Queries isolated enterprise role matrix (e.g., matching paths for internal project hubs)
    // Returns false if a drawing from an unapproved folder is routed to a master workflow
    const ruleset = await this.fetchStructuralRuleset(reviewId);
    return ruleset.approvedFolders.includes(folderUrn);
  }
}`,
      impactNarrative:
        "Decoupled all communication overhead from the primary platform API request cycle by deploying a resilient, asynchronous event broker using BullMQ and Redis. By extending this broker to serve as an active compliance audit filter, the architecture intercepts external review actions via webhooks, cross-references folder permissions instantly, and flags out-of-bounds workflow anomalies. This ensures project managers and administrators receive critical, role-gated messaging alerts within 800 milliseconds, ensuring absolute structural data governance.",
    },
    {
      id: "experion-implementation",
      title: "Enterprise Project & Implementation Monitoring",
      subtitle:
        "Comprehensive PowerBI dashboard suite spanning project, labor, and activity productivity with future forecasting and implementation tracking.",
      type: "implementation",
      order: 7,
      techStack: ["PowerBI", "Data Modeling", "DAX", "Implementation Strategy"],
      impactMetrics: [
        { label: "Dashboards Deployed", value: "Multiple" },
        { label: "Productivity Tracking", value: "3-Tiered" },
        { label: "Forecasting", value: "Enabled" },
      ],
      liveUrl: "",
      linkedinEmbedId: "",
      backupVideoPath: "",
      imagePath: "/images/experion_dashboard.png",
      challenge:
        "Enterprise construction projects require granular visibility across multiple dimensions of productivity (labor, activity, overall project) along with accurate future forecasting. The challenge was to consolidate these disparate metrics into a unified, actionable PowerBI monitoring suite.",
      impactNarrative:
        "Delivered a holistic PowerBI monitoring solution that provides deep insights into productivity and enables proactive future forecasting. This implementation successfully bridged the gap between raw field data and executive decision-making.",
    },
    {
      id: "dlf-acc-implementation",
      title: "Enterprise Autodesk Construction Cloud Implementation",
      subtitle:
        "Full-scale enterprise rollout of Autodesk Construction Cloud (Forma) with advanced project monitoring across 50+ dashboards developed over 5 months.",
      type: "implementation",
      order: 2,
      techStack: [
        "Autodesk Construction Cloud",
        "Autodesk Forma",
        "PowerBI",
        "Enterprise Transformation",
      ],
      impactMetrics: [
        { label: "Dashboards Created", value: "50+" },
        { label: "Implementation Timeline", value: "5 Months" },
        { label: "Role", value: "Co-Lead" },
      ],
      liveUrl: "",
      linkedinEmbedId: "",
      backupVideoPath: "",
      imagePath: "/images/dlf_implementation.png",
      presentationUrl:
        "/presentations/CS2833_ClassPresentation-2833-Mittal-AU2025_1756737502392001n65E.pdf",
      challenge:
        "Executing a full-scale digital transformation for a major enterprise construction company involves aligning complex workflows with new platforms. As the second co-lead, the challenge was to directly coordinate with the GM of tech transformation, ensuring a smooth transition to ACC while concurrently building an advanced reporting infrastructure.",
      impactNarrative:
        "Successfully co-led the technical transformation and implementation of ACC across an enterprise construction company's operations. The simultaneous development of over 50 custom dashboards provided unprecedented visibility into the rollout, ultimately validating the effort in an Autodesk University 2025 presentation.",
    },
  ] as Project[]
).sort((a, b) => a.order - b.order);

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);
