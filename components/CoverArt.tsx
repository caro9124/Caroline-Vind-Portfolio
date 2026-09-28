import Image from "next/image";

/*
 * Art-directed covers composed in the site's own language (paper, blush, italic type, handwriting)
 * for projects whose source material is mostly screenshots. Each one fills its parent box and
 * scales with it via container units, so it works as a 200px hover print or a large page cover.
 */

export type CoverArtKey = "via";

export default function CoverArt({ art }: { art: CoverArtKey }) {
  switch (art) {
    case "via":
      return <ViaCover />;
  }
}

function ViaCover() {
  return (
    <div aria-hidden="true" className="@container absolute inset-0 overflow-hidden bg-[#f1eee8]">
      {/* Blush block peeking out beside the figure, set slightly askew like a pasted-down print. */}
      <div className="absolute bottom-[30cqw] right-[33cqw] h-[46cqw] w-[36cqw] rotate-[-3deg] bg-blush" />

      <Image
        src="/images/projects/via-design-and-business/caroline-cutout.png"
        alt=""
        width={725}
        height={1306}
        sizes="(min-width: 1024px) 30vw, 60vw"
        className="absolute bottom-0 right-[7cqw] w-[52cqw] grayscale"
      />

      <div className="absolute left-[7cqw] top-[8cqw]">
        <p className="text-[21cqw] italic leading-[0.85] tracking-[-0.04em]">+19%</p>
        <p className="mt-[3cqw] max-w-[34cqw] text-[3.4cqw] uppercase leading-[1.3] tracking-[0.04em]">
          Impressions in the first 60 days
        </p>
      </div>

      {/* A handwritten aside beside the headline number. */}
      <p className="absolute left-[68cqw] top-[13cqw] -rotate-[7deg] font-brush text-[5.5cqw] lowercase leading-none">
        0% paid!
      </p>

      <p className="absolute bottom-[8cqw] left-[7cqw] max-w-[26cqw] text-[3.4cqw] leading-[1.35]">
        104,241 organic impressions in 30 days
      </p>
    </div>
  );
}
