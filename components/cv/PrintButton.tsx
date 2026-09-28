"use client";

/** Opens the browser's print dialog; the print rules in globals.css keep it to the A4 sheet. */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
    >
      Print
    </button>
  );
}
