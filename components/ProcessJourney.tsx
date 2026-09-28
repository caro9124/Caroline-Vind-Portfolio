"use client";

import { useEffect, useId, useRef } from "react";
import type { Journey, Stroke } from "./processDrawing";

/*
 * The creative process drawn as marker gestures that appear as you scroll. Each stroke's centre
 * line is turned into a filled marker shape whose width follows its own pressure (swelling,
 * thickening on turns, tapering in, flicking off, with ragged edges) and filled with a dry-ink
 * texture. A mask drawn along the centre line reveals the stroke progressively, so you see it being
 * drawn. Stages draw in turn, pausing while their words appear. No React state on scroll: all
 * updates happen in a requestAnimationFrame loop.
 */

export type StageCopy = { title: string; line: string };
type Pt = [number, number];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Small deterministic PRNG, so each stroke looks the same on every visit. */
function seeded(seed: number) {
  let a = seed * 9973;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Samples a stroke's centre line into page-space points, honouring its placement and trim. */
function sample(stroke: Stroke, measurer: SVGPathElement): Pt[] {
  measurer.setAttribute("d", stroke.d);
  const len = measurer.getTotalLength();
  const [from, to] = stroke.trim ?? [0, 1];
  const s = stroke.place?.s ?? 1;
  const step = 2.4 / s;
  const pts: Pt[] = [];
  for (let l = from * len; l <= to * len; l += step) {
    const { x, y } = measurer.getPointAtLength(l);
    pts.push(stroke.place ? [stroke.place.x + x * s, stroke.place.y + y * s] : [x, y]);
  }
  return pts;
}

/**
 * Builds the filled outline of a marker stroke: width follows a slow pressure swell, gets a little
 * heavier where the line turns, tapers in at the start and flicks off at the end, and wavers slightly
 * sample to sample for a rough, physical edge.
 */
function markerOutline(pts: Pt[], width: number, seed: number, ghost: boolean) {
  const rand = seeded(seed);
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const total = cum[cum.length - 1] || 1;
  const f1 = Math.max(1, total / 320);
  const f2 = Math.max(2, total / 85);
  const ph1 = rand();
  const ph2 = rand();
  const left: Pt[] = [];
  const right: Pt[] = [];

  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const tx = b[0] - a[0];
    const ty = b[1] - a[1];
    const tl = Math.hypot(tx, ty) || 1;
    const nx = -ty / tl;
    const ny = tx / tl;

    // How sharply the line is turning here: markers leave more ink on turns.
    const c = pts[Math.max(0, i - 3)];
    const d = pts[Math.min(pts.length - 1, i + 3)];
    let turn = Math.abs(
      Math.atan2(d[1] - pts[i][1], d[0] - pts[i][0]) - Math.atan2(pts[i][1] - c[1], pts[i][0] - c[0]),
    );
    if (turn > Math.PI) turn = 2 * Math.PI - turn;
    const bend = Math.min(1, turn * 1.4) * 0.28;

    const t = cum[i] / total;
    const pressure =
      0.62 + 0.24 * Math.sin(2 * Math.PI * (t * f1 + ph1)) + 0.12 * Math.sin(2 * Math.PI * (t * f2 + ph2)) + bend;
    const taper = ghost
      ? smoothstep(0, 0.2, t) * (1 - smoothstep(0.6, 1, t))
      : smoothstep(0, 0.07, t) * (1 - 0.82 * smoothstep(0.8, 1, t));
    const rough = 1 + (rand() - 0.5) * 0.24;
    const half = Math.max(0.2, (width / 2) * pressure * taper * rough);

    left.push([pts[i][0] + nx * half, pts[i][1] + ny * half]);
    right.push([pts[i][0] - nx * half, pts[i][1] - ny * half]);
  }

  const r = (n: number) => Math.round(n * 10) / 10;
  const outline =
    left.map((p, i) => `${i ? "L" : "M"}${r(p[0])} ${r(p[1])}`).join(" ") +
    right
      .reverse()
      .map((p) => ` L${r(p[0])} ${r(p[1])}`)
      .join("") +
    " Z";
  const centre = pts.map((p, i) => `${i ? "L" : "M"}${r(p[0])} ${r(p[1])}`).join(" ");
  return { outline, centre, cum, total };
}

/** A dry-ink texture: near-black, speckled and faintly streaked, used to fill every stroke. */
function inkTexture(): string {
  const size = 200;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const rand = seeded(42);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 1100; i++) {
    ctx.globalAlpha = 0.25 + rand() * 0.7;
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, 0.3 + rand() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.lineWidth = 0.6;
  for (let i = 0; i < 70; i++) {
    ctx.globalAlpha = 0.08 + rand() * 0.18;
    const x = rand() * size;
    const y = rand() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 18 + rand() * 30, y - 6 - rand() * 10);
    ctx.stroke();
  }
  return c.toDataURL("image/png");
}

export default function ProcessJourney({
  journey,
  copy,
  className = "",
}: {
  journey: Journey;
  copy: StageCopy[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  // Unique per instance: the desktop and phone versions both sit in the page.
  const uid = `pj-${useId().replace(/:/g, "")}`;

  const strokes = [
    ...journey.stages.flatMap((s, i) => s.strokes.map((stroke) => ({ stroke, stage: i }))),
    ...journey.finale.strokes.map((stroke) => ({ stroke, stage: journey.stages.length })),
  ];

  useEffect(() => {
    const root = rootRef.current!;
    const svg = root.querySelector("svg")!;
    const pen = root.querySelector<SVGCircleElement>("[data-pen]")!;
    const texts = [...root.querySelectorAll<HTMLElement>("[data-stage-text]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.querySelector<SVGImageElement>("[data-texture]")!.setAttribute("href", inkTexture());

    // Build every stroke's marker shape and reveal mask.
    const measurer = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.appendChild(measurer);
    const built = strokes.map(({ stroke }, k) => {
      const pts = sample(stroke, measurer);
      const geom = markerOutline(pts, stroke.width, stroke.seed, !!stroke.ghost);
      const ink = root.querySelector<SVGPathElement>(`[data-ink="${k}"]`)!;
      const mask = root.querySelector<SVGPathElement>(`[data-mask="${k}"]`)!;
      ink.setAttribute("d", geom.outline);
      mask.setAttribute("d", geom.centre);
      mask.setAttribute("stroke-width", `${stroke.width * 1.9 + 5}`);
      mask.style.strokeDasharray = `${geom.total} ${geom.total}`;
      mask.style.strokeDashoffset = `${geom.total}`;
      return { ...geom, mask, pts };
    });
    measurer.remove();

    // Timing: within a stage, strokes draw one after another in proportion to their length;
    // a ghost draws alongside the stroke before it, starting a little later.
    const windows = [...journey.stages.map((s) => s.draw), journey.finale.draw];
    const timing: [number, number][] = [];
    windows.forEach(([a, b], stage) => {
      const idx = strokes.map((s, k) => (s.stage === stage ? k : -1)).filter((k) => k >= 0);
      const sum = idx.filter((k) => !strokes[k].stroke.ghost).reduce((acc, k) => acc + built[k].total, 0) || 1;
      let at = a;
      let prev: [number, number] = [a, a];
      idx.forEach((k) => {
        if (strokes[k].stroke.ghost) {
          const dur = prev[1] - prev[0];
          timing[k] = [prev[0] + dur * 0.15, prev[1]];
          return;
        }
        const span = ((b - a) * built[k].total) / sum;
        timing[k] = [at, at + span];
        prev = timing[k];
        at += span;
      });
    });

    const render = (p: number) => {
      let tip: Pt | null = null;
      built.forEach((g, k) => {
        const [a, b] = timing[k];
        const t = clamp01((p - a) / (b - a || 1));
        g.mask.style.strokeDashoffset = `${g.total * (1 - t)}`;
        if (t > 0 && t < 1 && !strokes[k].stroke.ghost) {
          // The pen sits where this stroke is currently being drawn.
          const at = t * g.total;
          let i = 1;
          while (i < g.cum.length - 1 && g.cum[i] < at) i++;
          tip = g.pts[i];
        }
      });
      if (tip) {
        pen.setAttribute("cx", `${tip[0]}`);
        pen.setAttribute("cy", `${tip[1]}`);
      }
      pen.style.opacity = tip ? "1" : "0";

      // Each stage's words arrive once its drawing is complete, and stay while the pen rests.
      texts.forEach((el, i) => {
        const shownAt = i < journey.stages.length ? windows[i][1] : 0.99;
        el.dataset.shown = p >= shownAt ? "true" : "false";
      });
    };

    if (reduceMotion) {
      render(1);
      return;
    }

    // Progress 0 → 1 as the artwork passes a reading line 60% down the screen. If the page can't
    // scroll far enough for the end to reach that line (tall screens), the reading line drops to
    // where the end can reach, so the arrow always finishes by the bottom of the page.
    const target = () => {
      if (!root.getClientRects().length) return null; // this layout is hidden at this screen size
      const vh = window.innerHeight;
      const r = svg.getBoundingClientRect();
      const below = document.documentElement.scrollHeight - (r.bottom + window.scrollY);
      const readingLine = Math.max(vh * 0.6, vh - below - 2);
      return clamp01((readingLine - r.top) / r.height);
    };

    let drawn = target() ?? 0;
    let frame = 0;
    render(drawn);

    // Ease toward the scroll position so the pen moves calmly rather than jumping.
    const tick = () => {
      const goal = target();
      if (goal === null) {
        frame = 0;
        return;
      }
      drawn += (goal - drawn) * 0.14;
      if (Math.abs(goal - drawn) < 0.0004) drawn = goal;
      render(drawn);
      frame = drawn === goal ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // The geometry depends only on the journey data, which is fixed for each instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey]);

  const texts = [...journey.stages.map((s) => s.text), journey.finale.text];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${journey.width} ${journey.height}`}
        aria-hidden="true"
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <pattern id={`${uid}-ink`} patternUnits="userSpaceOnUse" width="90" height="90">
            <image data-texture width="90" height="90" preserveAspectRatio="none" />
          </pattern>
          {strokes.map((_, k) => (
            <mask
              key={k}
              id={`${uid}-m${k}`}
              maskUnits="userSpaceOnUse"
              x={-100}
              y={-100}
              width={journey.width + 200}
              height={journey.height + 200}
            >
              <path data-mask={k} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
            </mask>
          ))}
        </defs>
        {strokes.map(({ stroke }, k) => (
          <path key={k} data-ink={k} fill={`url(#${uid}-ink)`} opacity={stroke.opacity} mask={`url(#${uid}-m${k})`} />
        ))}
        <circle data-pen r="3.4" fill="#111" opacity="0" />
      </svg>

      {/* The words for each stage, placed beside its drawing. */}
      <ol className="contents">
        {copy.map((c, i) => (
          <li
            key={c.title}
            data-stage-text
            data-shown="false"
            // Paper-coloured backing, so where a stroke crosses the words it reads as passing behind them.
            className="stage-text absolute -mx-2 w-[min(276px,74%)] bg-paper px-2 py-1"
            style={{ left: `${texts[i].left * 100}%`, top: `${texts[i].top * 100}%` }}
          >
            <p className="flex items-baseline gap-3">
              <span className="text-[10px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-script text-[30px] lowercase leading-none">{c.title}</span>
            </p>
            <p className="mt-2 text-[clamp(1.15rem,1.7vw,1.6rem)] italic leading-[1.1] tracking-[-0.02em]">
              {c.line}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
