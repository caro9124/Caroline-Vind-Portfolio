import { keywords } from "@/content/site";

// Longest first, so "digital experiences" wins over any shorter overlapping keyword.
const pattern = new RegExp(
  `\\b(${[...keywords]
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})\\b`,
  "gi",
);

/** Renders text with each keyword wrapped so it can be highlighted on hover. */
export default function Keywords({ text }: { text: string }) {
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="keyword">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
