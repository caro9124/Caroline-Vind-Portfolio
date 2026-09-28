import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { BriefForm, BusinessCard, CopyEmail, RightNow, SayHi } from "@/components/contact/ContactInteractive";
import { contact, contactCopy } from "@/content/contact";
import { cv } from "@/content/cv";
import { person } from "@/content/site";

export const metadata: Metadata = { title: "Contact — Caroline Vind" };

const fullName = `${person.firstName} ${person.lastName}`;

/*
 * Contact as a creative brief: the visitor fills in the blanks and it opens as a ready-written email.
 * Beside it, a business card that turns over for the details, and what the calendar says right now.
 */
export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="grid gap-20 px-6 pb-40 pt-32 md:px-10 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:px-[4.5vw] lg:pt-[24vh]">
        <section aria-labelledby="contact-heading" className="animate-rise lg:col-span-7">
          <p className="text-[10px] italic">(Contact)</p>
          <h1
            id="contact-heading"
            className="mt-4 text-[clamp(3.75rem,11vw,10rem)] italic leading-[0.84] tracking-[-0.05em]"
          >
            {contactCopy.heading}
          </h1>
          <p className="mt-8 max-w-[340px] text-[12px] leading-[1.45]">{contactCopy.intro}</p>

          <div className="mt-16 border-t border-ink pt-8">
            <BriefForm />
          </div>

          <div className="mt-16">
            <SayHi className="font-script text-[clamp(1.5rem,2.4vw,2rem)] leading-none transition-opacity duration-300 hover:opacity-60">
              {contactCopy.sayHi}&nbsp;→
            </SayHi>
          </div>
        </section>

        <aside className="flex flex-col gap-14 lg:col-span-4 lg:col-start-9 lg:pt-[18vh]">
          <div className="w-full max-w-[400px]">
            <div className="rotate-[-2deg]">
              <BusinessCard front={<CardFront />} back={<CardBack />} />
            </div>
            <div className="mt-4 flex gap-6">
              <CopyEmail />
            </div>
          </div>

          <div className="max-w-[320px] border-t border-ink/15 pt-4">
            <p className="text-[10px] italic">(Details)</p>
            <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-2 text-[11px]">
              <dt className="italic">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </dd>
              <dt className="italic">Phone</dt>
              <dd>
                <a href={contact.phoneHref} className="tabular-nums underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </dd>
              <dt className="italic">LinkedIn</dt>
              <dd>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  caroline-vind ↗
                </a>
              </dd>
              <dt className="italic">Instagram</dt>
              <dd>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {contact.instagramHandle} ↗
                </a>
              </dd>
              <dt className="italic">Based in</dt>
              <dd>{contact.location}</dd>
            </dl>
          </div>

          <div className="max-w-[320px] border-t border-ink/15 pt-4">
            <p className="text-[10px] italic">(CV)</p>
            <div className="mt-3 flex gap-6 text-[10px] font-medium uppercase tracking-[0.04em]">
              <Link href="/cv" className="underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60">
                View CV →
              </Link>
              <a href={cv.pdf} download className="underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60">
                Download PDF ↓
              </a>
            </div>
          </div>

          <div className="max-w-[320px] border-t border-ink/15 pt-4">
            <p className="text-[10px] italic">(Right now)</p>
            <div className="mt-3">
              <RightNow />
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}

/** Logo side: ink stock with the "CV" monogram, the way a brand puts its mark on the front. */
function CardFront() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[4px] bg-ink text-paper">
      <p className="font-display text-[3.4rem] leading-none tracking-[0.02em]">CV</p>
      <p className="mt-3 text-[11px] italic tracking-[-0.01em] text-paper/70">{fullName}</p>
      <span aria-hidden="true" className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-blush" />
    </div>
  );
}

/** Details side: name and title top left, contact lines set small along the bottom, like a printed card. */
function CardBack() {
  const rows = [
    { k: "E", v: contact.email, href: `mailto:${contact.email}` },
    { k: "T", v: contact.phone, href: contact.phoneHref },
    { k: "IG", v: contact.instagramHandle, href: contact.instagram },
    { k: "IN", v: "caroline-vind", href: contact.linkedin },
  ];

  return (
    <div className="print-grain absolute inset-0 flex flex-col justify-between rounded-[4px] bg-[#f6f3ee] px-6 py-5 text-left text-ink">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[1.6rem] italic leading-none tracking-[-0.04em]">{fullName}</p>
          <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.1em]">{contact.specialism}</p>
          <p className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-ink/60">{contact.role}</p>
        </div>
        <span aria-hidden="true" className="font-display text-[1.1rem] leading-none">CV</span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <dl className="grid grid-cols-[1.4rem_1fr] gap-y-[3px] text-[10px] leading-tight">
          {rows.map((row) => (
            <div key={row.k} className="contents">
              <dt className="text-[8px] font-medium tracking-[0.06em] text-ink/50">{row.k}</dt>
              <dd>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="tabular-nums underline-offset-2 hover:underline"
                >
                  {row.v}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="shrink-0 text-[8px] italic text-ink/60">{contact.location}</p>
      </div>
    </div>
  );
}
