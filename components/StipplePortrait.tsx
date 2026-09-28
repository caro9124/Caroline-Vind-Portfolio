"use client";

import { useEffect, useRef } from "react";

/*
 * A stippled portrait that "develops" out of the page as you scroll past it.
 * A small greyscale tone map is sampled once into a few thousand dots (density = darkness).
 * Each dot gets its own reveal threshold, lower body first and hair/detail last, with noise
 * so the figure forms organically. Drawn on a single canvas, redrawn only when scroll changes.
 */

const TONE_MAP = "/images/caroline-tone.png";
const DOTS_DESKTOP = 15000;
const DOTS_MOBILE = 6000;
const SEED = 20260927; // same portrait on every visit
const INK = "#111";

type Dot = {
  x: number; // 0–1 across the portrait
  y: number; // 0–1 down the portrait
  r: number; // radius in px at 1000px display height
  shade: number; // 0–1 opacity when fully developed
  threshold: number; // scroll progress at which it appears
  dx: number; // tiny settle-in drift, px
  dy: number;
};

/** Small deterministic PRNG (mulberry32). */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Reads the tone map into a darkness field and scatters dots in proportion to it. */
async function buildDots(count: number): Promise<{ dots: Dot[]; aspect: number }> {
  const img = new Image();
  img.src = TONE_MAP;
  await img.decode();

  const w = img.width;
  const h = img.height;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d", { willReadFrequently: true })!;
  octx.fillStyle = "#fff";
  octx.fillRect(0, 0, w, h);
  // Blur turns the source's dots into continuous tone, so our stipple is new rather than traced.
  octx.filter = "blur(2px)";
  octx.drawImage(img, 0, 0);
  const px = octx.getImageData(0, 0, w, h).data;

  const dark = new Float32Array(w * h);
  let max = 0;
  for (let i = 0; i < w * h; i++) {
    const v = 1 - (px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2]) / 765;
    dark[i] = v;
    if (v > max) max = v;
  }
  // Normalise, drop faint noise to pure paper, and keep the result delicate rather than heavy.
  for (let i = 0; i < dark.length; i++) {
    dark[i] = Math.pow(clamp01((dark[i] / (max || 1) - 0.07) / 0.93), 1.15);
  }

  const rand = seeded(SEED);
  const dots: Dot[] = [];
  for (let tries = 0; dots.length < count && tries < count * 40; tries++) {
    const x = rand();
    const y = rand();
    const d = dark[Math.floor(y * h) * w + Math.floor(x * w)];
    if (rand() > d) continue;

    // Lower body first, hair and upper body last; denser detail a little later still.
    const early = rand() < 0.05; // a few stray dots from the very start
    const threshold = early
      ? rand() * 0.18
      : clamp01(0.1 + 0.62 * (1 - y) + 0.12 * d + (rand() - 0.5) * 0.28);

    dots.push({
      x,
      y,
      r: (0.55 + 0.55 * d) * (0.85 + rand() * 0.3),
      shade: 0.55 + 0.4 * d * (0.8 + rand() * 0.2),
      threshold: Math.max(0.01, Math.min(0.97, threshold)),
      dx: (rand() - 0.5) * 4,
      dy: (rand() - 0.5) * 4,
    });
  }
  return { dots, aspect: w / h };
}

export default function StipplePortrait({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

    let dots: Dot[] = [];
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let drawn = -1;
    let frame = 0;
    let cancelled = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      drawn = -1;
    };

    const track = canvas.closest<HTMLElement>("[data-stipple-track]");

    /** Scroll progress 0 → 1 through the reveal. */
    const progress = () => {
      if (reduceMotion) return 1;
      const vh = window.innerHeight;
      const t = track?.getBoundingClientRect();
      if (t && t.height > vh * 1.3) {
        // Pinned: starts as the section is 60% into view, completes 85% of the way through the track,
        // leaving a short pause on the finished portrait before the page moves on.
        return clamp01((vh * 0.4 - t.top) / ((t.height - vh) * 0.85 + vh * 0.4));
      }
      // Not pinned (phones): develops as the portrait scrolls up into full view.
      const rect = canvas.getBoundingClientRect();
      return clamp01((vh * 0.95 - rect.top) / (vh * 0.85));
    };

    const draw = () => {
      frame = 0;
      const p = progress();
      if (Math.abs(p - drawn) < 0.001) return;
      drawn = p;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = INK;
      const scale = Math.max(0.7, Math.min(1.3, cssH / 1000));

      // Group dots into a few opacity levels so each frame is a handful of fills, not thousands.
      const LEVELS = 5;
      const paths = Array.from({ length: LEVELS }, () => new Path2D());
      for (const d of dots) {
        const a = smoothstep(d.threshold - 0.05, d.threshold + 0.05, p);
        if (a <= 0) continue;
        const level = Math.min(LEVELS - 1, Math.floor(a * d.shade * LEVELS));
        const settle = 1 - a;
        const cx = d.x * cssW + d.dx * settle;
        const cy = d.y * cssH + d.dy * settle;
        const r = d.r * scale * (0.55 + 0.45 * a);
        paths[level].moveTo(cx + r, cy);
        paths[level].arc(cx, cy, r, 0, Math.PI * 2);
      }
      paths.forEach((path, i) => {
        ctx.globalAlpha = (i + 1) / LEVELS;
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      schedule();
    });

    buildDots(small ? DOTS_MOBILE : DOTS_DESKTOP).then(({ dots: built }) => {
      if (cancelled) return;
      dots = built;
      resize();
      observer.observe(canvas);
      schedule();
      if (!reduceMotion) window.addEventListener("scroll", schedule, { passive: true });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Stippled portrait of Caroline"
      className={`block aspect-[240/881] ${className}`}
    />
  );
}
