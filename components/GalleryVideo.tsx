"use client";

import { useEffect, useRef } from "react";

/**
 * A silent, looping project film that only loads and plays while it's on screen.
 * With reduced motion it stays paused on its poster frame, with controls to play it by choice.
 */
export default function GalleryVideo({
  src,
  poster,
  width,
  height,
  label,
  crop,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  crop?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={crop ? "w-full object-cover" : "h-auto w-full"}
      style={crop ? { aspectRatio: crop } : undefined}
    />
  );
}
