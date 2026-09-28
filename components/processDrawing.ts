/*
 * The creative-process journey, drawn as loose marker gestures. Each stage is a small set of
 * strokes (a heavy main gesture, lighter secondary strokes, small marks), written in its own local
 * coordinates and placed on the page; organic connectors carry the line from one stage to the
 * next, and a final long gesture ends in a marker-drawn arrow down to the work.
 *
 * Strokes here are centre lines plus a weight; ProcessJourney turns each one into a filled,
 * pressure-varying marker shape in the browser and reveals it along its path as you scroll.
 */

type Pt = [number, number];
type Place = { x: number; y: number; s: number };

export type Stroke = {
  /** Centre line of the stroke (SVG path data), in the stage's local coordinates when placed. */
  d: string;
  place?: Place;
  /** Peak marker width in artwork units. */
  width: number;
  opacity: number;
  /** Seed for this stroke's pressure and edge irregularities. */
  seed: number;
  /** For ghost strokes: the part of the centre line drawn (0–1), so they stop short or start late. */
  trim?: [number, number];
  /** Ghost strokes draw alongside the stroke before them instead of after it. */
  ghost?: boolean;
};

type StageArt = {
  strokes: Omit<Stroke, "place" | "seed">[];
  /** Where and which way the pen enters (start of the first stroke) and leaves (end of the exit stroke). */
  entry: { at: Pt; dir: Pt };
  exit: { at: Pt; dir: Pt };
  /** Indices of strokes that get a faint ghost trailing beside them. */
  ghosts: number[];
};

// 01 research: an observing eye with a scribbled iris, wide scanning sweeps around it, and a few
// small circled points of interest out in the surrounding space: taking in the brand's world.
const research: StageArt = {
  strokes: [
    { d: "M0 30 C 50 -40, 190 -52, 260 16 C 190 76, 60 80, 14 36", width: 4.6, opacity: 1 },
    {
      d: "M150 -6 C 118 -8, 110 40, 140 46 C 170 52, 180 10, 154 -2 C 134 -12, 124 22, 146 26",
      width: 4.2,
      opacity: 1,
    },
    { d: "M-30 -30 C 60 -112, 220 -112, 312 -30", width: 1.6, opacity: 0.55 },
    { d: "M-24 100 C 80 150, 230 142, 300 72", width: 1.4, opacity: 0.45 },
    { d: "M282 -72 C 322 -30, 332 40, 302 92", width: 1.2, opacity: 0.4 },
    { d: "M-40 -62 C -56 -66, -60 -46, -46 -42 C -34 -38, -30 -58, -42 -60", width: 2, opacity: 0.7 },
    { d: "M324 58 C 310 52, 304 70, 316 76 C 328 82, 336 64, 324 58", width: 2, opacity: 0.7 },
    { d: "M146 26 C 190 40, 250 30, 290 8", width: 3.4, opacity: 1 },
  ],
  entry: { at: [0, 30], dir: [1, -1.2] },
  exit: { at: [290, 8], dir: [1, 0.8] },
  ghosts: [0],
};

// 02 define: a messy cloud of possibilities, part of it crossed out, lines narrowing from it to a
// single point that gets circled hard: many options, one clear problem.
const define: StageArt = {
  strokes: [
    {
      d: `M0 0 C 30 -40, 70 -20, 50 10 C 30 40, 90 50, 110 20 C 130 -10, 80 -40, 120 -50
          C 160 -60, 170 -10, 140 0 C 110 10, 150 50, 190 30`,
      width: 4.2,
      opacity: 1,
    },
    { d: "M40 -62 C 60 -42, 76 -26, 92 -10", width: 2.2, opacity: 0.85 },
    { d: "M92 -62 C 76 -46, 60 -28, 44 -12", width: 2.2, opacity: 0.85 },
    { d: "M120 -70 C 170 -50, 210 0, 230 60", width: 1.6, opacity: 0.6 },
    { d: "M110 72 C 160 82, 200 78, 226 68", width: 1.6, opacity: 0.6 },
    { d: "M190 30 C 214 40, 226 52, 230 62", width: 3.6, opacity: 1 },
    { d: "M250 56 C 250 30, 206 30, 204 62 C 202 92, 248 96, 252 70 C 254 56, 240 46, 228 48", width: 4, opacity: 1 },
    { d: "M228 92 C 200 150, 120 190, 70 220", width: 3.4, opacity: 1 },
  ],
  entry: { at: [0, 0], dir: [1, -0.5] },
  exit: { at: [70, 220], dir: [-0.6, 0.8] },
  ghosts: [0, 6],
};

// 03 strategize: three loose pieces, each tied back to a centre, and from that centre one bold arrow
// pointing forward: the pieces line up behind a direction.
const strategize: StageArt = {
  strokes: [
    { d: "M120 -120 C 90 -100, 60 -90, 24 -86", width: 3, opacity: 1 },
    { d: "M-20 -90 C -24 -70, 18 -64, 20 -86 C 22 -106, -16 -110, -22 -92", width: 3, opacity: 1 },
    { d: "M-140 -24 C -146 0, -100 8, -98 -14 C -96 -34, -134 -38, -142 -22", width: 3, opacity: 1 },
    { d: "M-60 58 C -66 82, -20 90, -18 68 C -16 48, -54 44, -62 60", width: 3, opacity: 1 },
    { d: "M0 -66 C -8 -44, -18 -22, -26 -6", width: 2, opacity: 0.85 },
    { d: "M-98 -12 C -76 -8, -52 -4, -34 -2", width: 2, opacity: 0.85 },
    { d: "M-40 56 C -36 38, -32 20, -30 6", width: 2, opacity: 0.85 },
    { d: "M-30 0 C 20 -4, 80 4, 140 0", width: 5, opacity: 1 },
    { d: "M114 -22 C 124 -14, 132 -6, 142 0", width: 3.4, opacity: 1 },
    { d: "M142 0 C 132 6, 124 14, 114 24", width: 3.4, opacity: 1 },
    { d: "M142 0 C 170 40, 190 90, 230 120", width: 3.4, opacity: 1 },
  ],
  entry: { at: [120, -120], dir: [-0.7, 0.7] },
  exit: { at: [230, 120], dir: [1, 0.5] },
  ghosts: [7],
};

// 04 concept: two separate swirling gestures (and a faint third from above) meet and spark:
// the one idea that pulls everything together.
const concept: StageArt = {
  strokes: [
    { d: "M-10 0 C 40 -40, 80 40, 120 10 C 150 -12, 130 -50, 100 -36 C 70 -22, 90 20, 130 30", width: 4.2, opacity: 1 },
    { d: "M300 60 C 260 20, 220 90, 190 50 C 170 24, 196 -4, 214 12 C 232 28, 206 60, 170 50", width: 3.4, opacity: 0.95 },
    { d: "M150 -120 C 140 -80, 160 -50, 150 -20", width: 1.6, opacity: 0.55 },
    { d: "M150 -8 Q 156 22 184 30 Q 156 38 150 68 Q 144 38 116 30 Q 144 22 150 -8", width: 4.6, opacity: 1 },
    { d: "M112 -4 C 108 -8, 104 -12, 98 -18", width: 2, opacity: 0.8 },
    { d: "M194 -4 C 198 -8, 202 -12, 208 -18", width: 2, opacity: 0.8 },
    { d: "M194 66 C 198 70, 202 74, 208 82", width: 2, opacity: 0.8 },
    { d: "M150 68 C 150 150, 180 220, 120 250", width: 3.4, opacity: 1 },
  ],
  entry: { at: [-10, 0], dir: [1, -0.05] },
  exit: { at: [120, 250], dir: [-1, 0.3] },
  ghosts: [0, 3],
};

// 05 create: the idea made real: a rough frame (entered from the right) with headline, copy and an
// image, and a second, phone-like screen beside it; the line leaves towards the world.
const create: StageArt = {
  strokes: [
    { d: "M250 -8 C 170 -2, 70 -6, -10 0 C -12 50, -6 110, -10 170", width: 4.4, opacity: 1 },
    { d: "M-4 176 C 70 180, 170 174, 252 178 C 250 120, 256 50, 246 -24", width: 2.8, opacity: 0.95 },
    { d: "M24 40 C 70 34, 120 42, 170 36", width: 5, opacity: 1 },
    { d: "M24 70 C 60 66, 96 72, 130 68", width: 1.8, opacity: 0.75 },
    { d: "M24 90 C 52 86, 80 92, 104 88", width: 1.6, opacity: 0.65 },
    { d: "M20 160 L 70 112 L 100 140 L 130 104 L 180 158", width: 2.2, opacity: 0.85 },
    { d: "M170 92 C 156 80, 144 98, 156 106 C 168 114, 180 98, 168 90", width: 2.4, opacity: 0.9 },
    { d: "M230 112 C 232 150, 230 200, 232 240 C 256 242, 278 240, 300 240 C 298 200, 300 150, 298 110 C 276 108, 254 110, 230 112", width: 2.6, opacity: 0.95 },
    { d: "M244 140 C 258 136, 272 140, 286 136", width: 2.6, opacity: 0.9 },
    { d: "M300 240 C 340 250, 380 240, 420 220", width: 3.4, opacity: 1 },
  ],
  entry: { at: [250, -8], dir: [-1, 0.05] },
  exit: { at: [420, 220], dir: [1, -0.4] },
  ghosts: [0, 2],
};

// 06 activate is the finale (see the layouts below): the line reaches out, branches into the world,
// then sweeps on into the arrow at the work.
const stagesArt = [research, define, strategize, concept, create];

export type Stage = {
  /** Strokes drawn during this stage: the connector first, then the stage's own gestures. */
  strokes: Stroke[];
  /** Scroll progress window in which this stage draws. */
  draw: [number, number];
  /** Where the stage's text sits, as a fraction of the artwork's width and height. */
  text: { left: number; top: number };
};

type FinaleStroke = { d: string; width: number; opacity: number };

export type Journey = {
  width: number;
  height: number;
  stages: Stage[];
  /** Final long gesture and arrow, drawn last. */
  finale: { strokes: Stroke[]; draw: [number, number]; text: { left: number; top: number } };
};

// Draw, then pause while the text is read; the final stage is the long walk to the work.
const windows: [number, number][] = [
  [0, 0.12],
  [0.18, 0.3],
  [0.36, 0.48],
  [0.54, 0.66],
  [0.72, 0.84],
];

const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
const unit = (a: Pt): Pt => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
const placed = (p: Place, pt: Pt): Pt => [p.x + pt[0] * p.s, p.y + pt[1] * p.s];

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, steps: number): Pt[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
  });
}

/** A round loop the line flows into and out of along its own direction, drifting forward as it goes. */
function loop(at: Pt, dir: Pt, radius: number, turns = 1): Pt[] {
  const t = unit(dir);
  const n: Pt = [-t[1], t[0]];
  const centre = add(at, mul(n, radius));
  const start = Math.atan2(at[1] - centre[1], at[0] - centre[0]);
  const sgn = -Math.sin(start) * t[0] + Math.cos(start) * t[1] >= 0 ? 1 : -1;
  const steps = 18 * turns;
  return Array.from({ length: steps + 1 }, (_, k) => {
    const a = start + sgn * ((Math.PI * 2 * turns * k) / steps);
    const c = add(centre, mul(t, (radius * 0.9 * k) / steps));
    return [c[0] + Math.cos(a) * radius, c[1] + Math.sin(a) * radius];
  });
}

const polyline = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${Math.round(p[0] * 10) / 10} ${Math.round(p[1] * 10) / 10}`).join(" ");

/**
 * A connector between stages: leaves along the pen's direction, bows through an offset midpoint
 * (every other one makes a round loop there) and arrives heading the way the next stage begins.
 */
function connector(a: Pt, exitDir: Pt, b: Pt, entryDir: Pt, index: number, loopRadius: number): string {
  const u = unit(exitDir);
  const v = unit(entryDir);
  const span = sub(b, a);
  const dist = Math.hypot(span[0], span[1]);
  const along = unit(span);
  const side = index % 2 ? 1 : -1;
  const mid = add(add(a, mul(span, 0.5)), mul([-along[1], along[0]], side * Math.min(dist * 0.1, 80)));
  const handle = Math.max(90, dist * 0.32);
  const inner = Math.max(60, dist * 0.2);
  const first = bezier(a, add(a, mul(u, handle)), sub(mid, mul(along, inner)), mid, 30);
  const doodle = index % 2 === 1 ? loop(mid, along, loopRadius).slice(1) : [];
  const resume = doodle.length ? doodle[doodle.length - 1] : mid;
  const second = bezier(resume, add(resume, mul(along, inner)), sub(b, mul(v, handle)), b, 30).slice(1);
  return polyline([...first, ...doodle, ...second]);
}

/** A faint ghost: the same gesture a few units to one side, starting late and stopping short. */
const ghostOf = (s: Stroke, offset: Pt, seed: number): Stroke => ({
  ...s,
  place: s.place ? { ...s.place, x: s.place.x + offset[0], y: s.place.y + offset[1] } : undefined,
  width: Math.max(1.4, s.width * 0.2),
  opacity: 0.35,
  seed,
  trim: [0.06, 0.82],
  ghost: true,
});

function build(
  width: number,
  height: number,
  places: Place[],
  texts: { left: number; top: number }[],
  finale: (last: Pt, lastDir: Pt) => { strokes: FinaleStroke[]; barbs: string[] },
  finaleText: { left: number; top: number },
  loopRadius: number,
  weight: number,
): Journey {
  let seed = 1;
  const stages: Stage[] = [];
  let prevExit: { at: Pt; dir: Pt } | null = null;

  stagesArt.forEach((art, i) => {
    const place = places[i];
    const strokes: Stroke[] = [];
    if (prevExit) {
      const conn: Stroke = {
        d: connector(prevExit.at, prevExit.dir, placed(place, art.entry.at), art.entry.dir, i, loopRadius),
        width: 3.4 * weight,
        opacity: 1,
        seed: seed++,
      };
      strokes.push(conn);
      // Connectors carry their own ghost, drifting off to one side (unplaced strokes are in page space).
      strokes.push({ ...ghostOf(conn, [0, 0], seed++), d: shiftPath(conn.d, [4, -4]) });
    }
    art.strokes.forEach((s, k) => {
      const stroke: Stroke = { ...s, width: s.width * weight, place, seed: seed++ };
      strokes.push(stroke);
      if (art.ghosts.includes(k)) strokes.push(ghostOf(stroke, [3.5, -3], seed++));
    });
    prevExit = { at: placed(place, art.exit.at), dir: art.exit.dir };
    stages.push({ strokes, draw: windows[i], text: { left: texts[i].left / width, top: texts[i].top / height } });
  });

  const last = prevExit!;
  const { strokes: parts, barbs } = finale(last.at, last.dir);
  const finaleStrokes: Stroke[] = [];
  parts.forEach((f) => {
    const stroke: Stroke = { d: f.d, width: f.width * weight, opacity: f.opacity, seed: seed++ };
    finaleStrokes.push(stroke);
    // The main line carries a ghost, like every other heavy gesture.
    if (f.width >= 4) finaleStrokes.push({ ...ghostOf(stroke, [0, 0], seed++), d: shiftPath(f.d, [5, -4]) });
  });
  barbs.forEach((d) => finaleStrokes.push({ d, width: 3.8 * weight, opacity: 1, seed: seed++ }));

  return {
    width,
    height,
    stages,
    finale: {
      strokes: finaleStrokes,
      draw: [0.9, 0.985],
      text: { left: finaleText.left / width, top: finaleText.top / height },
    },
  };
}

/** Shifts a polyline path (as produced by `polyline`) by an offset. */
function shiftPath(d: string, [dx, dy]: Pt): string {
  return d.replace(/([ML])(-?[\d.]+) (-?[\d.]+)/g, (_, c, x, y) => `${c}${+x + dx} ${+y + dy}`);
}

// Wide screens: the gestures wander left → right → left → right → left, then a long sweep to the work.
export const desktopJourney = build(
  1200,
  2600,
  [
    { x: 80, y: 230, s: 1.4 },
    { x: 720, y: 640, s: 1.3 },
    { x: 300, y: 1150, s: 1.3 },
    { x: 700, y: 1500, s: 1.3 },
    { x: 160, y: 1960, s: 1.3 },
  ],
  [
    { left: 90, top: 420 },
    { left: 900, top: 900 },
    { left: 120, top: 1345 },
    { left: 700, top: 1860 },
    { left: 130, top: 2215 },
  ],
  // activate: the line reaches a point and branches outward to several places in the world, then
  // the main stroke sweeps on and curves back into an arrow at the work.
  (last, dir) => {
    const hub: Pt = [900, 2200];
    const reach = polyline(bezier(last, add(last, mul(unit(dir), 100)), [820, 2190], hub, 24));
    const branch = (c1: Pt, c2: Pt, end: Pt, tail: Pt[]) => polyline([...bezier(hub, c1, c2, end, 20), ...tail]);
    return {
      strokes: [
        { d: reach, width: 4.6, opacity: 1 },
        { d: branch([980, 2120], [1060, 2080], [1128, 2062], loop([1128, 2062], [1, -0.3], 10).slice(1)), width: 2.4, opacity: 0.9 },
        { d: branch([1000, 2196], [1080, 2210], [1160, 2226], loop([1160, 2226], [1, 0.2], 8).slice(1)), width: 2.2, opacity: 0.85 },
        { d: branch([960, 2150], [980, 2090], [1010, 2030], []), width: 1.4, opacity: 0.5 },
        {
          d: polyline([
            ...bezier(hub, [990, 2270], [1130, 2400], [900, 2468], 30),
            // The last stretch drops straight down into the V, so the barbs sit evenly either side of it.
            ...bezier([900, 2468], [560, 2490], [262, 2480], [262, 2594], 30).slice(1),
          ]),
          width: 4.6,
          opacity: 1,
        },
      ],
      // One V in a single motion (barb, rounded point, barb), so the point is at full weight.
      barbs: ["M234 2560 C 244 2572, 252 2584, 258 2591 Q 262 2597 267 2591 C 274 2583, 282 2575, 294 2566"],
    };
  },
  { left: 600, top: 2300 },
  34,
  3,
);

// Phones: the same story, stacked more vertically in a narrow frame, with lighter marks.
export const mobileJourney = build(
  400,
  2600,
  [
    { x: 20, y: 230, s: 0.95 },
    { x: 40, y: 660, s: 0.95 },
    { x: 190, y: 1120, s: 0.9 },
    { x: 40, y: 1480, s: 0.95 },
    { x: 40, y: 1960, s: 0.85 },
  ],
  [
    { left: 30, top: 400 },
    { left: 60, top: 810 },
    { left: 30, top: 1270 },
    { left: 40, top: 1745 },
    { left: 40, top: 2185 },
  ],
  (last, dir) => {
    const hub: Pt = [330, 2250];
    const reach = polyline(bezier(last, add(last, mul(unit(dir), 30)), [360, 2230], hub, 16));
    return {
      strokes: [
        { d: reach, width: 4.6, opacity: 1 },
        { d: polyline(bezier(hub, [350, 2210], [370, 2190], [388, 2176], 16)), width: 2.2, opacity: 0.85 },
        { d: polyline(bezier(hub, [360, 2250], [376, 2262], [390, 2272], 16)), width: 1.6, opacity: 0.6 },
        { d: polyline(bezier(hub, [330, 2420], [80, 2470], [80, 2594], 30)), width: 4.6, opacity: 1 },
      ],
      barbs: ["M56 2564 C 64 2574, 70 2583, 76 2590 Q 80 2596 84 2590 C 90 2582, 96 2576, 106 2568"],
    };
  },
  { left: 30, top: 2300 },
  18,
  2,
);
