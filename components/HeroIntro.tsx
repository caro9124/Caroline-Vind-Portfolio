import { person } from "@/content/site";
import Keywords from "./Keywords";

// Small per-letter offsets so the brush word feels hand-set rather than typeset.
const wobble = [
  { r: -3, y: 2 },
  { r: 2, y: -1 },
  { r: -1, y: 3 },
  { r: 3, y: 0 },
  { r: -2, y: -2 },
  { r: 1, y: 2 },
  { r: -3, y: 0 },
  { r: 2, y: 3 },
  { r: -1, y: -1 },
];

function BrushWord({ word }: { word: string }) {
  return (
    <p className="mt-4 font-display text-[clamp(2.5rem,11vw,4.25rem)] leading-none tracking-[0.03em] md:text-[7.6vw] lg:mt-3 lg:text-[clamp(3.5rem,5.6vw,6.5rem)]">
      <span className="sr-only">{word}</span>
      <LiquidFilter />
      <span aria-hidden="true" className="liquid inline-flex">
        {word.split("").map((char, i) => {
          const w = wobble[i % wobble.length];
          return (
            <span
              key={i}
              className="inline-block"
              style={{ transform: `rotate(${w.r}deg) translateY(${w.y}px)` }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </p>
  );
}

/*
 * A slow liquid ripple: large, drifting noise displaces the letters by several pixels over a long
 * loop, so the word seems to melt and float in ink. Switched off for reduced motion (see globals.css).
 */
function LiquidFilter() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <filter id="liquid" x="-8%" y="-35%" width="116%" height="170%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="4">
          <animate
            attributeName="baseFrequency"
            dur="11s"
            values="0.008 0.014; 0.013 0.020; 0.010 0.009; 0.006 0.016; 0.008 0.014"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="15" />
      </filter>
    </svg>
  );
}

export default function HeroIntro() {
  const fullName = `${person.firstName} ${person.lastName}`;

  return (
    <div className="animate-rise">
      <h1 className="text-[clamp(3.25rem,15vw,5rem)] font-normal italic leading-[0.86] tracking-[-0.035em] md:text-[10vw] lg:text-[clamp(3.5rem,5.2vw,6.5rem)]">
        {person.firstName}
        <br />
        {person.lastName}
      </h1>

      <BrushWord word="PORTFOLIO" />

      <p className="mt-8 text-[10px] italic lg:mt-10">{person.year}</p>

      <p className="mt-6 max-w-[260px] text-left lg:text-justify text-[11px] leading-[1.35] lg:mt-9">
        <em>{fullName}</em> <Keywords text={person.intro} />
      </p>
    </div>
  );
}
