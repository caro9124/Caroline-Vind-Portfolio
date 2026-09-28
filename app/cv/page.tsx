import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import PrintButton from "@/components/cv/PrintButton";
import { contact } from "@/content/contact";
import { cv } from "@/content/cv";
import { person } from "@/content/site";

export const metadata: Metadata = { title: "CV — Caroline Vind" };

const fullName = `${person.firstName} ${person.lastName}`;

/*
 * The CV as one A4 sheet in the portfolio's identity: paper, ink and blush, italic headings, Botch for
 * the big "CV" and Reenie Beanie for the margin notes. It prints to exactly one page (see the print rules in
 * globals.css), and the downloadable PDF is generated from this same page.
 */
export default function CvPage() {
  return (
    <>
      <div className="print:hidden">
        <SiteNav />
      </div>
      <main className="px-6 pb-32 pt-28 md:px-10 md:pt-32 lg:px-[4.5vw]">
        <div className="mx-auto flex max-w-[210mm] flex-wrap items-baseline justify-between gap-4 print:hidden">
          <p className="text-[10px] italic">(Curriculum vitae)</p>
          <div className="flex gap-6 text-[10px] font-medium uppercase tracking-[0.04em]">
            <a
              href={cv.pdf}
              download
              className="underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
            >
              Download PDF ↓
            </a>
            <PrintButton />
          </div>
        </div>

        {/* On narrow screens the sheet keeps its A4 proportions and scrolls sideways inside this frame. */}
        <div className="mt-6 overflow-x-auto print:mt-0 print:overflow-visible">
          <Sheet />
        </div>
      </main>
    </>
  );
}

function Sheet() {
  return (
    <article className="cv-sheet relative mx-auto flex h-[297mm] w-[210mm] shrink-0 flex-col bg-paper px-[14mm] py-[12mm] text-ink shadow-[0_2px_18px_rgba(0,0,0,0.08)] print:shadow-none">
      {/* Contact strip */}
      <dl className="grid grid-cols-[1.25fr_1fr_1.35fr_1fr_1fr] gap-4 border-b border-ink pb-[3mm] text-[7pt]">
        <Contact label="Email" value={contact.email} href={`mailto:${contact.email}`} />
        <Contact label="Phone" value={contact.phone} href={contact.phoneHref} />
        <Contact label="LinkedIn" value={contact.linkedinLabel} href={contact.linkedin} />
        <Contact label="Instagram" value={contact.instagramHandle} href={contact.instagram} />
        <Contact label="Based in" value={contact.location} />
      </dl>

      {/* Masthead */}
      <header className="mt-[7mm] grid grid-cols-[1fr_52mm] gap-[8mm]">
        <div>
          <p className="font-display text-[54pt] leading-[0.8] tracking-[0.02em]">CV</p>
          <h1 className="mt-[5mm] text-[30pt] italic leading-[0.9] tracking-[-0.04em]">{fullName}</h1>
          <p className="mt-[2.5mm] text-[7pt] font-medium uppercase tracking-[0.08em]">{cv.title}</p>
          <p className="mt-[1.5mm] text-[7.5pt]">
            <span className="italic">Portfolio: </span>
            <a href={contact.site} className="underline underline-offset-2">
              {contact.siteLabel}
            </a>
          </p>
          <div className="mt-[5mm] space-y-[2.5mm] text-[8.5pt] leading-[1.45]">
            {cv.profile.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>

        <figure className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-[2.5mm]">
            <span className="absolute left-0 top-0 h-[4mm] w-[4mm] border-l border-t border-ink" />
            <span className="absolute right-0 top-0 h-[4mm] w-[4mm] border-r border-t border-ink" />
            <span className="absolute bottom-0 left-0 h-[4mm] w-[4mm] border-b border-l border-ink" />
            <span className="absolute bottom-0 right-0 h-[4mm] w-[4mm] border-b border-r border-ink" />
          </div>
          <Image
            src={cv.portrait.src}
            alt={`${fullName}, portrait`}
            width={cv.portrait.width}
            height={cv.portrait.height}
            sizes="200px"
            priority
            className="h-[70mm] w-full object-cover object-top grayscale"
          />
          <figcaption className="mt-[3.5mm] flex justify-between text-[6.5pt] italic">
            <span>fig. 0 — the brand</span>
            <span>2026</span>
          </figcaption>
        </figure>
      </header>

      {/* Body */}
      <div className="mt-[8mm] grid flex-1 grid-cols-[1fr_58mm] gap-[9mm]">
        <div>
          <Section label="Experience">
            <ol className="space-y-[4.5mm]">
              {cv.experience.map((job) => (
                <li key={job.org}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[11pt] italic leading-tight tracking-[-0.02em]">{job.role}</h3>
                    <span className="shrink-0 text-[6.5pt] tabular-nums">{job.dates}</span>
                  </div>
                  <p className="mt-[0.8mm] text-[6.5pt] font-medium uppercase tracking-[0.08em]">{job.org}</p>
                  <ul className="mt-[1.8mm] space-y-[0.8mm] text-[8pt] leading-[1.35]">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-[2mm]">
                        <span aria-hidden="true">–</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          <Section label="Earlier" className="mt-[5mm]">
            <p className="text-[7.5pt] leading-[1.5]">{cv.earlier.join(" · ")}</p>
          </Section>

          <Section label="In practice" className="mt-[5mm]">
            <ul className="space-y-[0.8mm] text-[7.5pt] leading-[1.4]">
              {cv.inPractice.map((item) => (
                <li key={item} className="flex gap-[2mm]">
                  <span aria-hidden="true">–</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div>
          <Section label="Education">
            <ol className="space-y-[3.5mm]">
              {cv.education.map((school) => (
                <li key={school.org}>
                  <p className="text-[6.5pt] font-medium uppercase tracking-[0.08em]">{school.org}</p>
                  {school.dates && <p className="text-[6.5pt] tabular-nums">{school.dates}</p>}
                  {school.lines.map((line) => (
                    <p key={line} className="mt-[0.6mm] text-[8pt] italic leading-[1.3]">
                      {line}
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </Section>

          <Section label="Skills" className="mt-[5mm]">
            <ul className="flex flex-wrap gap-[1.5mm]">
              {cv.skills.map((skill, i) => (
                <li
                  key={skill}
                  className={`px-[1.8mm] py-[0.6mm] text-[7pt] ${
                    i % 3 === 0 ? "bg-blush" : "border border-ink/25"
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Certificates" className="mt-[5mm]">
            {cv.certificates.map((c) => (
              <p key={c.name} className="text-[8pt] leading-[1.35]">
                <span className="italic">{c.name}</span>, {c.issuer} ({c.year})
              </p>
            ))}
          </Section>

          <Section label="Languages" className="mt-[5mm]">
            <ul className="space-y-[1mm] text-[8pt]">
              {cv.languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span>{lang.name}</span>
                  <span className="flex gap-[1.2mm]" aria-label={`${lang.level} out of 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`h-[2.2mm] w-[2.2mm] rounded-full ${i < lang.level ? "bg-ink" : "border border-ink/30"}`}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-[6mm] flex items-end justify-between border-t border-ink pt-[3mm]">
        <p className="text-[6.5pt] italic">
          {fullName} — Curriculum vitae, Edition 2026
        </p>
        <p className="rotate-[-3deg] font-script text-[15pt] leading-none">thanks for reading</p>
      </footer>
    </article>
  );
}

function Contact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt className="text-[6pt] font-medium uppercase tracking-[0.08em]">{label}</dt>
      <dd className="mt-[0.8mm] truncate">
        {href ? (
          <a href={href} className="underline-offset-2 hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function Section({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className="mb-[2.5mm] border-b border-ink/15 pb-[1.2mm] text-[7.5pt] italic">({label})</h2>
      {children}
    </section>
  );
}
