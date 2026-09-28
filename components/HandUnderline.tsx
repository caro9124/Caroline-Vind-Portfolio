/** A slightly wavering 1px pen line that draws left → right on hover and retracts on leave. */
export default function HandUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-[4px] w-full [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
    >
      <path
        d="M0.5 2.4C12 1.6 21 2.9 33 2.2S55 1.4 67 2.3 88 2.9 99.5 1.8"
        fill="none"
        stroke="#111"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
