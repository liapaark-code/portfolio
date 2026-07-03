"use client";
import { useEffect, useState } from "react";

/** Autoplaying, muted, looping cover video with a reduced-motion poster fallback. */
export default function CoverVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} className={className} />;
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      // React doesn't serialize `muted` into SSR HTML, so Chrome blocks the
      // pre-hydration autoplay attempt — re-kick playback on mount
      ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
      aria-label={label}
      className={className}
    />
  );
}
