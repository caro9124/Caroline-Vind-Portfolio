import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { projectNumber, type Project } from "@/content/projects";
import CoverArt from "./CoverArt";
import HandUnderline from "./HandUnderline";

// Horizontal resting spots for the previews, so consecutive prints don't stack in a column.
const previewOffsets = ["56%", "62%", "52%"];

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="mt-16 max-w-5xl border-t border-ink/15">
      {projects.map((project, i) => (
        <li key={project.slug} className="relative border-b border-ink/15">
          <Link
            href={`/work/${project.slug}`}
            className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-6 outline-none md:grid-cols-[3.5rem_1fr_auto]"
          >
            <span className="text-[10px] tabular-nums">{projectNumber(i)}</span>

            <span className="min-w-0">
              <span className="relative inline-block text-[clamp(1.5rem,3vw,2.25rem)] italic leading-none tracking-[-0.02em] transition-transform duration-300 ease-out group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px] motion-reduce:translate-x-0!">
                {project.name}
                <HandUnderline />
              </span>
              <span className="mt-3 block text-[10px] uppercase tracking-[0.04em]">{project.focus}</span>
            </span>

            <span className="text-[10px] tabular-nums">{project.year ?? ""}</span>
          </Link>

          <ProjectPreview project={project} left={previewOffsets[i % previewOffsets.length]} />
        </li>
      ))}
    </ol>
  );
}

/** Small printed-photo preview, fixed in place within the row and never interactive. */
function ProjectPreview({ project, left }: { project: Project; left: string }) {
  const { rotate, focus, aspect } = project.preview;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 z-10 hidden w-[200px] -translate-y-1/2 lg:block"
      style={{ left }}
    >
      <div
        className="print-grain relative opacity-0 [transform:rotate(var(--r))_scale(0.96)] transition-[opacity,transform] duration-300 ease-out [li:has(a:hover)_&]:opacity-100 [li:has(a:hover)_&]:[transform:rotate(var(--r))_scale(1)] [li:has(a:focus-visible)_&]:opacity-100 [li:has(a:focus-visible)_&]:[transform:rotate(var(--r))_scale(1)]"
        style={{ "--r": `${rotate}deg`, aspectRatio: aspect } as CSSProperties}
      >
        {project.coverArt ? (
          <CoverArt art={project.coverArt} />
        ) : (
          <Image
            src={project.preview.src ?? project.cover.src}
            alt=""
            fill
            sizes="200px"
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        )}
      </div>
    </div>
  );
}
