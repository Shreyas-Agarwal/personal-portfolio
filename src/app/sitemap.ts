import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPublications } from "@/lib/publication/loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agarwal.systems";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/systems",
    "/works",
    "/works/publications",
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

  // Dynamic publications (/works/publications/[id])
  const publicationRoutes = getAllPublications().map((pub) => ({
    url: `${baseUrl}/works/publications/${pub.id}`,
    lastModified: new Date(pub.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic project/case studies (/works/[id])
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/works/${project.id}`,
    lastModified: new Date(), // These are defined in code/data
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes, ...adrRoutes, ...publicationRoutes, ...projectRoutes];
}
