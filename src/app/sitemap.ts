import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agarwal.systems";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/systems",
    "/projects",
    "/journal",
    "/systems/workflow-architecture",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic docs (/systems/[slug])
  const docsDir = path.join(process.cwd(), "content/docs");
  const docRoutes = fs.existsSync(docsDir)
    ? fs
      .readdirSync(docsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(docsDir, file);
        const stats = fs.statSync(filePath);
        return {
          url: `${baseUrl}/systems/${slug}`,
          lastModified: stats.mtime,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      })
    : [];

  // Dynamic ADRs (/systems/adr/[slug])
  const adrDir = path.join(process.cwd(), "content/adr");
  const adrRoutes = fs.existsSync(adrDir)
    ? fs
      .readdirSync(adrDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(adrDir, file);
        const stats = fs.statSync(filePath);
        return {
          url: `${baseUrl}/systems/adr/${slug}`,
          lastModified: stats.mtime,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      })
    : [];

  // Dynamic journal entries (/journal/[slug])
  const journalDir = path.join(process.cwd(), "content/journal");
  const journalRoutes = fs.existsSync(journalDir)
    ? fs
      .readdirSync(journalDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(journalDir, file);
        const stats = fs.statSync(filePath);
        return {
          url: `${baseUrl}/journal/${slug}`,
          lastModified: stats.mtime,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      })
    : [];

  // Dynamic project/case studies (/projects/[id])
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(), // These are defined in code/data
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...docRoutes,
    ...adrRoutes,
    ...journalRoutes,
    ...projectRoutes,
  ];
}
