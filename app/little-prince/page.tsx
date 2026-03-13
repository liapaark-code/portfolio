"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
// Label:   text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1]
// Heading: text-2xl font-semibold text-black
// Body:    text-sm text-gray-600 leading-relaxed
// Layout:  max-w-5xl, py-16, border-t border-gray-100
// Cards:   bg-[#f0f4ff] rounded-2xl   |   border border-[#d0daff] rounded-2xl
// Accent:  #4169e1
// ─────────────────────────────────────────────────────────────────────────────

function Section({ label, heading, children, fullWidth = false }: {
  label: string;
  heading?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  if (fullWidth) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{label}</p>
        {heading && <h2 className="text-2xl font-semibold text-black mb-10">{heading}</h2>}
        {children}
      </section>
    );
  }
  if (heading) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{label}</p>
            <h2 className="text-2xl font-semibold text-black">{heading}</h2>
          </div>
          <div className="pt-8">
            {children}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
      <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{label}</p>
      {children}
    </section>
  );
}

export default function LittlePrinceCaseStudy() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRows, setActiveRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setActiveRows((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(i);
            else next.delete(i);
            return next;
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-clother)] pt-14">

      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-3 bg-white/80 backdrop-blur-md border-b border-[#f0f0f0]">
        <a href="/" className="text-base font-bold text-[#1D4ED8] tracking-wide hover:opacity-70 transition-opacity">
          lydia park
        </a>
      </nav>

      <main>

        {/* ── BREADCRUMB ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8">
          <div className="flex items-end border-b border-[#e5e5e7]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors border border-[#e5e5e7] border-b-0 rounded-t-lg px-4 py-1.5 text-xs text-[#6e6e73] mb-[-1px]"
            >
              <span className="text-[#1D4ED8] font-medium">(work)</span>
              <span className="text-[#c0c0c0]">›</span>
              <span>Le Petite Route</span>
            </Link>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-16">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            Le Petite Route: Location Based App Project
          </h1>

          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 pb-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black">March 2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Project</p>
              <p className="text-sm text-black">Site App</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Duration</p>
              <p className="text-sm text-black">5 Weeks</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tools</p>
              <p className="text-sm text-black">Figma, Photoshop, Procreate</p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-2 mb-10" />

          {/* Hero image */}
          <div className="w-full rounded-[20px] overflow-hidden">
            <Image
              src="/images/little-prince/hero.png"
              alt="Le Petite Route app mockup"
              width={1200}
              height={525}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <Section label="Overview">
          <div className="bg-[#f0f4ff] border border-[#d0daff] rounded-2xl p-8">
            <p className="text-base text-black leading-relaxed">
              Le Petite Route (The Little Journey) is a storytelling app that guides visitors through seven themed spots in Gamcheon Culture Village, each inspired by one of the planets from The Little Prince.
            </p>
          </div>
        </Section>

        {/* ── OUTCOME / IMPACT ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Outcome</p>
          <h2 className="text-2xl font-semibold text-black mb-10">Impact as a Designer for Le Petite Route</h2>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
            {[
              { stat: "100+",    label: "Visitors drawn to the location",   sub: "App designed to boost tourism to Gamcheon Village" },
              { stat: "5 wks",   label: "Full app designed & delivered",    sub: "From wireframes to final screens" },
              { stat: "2 rounds", label: "User testing iterations",         sub: "Directly shaped the final navigation" },
            ].map((item) => (
              <div key={item.stat} className="flex-1 py-6 sm:py-0 sm:px-10 first:pt-0 sm:first:pt-0 first:pl-0 last:pb-0 sm:last:pb-0">
                <p className="text-5xl font-bold text-[#4169e1] mb-3">{item.stat}</p>
                <p className="text-base font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#f0f4ff] border border-[#d0daff] rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#4169e1] mb-4">Designer Impact</p>
            <ul className="space-y-3">
              {[
                "Designed a location-based storytelling experience mapping 7 real village sites to The Little Prince narrative — blending literature, art, and technology",
                "Improved user navigation by adding a structured homepage and entry flow after user testing revealed visitors were skipping the intended story path",
                "Created a complete visual identity including a custom crown character logo, Poppins + ink typography pairing, and storybook color system",
                "Delivered all 4 core app flows — loading screen, home, planet selection, and village guide — within a 5-week design sprint",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4169e1] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── THE GOALS ── */}
        <Section label="The Goals" heading="Design Objectives" fullWidth>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tag: "Interactive",  title: "Mobile Guide",       desc: "A mobile guide connecting village history, culture, and The Little Prince." },
              { tag: "Engagement",   title: "Visitor Engagement", desc: "Visitor engagement through storytelling, location-based content, and achievement systems." },
              { tag: "Conceptual",   title: "Tour Experience",    desc: "A tour experience blending literature, art, and technology into a reimagined travel guide." },
            ].map((c) => (
              <div key={c.title} className="bg-[#f0f4ff] rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{c.tag}</p>
                <p className="text-sm font-semibold text-black mb-2">{c.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── DESIGN DEVELOPMENT ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Design Development</p>
              <h2 className="text-2xl font-semibold text-black">Wireframing &amp; Sketching</h2>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-600 leading-relaxed">
                Iterative wireframing shaped the app&apos;s content architecture and visual flow, testing different layouts to refine how users navigate the story experience.
              </p>
            </div>
          </div>

          <div className="w-full rounded-[20px] overflow-hidden border border-gray-100 mb-3">
            <Image
              src="/images/little-prince/sketches.png"
              alt="Hand-drawn wireframe sketches"
              width={1200}
              height={600}
              className="w-full h-auto"
              style={{ maxHeight: "85vh", objectFit: "contain", borderRadius: "20px" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center">This helped me organize the app&apos;s flow and translate my nighttime digital wireframes</p>
        </section>

        {/* ── ITERATIONS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Iterations</p>
              <h2 className="text-2xl font-semibold text-black">Digital Wireframes</h2>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-600 leading-relaxed">
                Refined the most promising design direction and developed more complete digital wireframes, continuously iterating to improve layout, flow, and usability.
              </p>
            </div>
          </div>
          <div className="w-full rounded-[20px] overflow-hidden border border-gray-100">
            <Image
              src="/images/little-prince/wireframes-1.png"
              alt="Wireframe iteration 1"
              width={1200}
              height={700}
              className="w-full h-auto"
              style={{ maxHeight: "85vh", objectFit: "contain", borderRadius: "20px" }}
            />
          </div>
        </section>

        {/* ── USER TESTING ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* Header */}
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">User Testing</p>
          <h2 className="text-2xl font-semibold text-black mb-4">Insights from Testing</h2>
          <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Refining Through Feedback
          </span>

          {/* Intro */}
          <p className="text-sm text-gray-700 leading-relaxed mb-12">
            Through user testing, I discovered a key gap in my app&apos;s flow: users were skipping directly into individual planets without understanding the broader structure.
          </p>

          {/* Quote cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">

            {/* User 1 — pill overlaps top-left */}
            <div className="relative pt-5">
              <div className="absolute top-0 left-3 z-10">
                <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full" style={{ transform: "rotate(-4deg)" }}>
                  User 1
                </span>
              </div>
              <div className="bg-[#f0f4ff] rounded-2xl p-6 pt-8">
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  &ldquo;It would help if there was a main page that showed all the planets first, so I could understand the overall structure.&rdquo;
                </p>
              </div>
            </div>

            {/* User 2 — pill overlaps bottom-right */}
            <div className="relative pt-5 pb-5">
              <div className="bg-[#f0f4ff] rounded-2xl p-6 pb-8">
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  &ldquo;I wasn&apos;t sure where to start&hellip; I clicked into a planet right away and missed what the app was actually about.&rdquo;
                </p>
              </div>
              <div className="absolute bottom-0 right-4 z-10">
                <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full" style={{ transform: "rotate(3deg)" }}>
                  User 2
                </span>
              </div>
            </div>

          </div>

          {/* Bottom: Problem / Insight / Solution + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">

            {/* Left: stacked labels + body */}
            <div className="space-y-7">
              <div>
                <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Problem Identified:
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  During testing, I found that users were skipping the discovery process and entering individual planets directly, missing the intended narrative flow.
                </p>
              </div>
              <div>
                <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Insight:
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The app lacked core entry pages that oriented users and structured their journey through the story.
                </p>
              </div>
              <div>
                <span className="inline-block bg-[#f0f4ff] border border-[#d0daff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Solution:
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I added a homepage and main navigation system to establish hierarchy, helping users explore planets in context and follow a more intuitive progression.
                </p>
              </div>
            </div>

            {/* Right: phone gif — same size as Final Designs gifs */}
            <div className="flex justify-center">
              <div
                className="rounded-[20px] overflow-hidden"
                style={{ height: "75vh", aspectRatio: "886 / 1920" }}
              >
                <video
                  src="/images/little-prince/recording-1.mp4"
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── DESIGNING WITH CHARACTER ── */}
        <Section label="Designing with Character" heading="Brand &amp; Visual Identity" fullWidth>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            The visual identity was developed through hand-drawn sketches and digital iterations, exploring how the iconic Little Prince crown character could anchor the brand.
          </p>

          <div className="flex flex-col gap-6">
            <div className="w-full rounded-[20px] overflow-hidden border border-gray-100">
              <Image
                src="/images/little-prince/logo-sketches.png"
                alt="Logo character iterations"
                width={1200}
                height={600}
                className="w-full h-auto"
                style={{ maxHeight: "85vh", objectFit: "contain", borderRadius: "20px" }}
              />
            </div>

            {/* Typography label + description — between the two images */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-2">Typography, Brand &amp; Logo</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                I chose Poppins for its clean, approachable clarity and playful ink for a storybook tone to the app.
              </p>
            </div>

            <div className="w-full rounded-[20px] overflow-hidden border border-gray-100">
              <Image
                src="/images/little-prince/brand-typography.png"
                alt="Typography and color palette"
                width={1200}
                height={600}
                className="w-full h-auto"
                style={{ maxHeight: "85vh", objectFit: "contain", borderRadius: "20px" }}
              />
            </div>
          </div>
        </Section>

        {/* ── FINAL DESIGNS ── */}
        <Section label="Final Designs" heading="Final Screens" fullWidth>
          <div className="flex flex-col gap-6">

            {/* Hero mockup image */}
            <div className="w-full rounded-[20px] overflow-hidden border border-gray-100">
              <Image
                src="/images/little-prince/final-screens.png"
                alt="Final app screens mockup"
                width={1200}
                height={700}
                className="w-full h-auto"
                style={{ maxHeight: "85vh", objectFit: "contain", borderRadius: "20px" }}
              />
            </div>

            {/* ── Alternating gif + description rows ── */}
            {[
              {
                src:     "/images/little-prince/app-loadingscreen.mp4",
                label:   "Loading Screen",
                desc:    "The app opens with a splash animation introducing Le Petite Route — setting the storybook tone before the journey begins.",
                align:   "left",
              },
              {
                src:     "/images/little-prince/app-homescreen.mp4",
                label:   "Home Screen",
                desc:    "Users land on a welcome screen that orients them to Gamcheon Village and lets them choose between a guided story path or free exploration.",
                align:   "right",
              },
              {
                src:     "/images/little-prince/recording-1.mp4",
                label:   "Planet Selection",
                desc:    "The seven planets from The Little Prince are each mapped to a real village location. Users select a planet to begin its story chapter.",
                align:   "left",
              },
              {
                src:     "/images/little-prince/recording-2.mp4",
                label:   "Village Guide",
                desc:    "Each location unlocks a narrative, photo spots, and achievement badges — blending literature, art, and real-world exploration.",
                align:   "right",
              },
            ].map((v, i) => (
              <div
                key={v.src}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`flex flex-col gap-6 sm:items-center sm:gap-10 ${v.align === "right" ? "sm:flex-row-reverse" : "sm:flex-row"}`}
              >
                {/* Video */}
                <div
                  className="rounded-[20px] overflow-hidden shrink-0"
                  style={{ height: "75vh", aspectRatio: "886 / 1920" }}
                >
                  <video
                    src={v.src}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "20px" }}
                  />
                </div>

                {/* Description — highlights when scrolled into view */}
                <div
                  className="flex-1 rounded-[20px] p-6 transition-colors duration-[1500ms]"
                  style={{ backgroundColor: activeRows.has(i) ? "#f0f4ff" : "transparent" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-3">{v.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </Section>

        {/* ── TAKEAWAYS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Takeaways</p>
          <h2 className="text-2xl font-semibold text-black mb-10">
            What this project taught me about design and storytelling
          </h2>

          <div className="border border-[#4169e1] rounded-2xl px-10 py-10">
              <ol className="space-y-6">
                {[
                  {
                    title: "Iterate through testing",
                    body: "User testing helped me uncover issues where my design layout charts or inconsistency in spacing feedback — refined my design process and improved the overall flow to create a smoother user experience.",
                  },
                  {
                    title: "Visualization",
                    body: "Creating low-fidelity wireframes allowed me to visualize my ideas early on, prioritize core functions, and establish a strong foundation for the app\u2019s overall design flow.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-gray-300 shrink-0 font-medium text-sm">{i + 1}.</span>
                    <div>
                      <p className="text-sm font-bold text-[#4169e1] mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
          </div>
        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-between">
          <a
            href="/copilot"
            className="group flex items-center gap-3 text-sm font-medium text-[#1D4ED8] hover:opacity-70 transition-opacity"
          >
            <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span>
            view previous work
          </a>
          <a
            href="/amc"
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
