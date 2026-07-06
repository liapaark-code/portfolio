"use client";
import { useEffect, useState } from "react";

export type RailSection = {
  id: string;
  label: string;
  subs?: { id: string; label: string }[];
};

/** Sticky left rail for case-study pages: main anchors always visible; the
    active section expands to show its subsections and highlights the one in view. */
export default function ProgressRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [activeSub, setActiveSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= probe) current = s.id;
      }
      let sub: string | null = null;
      for (const s of sections.find((s) => s.id === current)?.subs ?? []) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= probe) sub = s.id;
      }
      setActive(current);
      setActiveSub(sub);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label="Case study progress" className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
      {sections.map((s) => {
        const subs = s.subs ?? [];
        const open = active === s.id && subs.length > 0;
        return (
          <div key={s.id} className="mb-1.5">
            <a href={`#${s.id}`} onClick={go(s.id)} className="group flex items-center gap-3 py-1">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${active === s.id ? "bg-[#1D4ED8] scale-125" : "bg-gray-300 group-hover:bg-[#93aff5]"}`} />
              <span className={`text-xs font-medium tracking-wide transition-colors duration-300 ${active === s.id ? "text-[#1D4ED8]" : "text-gray-400 group-hover:text-[#1D4ED8]"}`}>
                {s.label}
              </span>
            </a>
            <div
              className={`ml-[3px] pl-[17px] border-l overflow-hidden transition-all duration-300 ease-out ${
                open ? "max-h-64 opacity-100 border-[#c3d0ff] mt-1 mb-2" : "max-h-0 opacity-0 border-transparent"
              }`}
            >
              {subs.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  onClick={go(sub.id)}
                  className={`block py-[3px] text-[11px] tracking-wide transition-colors duration-200 ${
                    activeSub === sub.id ? "text-[#1D4ED8] font-semibold" : "text-gray-400 hover:text-[#1D4ED8]"
                  }`}
                >
                  {sub.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
