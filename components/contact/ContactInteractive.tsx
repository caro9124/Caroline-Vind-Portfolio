"use client";

import { useEffect, useState, type ReactNode } from "react";
import { calendarWeek } from "@/content/about";
import { contact, contactCopy } from "@/content/contact";

/* ---------- The brief ---------- */

/** A fill-in-the-blanks brief that composes an email in the visitor's own mail app. Nothing is sent from here. */
export function BriefForm() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState(contactCopy.projectTypes[0]);
  const [need, setNeed] = useState("");
  const [when, setWhen] = useState("");
  const [sent, setSent] = useState(false);

  const subject = `About ${type}${brand ? `, from ${brand}` : ""}`;
  const body = [
    `Hi Caroline,`,
    ``,
    `I'm ${name || "…"}${brand ? ` from ${brand}` : ""}. I'm reaching out about ${type}${need ? `: ${need}` : "."}`,
    when ? `Ideally by ${when}.` : "",
    ``,
    `Best,`,
    name || "",
  ]
    .filter((line, i, all) => !(line === "" && all[i - 1] === ""))
    .join("\n");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        openMailApp(subject, body);
        setSent(true);
      }}
    >
      <p className="text-[clamp(1.5rem,2.9vw,2.4rem)] italic leading-[1.5] tracking-[-0.02em]">
        Hi Caroline, I’m <Blank label="your name" value={name} onChange={setName} /> from{" "}
        <Blank label="company, school or brand" value={brand} onChange={setBrand} />. I’m reaching out about{" "}
        <span className="relative inline-block">
          <select
            aria-label="What you're reaching out about"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="cursor-pointer appearance-none border-b border-ink bg-transparent pr-6 italic outline-none focus-visible:bg-blush"
          >
            {contactCopy.projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-0 text-[0.5em] not-italic">
            ▾
          </span>
        </span>
        , and <Blank label="a few details" value={need} onChange={setNeed} placeholder="a few details…" />.
        Ideally by <Blank label="when" value={when} onChange={setWhen} placeholder="when?" />.
      </p>

      <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-4">
        <button
          type="submit"
          className="group relative bg-ink px-6 py-4 text-[11px] font-medium uppercase tracking-[0.06em] text-paper transition-transform duration-300 hover:-translate-y-0.5"
        >
          Send the brief →
        </button>
        <p className="rotate-[-3deg] font-script text-[1.15rem] leading-none text-ink/80">↖ {contactCopy.privacyNote}</p>
      </div>

      {sent && <SendOptions subject={subject} body={body} onClose={() => setSent(false)} />}
    </form>
  );
}

/* ---------- Sending ---------- */

const enc = encodeURIComponent;

/** Hands the message to the visitor's default email app (does nothing if none is set up). */
function openMailApp(subject: string, body: string) {
  window.location.href = `mailto:${contact.email}?subject=${enc(subject)}&body=${enc(body)}`;
}

/**
 * Shown after sending: a mailto link silently does nothing when no email app is set up (common for
 * people who use Gmail or Outlook in the browser), so offer those, plus copying the message.
 */
function SendOptions({ subject, body, onClose }: { subject: string; body: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(contact.email)}&su=${enc(subject)}&body=${enc(body)}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(contact.email)}&subject=${enc(subject)}&body=${enc(body)}`;
  const link = "underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60";

  return (
    <div role="status" className="relative mt-10 max-w-[520px] border border-ink bg-paper p-6">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-3 text-[14px] hover:opacity-60">
        ×
      </button>
      <p className="text-[clamp(1.25rem,2vw,1.6rem)] italic leading-tight tracking-[-0.02em]">Almost there.</p>
      <p className="mt-2 text-[11px] leading-[1.45]">
        Your email app should open with the message ready. If nothing happened, send it from here instead:
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.04em]">
        <a href={gmail} target="_blank" rel="noopener noreferrer" className={link}>
          Open in Gmail ↗
        </a>
        <a href={outlook} target="_blank" rel="noopener noreferrer" className={link}>
          Open in Outlook ↗
        </a>
        <button
          type="button"
          className={`relative font-medium uppercase ${link}`}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`To: ${contact.email}\nSubject: ${subject}\n\n${body}`);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            } catch {
              // Clipboard unavailable; the address is shown below.
            }
          }}
        >
          {copied ? "Copied ✓" : "Copy message"}
        </button>
      </div>
      <p className="mt-5 text-[10px] italic">
        or write to <span className="not-italic">{contact.email}</span> · {contact.phone}
      </p>
    </div>
  );
}

/** "Just say hi": a plain email, with the same fallbacks as the brief. */
export function SayHi({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const subject = "Hi Caroline";
  const body = "Hi Caroline,\n\n";

  return (
    <div>
      <button
        type="button"
        className={className}
        onClick={() => {
          openMailApp(subject, body);
          setOpen(true);
        }}
      >
        {children}
      </button>
      {open && <SendOptions subject={subject} body={body} onClose={() => setOpen(false)} />}
    </div>
  );
}

/** An inline fill-in blank, underlined like a form on paper; it grows with what's typed. */
function Blank({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 80))}
      placeholder={placeholder ?? label}
      className="max-w-full border-b border-ink bg-transparent px-1 italic outline-none transition-colors placeholder:text-ink/30 focus:bg-blush/60"
      style={{ width: `${Math.max((placeholder ?? label).length, value.length) + 1.5}ch` }}
    />
  );
}

/* ---------- Business card ---------- */

/**
 * A business card that flips to its contact side on hover or keyboard focus, or with the small
 * "turn over" control (for touch screens, where there is no hover).
 */
export function BusinessCard({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div className="group [perspective:1200px]">
        <div className="relative aspect-[85/55] w-full">
          {/* Two more cards underneath, like a small stack on a desk. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 rotate-[5deg] rounded-[4px] border border-ink/10 bg-[#f6f3ee] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-1 translate-y-1 rotate-[-3deg] rounded-[4px] border border-ink/10 bg-[#f6f3ee] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
          />
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] motion-reduce:transition-none ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-[4px] shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_24px_-10px_rgba(0,0,0,0.25)] [backface-visibility:hidden]">{front}</div>
            <div className="absolute inset-0 rounded-[4px] shadow-[0_1px_1px_rgba(0,0,0,0.08),0_10px_24px_-10px_rgba(0,0,0,0.25)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              {back}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 text-[10px] italic underline-offset-4 hover:underline"
      >
        ↻ turn the card over
      </button>
    </div>
  );
}

/** Copies the email address, with a handwritten "copied!" for a moment. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(contact.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          // Clipboard unavailable; the address is visible anyway.
        }
      }}
      className="relative text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
    >
      Copy email
      <span
        aria-live="polite"
        className={`absolute -right-16 -top-3 rotate-[-6deg] font-script text-[1.2rem] normal-case tracking-normal transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "copied!" : ""}
      </span>
    </button>
  );
}

/* ---------- Right now ---------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Local time in Aarhus, and what the sample week on the About page has scheduled right now. */
export function RightNow() {
  const [state, setState] = useState<{ time: string; slot: string | null } | null>(null);

  useEffect(() => {
    function tick() {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Copenhagen",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const day = DAYS.indexOf(get("weekday"));
      const hour = Number(get("hour")) + Number(get("minute")) / 60;
      const event = calendarWeek.find((e) => e.day === day && hour >= e.start && hour < e.end);
      setState({ time: `${get("hour")}:${get("minute")}`, slot: event?.title ?? null });
    }
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return <p className="h-[3.2em] text-[11px]" aria-hidden="true" />;

  return (
    <p className="text-[11px] leading-[1.6]">
      <span className="tabular-nums">{state.time}</span> in Aarhus.{" "}
      <span className="italic">
        {state.slot ? (
          <>
            According to the calendar, I’m on: <span className="keyword bg-blush">{state.slot}</span>
          </>
        ) : (
          "Nothing in the calendar right now. Suspicious."
        )}
      </span>
    </p>
  );
}
