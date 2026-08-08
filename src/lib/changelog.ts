export interface ChangelogEntry {
  revision: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    revision: "r17",
    date: "2026-08-08",
    title: "Private publications",
    description:
      "Added a passcode-gated visibility mode for publications shared with specific people rather than published generally — unlisted from every catalogue, count, and the sitemap, with a lock screen guarding the direct link.",
    tags: ["publications", "infra"],
  },
  {
    revision: "r16",
    date: "2026-08-08",
    title: "Articles index and reader mode",
    description:
      "Added a global Articles index surfacing every chapter of every series on its own, plus a distraction-free reader mode (no sidebar) for articles opened from it — reachable via a query param so every article keeps a single canonical URL. Sitemap and robots coverage extended to individual articles and field notes.",
    tags: ["publications", "design", "infra"],
  },
  {
    revision: "r15",
    date: "2026-08-06",
    title: "Downloads, dry read, and comments",
    description:
      "Added PDF and plain-text export for publications, a distraction-free dry-read view, Giscus-backed comments, and this changelog.",
    tags: ["publications", "infra"],
  },
  {
    revision: "r14",
    date: "2026-08-06",
    title: "Version 2 of the site",
    description:
      "Rebuilt the site shell around a systems-engineering visual language — new header, navigation, and a full pass on the publications index.",
    tags: ["design", "publications"],
  },
  {
    revision: "r13",
    date: "2026-08-04",
    title: "Header and publications pass",
    description:
      "Reworked the header component and tightened up publication metadata ahead of the v2 rollout.",
    tags: ["design", "publications"],
  },
  {
    revision: "r12",
    date: "2026-07-14",
    title: "Biology section added",
    description:
      "Redid the home page from scratch, introducing a section exploring biological coordination as a lens for systems architecture.",
    tags: ["home", "content"],
  },
  {
    revision: "r11",
    date: "2026-07-13",
    title: "New homepage trial",
    description: "Trialed a new homepage structure ahead of the full v2 redesign.",
    tags: ["home", "design"],
  },
  {
    revision: "r10",
    date: "2026-06-19",
    title: "About page",
    description: "Added a dedicated About page consolidating identity and portfolio context.",
    tags: ["content"],
  },
  {
    revision: "r09",
    date: "2026-06-18",
    title: "Journal restructuring",
    description:
      "Restructured the journal page and pushed the Architecture of Information Systems series through week 12.",
    tags: ["content", "publications"],
  },
  {
    revision: "r08",
    date: "2026-06-16",
    title: "Light redesign & comments",
    description:
      "Shipped a lighter visual redesign, wired up Giscus comments, started the Infrastructure & Data series, and added sitemap and robots.txt for indexing.",
    tags: ["design", "infra"],
  },
  {
    revision: "r07",
    date: "2026-06-09",
    title: "PDFs and full restructure",
    description:
      "Added first-class PDF support for publications and restructured the content directory around it.",
    tags: ["publications", "infra"],
  },
  {
    revision: "r06",
    date: "2026-05-24",
    title: "PDF renderer",
    description: "Built a custom PDF renderer and refreshed the projects section.",
    tags: ["infra", "projects"],
  },
  {
    revision: "r05",
    date: "2026-05-20",
    title: "Projects section",
    description: "Introduced a dedicated section for showcasing shipped projects.",
    tags: ["projects"],
  },
  {
    revision: "r04",
    date: "2026-05-15",
    title: "Cleanup & new pages",
    description: "General cleanup pass alongside several new pages.",
    tags: ["infra"],
  },
  {
    revision: "r03",
    date: "2026-05-13",
    title: "Personal observations",
    description: "Added a section for shorter, personal, unstructured observations.",
    tags: ["content"],
  },
  {
    revision: "r02",
    date: "2026-05-12",
    title: "Mobile-responsive header",
    description:
      "Made the header responsive on mobile and added new pages and research articles.",
    tags: ["design", "content"],
  },
  {
    revision: "r01",
    date: "2026-05-11",
    title: "Analytics & routing",
    description:
      "Wired up Vercel Analytics and Speed Insights, fixed lint issues, and laid out base page routing and layouts.",
    tags: ["infra"],
  },
  {
    revision: "r00",
    date: "2026-05-10",
    title: "Site launch",
    description: "Initial project setup — base library, hooks, and layout scaffolding.",
    tags: ["infra"],
  },
];
