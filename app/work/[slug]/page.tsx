import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverArt from "@/components/CoverArt";
import HandUnderline from "@/components/HandUnderline";
import Keywords from "@/components/Keywords";
import MagazineReader from "@/components/MagazineReader";
import ProjectGallery from "@/components/ProjectGallery";
import SiteNav from "@/components/SiteNav";
import { galleries, readers } from "@/content/galleries";
import { projectNumber, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project
    ? { title: `${project.name} — Caroline Vind`, description: project.description[0] }
    : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Year", value: project.year },
    { label: "Context", value: project.context },
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools.join(", ") },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <>
      <SiteNav />
      <main className="px-6 pb-24 pt-32 md:px-10 md:pt-[22vh] lg:px-[4.5vw]">
        <Link
          href="/work"
          className="text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
        >
          ← All work
        </Link>

        <header className="animate-rise mt-10 max-w-5xl">
          <p className="text-[10px] italic tabular-nums">({projectNumber(index)})</p>
          <h1 className="mt-3 text-[clamp(2.75rem,8vw,7rem)] italic leading-[0.88] tracking-[-0.04em]">
            {project.name}
          </h1>
          <p className="mt-5 text-[10px] uppercase tracking-[0.04em]">{project.focus}</p>
        </header>

        {/* Asymmetric spread: notes on the left, the work itself as a loose print on the right. */}
        <div className="mt-20 grid gap-16 lg:mt-[16vh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[6vw]">
          <div className="max-w-[420px]">
            <dl className="border-t border-ink/15">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-ink/15 py-2.5 text-[11px]"
                >
                  <dt className="text-[10px] uppercase tracking-[0.04em]">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-4 text-[13px] leading-[1.55]">
              {project.description.map((para, i) => (
                <p key={i}>
                  <Keywords text={para} />
                </p>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
              >
                {project.link.label} ↗
              </a>
            )}
          </div>

          <figure className="lg:pt-4">
            <div
              // Portrait covers get a narrower print so they don't tower over the text beside them.
              className={`print-grain relative ml-auto w-full ${
                project.cover.height / project.cover.width > 1.2 ? "max-w-[420px]" : "max-w-[640px]"
              }`}
              style={{ transform: `rotate(${project.preview.rotate * 0.6}deg)` }}
            >
              {project.coverArt ? (
                <div
                  role="img"
                  aria-label={project.cover.alt}
                  className="relative w-full"
                  style={{ aspectRatio: `${project.cover.width} / ${project.cover.height}` }}
                >
                  <CoverArt art={project.coverArt} />
                </div>
              ) : (
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              )}
            </div>
          </figure>
        </div>

        <ProjectGallery images={galleries[project.slug] ?? []} name={project.name} />

        {readers[project.slug] && <MagazineReader pages={readers[project.slug]} name={project.name} />}

        {(project.highlights || project.notes) && (
          <section className="mt-24 grid gap-12 lg:mt-[18vh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[6vw]">
            {project.highlights?.map((h) => (
              <div key={h.heading}>
                <h2 className="font-brush text-[16px] lowercase tracking-[0.02em]">{h.heading}</h2>
                <ul className="mt-5 border-t border-ink/15">
                  {h.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-ink/15 py-3 text-[clamp(1.1rem,1.8vw,1.5rem)] italic leading-tight tracking-[-0.01em]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {project.notes && (
              <div className="max-w-[440px] space-y-6 text-[13px] leading-[1.55] lg:col-start-2 lg:ml-auto">
                {project.notes.map((n, i) => (
                  <div key={i}>
                    {n.heading && (
                      <h3 className="mb-2 text-[10px] uppercase tracking-[0.04em]">{n.heading}</h3>
                    )}
                    <p>
                      <Keywords text={n.text} />
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <nav aria-label="Next project" className="mt-32 border-t border-ink/15 pt-6 lg:mt-[22vh]">
          <p className="text-[10px] uppercase tracking-[0.04em]">Next project</p>
          <Link href={`/work/${next.slug}`} className="group mt-4 inline-block">
            <span className="relative inline-block text-[clamp(2rem,5vw,4rem)] italic leading-none tracking-[-0.03em] transition-transform duration-300 ease-out group-hover:translate-x-[5px] motion-reduce:translate-x-0!">
              {next.name}
              <HandUnderline />
            </span>
          </Link>
        </nav>
      </main>
    </>
  );
}
