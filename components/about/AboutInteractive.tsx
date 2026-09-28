"use client";

import { useEffect, useRef, useState } from "react";

/** A colour chip that copies its hex code, with a handwritten "copied" for a moment afterwards. */
export function Swatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context); the hex is visible anyway.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group block w-full text-left outline-none"
      aria-label={`${name}, ${hex}. Copy colour code`}
    >
      <span
        className="relative block aspect-[4/5] border border-ink/15 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 motion-reduce:transition-none"
        style={{ backgroundColor: hex }}
      >
        <span
          aria-live="polite"
          className={`absolute bottom-3 right-3 rotate-[-6deg] font-script text-[1.3rem] transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          } ${hex === "#0A0A0A" ? "text-paper" : "text-ink"}`}
        >
          {copied ? "copied!" : ""}
        </span>
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-[clamp(1.25rem,2vw,1.75rem)] italic leading-none tracking-[-0.02em]">{name}</span>
        <span className="text-[10px] uppercase tabular-nums tracking-[0.04em]">{hex}</span>
      </span>
      <span className="mt-2 block max-w-[240px] text-[11px] leading-[1.35]">{usage}</span>
    </button>
  );
}

/** Type specimens that set whatever the visitor types, in all three faces at once. */
export function TypeTester({
  faces,
}: {
  faces: { name: string; role: string; className: string }[];
}) {
  const [text, setText] = useState("");
  const sample = text.trim() || "Caroline";

  return (
    <div>
      <label className="flex max-w-[420px] items-baseline gap-4 border-b border-ink/30 pb-2">
        <span className="shrink-0 text-[10px] italic">Try it:</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 24))}
          placeholder="type a word"
          className="w-full bg-transparent text-[13px] outline-none placeholder:text-ink/35"
        />
      </label>

      <ul className="mt-10 border-t border-ink/15">
        {faces.map((face) => (
          <li
            key={face.name}
            className="grid items-baseline gap-2 border-b border-ink/15 py-6 md:grid-cols-[minmax(0,1fr)_220px] md:gap-8"
          >
            <p
              className={`overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] ${face.className}`}
            >
              {sample}
            </p>
            <p className="text-[10px] leading-[1.5]">
              <span className="block font-medium uppercase tracking-[0.04em]">{face.name}</span>
              <span className="italic">{face.role}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A marker tick or cross that draws itself once it scrolls into view. */
export function DrawMark({ kind, className = "" }: { kind: "do" | "dont"; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.drawn = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} aria-hidden="true" viewBox="0 0 60 60" className={`draw-mark ${className}`}>
      {kind === "do" ? (
        <path
          d="M8 33c5 3 10 8 14 15 7-15 17-28 31-40"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path d="M12 11c11 11 24 25 37 39" pathLength={1} fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M48 9C36 21 24 35 11 51" pathLength={1} fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
