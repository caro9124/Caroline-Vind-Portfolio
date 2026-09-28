"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ReaderPage } from "@/content/galleries";

/*
 * Flip through a magazine one spread at a time: arrows, a tap on either half of the magazine,
 * the keyboard's arrow keys, or a swipe. Spreads sit on a desk-toned surface so the white
 * pages read as paper; a single page (the cover) sits on the right, like a closed magazine.
 */

// Width / height of a full A4 spread (two portrait A4 pages side by side); every page fits this frame.
const SPREAD_ASPECT = (2 * 210) / 297;

export default function MagazineReader({ pages, name }: { pages: ReaderPage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<number | null>(null);

  const go = (step: 1 | -1) => {
    const next = index + step;
    if (next < 0 || next >= pages.length) return;
    setIndex(next);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const current = pages[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${name}: flip through the magazine`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mt-24 outline-none lg:mt-[18vh]"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-brush text-[16px] lowercase tracking-[0.02em]">Flip through</h2>
        <p className="text-[10px] tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </p>
      </div>

      <div
        className="relative mt-5 w-full touch-pan-y select-none overflow-hidden bg-[#ebe8e2]"
        style={{ aspectRatio: SPREAD_ASPECT }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {pages.map((page, i) => {
          // Pages already turned rest slightly left, pages still to come slightly right.
          return (
            <div
              key={page.src}
              aria-hidden={i !== index}
              className="absolute inset-[4%] transition-[opacity,transform] duration-500 ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                transform: `translateX(${i === index ? 0 : (i < index ? -3 : 3)}%)`,
                zIndex: i === index ? 1 : 0,
              }}
            >
              <div className={`relative h-full ${page.single ? "ml-auto w-1/2" : "w-full"}`}>
                <Image
                  src={page.src}
                  alt={page.alt}
                  fill
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className={page.single ? "object-contain object-left" : "object-contain"}
                  priority={i === 0}
                />
                {/* The faintest fold down the middle of a spread, so it reads as a bound magazine. */}
                {!page.single && (
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[4%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.07)_50%,transparent)]" />
                )}
              </div>
            </div>
          );
        })}

        {/* Tap either half of the magazine to turn back or forward. */}
        <button
          type="button"
          aria-label="Previous spread"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="absolute inset-y-0 left-0 z-10 w-1/2 disabled:pointer-events-none"
        />
        <button
          type="button"
          aria-label="Next spread"
          onClick={() => go(1)}
          disabled={index === pages.length - 1}
          className="absolute inset-y-0 right-0 z-10 w-1/2 disabled:pointer-events-none"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <ArrowButton dir={-1} onClick={() => go(-1)} disabled={index === 0} />
        <p aria-live="polite" className="text-center text-[10px] italic">
          {current.alt}
        </p>
        <ArrowButton dir={1} onClick={() => go(1)} disabled={index === pages.length - 1} />
      </div>
    </section>
  );
}

/** A hand-drawn arrow with a small label, fading back when there's nowhere left to turn. */
function ArrowButton({ dir, onClick, disabled }: { dir: 1 | -1; onClick: () => void; disabled: boolean }) {
  const label = dir === 1 ? "Next" : "Previous";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${label} spread`}
      className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.04em] transition-opacity duration-300 hover:opacity-60 disabled:opacity-20"
    >
      {dir === 1 && <span>{label}</span>}
      <svg
        aria-hidden="true"
        viewBox="0 0 44 16"
        className={`h-4 w-11 transition-transform duration-300 ease-out ${
          dir === 1 ? "group-enabled:group-hover:translate-x-1" : "-scale-x-100 group-enabled:group-hover:-translate-x-1"
        }`}
      >
        <path
          d="M1.5 8.6C10 7.4 21 8.9 30 7.9s8.6.2 11.2.1M33.8 2.4c2.6 1.9 5.2 3.9 7.4 5.6-2.3 1.7-4.9 3.6-7.1 5.6"
          fill="none"
          stroke="#111"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {dir === -1 && <span>{label}</span>}
    </button>
  );
}
