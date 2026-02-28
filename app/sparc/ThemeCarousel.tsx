"use client";
import { useState } from "react";
import Image from "next/image";

const themes = [
  { src: "/images/sparc/ui-1.png", label: "Theme 1: Black",        dot: "#000000" },
  { src: "/images/sparc/ui-2.png", label: "Theme 2: Cobalt",       dot: "#080CD6" },
  { src: "/images/sparc/ui-3.png", label: "Theme 3: Sporty Green", dot: "#95D608" },
  { src: "/images/sparc/ui-4.png", label: "Theme 4: Navy",         dot: "#13264D" },
  { src: "/images/sparc/ui-5.png", label: "Theme 5: Dark Green",   dot: "#126B40" },
];

export default function ThemeCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + themes.length) % themes.length);
  const next = () => setCurrent((c) => (c + 1) % themes.length);

  return (
    <div>
      {/* Carousel row: arrow | slide | arrow */}
      <div className="relative flex items-center gap-4">

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous theme"
          className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slide */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100">
          <Image
            src={themes[current].src}
            alt={themes[current].label}
            width={1440}
            height={900}
            className="w-full h-auto"
            priority={current === 0}
          />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next theme"
          className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2.5 mt-5">
        {themes.map((t, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={t.label}
            className="w-2.5 h-2.5 rounded-full transition-all duration-200"
            style={{
              background: i === current ? t.dot : "#d1d5db",
              transform: i === current ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
