import Image from "next/image";
import type { GalleryItem } from "@/content/galleries";
import GalleryVideo from "./GalleryVideo";

/*
 * Project images and films laid out like prints on a desk: alternating widths, staggered heights and the
 * faintest tilt, with plenty of paper between them. Stacks into a single column on small screens.
 */

// Repeating rhythm of [width, extra top offset, tilt in degrees] for the two-column spread.
const rhythm = [
  { width: "md:w-[54%]", offset: "", tilt: -0.5 },
  { width: "md:w-[36%]", offset: "md:mt-[14vh]", tilt: 0.6 },
  { width: "md:w-[40%] md:ml-[6%]", offset: "", tilt: 0.3 },
  { width: "md:w-[46%]", offset: "md:mt-[10vh]", tilt: -0.4 },
];

export default function ProjectGallery({ images, name }: { images: GalleryItem[]; name: string }) {
  if (!images.length) return null;

  return (
    <section aria-label={`${name}: project images`} className="mt-24 lg:mt-[18vh]">
      <ul className="flex flex-col gap-16 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-y-[12vh]">
        {images.map((img, i) => {
          const r = rhythm[i % rhythm.length];
          // Tall portraits get a narrower print so they never tower over the page.
          const shape = img.type === "video" && img.crop ? 1 / img.crop : img.height / img.width;
          const tall = shape > 1.3;
          const width = tall ? (i % 2 ? "md:w-[30%]" : "md:w-[36%]") : r.width;
          return (
            <li key={img.src} className={`w-full ${width} ${r.offset}`}>
              <figure style={{ transform: `rotate(${r.tilt}deg)` }}>
                {img.type === "video" ? (
                  <GalleryVideo
                    src={img.src}
                    poster={img.poster}
                    width={img.width}
                    height={img.height}
                    label={img.alt}
                    crop={img.crop}
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                )}
                <figcaption className="mt-2 text-[10px] italic tabular-nums">
                  fig. {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
