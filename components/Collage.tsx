import Image from "next/image";
import type { CollageItem } from "@/content/site";

type Props = {
  items: CollageItem[];
  className?: string;
};

export default function Collage({ items, className = "" }: Props) {
  return (
    <figure
      className={`animate-rise relative aspect-[11/10] [animation-delay:200ms] ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.src}
          className="absolute"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            width: `${item.width}%`,
            aspectRatio: item.aspect,
            zIndex: item.z,
            transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-700 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            style={{ clipPath: item.clipPath }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 18vw, 45vw"
              className={`object-cover ${item.grayscale ? "grayscale" : ""}`}
            />
          </div>
        </div>
      ))}
    </figure>
  );
}
