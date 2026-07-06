import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import type { ReactNode } from "react";
import ThemeCarousel from "./ThemeCarousel";
import CoverVideo from "../components/CoverVideo";
import ProgressRail, { type RailSection } from "../components/ProgressRail";

const RAIL: RailSection[] = [
  { id: "overview", label: "Overview" },
  {
    id: "part1",
    label: "01 · Color",
    subs: [
      { id: "p1-explore", label: "Exploration" },
      { id: "p1-red", label: "Why red failed" },
      { id: "p1-themes", label: "Theme variations" },
      { id: "p1-testing", label: "Athlete testing" },
      { id: "p1-decision", label: "The decision" },
      { id: "p1-tldr", label: "TL;DR" },
    ],
  },
  {
    id: "part2",
    label: "02 · UI",
    subs: [
      { id: "p2-overview", label: "The why" },
      { id: "p2-iterations", label: "Iterations" },
      { id: "p2-before-after", label: "Before → after" },
      { id: "p2-solution", label: "TL;DR" },
    ],
  },
  {
    id: "part3",
    label: "03 · Brand",
    subs: [
      { id: "p3-foundation", label: "Foundation" },
      { id: "p3-symbols", label: "Logo symbols" },
      { id: "p3-color", label: "Colors" },
      { id: "p3-type", label: "Typography" },
      { id: "p3-process", label: "Process" },
      { id: "p3-final", label: "Final logo" },
    ],
  },
  { id: "reflection", label: "Reflection" },
];

/** Green marker highlight — reserved for the handful of sentences a skimmer must catch. */
const Hl = ({ children }: { children: ReactNode }) => (
  <mark className="bg-[#d9f2e3] text-black px-1 py-0.5 rounded-md box-decoration-clone">{children}</mark>
);

/** Connective hand-off line at the end of a part — carries the story into the next one. */
const Handoff = ({ children }: { children: ReactNode }) => (
  <p className="mt-10 text-base text-gray-500 italic leading-relaxed border-l-2 border-[#126b40] pl-4">{children}</p>
);

/** Full-width dark-green part break — the loudest structural moment on the page. */
const PartBanner = ({ id, num, title, sub, skipHref, skipLabel }: { id: string; num: string; title: string; sub: string; skipHref?: string; skipLabel?: string }) => (
  <section id={id} className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 pb-6 scroll-mt-24">
    <div className="rounded-2xl px-8 sm:px-12 py-10" style={{ background: "linear-gradient(120deg, #eaf2ec 0%, #f0faf4 100%)", border: "1px solid #b8d9be" }}>
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-6xl sm:text-7xl font-black text-[#126b40]/15 leading-none mb-2">{num}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#126b40] tracking-wide">{title}</p>
          <p className="text-sm text-gray-600 mt-2 max-w-xl leading-relaxed">{sub}</p>
        </div>
        {skipHref && (
          <a href={skipHref} className="bg-white border border-[#b8d9be] rounded-full px-5 py-2 text-sm font-medium text-[#126b40] hover:bg-[#f0faf4] hover:border-[#126b40] transition-colors">
            {skipLabel}
          </a>
        )}
      </div>
    </div>
  </section>
);

export default function SparcCaseStudy() {
  return (
    <div id="top" className="min-h-screen bg-white font-[family-name:var(--font-clother)]">

      <main>
        <ProgressRail sections={RAIL} />

        {/* ── BACK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10">
          <Link
            href="/?tab=work"
            className="group inline-flex items-center gap-2 rounded-full border border-[#c3d0ff] bg-[#eef2ff] hover:bg-[#e0e8ff] px-4 py-2 text-sm font-semibold text-[#1D4ED8] transition-colors"
          >
            <span className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            back
          </Link>
        </div>

        {/* ── TITLE + METADATA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-8">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">
            Product Design Internship · SPARC Sports
          </p>
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            Designing calm into a mental-performance platform
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black leading-relaxed">Aug 2025 -<br />Present</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Client</p>
              <p className="text-sm text-black font-medium">Sergiu Celebidachi</p>
              <p className="text-sm text-gray-400 italic">CEO</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm text-black">Lead Product Designer</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Team</p>
              <p className="text-sm text-black">2 Product Designers</p>
            </div>
          </div>
        </section>

        {/* ── HERO — looping cover animation ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-0 border-t border-gray-200 pt-8">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0C0C0C]">
            <CoverVideo
              src="/videos/sparc-cover.mp4"
              poster="/images/sparc/cover-poster.webp"
              label="SPARC — Build mentally stronger teams"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ── THE THREE PROJECTS — jump cards ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-12 pb-4">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-5">Three projects, one system — jump in anywhere</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { href: "#part1", num: "01", title: "Color Systems", desc: "Six palettes tested with athletes — how red lost to dark green." },
              { href: "#part2", num: "02", title: "UI Design", desc: "Four dashboard iterations built for ten-second check-ins." },
              { href: "#part3", num: "03", title: "Logo & Brand", desc: "From star-badge sketches to an athlete in motion." },
            ].map((p) => (
              <a
                key={p.num}
                href={p.href}
                className="group rounded-2xl px-7 py-8 bg-[#eef2ff] border border-[#d0daff] transition-all duration-300 ease-out hover:border-[#1D4ED8] hover:ring-2 hover:ring-[#1D4ED8]/25 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-22px_rgba(30,64,175,0.45)] active:translate-y-0 active:shadow-none"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center shrink-0">{p.num}</span>
                  <p className="text-lg font-bold text-[#1D4ED8] tracking-tight">{p.title}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                <p className="text-sm font-semibold text-[#1D4ED8] mt-5 inline-flex items-center gap-2">
                  Jump to section
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ── THE MISSION ── */}
        <section id="overview" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 mt-6 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Mission</p>
              <h2 className="text-2xl font-semibold text-black">A mental-training startup without a design language</h2>
            </div>
          </div>
          {/* SPARC description card */}
          <div className="border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center">
              <Image src="/images/sparc/sparc-logo-green.png" alt="SPARC logo" width={48} height={48} className="w-10 h-10 object-contain" />
            </div>
            <p className="text-base text-black leading-relaxed">
              SPARC Sports is a Mental Health Sports startup that helps athletes track performance, manage training, and connect with coaches.
            </p>
          </div>
        </section>

        {/* ── QUICK PREVIEW ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Quick Preview</p>
          <h2 className="text-2xl font-semibold text-black mb-8">The redesigned app, at a glance</h2>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <Image
              src="/images/sparc/phones-spread.png"
              alt="SPARC app screens overview"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* ── OUTCOME TEASER — full testing results live in the reflection ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Where it landed</p>
          <h2 className="text-2xl font-semibold text-black mb-10">What the redesign moved: excitement, preference, trust</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { stat: "60%", label: "Most excited to open the app with the new palette", sub: "Highest emotional response of every direction athletes tested" },
              { stat: "40%", label: "Ranked the new direction their overall favorite", sub: "Top visual preference across all tested concepts" },
              { stat: "33%", label: "Rated the redesign the most credible concept tested", sub: "Strongest perceived trust for professional mental training" },
            ].map((item) => (
              <div key={item.stat} className="border border-gray-200 rounded-2xl p-8">
                <p className="text-5xl font-bold text-[#1D4ED8] mb-3">{item.stat}</p>
                <p className="text-sm font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-10">
            Numbers are from athlete concept testing — the full breakdown lives in the{" "}
            <a href="#reflection" className="text-[#1D4ED8] font-medium hover:underline">reflection ↓</a>
          </p>

          <div className="rounded-2xl p-8" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <p className="text-sm font-semibold text-[#126b40] mb-4">Designer Impact</p>
            <ul className="space-y-3">
              {[
                "Increased feature discoverability by introducing a structured visual hierarchy and color system, allowing athletes to navigate reflection tools more efficiently",
                "Reduced cognitive load during quick check-ins through high-contrast UI patterns optimized for fast interactions during training routines",
                "Designed a scalable design system including logo architecture, color tokens, and reusable UI components to support SPARC's future product expansion",
                "Unified SPARC's visual identity across product UI, social media, pitch materials, and merchandise to strengthen brand recognition",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#126b40] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── ITS CHALLENGES ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Its Challenges</p>
              <p className="text-lg text-black leading-relaxed">
                No guidance existed for how the brand should scale — <Hl>every new feature made the product less consistent</Hl>
              </p>
            </div>
            <div>
              <Image
                src="/images/sparc/challenges.png"
                alt="Challenges: Inconsistent Color System → Lacking Hierarchy/Accessibility → Brand Presence"
                width={700}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM & OPPORTUNITY ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Problem &amp; Opportunity</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                How might we create a brand and product experience that athletes trust and enjoy using every day?
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Athletes encountered <strong className="text-black">inconsistent colors, unclear typography, and a brand presence</strong> that felt similar to other sports apps.
              </p>
            </div>
          </div>

          {/* Pain points */}
          <div className="mb-10">
            <span className="inline-block bg-[#e8edff] text-[#1D4ED8] text-xs font-semibold px-3 py-1 rounded-full mb-5">
              PAIN POINTS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { n: "1", title: "Hard to Navigate",  desc: "Inconsistent colors and typography across screens, making the product feel unpolished and hard to trust" },
                { n: "2", title: "Misleading UI/UX",   desc: "UI components that varied between features, creating a fragmented experience for users" },
                { n: "3", title: "Lack of Branding",   desc: "No centralized brand system to guide design decisions or future development" },
              ].map((p) => (
                <div key={p.n} className="rounded-2xl p-6" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {p.n}
                    </span>
                    <p className="text-sm font-semibold text-[#1D4ED8]">{p.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed text-center">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* So... The Opportunity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-semibold text-[#1D4ED8]">So... The Opportunity</h3>
            </div>
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                With no cohesive design system guiding the product, we were presented with a design opportunity:{" "}
                <Hl>build a clear, flexible brand foundation that improves usability while giving SPARC a distinct, performance-driven identity.</Hl>
              </p>
            </div>
          </div>
        </section>

        {/* ── INTRO TO PART 1, 2, & 3 ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Redesign, Mapped</p>
              <h2 className="text-2xl font-semibold text-black">Three workstreams: color, UI, brand</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-base text-gray-600 leading-relaxed">
                The hardest task was <strong className="text-black">redefining SPARC&apos;s visual identity inside the app</strong> while keeping existing user flows intact. The app is athletes&apos; primary touchpoint — every color, layout, and typography decision directly affected daily engagement and trust.
              </p>
            </div>
          </div>

          {/* 2-col: frame-overview image LEFT | parts bubbles RIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src="/images/sparc/frame-overview.png"
                alt="SPARC app screens overview"
                width={700}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Our redesign process had <strong className="text-black">THREE parts</strong> that came together in the end:
              </p>
              {/* Staggered part bubbles — green, matching the part banners they preview */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-[#f0faf4] border border-[#b8d9be] text-[#126b40] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 1</span>
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "linear-gradient(120deg, #eaf2ec 0%, #f0faf4 100%)", border: "1px solid #b8d9be" }}>
                    <p className="text-sm font-bold text-[#126b40]">Testing color systems across real app screens</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 ml-8">
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "linear-gradient(120deg, #eaf2ec 0%, #f0faf4 100%)", border: "1px solid #b8d9be" }}>
                    <p className="text-sm font-bold text-[#126b40]">Iterating on UI layouts to improve clarity and consistency</p>
                  </div>
                  <span className="inline-block bg-[#f0faf4] border border-[#b8d9be] text-[#126b40] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 2</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-[#f0faf4] border border-[#b8d9be] text-[#126b40] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 3</span>
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "linear-gradient(120deg, #eaf2ec 0%, #f0faf4 100%)", border: "1px solid #b8d9be" }}>
                    <p className="text-sm font-bold text-[#126b40]">New Brand Design for SPARC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 1 BREAK ── */}
        <PartBanner
          id="part1"
          num="01"
          title="COLOR SYSTEMS"
          sub="Six palettes, 60+ screens, one athlete survey — how red lost to dark green."
          skipHref="#part2"
          skipLabel="SKIP TO 02 · UI"
        />

        {/* ── GENERATIVE RESEARCH — Color System Exploration ── */}
        <section id="p1-explore" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            {/* Left: heading + color system image */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Generative Research · 60+ Screens · 6 Palettes</p>
              <h2 className="text-2xl font-semibold text-black mb-6">Testing palettes on real screens, not swatches</h2>
              <Image
                src="/images/sparc/brand-2.png"
                alt="Color system versions: Black, Dark Green, Sporty Green, Navy"
                width={700}
                height={900}
                className="w-full h-auto"
              />
            </div>
            {/* Right: text + sticky notes + bottom text */}
            <div className="flex flex-col justify-between pt-8">
              <div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Before finalizing the brand direction, we needed to understand how different color palettes would feel in real usage.
                </p>
                <p className="text-sm text-gray-400 italic mb-6">Aka... A LOT of screen iterations...</p>
                <p className="text-sm text-gray-600 font-medium mb-5">Explored two main options:</p>
                <div className="rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/sparc/color-options.png"
                    alt="Color exploration options: create multiple themes vs finalize one direction"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                I created <strong className="text-black">60+ app UI variations across six color themes</strong>, narrowing to four finalists — so we could compare how each palette affected hierarchy, mood, and trust on the same screens.
              </p>
            </div>
          </div>
        </section>

        {/* ── COLOR PSYCHOLOGY — why red was the wrong signal ── */}
        <section id="p1-red" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <h2 className="text-2xl font-semibold text-black">Why red was working against reflection</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Because SPARC focuses on mental performance, color directly affects how athletes feel while reflecting and training. I researched{" "}
              <strong className="text-black">color psychology</strong>{" "}
              to understand how palettes influence emotion and behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-8 items-center">
            {/* Left: red-theme phone (animated) */}
            <div className="flex flex-col items-center gap-4">
              <span className="self-center bg-white border border-red-300 text-red-500 text-xs font-semibold px-4 py-1.5 rounded-full">
                BEFORE — ORIGINAL RED
              </span>
              <img
                src="/images/sparc/survey-anim.gif"
                alt="Old red-themed SPARC UI"
                className="h-[55vh] w-auto rounded-[2.5rem]"
              />
            </div>
            {/* Right: red impact card + color decision reasonings */}
            <div>
              {/* Red impact card */}
              <div className="border border-red-300 rounded-2xl p-6 mb-8">
                <p className="text-xs font-semibold text-red-500 mb-3">RED IMPACT ON ATHLETES (Original Color Tone)</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-black">Red risks signaling stress or pressure rather than controlled mental preparation.</strong>{" "}
                  The heightened arousal can work against the calm, reflective mindset SPARC aims to cultivate, potentially increasing anxiety during critical moments.
                </p>
              </div>

              {/* Color Decision Reasonings */}
              <div className="relative mb-4">
                <span className="inline-block bg-white border border-red-300 text-red-500 text-xs font-medium px-4 py-1.5 rounded-full mb-4 -rotate-2">
                  Color Decision Reasonings
                </span>
              </div>
              <div className="space-y-5">
                <div className="border-l-2 border-red-300 pl-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Red accents (#831923) in navigation and chart elements create visual urgency. This heightened activation may cause athletes to feel pressured or anxious when reviewing their mental performance data,{" "}
                    <strong className="text-black">working against</strong>{" "}
                    the goal of calm reflection and growth mindset development.
                  </p>
                </div>
                <div className="border-l-2 border-red-300 pl-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Red edit icons (#831923) create tension during reflective journaling. This emotional state{" "}
                    <strong className="text-black">disrupts the vulnerable, introspective mindset required for honest self-assessment and meaningful mental training progress.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THEME CAROUSEL ── */}
        <section id="p1-themes" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Exploration, Continued</p>
          <h2 className="text-2xl font-semibold text-black mb-8">The other contenders, on real screens</h2>
          <ThemeCarousel />
        </section>

        {/* ── SUCCESS METRICS ── */}
        <section id="p1-testing" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Athlete Testing</p>
              <h2 className="text-2xl font-semibold text-black">Cobalt won preference — dark green won the workflow</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-base text-gray-600 leading-relaxed">
                Testing narrowed six themes to two finalists. <strong className="text-black">Cobalt Blue drew the strongest raw preference; Dark Green won on usability and calm</strong> — a tension the data below made us resolve deliberately.
              </p>
            </div>
          </div>

          {/* 2×2 stat grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { stat: "60%",   label: "Emotional Activation", desc: "Of athletes said Cobalt Blue and Dark Green made them most excited to open the app and begin mental training: the highest emotional response across all options tested." },
              { stat: "40%",   label: "Visual Preference",    desc: "Ranked Cobalt Blue as their overall favorite, tying for the top visual preference and reinforcing athlete appeal for clean, brighter interfaces." },
              { stat: "33.3%", label: "Credibility & Trust",  desc: "Of athletes identified Cobalt Blue as the most trustworthy option, demonstrating strong perceived credibility for professional mental training." },
              { stat: "33.3%", label: "Usability",            desc: "Found Dark Green easiest to navigate during quick check-ins, supporting athlete workflows that require speed and clarity under pressure." },
            ].map((m) => (
              <div key={m.label} className="border border-gray-200 rounded-2xl p-8">
                <p className="text-5xl font-bold text-[#1D4ED8] mb-2">{m.stat}</p>
                <p className="text-sm font-semibold text-black mb-3">{m.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom line */}
          <div className="rounded-2xl p-6" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <p className="text-sm font-semibold text-[#126b40] mb-2">Bottom Line</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <Hl>Dark Green became the direction</Hl> — it balances excitement, trust, and usability for SPARC&apos;s athletes, where cobalt&apos;s popularity didn&apos;t survive the quick-check-in workflow. Qualitative feedback reinforced clean, slightly brighter interfaces that stay calm and professional.
            </p>
          </div>
        </section>

        {/* ── ANALYSIS — Choosing the Right Color ── */}
        <section id="p1-decision" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Decision</p>
              <h2 className="text-2xl font-semibold text-black">Dark green: balance over urgency</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-base text-gray-600 leading-relaxed">
                We chose the palette that served the <strong className="text-black">mental-training context</strong> over the crowd favorite: dark green keeps athletes calm while reviewing the exact same data that red made stressful.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
            {/* Left: green card + color reasonings */}
            <div>
              {/* Green impact card */}
              <div className="rounded-2xl p-6 mb-8" style={{ background: "#eaf2ec", border: "1px solid #b8d9be" }}>
                <p className="text-xs font-semibold text-[#1a4a2a] mb-3">GREEN IMPACT ON ATHLETES (New Color Theme)</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-black">Dark green communicates balance and stability</strong>, better aligning with SPARC&apos;s goal of helping athletes regulate emotions, build confidence, and enter training sessions with a composed, performance-ready mindset.
                </p>
              </div>

              {/* Color Decision Reasonings */}
              <div className="mb-4">
                <span className="inline-block bg-[#f0faf4] text-[#126b40] text-xs font-medium px-4 py-1.5 rounded-full mb-5 -rotate-2 inline-block">
                  Color Decision Reasonings
                </span>
              </div>
              <div className="space-y-5">
                <div className="border-l-2 border-[#126b40] pl-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Green accents (#126b40) provide visual grounding while reviewing metrics. Athletes can calmly assess their progress without stress signals, supporting emotional regulation and confidence building:{" "}
                    <strong className="text-black">key to sustainable mental performance improvement.</strong>
                  </p>
                </div>
                <div className="border-l-2 border-[#126b40] pl-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Green selection indicators and checkmarks <strong className="text-black">reinforce positive progress</strong> without urgency. Athletes feel encouraged and focused, entering their training with the centered <strong className="text-black">mindset necessary for peak mental performance.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: dashboard phone (animated) */}
            <div className="flex flex-col items-center gap-4">
              <span className="self-center bg-[#f0faf4] border border-[#b8d9be] text-[#126b40] text-xs font-semibold px-4 py-1.5 rounded-full">
                AFTER — DARK GREEN SYSTEM
              </span>
              <img
                src="/images/sparc/dashboard-anim.gif"
                alt="SPARC dashboard with green theme"
                className="h-[55vh] w-auto rounded-[2.5rem]"
              />
            </div>
          </div>
        </section>

        {/* ── TL;DR — PART 1 TAKEAWAY ── */}
        <section id="p1-tldr" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="rounded-2xl p-8" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <h2 className="text-xl font-semibold text-[#126b40] mb-4">TL;DR — The Colorway Call</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              <strong className="text-black">The dark green system is psychologically better suited to mental training.</strong>{" "}
              Red commands attention and signals urgency — the opposite of the calm, controlled, reflective state SPARC exists to build. Green&apos;s associations with balance and grounded focus let athletes regulate emotions and prepare mentally without added pressure.
            </p>
            <blockquote className="border-l-4 border-[#126b40] pl-4 bg-white/70 rounded-r-xl py-3 pr-4">
              <p className="text-sm text-[#126b40] italic">
                &ldquo;Mental training requires psychological safety and calm — conditions that green naturally supports and red naturally disrupts.&rdquo;
              </p>
            </blockquote>
          </div>
          <Handoff>
            Dark green locked the palette — but a palette can&apos;t fix a dashboard athletes couldn&apos;t scan in ten seconds. Part 2 takes the new system into the UI.
          </Handoff>
        </section>

        {/* ── PART 2 BREAK ── */}
        <PartBanner
          id="part2"
          num="02"
          title="UI DESIGN"
          sub="Four dashboard iterations — making progress scannable in a ten-second check-in."
          skipHref="#part3"
          skipLabel="SKIP TO 03 · BRAND"
        />

        {/* ── PART 2: OVERVIEW ── */}
        <section id="p2-overview" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Overview</p>
              <h2 className="text-2xl font-semibold text-black">Making progress scannable in a ten-second check-in</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-base text-gray-600 leading-relaxed">
                I iterated on progress patterns, information density, and hierarchy with one goal:{" "}
                <Hl>improvement trends athletes can read at a glance</Hl> — mid-training, between points, without thinking.
              </p>
            </div>
          </div>

          {/* The driving question */}
          <div className="border border-gray-200 rounded-2xl p-10 text-center mb-10">
            <p className="text-lg text-[#1D4ED8] leading-relaxed font-medium max-w-2xl mx-auto">
              How might we visualize athlete progress so improvements feel clear, motivating,
              and instantly scannable during quick check-ins?
            </p>
          </div>

          {/* Composite phone comparison image */}
          <Image
            src="/images/sparc/ui-iterations.png"
            alt="Before and after SPARC UI — old dashboard vs new green dashboard with annotations"
            width={1400}
            height={700}
            className="w-full h-auto"
          />
        </section>

        {/* ── PART 2: TIMELINE ── */}
        <section id="p2-iterations" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Iterations</p>
              <h2 className="text-2xl font-semibold text-black">Four rounds: linear bars → a card system</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Each round fixed what the last one taught us: bars surfaced scores but hid priorities → remaining-counts added momentum → insights and bigger numbers added meaning → <strong className="text-black">cards finally made the next action obvious.</strong>
              </p>
            </div>
          </div>
          <Image
            src="/images/sparc/group-1536.png"
            alt="UI iteration process — 4 steps from linear bars to final card system"
            width={1400}
            height={600}
            className="w-full h-auto"
          />
          <div className="mt-8 rounded-2xl p-6" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#126b40]">OUTCOME:</strong>{" "}
              Improved scan speed and clarity, helping athletes quickly identify priorities and take action.
            </p>
          </div>
        </section>

        {/* ── PART 2: USER NEEDS & DESIGN IMPLICATIONS ── */}
        <section id="p2-before-after" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">User Needs &amp; Design Implications</p>
              <h2 className="text-2xl font-semibold text-black">From buried modules to one obvious next action</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Reviewed athlete feedback, scan behavior, and sports-UI benchmarks — then rebuilt the training library around glanceability, lower cognitive load, and motivational framing.
              </p>
            </div>
          </div>

          {/* Before → After */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Left: before training UI */}
            <div className="flex-[3] relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 left-0 bg-white border border-gray-300 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-full rotate-3 shadow-sm z-10 whitespace-nowrap">
                  Before
                </div>
                <Image
                  src="/images/sparc/training-before.png"
                  alt="Before: Areas of Improvement and Suggested for you UI"
                  width={900}
                  height={900}
                  className="h-[55vh] w-auto rounded-[2.5rem]"
                />
              </div>
            </div>
            {/* Arrow */}
            <div className="shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16h20M20 10l6 6-6 6" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Right: final training modules GIF */}
            <div className="flex-[2] relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 right-0 bg-[#e8edff] text-[#1D4ED8] text-xs font-medium px-4 py-1.5 rounded-full -rotate-6 shadow-sm z-10 whitespace-nowrap">
                  Final Iteration!
                </div>
                <img
                  src="/images/sparc/training-anim.gif"
                  alt="Final training modules UI"
                  className="h-[55vh] w-auto rounded-[2.5rem]"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-2xl p-6" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#126b40]">OUTCOME:</strong>{" "}
              Increased content discoverability and scan speed, helping athletes quickly find and start the right training module.
            </p>
          </div>
        </section>

        {/* ── TL;DR — PART 2 TAKEAWAY ── */}
        <section id="p2-solution" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="rounded-2xl p-8" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <h2 className="text-xl font-semibold text-[#126b40] mb-4">TL;DR — Clarity Drives Confidence</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-black">The refined UI prioritizes clarity and cognitive ease.</strong>{" "}
              Earlier layouts surfaced the data but added visual friction during quick check-ins. Stronger hierarchy and simpler progress signals let athletes interpret performance fast, trust their progress, and move into training with focus instead of hesitation.
            </p>
          </div>
          <Handoff>
            With color and UI speaking the same language, one gap remained: a logo that still said &ldquo;energy&rdquo; when the product now said &ldquo;control.&rdquo; Part 3 rebuilds the mark itself.
          </Handoff>
        </section>

        {/* ── PART 3 BREAK ── */}
        <PartBanner
          id="part3"
          num="03"
          title="LOGO & BRAND REBRAND"
          sub="From star-badge sketches to an athlete in motion — an identity that trains calm."
          skipHref="#reflection"
          skipLabel="SKIP TO REFLECTION"
        />

        {/* ── PART 3: BRAND FOUNDATION ── */}
        <section id="p3-foundation" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">3.1 · Brand Foundation</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                &ldquo;Mental strength isn&apos;t a mindset. It&apos;s a system.&rdquo;
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                SPARC positions mental performance as a structured, trainable discipline rather than an abstract concept. The brand balances athletic intensity with psychological control, creating a visual language that feels focused, grounded, and performance-driven.
              </p>
            </div>
          </div>

          {/* THE PROBLEM — old logo left, card right */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="shrink-0">
              <Image
                src="/images/sparc/logo-old.png"
                alt="Old SPARC logo"
                width={160}
                height={160}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 border border-gray-200 rounded-2xl p-8 relative">
              <span className="absolute -top-3.5 left-6 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 tracking-wide">
                THE PROBLEM
              </span>
              <p className="text-base text-gray-700 leading-relaxed">
                Mental performance tools often rely on high-intensity visual languages that emphasize urgency over control. This creates a mismatch with SPARC&apos;s goal of helping athletes enter a calm, focused, and reflective state before performance.
              </p>
            </div>
          </div>

          {/* THE SOLUTION — card left, new logo right */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 rounded-2xl p-10 text-right relative" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
              <span className="absolute -top-3.5 right-6 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white" style={{ background: "#126b40" }}>
                THE SOLUTION
              </span>
              <p className="text-base text-[#126b40] leading-relaxed">
                I developed a grounded, green-led brand foundation that{" "}
                <strong>visually reinforces stability and controlled readiness</strong> — shifting the identity toward calm authority so the system supports athletes in regulating emotions and preparing mentally under pressure.
              </p>
            </div>
            <div className="shrink-0">
              <Image
                src="/images/sparc/logo-new.png"
                alt="New SPARC logo"
                width={160}
                height={160}
                className="rounded-full"
              />
            </div>
          </div>

        </section>

        {/* ── PART 3: LOGO SYMBOL BREAKDOWN ── */}
        <section id="p3-symbols" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">3.2 · Logo Symbol Breakdown</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                Every Element Has a Purpose
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                The SPARC logo system is built from five distinct symbolic elements, each rooted in the brand&apos;s core values of mental strength, athletic readiness, and performance focus.
              </p>
            </div>
          </div>
          <Image
            src="/images/sparc/logo-symbols.png"
            alt="SPARC logo symbol breakdown — The Athlete, Spark, S Form, Performance Pulse, Movement"
            width={1400}
            height={700}
            className="w-full h-auto"
          />
        </section>

        {/* ── PART 3: COLOR SYSTEM + LOGO VARIATIONS ── */}
        <section id="p3-color" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">3.3 · Color System</p>
              <h2 className="text-2xl font-semibold text-black">Calm Under Pressure</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                A grounded green-led palette reinforces emotional control and focus while reserving bright accents for moments of action.
              </p>
            </div>
          </div>

          {/* COLORS image + Color Rationale side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h3 className="text-3xl font-black text-black tracking-tight mb-6">COLORS</h3>
              <Image
                src="/images/sparc/brand-colors.png"
                alt="SPARC brand colors — Black, Forest Green, Olive Green, CTA Green, Light Gray"
                width={900}
                height={700}
                className="w-full h-auto"
              />
            </div>
            <div className="pt-20">
              <span className="inline-block bg-[#f0faf4] border border-[#b8d9be] text-[#126b40] text-xs font-medium px-4 py-1.5 rounded-full mb-4">
                Color Rationale
              </span>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Dark green reinforces balance, stability, and grounded focus — key emotional states for mental performance training. Bright CTA green is used sparingly to signal moments of action without introducing stress-inducing urgency.
              </p>
              <p className="text-sm text-gray-600">Direct application on logos:</p>
            </div>
          </div>

          <Image
            src="/images/sparc/logo-variations.png"
            alt="SPARC logo variations — dark green, olive green, and black on colored and white backgrounds"
            width={1400}
            height={900}
            className="w-full h-auto"
          />

        </section>

        {/* ── PART 3: TYPOGRAPHY ── */}
        <section id="p3-type" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">3.4 · Typography</p>
              <h2 className="text-2xl font-semibold text-black">Strength Meets Clarity</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                GOODTIMES delivers athletic impact in headlines while NIMBUS SANS ensures high legibility and scalability across the product experience.
              </p>
            </div>
          </div>

          {/* Typography specimen image */}
          <Image
            src="/images/sparc/typography.png"
            alt="SPARC typography — Goodtimes headline font and Nimbus Sans copy font"
            width={1400}
            height={800}
            className="w-full h-auto"
          />

        </section>

        {/* ── PART 3: LOGO DESIGN PROCESS ── */}
        <section id="p3-process" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">3.5 · Logo Design Process</p>
              <h2 className="text-2xl font-semibold text-black">Two directions died before the athlete emerged</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Four phases — sketches, monogram iterations, spark explorations, final refinements. The star-topped monogram read like a <strong className="text-black">sports-badge trophy</strong>, and the literal four-point spark read as generic energy. <Hl>The final mark keeps the spark&apos;s momentum but carries it in an athlete&apos;s form</Hl> — movement with control.
              </p>
            </div>
          </div>

          {/* Logo process 2×2 grid image */}
          <Image
            src="/images/sparc/logo-process.png"
            alt="SPARC logo design process — sketches, original iterations, spark iterations, final iterations"
            width={1400}
            height={1100}
            className="w-full h-auto"
          />

        </section>

        {/* ── PART 3: FINAL LOGO ── */}
        <section id="p3-final" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 scroll-mt-24">

          {/* FINAL LOGO full-width banner — same family as the part banners */}
          <div className="w-full rounded-2xl py-5 flex items-center justify-center mb-10" style={{ background: "linear-gradient(120deg, #eaf2ec 0%, #f0faf4 100%)", border: "1px solid #b8d9be" }}>
            <p className="text-base font-bold text-[#126b40] tracking-widest">FINAL LOGO</p>
          </div>

          {/* Logo specs — Primary, Secondary, Emblem */}
          <Image
            src="/images/sparc/logo-final.png"
            alt="SPARC final logo specs — Primary Logo, Secondary Logo, and Emblem with grid guidelines"
            width={1400}
            height={700}
            className="w-full h-auto mb-10"
          />

          {/* Grid banner */}
          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/sparc/logo-final-banner.png"
              alt="Final Logo grid background"
              width={1400}
              height={120}
              className="w-full h-auto"
            />
          </div>

          {/* TL;DR — Part 3 takeaway */}
          <div className="rounded-2xl p-8 mt-10" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <h2 className="text-xl font-semibold text-[#126b40] mb-4">TL;DR — An Identity That Trains Calm</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-black">The rebrand gives SPARC one visual language across product, pitch, and merch.</strong>{" "}
              An athlete-form mark, a grounded green palette, and a two-font system now say the same thing the app does: controlled readiness — not urgency.
            </p>
          </div>

        </section>

        {/* ── REFLECTION BREAK ── */}
        <PartBanner
          id="reflection"
          num="04"
          title="RESULTS & REFLECTION"
          sub="What athlete testing showed, and what SPARC taught me about designing across systems."
          skipHref="#top"
          skipLabel="BACK TO TOP"
        />

        {/* ── KEY TAKEAWAYS / REFLECTION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16">

          {/* Success Metrics */}
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Testing Results</p>
            <h2 className="text-2xl font-semibold text-black mb-8">How athletes rated the redesign</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { stat: "60%", label: "Most excited to open the app with the new palette", desc: "The redesigned direction drew the strongest emotional response of every concept athletes tested." },
                { stat: "40%", label: "Ranked it their overall favorite", desc: "Top visual preference across all tested directions — the Dark Green system was selected as the product identity." },
                { stat: "33%", label: "Rated it the most credible concept", desc: "Athletes judged the redesigned interface the most trustworthy option for professional mental training." },
              ].map((m) => (
                <div key={m.stat} className="border border-gray-200 rounded-2xl p-8">
                  <p className="text-5xl font-bold text-[#1D4ED8] mb-2">{m.stat}</p>
                  <p className="text-sm font-semibold text-black mb-3">{m.label}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">From athlete concept testing across the finalist color systems.</p>
          </div>

          {/* Section header */}
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Takeaways &amp; Reflection</p>
            <h2 className="text-2xl font-semibold text-black">What working on SPARC taught me about designing across systems</h2>
          </div>

          {/* Reflection card — green takeaway family */}
          <div className="rounded-2xl" style={{ background: "#f0faf4", border: "1px solid #b8d9be" }}>
            <div className="rounded-2xl px-10 py-10 space-y-8">
              {[
                {
                  title: "Brand and product should speak the same language",
                  body: "Working on SPARC showed me how closely brand identity and product design are connected. Translating the brand into color, typography, and UI patterns helped create a more cohesive experience for athletes across the platform. It reinforced that brand is not just marketing — it actively shapes how a product feels and functions.",
                },
                {
                  title: "Color is a functional design tool",
                  body: "Testing favored cobalt on pure preference, but dark green served the mental-training context better — and choosing function over popularity was the real lesson. The final green system established stronger hierarchy, faster scanability, and a calmer emotional tone. This project shifted how I think about color: not visual style, but a tool that guides attention and behavior.",
                },
                {
                  title: "Designing systems, not just screens",
                  body: "From UI patterns to brand assets, this project pushed me to think beyond individual screens and toward building a scalable design system. As SPARC continues to grow, the foundation now supports future product expansion — including the upcoming website redesign.\n\nMore importantly, this project shifted my perspective from designing isolated visuals to designing connected systems where brand, interface, and product strategy evolve together.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-[#126b40] font-semibold shrink-0 text-sm pt-0.5">{i + 1}.</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-2">{item.title}</p>
                    {item.body.split("\n\n").map((para, j) => (
                      <p key={j} className="text-sm text-gray-600 leading-relaxed mb-2 last:mb-0">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-between">
          <a
            href="/amc"
            className="group flex items-center gap-3 text-sm font-medium text-[#1D4ED8] hover:opacity-70 transition-opacity"
          >
            <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span>
            view previous work
          </a>
          <a
            href="/copilot"
            className="group flex items-center gap-3 text-sm font-medium text-[#1D4ED8] hover:opacity-70 transition-opacity"
          >
            view next work
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* ── FOOTER ── */}
        <Footer />

      </main>
    </div>
  );
}
