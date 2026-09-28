import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { PracticeEntry, PracticeImage } from "@/content/practice";
import CoverArt from "./CoverArt";
import GalleryVideo from "./GalleryVideo";
import HandUnderline from "./HandUnderline";
import Keywords from "./Keywords";

/*
 * An archive, not a CV: each experience is pasted into the page in its own arrangement (a big number,
 * a strong photo, a typographic title, a spread of candid prints). Interactions stay quiet: prints
 * shift a little, a second photo slides out on hover, the title gets a pen underline.
 */
export default function InPractice({ entries }: { entries: PracticeEntry[] }) {
  return (
    <ol className="mt-16 border-t border-ink/15">
      {entries.map((entry, i) => (
        <li
          key={entry.slug}
          className="group grid gap-y-10 border-b border-ink/15 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-24"
        >
          <div className="lg:col-span-3">
            <div className="flex items-baseline gap-4 lg:sticky lg:top-16 lg:block">
              <p className="text-[clamp(3.5rem,7vw,7rem)] italic leading-[0.8] tracking-[-0.055em] tabular-nums">
                {entry.year}
              </p>
              <p className="text-[10px] italic lg:mt-4">
                {String(i + 1).padStart(2, "0")} · {entry.when}
              </p>
            </div>
          </div>

          <div className="lg:col-span-9">
            <Layout entry={entry} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function Layout({ entry }: { entry: PracticeEntry }) {
  switch (entry.layout) {
    case "metric":
      return <MetricLayout entry={entry} />;
    case "editorial":
      return <EditorialLayout entry={entry} />;
    case "feature":
      return <FeatureLayout entry={entry} />;
    case "type":
      return <TypeLayout entry={entry} />;
    case "candid":
      return <CandidLayout entry={entry} />;
  }
}

/* ---------- Layouts ---------- */

/** Social media: the number does the talking, and the work itself lives on its project page. */
function MetricLayout({ entry }: { entry: PracticeEntry }) {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
      <Meta entry={entry} />

      <div className="relative">
        {entry.figure && (
          <p className="text-[clamp(3rem,7.5vw,7rem)] italic leading-[0.85] tracking-[-0.05em] tabular-nums">
            {entry.figure.value}
            <span className="mt-3 block text-[10px] not-italic uppercase tracking-[0.04em]">
              {entry.figure.label}
            </span>
          </p>
        )}

        {entry.link && (
          <Link href={entry.link.href} className="group/link mt-10 flex items-end gap-5 outline-none">
            <span
              className="print-grain relative block aspect-[4/5] w-[150px] shrink-0 rotate-[3deg] transition-transform duration-500 ease-out group-hover/link:-translate-y-1.5 group-hover/link:rotate-[1.5deg] motion-reduce:transition-none"
              aria-hidden="true"
            >
              <CoverArt art="via" />
            </span>
            <span className="relative text-[10px] font-medium uppercase tracking-[0.04em]">
              {entry.link.label} →
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

/** Graduate show: one tall fashion image leads; the show film and a second print sit beside it like a lookbook spread. */
function EditorialLayout({ entry }: { entry: PracticeEntry }) {
  const [lead, reveal, group] = entry.images;

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
      <figure>
        <Reveal base={lead} alt={reveal} sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw" />
        {entry.credit && <figcaption className="mt-3 text-[10px] italic">{entry.credit}</figcaption>}
      </figure>

      <div className="flex flex-col gap-12">
        <Meta entry={entry} />
        <div className="grid grid-cols-2 items-start gap-4">
          {entry.video && (
            <div className="-rotate-[1.5deg]">
              <div className="transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none">
                <GalleryVideo {...entry.video} />
              </div>
            </div>
          )}
          <Print image={group} rotate={2} className="mt-10" sizes="(min-width: 768px) 18vw, 45vw" />
        </div>
      </div>
    </div>
  );
}

/** Fashion Week: one strong photo (the runway carpet slides out from behind it on hover), plus the film. */
function FeatureLayout({ entry }: { entry: PracticeEntry }) {
  const [lead, behind, boxes] = entry.images;

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
      <div className="group/feature relative mx-auto w-[78%] self-start md:mx-0 md:w-[82%]">
        {/* Tucked behind the lead photo, sliding out to the right on hover. */}
        <div className="print-grain absolute inset-y-[10%] right-[4%] w-[72%] overflow-hidden rotate-[3deg] transition-transform duration-700 ease-out group-hover/feature:translate-x-[38%] group-hover/feature:rotate-[5deg] motion-reduce:transition-none">
          <Image src={behind.src} alt={behind.alt} fill sizes="(min-width: 768px) 22vw, 55vw" className="object-cover" />
        </div>
        <Photo
          image={lead}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 78vw"
          className="relative transition-transform duration-700 ease-out group-hover/feature:-translate-x-2 motion-reduce:transition-none"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-12">
        <Meta entry={entry} />
        <div className="grid grid-cols-[1.15fr_1fr] items-start gap-6 md:max-w-[440px]">
          {entry.video && (
            <div className="-rotate-2">
              <div className="transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none">
                <GalleryVideo {...entry.video} />
              </div>
              {entry.video.caption && <p className="mt-3 text-[10px] italic">{entry.video.caption}</p>}
            </div>
          )}
          <Print image={boxes} rotate={3} tape className="mt-14" sizes="(min-width: 768px) 14vw, 40vw" />
        </div>
      </div>
    </div>
  );
}

/** Guest lecture: the title itself is the image; photos stay small. */
function TypeLayout({ entry }: { entry: PracticeEntry }) {
  const [schedule, room, chocolate] = entry.images;

  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.04em]">{entry.organisation}</p>
      <h3 className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] italic leading-[0.95] tracking-[-0.03em]">
        <span className="relative inline-block">
          {entry.title}
          <HandUnderline />
        </span>
      </h3>

      <div className="mt-8 max-w-[560px] rotate-[-0.6deg] border border-ink/10">
        <Photo image={schedule} sizes="(min-width: 768px) 560px, 90vw" />
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
        <Meta entry={entry} hideTitle />
        <div className="grid grid-cols-[1.2fr_1fr] items-start gap-5">
          <Print image={room} rotate={-1.5} sizes="(min-width: 768px) 20vw, 50vw" />
          <div className="mt-16">
            <Print image={chocolate} rotate={3} sizes="(min-width: 768px) 16vw, 40vw" />
            {entry.note && <Note className="mt-4 -rotate-3">{entry.note}</Note>}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Workshop: a loose spread of candid snapshots, overlapping like prints on a desk. */
function CandidLayout({ entry }: { entry: PracticeEntry }) {
  const [welcome, tables, room, groups] = entry.images;

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10">
      <Meta entry={entry} />

      <div className="relative grid grid-cols-6 items-start">
        <Print image={welcome} rotate={-2} className="z-10 col-span-3 col-start-1" sizes="(min-width: 768px) 20vw, 50vw" />
        <Print image={tables} rotate={2.5} className="col-span-4 col-start-3 mt-8" sizes="(min-width: 768px) 26vw, 66vw" tape />
        <Print image={groups} rotate={1.5} className="z-10 col-span-4 col-start-1 -mt-10" sizes="(min-width: 768px) 26vw, 66vw" />
        <Print image={room} rotate={-3} className="col-span-2 col-start-5 -mt-24" sizes="(min-width: 768px) 14vw, 33vw" />
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

function Meta({ entry, hideTitle = false }: { entry: PracticeEntry; hideTitle?: boolean }) {
  // The typographic layout places the note beside its photo and the title large above.
  const showNote = entry.note && entry.layout !== "type";

  return (
    <div className="max-w-[360px]">
      {!hideTitle && (
        <>
          <p className="text-[10px] font-medium uppercase tracking-[0.04em]">{entry.organisation}</p>
          <h3 className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] italic leading-[0.95] tracking-[-0.03em]">
            <span className="relative inline-block">
              {entry.title}
              <HandUnderline />
            </span>
          </h3>
        </>
      )}
      <p className="mt-5 text-[10px] italic">{entry.role}</p>
      <p className="mt-5 text-[12px] leading-[1.45]">
        <Keywords text={entry.description} />
      </p>
      {showNote && <Note className="mt-8 -rotate-2">{entry.note}</Note>}
    </div>
  );
}

/** A handwritten aside with a small pen arrow. */
function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-start gap-2 font-script text-[1.35rem] leading-[1.05] text-ink/85 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 28 20" className="mt-1 h-4 w-6 shrink-0">
        <path
          d="M2 4c4 9 11 12 21 11m-5-5 5 5-6 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </p>
  );
}

function Photo({
  image,
  sizes,
  className = "",
}: {
  image: PracticeImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`print-grain relative overflow-hidden ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: image.focus }}
      />
    </div>
  );
}

/** A loose print: tilted, optionally taped down, and nudged a few pixels on hover. */
function Print({
  image,
  rotate,
  sizes,
  tape = false,
  className = "",
}: {
  image: PracticeImage;
  rotate: number;
  sizes: string;
  tape?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ transform: `rotate(${rotate}deg)` } as CSSProperties}>
      <div className="transition-transform duration-500 ease-out hover:-translate-y-1 hover:translate-x-0.5 motion-reduce:transition-none">
        <Photo image={image} sizes={sizes} />
        {tape && (
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-[#ece6da]/80 mix-blend-multiply"
          />
        )}
      </div>
    </div>
  );
}

/** One photo that crossfades to a second on hover (both stay in the page for screen readers). */
function Reveal({ base, alt, sizes }: { base: PracticeImage; alt: PracticeImage; sizes: string }) {
  return (
    <div className="group/reveal relative">
      <Photo image={base} sizes={sizes} />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover/reveal:opacity-100">
        <Photo image={alt} sizes={sizes} className="h-full" />
      </div>
      <p
        aria-hidden="true"
        className="absolute -bottom-3 right-3 rotate-[-4deg] font-script text-[1.2rem] text-ink/85 opacity-0 transition-opacity duration-500 group-hover/reveal:opacity-100"
      >
        backstage
      </p>
    </div>
  );
}
