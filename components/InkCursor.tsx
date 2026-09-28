"use client";

import { useEffect, useRef } from "react";

/*
 * Hand-drawn pointer that leaves faint afterimages of itself along the real mouse path,
 * plus the occasional handwritten thought floating near that path.
 * - The live pointer is an SVG positioned once per frame (no perceptible lag).
 * - Ghosts and thoughts are drawn on one canvas in a requestAnimationFrame loop that sleeps when idle.
 * - No React state, pointer-events none, and nothing at all on touch devices or with reduced motion.
 */

// The pointer shape, shared by the live SVG and the canvas ghosts. Tip at (1,1) in a 16×18 box.
const ARROW_PATH =
  "M1 1C1.2 5.4 1.1 10.3 1.7 15.1c1.1-1.3 2.2-2.4 3.4-3.6.9 1.9 1.8 3.7 2.8 5.5.6.3 1.4 0 1.9-.6-.8-1.9-1.8-3.7-2.6-5.5 1.8-.2 3.4-.3 5.3-.3C9 7.3 5.2 4.3 1 1Z";
const PEN_PASS_PATH = "M1.4 1.6c3.3 2.6 6.7 5.4 9.9 8.4";
const INK = "#111";
const PAPER = "#fbfaf8";

// Afterimages
const GHOSTS_SLOW = 5; // fewer, tighter ghosts when moving slowly…
const GHOSTS_FAST = 10; // …more, wider-spaced ghosts when fast (~150–250px of trail)
const SPACING_SLOW = 14; // px between ghosts
const SPACING_FAST = 26;
const MIN_SPEED = 0.05; // px/ms; slower than this leaves no ghosts
const FAST_SPEED = 1.6; // px/ms; treated as "full" speed
const MAX_JUMP = 160; // px; a bigger single step is a teleport, not a stroke
const GHOST_LIFE_MIN = 180; // ms; varied per ghost so the trail dissolves unevenly
const GHOST_LIFE_MAX = 340;
const MAX_TILT = 3; // degrees of rotational lag on fast moves

// Handwritten thoughts
const THOUGHTS = [
  "so smart", "wow", "brilliant", "ooh", "click", "moving around", "ahh", "idea",
  "love that", "interesting", "yes", "nice", "wait", "very good", "that's it", "genius",
];
const THOUGHT_GAP_MIN = 1500; // ms of active movement between thoughts
const THOUGHT_GAP_MAX = 3000;
const THOUGHT_SPEED = 0.2; // px/ms; counts as "actively moving"
const MAX_THOUGHTS = 2;
// Never place a thought over anything readable or clickable.
const KEEP_CLEAR = "a, button, input, textarea, select, label, [role=button], nav, h1, h2, h3, p, li";

type Ghost = {
  x: number;
  y: number;
  rot: number;
  scale: number;
  vis: number; // how strong this ghost is allowed to be (faster = slightly stronger)
  shown: number; // eased, displayed opacity
  born: number;
  life: number;
};

type Thought = {
  x: number;
  y: number;
  rot: number;
  text: string;
  size: number;
  alpha: number;
  born: number;
  fadeIn: number;
  hold: number;
  fadeOut: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Opacity by position in the trail: ~58%, 46%, 37%, 30%, 24%… down to ~3% for the last ghosts. */
const echo = (rank: number) => 0.58 * Math.pow(0.8, rank);

export default function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pointer = pointerRef.current!;
    const root = document.documentElement;
    root.classList.add("has-ink-cursor");

    const arrow = new Path2D(ARROW_PATH);
    const penPass = new Path2D(PEN_PASS_PATH);
    // Same handwritten face as "PORTFOLIO".
    const brushFont = getComputedStyle(root).getPropertyValue("--font-botch").trim() || "sans-serif";

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const ghosts: Ghost[] = []; // oldest first
    const thoughts: Thought[] = [];
    const path: [number, number][] = []; // recent pointer positions, newest last
    let last: { x: number; y: number; t: number } | null = null;
    let speed = 0;
    let travelled = 0;
    let maxGhosts = GHOSTS_SLOW;
    let activeTime = 0;
    let nextThoughtIn = rand(THOUGHT_GAP_MIN, THOUGHT_GAP_MAX);
    let frame = 0;
    let px = -100;
    let py = -100;
    let tilt = 0;
    let tiltTarget = 0;
    let pointerFrame = 0;

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const addGhost = (x: number, y: number, now: number, s01: number) => {
      ghosts.push({
        x,
        y,
        rot: tilt + rand(-1.5, 1.5),
        scale: rand(0.95, 1.01),
        vis: lerp(0.8, 1, s01),
        shown: echo(0) * lerp(0.8, 1, s01),
        born: now,
        life: rand(GHOST_LIFE_MIN, GHOST_LIFE_MAX),
      });
      if (ghosts.length > GHOSTS_FAST + 6) ghosts.shift(); // hard cap on work per frame
    };

    /** Tries to drop a thought 10–60px off the recent path, somewhere that isn't text or a control. */
    const think = (now: number) => {
      if (thoughts.length >= MAX_THOUGHTS || path.length < 4) return false;
      const text = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
      const size = rand(12, 17);
      ctx.font = `${size}px ${brushFont}`;
      const halfW = ctx.measureText(text).width / 2 + 4;
      const halfH = size / 2 + 3;

      for (let attempt = 0; attempt < 6; attempt++) {
        const [ax, ay] = path[Math.floor(rand(0, path.length - 1))];
        const [bx, by] = path[path.length - 1];
        const len = Math.hypot(bx - ax, by - ay) || 1;
        const off = rand(10, 60) * (Math.random() < 0.5 ? -1 : 1);
        const x = ax - ((by - ay) / len) * off;
        const y = ay + ((bx - ax) / len) * off;

        if (x - halfW < 12 || x + halfW > window.innerWidth - 12) continue;
        if (y - halfH < 12 || y + halfH > window.innerHeight - 12) continue;
        if (thoughts.some((t) => Math.hypot(t.x - x, t.y - y) < 80)) continue;
        const corners: [number, number][] = [
          [x, y], [x - halfW, y - halfH], [x + halfW, y - halfH], [x - halfW, y + halfH], [x + halfW, y + halfH],
        ];
        if (corners.some(([cx, cy]) => document.elementFromPoint(cx, cy)?.closest(KEEP_CLEAR))) continue;

        thoughts.push({
          x,
          y,
          rot: rand(-0.12, 0.12),
          text,
          size,
          alpha: rand(0.55, 0.75),
          born: now,
          fadeIn: rand(150, 250),
          hold: rand(1000, 2000),
          fadeOut: rand(400, 700),
        });
        return true;
      }
      return false;
    };

    const draw = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ghosts: opacity by position in the trail, eased so it never jumps, and each dissolving on its own clock.
      for (let i = ghosts.length - 1; i >= 0; i--) {
        const g = ghosts[i];
        const rank = ghosts.length - 1 - i;
        const age = (now - g.born) / g.life;
        const ageFade = age < 0.15 ? 1 : Math.max(0, 1 - Math.pow((age - 0.15) / 0.85, 1.2));
        const target = rank < maxGhosts ? echo(rank) * g.vis * ageFade : 0;
        // Ghosts pushed off the end of the trail let go quickly; the rest ease gently.
        g.shown += (target - g.shown) * (target === 0 ? 0.5 : 0.3);
        if (age >= 1 || (target === 0 && g.shown < 0.01)) {
          ghosts.splice(i, 1);
          continue;
        }

        const r = (g.rot * Math.PI) / 180;
        const cos = Math.cos(r) * g.scale * dpr;
        const sin = Math.sin(r) * g.scale * dpr;
        ctx.setTransform(cos, sin, -sin, cos, g.x * dpr, g.y * dpr);
        ctx.translate(-1, -1); // put the tip, not the corner, on the recorded position
        ctx.globalAlpha = g.shown;
        ctx.lineJoin = "round";
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = PAPER;
        ctx.stroke(arrow);
        ctx.fillStyle = INK;
        ctx.fill(arrow);
        ctx.globalAlpha = g.shown * 0.6;
        ctx.lineWidth = 0.6;
        ctx.lineCap = "round";
        ctx.strokeStyle = INK;
        ctx.stroke(penPass);
      }

      // Thoughts: gentle fade in, linger long enough to read, slow fade out.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = INK;
      for (let i = thoughts.length - 1; i >= 0; i--) {
        const t = thoughts[i];
        const age = now - t.born;
        const total = t.fadeIn + t.hold + t.fadeOut;
        if (age >= total) {
          thoughts.splice(i, 1);
          continue;
        }
        const ease = (v: number) => v * v * (3 - 2 * v);
        const k =
          age < t.fadeIn
            ? ease(age / t.fadeIn)
            : age < t.fadeIn + t.hold
              ? 1
              : 1 - ease((age - t.fadeIn - t.hold) / t.fadeOut);
        const cos = Math.cos(t.rot) * dpr;
        const sin = Math.sin(t.rot) * dpr;
        ctx.setTransform(cos, sin, -sin, cos, t.x * dpr, t.y * dpr);
        ctx.globalAlpha = t.alpha * k;
        ctx.font = `${t.size.toFixed(1)}px ${brushFont}`;
        ctx.fillText(t.text, 0, 0);
      }

      ctx.globalAlpha = 1;
      frame = ghosts.length || thoughts.length ? requestAnimationFrame(draw) : 0;
    };

    // Position is exact every frame; only the tilt eases, then the loop sleeps until the next move.
    const renderPointer = () => {
      tilt += (tiltTarget - tilt) * 0.25;
      tiltTarget *= 0.8;
      pointer.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      pointerFrame =
        Math.abs(tilt) > 0.02 || Math.abs(tiltTarget) > 0.02 ? requestAnimationFrame(renderPointer) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      px = x;
      py = y;
      pointer.style.opacity = "1";

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const dt = Math.max(1, now - last.t);
        speed = lerp(speed, dist / dt, 0.35);
        // Quick sideways moves tip the pointer back a hair, like a pen dragged across paper.
        tiltTarget = Math.max(-MAX_TILT, Math.min(MAX_TILT, (dx / dt) * 1.4));

        if (dist > MAX_JUMP) {
          // Pointer teleported (re-entering the window, etc.): no ghosts across the gap.
          travelled = 0;
          path.length = 0;
        } else if (speed > MIN_SPEED) {
          const s01 = Math.min(1, speed / FAST_SPEED);
          const spacing = lerp(SPACING_SLOW, SPACING_FAST, s01);
          maxGhosts = Math.round(lerp(GHOSTS_SLOW, GHOSTS_FAST, s01));
          travelled += dist;
          // Ghosts sit on the actual path just travelled, so curves and zigzags are traced faithfully.
          while (travelled >= spacing) {
            travelled -= spacing;
            const k = Math.max(0, 1 - travelled / dist);
            addGhost(last.x + dx * k, last.y + dy * k, now, s01);
          }

          if (speed > THOUGHT_SPEED) {
            activeTime += Math.min(dt, 50);
            if (activeTime >= nextThoughtIn && think(now)) {
              activeTime = 0;
              // Mostly every 1.5–3s of movement, sometimes a longer pause.
              nextThoughtIn = rand(THOUGHT_GAP_MIN, THOUGHT_GAP_MAX) * (Math.random() < 0.2 ? 2 : 1);
            }
          }
        } else {
          travelled = 0;
        }
      }

      path.push([x, y]);
      if (path.length > 30) path.shift();
      last = { x, y, t: now };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
      if (ghosts.length || thoughts.length) wake();
    };

    const onLeave = () => {
      pointer.style.opacity = "0";
      last = null;
      path.length = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-ink-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] print:hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/*
        Hand-drawn arrow. Its tip sits at (1,1) in the 16×18 viewBox: the -1px offset puts the tip exactly on
        the pointer position, and transform-origin keeps it there when the pointer tilts.
      */}
      <svg
        ref={pointerRef}
        viewBox="0 0 16 18"
        width={16}
        height={18}
        className="absolute left-[-1px] top-[-1px] origin-[1px_1px] opacity-0 will-change-transform"
      >
        <path
          d={ARROW_PATH}
          fill={INK}
          stroke={PAPER}
          strokeWidth="0.9"
          strokeLinejoin="round"
          paintOrder="stroke"
        />
        {/* A stray second pass of the pen along one edge, for the hand-drawn feel. */}
        <path d={PEN_PASS_PATH} fill="none" stroke={INK} strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
