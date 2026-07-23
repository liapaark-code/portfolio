"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Live, interactive embed of the real shipped HTML, scaled to fit and framed in browser chrome.
 * Renders the page at its native desktop width inside a scaled iframe; a click-to-interact
 * gate keeps the case study scrollable until the reader opts in.
 */
export default function LiveDemo({
  src,
  label,
  caption,
  baseWidth = 1440,
  viewHeight = 900,
}: {
  src: string;
  label: string;
  caption: string;
  baseWidth?: number;
  viewHeight?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / baseWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div>
      <div className="rounded-[1.1rem] overflow-hidden border border-black/5 bg-[#0b0d13] shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e1017] border-b border-[#1b1f2c]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
          <span className="ml-3 font-mono text-[10px] tracking-wide text-[#8b93a7] bg-[#151826] border border-[#232838] rounded-md px-2.5 py-0.5">{label}</span>
          <span className={`ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-wide rounded-md px-2.5 py-0.5 border ${live ? "text-[#2ce5a2] border-[#2ce5a2]/40 bg-[#2ce5a2]/10" : "text-[#8b93a7] border-[#232838] bg-[#151826]"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-[#2ce5a2]" : "bg-[#5b6474]"}`} />
            {live ? "interactive" : "live html"}
          </span>
        </div>
        <div ref={wrapRef} className="relative" style={{ height: viewHeight * scale }}>
          <iframe
            src={src}
            title={label}
            loading="lazy"
            style={{
              width: baseWidth,
              height: viewHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              border: 0,
              pointerEvents: live ? "auto" : "none",
              display: "block",
            }}
          />
          {!live && (
            <button
              onClick={() => setLive(true)}
              aria-label={`Interact with the live demo: ${label}`}
              className="absolute inset-0 flex items-end justify-center pb-6 group cursor-pointer"
            >
              <span className="rounded-full bg-white/95 border border-[#c3d0ff] px-5 py-2 text-xs font-semibold text-[#1D4ED8] shadow-[0_10px_30px_-12px_rgba(15,20,40,0.5)] transition-transform duration-200 group-hover:-translate-y-0.5">
                click to interact with the real page
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0ea77a] mt-3">{caption}</p>
    </div>
  );
}
