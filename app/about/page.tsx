import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import Keywords from "@/components/Keywords";
import { DrawMark, Swatch, TypeTester } from "@/components/about/AboutInteractive";
import WeekCalendar from "@/components/about/WeekCalendar";
import {
  aboutChapters,
  aboutCover,
  calendarNotes,
  calendarWeek,
  contact,
  education,
  heritage,
  mission,
  origin,
  palette,
  rules,
  typefaces,
} from "@/content/about";
import { person } from "@/content/site";

export const metadata: Metadata = { title: "About — Caroline Vind" };

const fullName = `${person.firstName} ${person.lastName}`;
const pad = (n: number) => String(n).padStart(2, "0");
const chapterNumber = (id: (typeof aboutChapters)[number]["id"]) =>
  pad(aboutChapters.findIndex((c) => c.id === id) + 1);

/*
 * About, as a brand guidelines book: the brand being documented is Caroline herself.
 * Origin, mission, heritage, identity, do's and don'ts, contact, each opening with a running header
 * like a page in a printed manual.
 */
export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="px-6 pb-40 md:px-10 lg:px-[4.5vw]">
        <Cover />
        <Origin />
        <Mission />
        <Heritage />
        <Hours />
        <Identity />
        <Rules />
        <Contact />
      </main>
    </>
  );
}

/* ---------- Cover ---------- */

function Cover() {
  return (
    <section className="grid min-h-svh gap-16 pb-24 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:pt-[24vh]">
      <div className="animate-rise lg:col-span-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.04em]">
          {aboutCover.kicker} <span className="mx-2">·</span> <span className="italic normal-case">{aboutCover.edition}</span>
        </p>
        <h1 className="mt-6 text-[clamp(3.75rem,11vw,10rem)] italic leading-[0.84] tracking-[-0.05em]">
          {person.firstName}
          <br />
          {person.lastName}
        </h1>
        <p className="mt-10 max-w-[340px] text-[12px] leading-[1.45]">
          <Keywords text={aboutCover.lede} />
        </p>

        <nav aria-label="Contents" className="mt-14 max-w-[420px]">
          <p className="text-[10px] italic">(Contents)</p>
          <ol className="mt-4">
            {aboutChapters.map((chapter, i) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="group flex items-baseline gap-3 py-1.5 text-[11px] outline-none"
                >
                  <span className="tabular-nums">{pad(i + 1)}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    {chapter.label}
                  </span>
                  <span aria-hidden="true" className="mb-[3px] flex-1 border-b border-dotted border-ink/40" />
                  <span className="italic tabular-nums">p. {pad(i + 1)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* The portrait, printed with crop marks like a proof on the studio wall. */}
      <figure className="relative mx-auto w-[72%] max-w-[380px] self-center lg:col-span-4 lg:col-start-9 lg:w-full">
        <CropMarks />
        <div className="print-grain relative">
          <Image
            src={origin.now.src}
            alt="Caroline Vind, full-length portrait, smiling over her shoulder"
            width={origin.now.width}
            height={origin.now.height}
            sizes="(min-width: 1024px) 28vw, 72vw"
            priority
            className="h-auto w-full grayscale"
          />
        </div>
        <figcaption className="mt-4 flex justify-between text-[10px] italic">
          <span>fig. 0 — the brand</span>
          <span>{aboutCover.edition}</span>
        </figcaption>
      </figure>
    </section>
  );
}

function CropMarks() {
  const mark = "absolute h-5 w-5 border-ink";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -inset-4">
      <span className={`${mark} left-0 top-0 border-l border-t`} />
      <span className={`${mark} right-0 top-0 border-r border-t`} />
      <span className={`${mark} bottom-8 left-0 border-b border-l`} />
      <span className={`${mark} bottom-8 right-0 border-b border-r`} />
    </div>
  );
}

/* ---------- Chapters ---------- */

/** A running header, like the top of a page in a printed manual. */
function Chapter({
  id,
  children,
  className = "",
}: {
  id: (typeof aboutChapters)[number]["id"];
  children: ReactNode;
  className?: string;
}) {
  const chapter = aboutChapters.find((c) => c.id === id)!;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-10 pt-24 lg:pt-32 ${className}`}>
      <header className="flex items-baseline justify-between gap-6 border-t border-ink pt-3 text-[10px]">
        <h2 id={`${id}-heading`} className="font-medium uppercase tracking-[0.04em]">
          <span className="tabular-nums">{chapterNumber(id)}</span> <span className="mx-1">—</span> {chapter.label}
        </h2>
        <p className="italic">
          {fullName} / {aboutCover.kicker}
        </p>
      </header>
      {children}
    </section>
  );
}

function Origin() {
  return (
    <Chapter id="origin">
      <div className="mt-14 grid items-end gap-14 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-4">
          {/* Three frames from an old home video, flicking through like a flipbook. */}
          <div className="relative mx-auto aspect-[447/559] w-[70%] max-w-[300px] md:w-full">
            {origin.frames.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? "Caroline as a small child, with the same curly hair" : ""}
                fill
                sizes="300px"
                className="flip-frame object-contain"
                style={{ animationDelay: `${-((origin.frames.length - i) % origin.frames.length) * 0.5}s` }}
              />
            ))}
          </div>
          <figcaption className="mt-2 text-center text-[10px] italic">fig. 1 — the original</figcaption>
        </figure>

        <div className="md:col-span-5 md:col-start-6 md:pb-10">
          <p className="rotate-[-3deg] font-script text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05]">
            <span aria-hidden="true" className="md:hidden">↑ </span>
            <span aria-hidden="true" className="hidden md:inline">← </span>
            {origin.note}
          </p>
          <p className="mt-10 max-w-[360px] text-[12px] leading-[1.45]">
            <Keywords text={origin.body} />
          </p>
        </div>
      </div>
    </Chapter>
  );
}

function Mission() {
  return (
    <Chapter id="mission">
      <blockquote className="mt-14 max-w-5xl text-[clamp(2.25rem,5.6vw,5rem)] italic leading-[0.98] tracking-[-0.035em]">
        <span aria-hidden="true">“</span>
        <Keywords text={mission.statement} />
        <span aria-hidden="true">”</span>
      </blockquote>

      <div className="mt-16 grid gap-8 md:grid-cols-12">
        <p className="text-[10px] italic md:col-span-3">(Positioning statement)</p>
        <dl className="border-t border-ink/15 md:col-span-7">
          {mission.positioning.map((row) => (
            <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-ink/15 py-4">
              <dt className="text-[10px] font-medium uppercase tracking-[0.04em]">{row.label}</dt>
              <dd className="text-[clamp(1rem,1.6vw,1.35rem)] italic leading-[1.2] tracking-[-0.01em]">{row.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Chapter>
  );
}

// Loose index cards: a little tilt each, straightened on hover.
const cardTilt = [-1.8, 1.2, -0.8, 1.6, -1.4, 0.9];

function Heritage() {
  return (
    <Chapter id="heritage">
      {/* Education: the foundation the jobs were built on. */}
      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <p className="text-[10px] italic md:col-span-2">(Education)</p>
        <ol className="grid gap-8 sm:grid-cols-3 md:col-span-10">
          {education.map((step, i) => (
            <li key={step.short} className="relative border-t border-ink pt-4">
              <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] italic leading-none tracking-[-0.035em]">
                {step.short}
                {i < education.length - 1 && (
                  <span aria-hidden="true" className="ml-3 hidden text-ink/40 not-italic sm:inline">
                    →
                  </span>
                )}
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.04em]">{step.school}</p>
              <p className="mt-1 text-[11px] italic">{step.programme}</p>
              {step.note && step.href && (
                <Link
                  href={step.href}
                  className="mt-4 inline-block rotate-[-3deg] font-script text-[1.2rem] leading-none transition-opacity duration-300 hover:opacity-60"
                >
                  {step.note} ↗
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-24 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[0.95] tracking-[-0.035em]">
        Every job, a brand lesson.
      </p>

      <ol className="mt-20 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {heritage.map((job, i) => {
          const card = (
            <article
              className="relative h-full bg-[#f3f0ea] p-6 pb-16 shadow-[0_1px_3px_rgba(0,0,0,0.07)] transition-transform duration-500 ease-out [transform:rotate(var(--tilt))] hover:[transform:translateY(-4px)_rotate(0deg)] motion-reduce:transition-none"
              style={{ "--tilt": `${cardTilt[i % cardTilt.length]}deg` } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-4deg] bg-blush/80 mix-blend-multiply"
              />
              <div className="flex items-baseline justify-between text-[10px]">
                <span className="tabular-nums">{pad(i + 1)}</span>
                <span className="font-medium uppercase tracking-[0.04em]">{job.company}</span>
              </div>
              <p className="mt-8 text-[clamp(2.25rem,4vw,3.25rem)] italic leading-none tracking-[-0.045em] tabular-nums">
                {job.years}
              </p>
              <h3 className="mt-3 text-[13px] italic">{job.role}</h3>
              <p className="mt-4 text-[11px] leading-[1.45]">{job.lesson}</p>
              <p className="absolute bottom-5 right-6 rotate-[-4deg] font-script text-[1.25rem] leading-none">
                {job.note}
              </p>
            </article>
          );

          return (
            <li key={job.company}>
              {job.href ? (
                <Link href={job.href} className="block h-full outline-none">
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ol>
    </Chapter>
  );
}

/** A sample week, based on the colour-coded calendar: how the brand runs day to day. */
function Hours() {
  return (
    <Chapter id="hours">
      <div className="mt-14 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[0.95] tracking-[-0.035em]">
            Everything has a colour.
          </p>
          <p className="mt-6 max-w-[320px] text-[12px] leading-[1.45]">{calendarNotes.intro}</p>
          <p className="mt-10 hidden rotate-[-4deg] font-script text-[1.35rem] leading-[1.05] md:block">
            {calendarNotes.margin} →
          </p>
        </div>
        <div className="md:col-span-8">
          <WeekCalendar events={calendarWeek} />
        </div>
      </div>
    </Chapter>
  );
}

function Identity() {
  return (
    <Chapter id="identity">
      <div className="mt-14 grid gap-8 md:grid-cols-12">
        <h3 className="text-[10px] italic md:col-span-3">(5a) Colour</h3>
        <div className="grid grid-cols-3 gap-4 md:col-span-9 md:gap-8">
          {palette.map((colour) => (
            <Swatch key={colour.name} {...colour} />
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-12">
        <h3 className="text-[10px] italic md:col-span-3">(5b) Typography</h3>
        <div className="md:col-span-9">
          <TypeTester faces={typefaces} />
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-12">
        <h3 className="text-[10px] italic md:col-span-3">(5c) Wordmark &amp; clear space</h3>
        <div className="md:col-span-9">
          <Wordmark />
        </div>
      </div>
    </Chapter>
  );
}

/** The name as a wordmark, with its clear-space construction drawn around it. */
function Wordmark() {
  return (
    <figure className="group">
      <div className="relative flex items-center justify-center border border-dashed border-ink/30 px-[12%] py-[14%]">
        {/* Inner box hugging the mark, and the "x" unit that sets the margin around it. */}
        <div className="relative">
          <span aria-hidden="true" className="absolute -inset-x-3 -inset-y-1 border border-ink/25 transition-colors duration-500 group-hover:border-blush" />
          <p className="relative text-[clamp(2.5rem,7vw,6.25rem)] italic leading-none tracking-[-0.05em]">{fullName}</p>
        </div>
        <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] italic">x</span>
        <span aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] italic">x</span>
        <span aria-hidden="true" className="absolute left-1/2 top-3 -translate-x-1/2 text-[10px] italic">x</span>
        <span aria-hidden="true" className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] italic">x</span>
        <p aria-hidden="true" className="absolute -bottom-9 right-2 rotate-[-3deg] font-script text-[1.3rem]">
          give it room to breathe
        </p>
      </div>
      <figcaption className="mt-12 max-w-[360px] text-[11px] leading-[1.4]">
        Always set in italic, tightly tracked, with at least the height of one lowercase x kept clear on every side.
      </figcaption>
    </figure>
  );
}

function Rules() {
  const columns = [
    { kind: "do" as const, title: "Do", items: rules.dos },
    { kind: "dont" as const, title: "Don’t", items: rules.donts },
  ];

  return (
    <Chapter id="rules">
      <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-8">
        {columns.map((column) => (
          <div key={column.kind}>
            <h3 className="text-[clamp(2.5rem,6vw,5rem)] italic leading-none tracking-[-0.045em]">{column.title}</h3>
            <ul className="mt-8 border-t border-ink/15">
              {column.items.map((item) => (
                <li key={item} className="flex items-start gap-5 border-b border-ink/15 py-6">
                  <DrawMark kind={column.kind} className="h-11 w-11 shrink-0" />
                  <p className="pt-1 text-[clamp(1.05rem,1.7vw,1.4rem)] italic leading-[1.2] tracking-[-0.01em]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

function Contact() {
  return (
    <Chapter id="contact">
      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-[10px] italic">(Usage)</p>
          <p className="mt-4 text-[clamp(2rem,4.6vw,4rem)] italic leading-[0.98] tracking-[-0.035em]">
            <Keywords text={contact.usage} />
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 md:col-span-4 md:col-start-9">
          <Link
            href="/contact"
            className="text-[11px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
          >
            Get in touch →
          </Link>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
          >
            LinkedIn ↗
          </a>
          <Link
            href="/work"
            className="text-[11px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
          >
            See the work →
          </Link>
        </div>
      </div>

      <p aria-hidden="true" className="mt-28 text-right font-script text-[clamp(2rem,4vw,3.25rem)] leading-none">
        — end of guidelines. C.
      </p>
    </Chapter>
  );
}
