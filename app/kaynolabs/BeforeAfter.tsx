"use client";
import { useState } from "react";
import Image from "next/image";

type Shot = { src: string; alt: string; width: number; height: number; video?: string };

/** Before/after viewer as a single card: toggle header + browser-framed screenshot in one container. */
export default function BeforeAfter({ before, after, url, fit = "cover" }: { before: Shot; after: Shot; url: string; fit?: "cover" | "contain" }) {
  const [view, setView] = useState<"after" | "before">("after");
  const shot = view === "before" ? before : after;
  return (
    <div className="rounded-[1.4rem] p-3 sm:p-4" style={{ background: "var(--card-blue)", border: "1px solid rgba(195, 208, 255, 0.4)" }}>
      <div className="flex items-center justify-between gap-4 mb-3 px-1 pt-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1D4ED8]">{url}</p>
        <div className="inline-flex rounded-full bg-white p-1 shadow-[0_1px_4px_rgba(30,64,175,0.12)]" role="group" aria-label="Toggle before and after view">
          {(["before", "after"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                view === v ? "bg-[#1D4ED8] text-white" : "text-[#1D4ED8] hover:bg-[#eef2ff]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[1.1rem] overflow-hidden border border-black/5 bg-[#0b0d13] shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e1017] border-b border-[#1b1f2c]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="ml-3 font-mono text-[10px] tracking-wide text-[#8b93a7] bg-[#151826] border border-[#232838] rounded-md px-2.5 py-0.5">
            {url} · {view}
          </span>
        </div>
        <div className="relative w-full" style={{ aspectRatio: `${after.width} / ${after.height}` }}>
          {shot.video ? (
            <video
              key={shot.video}
              src={shot.video}
              poster={shot.src}
              autoPlay
              muted
              loop
              playsInline
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              aria-label={shot.alt}
              className={`absolute inset-0 w-full h-full object-top ba-fade ${fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          ) : (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className={`absolute inset-0 w-full h-full object-top ba-fade ${fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          )}
        </div>
      </div>
      <style>{`
        @keyframes ba-fade { from { opacity: 0.35; } to { opacity: 1; } }
        .ba-fade { animation: ba-fade 0.3s ease; }
      `}</style>
    </div>
  );
}
