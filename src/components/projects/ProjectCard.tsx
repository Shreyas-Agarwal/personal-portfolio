import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col overflow-hidden rounded-none border border-white/[0.08] bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:border-white/[0.18] hover:bg-zinc-900/60"
    >
      {/* Index label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.06] bg-[#05070A]">
        {project.imagePath && (
          <Image
            src={project.imagePath}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Subtle vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <h3 className="text-[15px] font-medium leading-snug tracking-tight text-white/90 transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/45">{project.subtitle}</p>
        </div>

        {/* Tech stack pills */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/35"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">CASE_STUDY</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-white/35 transition-colors group-hover:text-white/80">
              View
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
