"use client";
import { useState } from "react";
import Image from "next/image";

const FINDINGS = [
  {
    num: 1,
    title: "Mood, not meaning.",
    body: "“Your new decision-making partner” could describe any AI tool. The page never says what Douglass reads, or what it returns.",
    x: 57, y: 55,
  },
  {
    num: 2,
    title: "Shows asking, never answering.",
    body: "An empty ask bar is the entire product story. No answer, no sources, no proof of intelligence ever renders.",
    x: 75, y: 68,
  },
  {
    num: 3,
    title: "Zero receipts.",
    body: "No integrations, no security depth, no social proof anywhere. The page asks for a company’s data on vibes alone.",
    x: 81, y: 31,
  },
];

/** Annotated audit exhibit: the live site with numbered markers, findings beside it. */
export default function AuditExhibit() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {/* Exhibit: annotated screenshot */}
        <div className="lg:col-span-3">
          <div className="rounded-[1.1rem] overflow-hidden border border-black/5 bg-[#0b0d13] shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e1017] border-b border-[#1b1f2c]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
              <span className="ml-3 font-mono text-[10px] tracking-wide text-[#8b93a7] bg-[#151826] border border-[#232838] rounded-md px-2.5 py-0.5">
                kaynolabs.ai · audited
              </span>
            </div>
            <div className="relative">
              <Image
                src="/images/kaynolabs/before-hero.webp"
                alt="The original kaynolabs.ai hero, annotated with three audit findings"
                width={1295}
                height={924}
                className="w-full h-auto"
              />
              {FINDINGS.map((f) => (
                <button
                  key={f.num}
                  onClick={() => setActive(active === f.num ? null : f.num)}
                  aria-label={`Finding ${f.num}: ${f.title}`}
                  className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border-2 font-mono text-xs font-bold flex items-center justify-center transition-all duration-200 ${
                    active === f.num
                      ? "bg-[#2ce5a2] border-[#2ce5a2] text-black scale-110"
                      : "bg-[#2ce5a2]/15 border-[#2ce5a2] text-[#7ef0c9] hover:bg-[#2ce5a2]/35"
                  }`}
                  style={{ left: `${f.x}%`, top: `${f.y}%` }}
                >
                  {f.num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {FINDINGS.map((f) => (
            <button
              key={f.num}
              onClick={() => setActive(active === f.num ? null : f.num)}
              className={`flex-1 flex items-center text-left rounded-2xl p-5 border transition-colors duration-200 ${
                active === f.num ? "border-[#2ce5a2] bg-[#ecfdf5]" : "border-gray-200 bg-white hover:border-[#8cead0]"
              }`}
            >
              <div className="flex gap-3">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border-2 font-mono text-[11px] font-bold flex items-center justify-center ${
                    active === f.num ? "bg-[#2ce5a2] border-[#2ce5a2] text-black" : "border-[#2ce5a2] text-[#0ea77a]"
                  }`}
                >
                  {f.num}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-black">{f.title}</strong> {f.body}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0ea77a] mt-3">
        audit exhibit A · the live site, annotated · tap a finding
      </p>
    </div>
  );
}
