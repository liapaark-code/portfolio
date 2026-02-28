import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import ThemeCarousel from "./ThemeCarousel";

export default function SparcCaseStudy() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-clother)] pt-14">

      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-3 bg-white/80 backdrop-blur-md border-b border-[#f0f0f0]">
        <a href="/" className="text-sm font-bold text-[#1D4ED8] tracking-wide hover:opacity-70 transition-opacity">
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
              <span>SPARC</span>
            </Link>
          </div>
        </div>

        {/* ── TITLE + METADATA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-8">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            SPARC Internship
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

        {/* ── HERO BANNER ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-0 border-t border-gray-200 pt-8">
          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/sparc/hero-banner.png"
              alt="SPARC — Reset your expectations"
              width={1200}
              height={520}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* ── THE MISSION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">The Mission</p>
              <h2 className="text-2xl font-semibold text-black">SPARC Status Quo</h2>
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
          <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            QUICK PREVIEW!
          </span>
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

        {/* ── OUTCOME / IMPACT ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Outcome</p>
          <h2 className="text-2xl font-semibold text-black mb-10">Business Impact as a Designer for SPARC</h2>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
            {[
              { stat: "60%", label: "Higher emotional activation", sub: "Among tested athletes" },
              { stat: "40%", label: "Top visual preference", sub: "Cobalt ranked #1 overall" },
              { stat: "33.3%", label: "Perceived trustworthiness", sub: "Rated redesign most credible" },
            ].map((item) => (
              <div key={item.stat} className="flex-1 py-6 sm:py-0 sm:px-10 first:pt-0 sm:first:pt-0 first:pl-0 last:pb-0 sm:last:pb-0">
                <p className="text-5xl font-bold text-[#4169e1] mb-3">{item.stat}</p>
                <p className="text-base font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
            <p className="text-sm font-semibold text-[#4169e1] mb-4">Designer Impact</p>
            <ul className="space-y-3">
              {[
                "Improved feature discoverability and scan speed through a clearer visual hierarchy and color system",
                "Reduced visual friction during quick check-ins by prioritizing high-contrast, system-driven UI patterns",
                "Enabled a scalable design foundation — logo system, color tokens, and UI components — ready for future SPARC features",
                "Strengthened SPARC's external presence with a unified brand identity built for social media, pitch decks, and merch",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4169e1] shrink-0" />
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
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Its Challenges</p>
              <p className="text-base text-black leading-relaxed">
                Limited guidance for how the brand should scale across new features and marketing touchpoints
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
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">The Problem &amp; Opportunity</p>
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
            <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full mb-5">
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
                    <span className="w-7 h-7 rounded-full bg-[#4169e1] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {p.n}
                    </span>
                    <p className="text-sm font-semibold text-[#4169e1]">{p.title}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed text-center">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* So... The Opportunity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-semibold text-[#4169e1]">So... The Opportunity</h3>
            </div>
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                With no cohesive design system guiding the product, we were presented with a design opportunity:{" "}
                <strong className="text-black">how can we build a clear, flexible brand foundation that improves usability across mobile and web while giving SPARC a distinct, performance-driven identity?</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── INTRO TO PART 1, 2, & 3 ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Intro to Part 1, 2, &amp; 3</p>
              <h2 className="text-2xl font-semibold text-black">A Focused and Iterative Visual Experience</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                The most crucial and challenging design task was <strong className="text-black">redefining SPARC&apos;s visual identity inside the app</strong> while keeping existing user flows intact. Because the app is the primary product touchpoint{" "}
                <strong className="text-black">for athletes, every color, layout, and typography decision directly affected daily engagement and trust.</strong>
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
              {/* Staggered part bubbles */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 1</span>
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
                    <p className="text-sm font-bold text-[#4169e1]">Testing color systems across real app screens</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 ml-8">
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
                    <p className="text-sm font-bold text-[#4169e1]">Iterating on UI layouts to improve clarity and consistency</p>
                  </div>
                  <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 2</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-0.5">Part 3</span>
                  <div className="rounded-xl px-4 py-3 flex-1" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
                    <p className="text-sm font-bold text-[#4169e1]">New Brand Design for SPARC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 1: COLOR SYSTEMS BANNER ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-6 border-t border-gray-100">
          <div className="bg-[#e8edff] rounded-full px-8 py-5 flex flex-wrap gap-2 items-center justify-between">
            <p className="text-base font-bold text-[#4169e1] tracking-wide">PART 1: COLOR SYSTEMS</p>
            <a href="#part2" className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
              SKIP TO PART 2
            </a>
          </div>
        </section>

        {/* ── GENERATIVE RESEARCH — Color System Exploration ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            {/* Left: heading + color system image */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Generative Research</p>
              <h2 className="text-2xl font-semibold text-black mb-6">Color System Exploration</h2>
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
                I&apos;ve created <strong className="text-black">60+ app UI variations across six color themes with four finalized ones.</strong>{" "}
                This allowed us to compare how different palettes affected.
              </p>
            </div>
          </div>
        </section>

        {/* ── LEARNING ABOUT COLOR THEORY ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <h2 className="text-2xl font-semibold text-black">Learning about Color Theory</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              SPARC focuses on mental performance, color choices directly affect how athletes feel while reflecting and training in the app. I researched{" "}
              <strong className="text-black">color psychology</strong>{" "}
              to understand how palettes influence emotion and behavior
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-8 items-center">
            {/* Left: red-theme phone (animated) */}
            <div className="flex justify-center">
              <img
                src="/images/sparc/survey-anim.gif"
                alt="Old red-themed SPARC UI"
                className="h-[78vh] w-auto rounded-[2.5rem]"
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
                <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-medium px-4 py-1.5 rounded-full mb-4 -rotate-2">
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-8">
            Finding the Other Color Variations
          </span>
          <ThemeCarousel />
        </section>

        {/* ── SUCCESS METRICS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Success Metrics</p>
              <h2 className="text-2xl font-semibold text-black">Surveying the Audience: The Athletes!</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Athlete testing indicated that <strong className="text-black">Cobalt blue and Dark Green is the strongest visual direction for SPARC</strong>, delivering the highest levels of excitement, preference, and perceived trust.
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
                <p className="text-5xl font-bold text-[#4169e1] mb-2">{m.stat}</p>
                <p className="text-sm font-semibold text-black mb-3">{m.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom line */}
          <div className="border border-[#4169e1] rounded-2xl p-6">
            <p className="text-sm font-semibold text-[#4169e1] mb-2">Bottom Line</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dark Green is currently the leading visual direction, balancing excitement, trust, and usability for SPARC&apos;s athlete audience. Qualitative feedback further reinforced a preference for clean, slightly brighter interfaces that remain calm and professional.
            </p>
          </div>
        </section>

        {/* ── ANALYSIS — Choosing the Right Color ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Analysis</p>
              <h2 className="text-2xl font-semibold text-black">Choosing the Right Color</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Athlete testing indicates that <strong className="text-black">Dark Green is the strongest visual direction for SPARC</strong>, delivering the highest levels of excitement, preference, and perceived trust.
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
            <div className="flex justify-center">
              <img
                src="/images/sparc/dashboard-anim.gif"
                alt="SPARC dashboard with green theme"
                className="h-[78vh] w-auto rounded-[2.5rem]"
              />
            </div>
          </div>
        </section>

        {/* ── TL;DR FINALIZED DESIGN COLORWAY ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#4169e1] mb-4">TL;DR Finalized Design Colorway</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              <strong className="text-black">The dark green system is psychologically better suited for SPARC&apos;s mental training platform.</strong>{" "}
              While red excels at commanding attention and signaling urgency, it contradicts the foundational goal of mental performance training: cultivating a calm, controlled, and reflective state. Green&apos;s associations with balance, stability, and grounded focus create an environment where athletes can regulate emotions, build confidence, and prepare mentally without the added pressure that red inherently communicates.
            </p>
            <blockquote className="border-l-4 border-[#126b40] pl-4 bg-[#f0faf4] rounded-r-xl py-3 pr-4">
              <p className="text-sm text-[#126b40] italic">
                &ldquo;Mental training requires psychological safety and calm—conditions that green naturally supports and red naturally disrupts.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>

        {/* ── PART 2 BANNER ── */}
        <section id="part2" className="max-w-5xl mx-auto px-4 sm:px-8 py-6 border-t border-gray-100">
          <div className="bg-[#e8edff] rounded-full px-8 py-5 flex flex-wrap gap-2 items-center justify-between">
            <p className="text-base font-bold text-[#4169e1] tracking-wide">PART 2: UI DESIGN</p>
            <a href="#part3" className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
              SKIP TO PART 3
            </a>
          </div>
        </section>

        {/* ── PART 2: OVERVIEW ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Overview</p>
              <h2 className="text-2xl font-semibold text-black">The &ldquo;Why?&rdquo; in the Changes</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                I created multiple UI iterations to better visualize and communicate the athlete&apos;s progress. By testing different progress patterns, information density, and visual hierarchies,{" "}
                <strong className="text-black">I aimed to make improvement trends clearer, more motivating, and easier for athletes to track at a glance.</strong>
              </p>
            </div>
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

        {/* ── PART 2: PROBLEM REVIEW ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Problem Review:</p>
            <h2 className="text-2xl font-semibold text-black">The Main Question in UI</h2>
          </div>
          <div className="border border-gray-200 rounded-2xl p-14 text-center">
            <p className="text-lg text-[#4169e1] leading-relaxed font-medium max-w-2xl mx-auto">
              How might we visualize athlete progress so improvements feel clear, motivating,
              and instantly scannable during quick check-ins?
            </p>
          </div>
        </section>

        {/* ── PART 2: TIMELINE ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Timeline</p>
              <h2 className="text-2xl font-semibold text-black">Fast, Test, Refine</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-black">Rapid iteration cycle</strong> across multiple wireframe and visual directions, testing hierarchy, density, and progress treatments.
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
          <div className="mt-8 rounded-2xl p-6" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
            <p className="text-sm font-bold text-gray-600 leading-relaxed">
              <strong className="text-[#4169e1]">OUTCOME:</strong>{" "}
              Improved scan speed and clarity, helping athletes quickly identify priorities and take action.
            </p>
          </div>
        </section>

        {/* ── PART 2: USER NEEDS & DESIGN IMPLICATIONS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">User Needs &amp; Design Implications</p>
              <h2 className="text-2xl font-semibold text-black">Design for Momentum</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Reviewed athlete feedback, scan behavior patterns, and sports performance UI benchmarks. Focus was placed on glanceability, cognitive load, and motivational framing.
              </p>
            </div>
          </div>

          {/* Before → After */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Left: before training UI */}
            <div className="flex-[3] flex justify-center">
              <Image
                src="/images/sparc/training-before.png"
                alt="Before: Areas of Improvement and Suggested for you UI"
                width={900}
                height={900}
                className="h-[55vh] w-auto rounded-[2.5rem]"
              />
            </div>
            {/* Arrow */}
            <div className="shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16h20M20 10l6 6-6 6" stroke="#4169e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Right: final training modules GIF */}
            <div className="flex-[2] relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 right-0 bg-[#e8edff] text-[#4169e1] text-xs font-medium px-4 py-1.5 rounded-full -rotate-6 shadow-sm z-10 whitespace-nowrap">
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
          <div className="mt-8 rounded-2xl p-6" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
            <p className="text-sm font-bold text-gray-600 leading-relaxed">
              <strong className="text-[#4169e1]">OUTCOME:</strong>{" "}
              Increased content discoverability and scan speed, helping athletes quickly find and start the right training module.
            </p>
          </div>
        </section>

        {/* ── PART 2: FINAL SOLUTION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-8">Final Solution</p>
          <div className="border border-gray-200 rounded-2xl p-10">
            <h2 className="text-xl font-semibold text-[#4169e1] mb-5">TL;DR Clarity Drives Confidence</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-black">The refined UI system is better suited for SPARC&apos;s mental training experience because it prioritizes clarity and cognitive ease.</strong>{" "}
              While earlier layouts successfully surfaced data, they introduced unnecessary visual friction that slowed athlete understanding during quick check-ins. By strengthening hierarchy, simplifying progress signals, and reducing cognitive load, the final design creates an environment where athletes can quickly interpret their performance, build confidence in their progress, and move into training with focus rather than hesitation.
            </p>
          </div>
        </section>

        {/* ── PART 3 BANNER ── */}
        <section id="part3" className="max-w-5xl mx-auto px-4 sm:px-8 py-6 border-t border-gray-100">
          <div className="bg-[#e8edff] rounded-full px-8 py-5 flex flex-wrap gap-2 items-center justify-between">
            <p className="text-base font-bold text-[#4169e1] tracking-wide">PART 3: LOGO REBRAND DESIGN</p>
            <a href="#reflection" className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
              SKIP TO REFLECTION
            </a>
          </div>
        </section>

        {/* ── PART 3: BRAND FOUNDATION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Brand Foundation</p>
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
            <div className="flex-1 rounded-2xl p-10 text-right relative" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
              <span className="absolute -top-3.5 right-6 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white" style={{ background: "#4169e1" }}>
                THE SOLUTION
              </span>
              <p className="text-base text-[#4169e1] leading-relaxed">
                I developed a grounded, green-led brand foundation that{" "}
                <strong className="text-[#4169e1]">visually reinforces stability and controlled readiness.</strong>{" "}
                By shifting the identity toward calm authority and structured focus, the{" "}
                <strong className="text-[#4169e1]">SPARC system better supports athletes in regulating emotions, building confidence, and preparing mentally under pressure.</strong>
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Logo Symbol Breakdown</p>
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">02 - Color System</p>
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
              <span className="inline-block bg-[#e8edff] text-[#4169e1] text-xs font-medium px-4 py-1.5 rounded-full mb-4">
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">03 - Typography</p>
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* 2-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">04 - Logo Design Process</p>
              <h2 className="text-2xl font-semibold text-black">From Sketch to Symbol</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                The logo went through four distinct phases — hand sketches, original iterations, spark symbol explorations, and final refinements — before landing on a mark that balances athletic energy with mental clarity.
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
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* FINAL LOGO full-width banner */}
          <div className="w-full bg-[#e8edff] rounded-2xl py-5 flex items-center justify-center mb-10">
            <p className="text-base font-bold text-[#4169e1] tracking-widest">FINAL LOGO</p>
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

        </section>

        {/* ── KEY TAKEAWAYS / REFLECTION ── */}
        <section id="reflection" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">

          {/* Banner */}
          <div className="bg-[#e8edff] rounded-2xl px-8 py-6 flex flex-wrap gap-2 items-center justify-between mb-12">
            <p className="text-base font-bold text-[#4169e1] tracking-wide">KEY TAKEAWAYS/REFLECTION</p>
            <a href="#" className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
              BACK TO THE TOP
            </a>
          </div>

          {/* Section header */}
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Takeaways &amp; Next Steps</p>
            <h2 className="text-2xl font-semibold text-black">What this Whole Client-Work Process Taught Me...</h2>
          </div>

          {/* Key Takeaways card */}
          <div className="border border-gray-200 rounded-2xl p-8 mb-6">
            <p className="text-sm font-semibold text-[#4169e1] mb-5">Key Takeaways</p>
            <ol className="space-y-3">
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="mr-2 text-gray-400">1.</span>
                <strong className="text-black">Consistency builds trust.</strong> Unifying SPARC&apos;s brand and UI immediately made the product feel more credible to athletes.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="mr-2 text-gray-400">2.</span>
                <strong className="text-black">Real feedback beats assumptions.</strong> Testing color and layout decisions with athletes led to stronger, more confident design choices.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="mr-2 text-gray-400">3.</span>
                <strong className="text-black">Communication is part of the craft.</strong> Frequent client check-ins kept the work grounded in real needs and prevented misalignment.
              </li>
            </ol>
          </div>

          {/* Reflection card */}
          <div className="border border-gray-200 rounded-2xl p-8 mb-6">
            <p className="text-sm font-semibold text-[#4169e1] mb-5">Reflection</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              This project marked <strong className="text-gray-700">meaningful growth in how I communicate as a designer</strong>, pushing me to become more confident leading client conversations and clearly framing my design rationale. Through regular check-ins and structured walkthroughs, I <strong className="text-gray-700">learned to translate visual decisions into product and business impact</strong>, ultimately building strong client trust and satisfaction. <strong className="text-gray-700">Moving forward, I aim to continue balancing thoughtful design craft with proactive stakeholder alignment while iterating directly within real product contexts.</strong>
            </p>
          </div>

          {/* Next Steps card */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#4169e1] mb-5">Next Steps</p>
            <ol className="space-y-3">
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="mr-2 text-gray-400">1.</span>
                Apply the validated color system and refined SPARC logo into a <strong className="text-black">full website redesign</strong> as the next phase of the product ecosystem.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="mr-2 text-gray-400">2.</span>
                Translate the mobile-first design system into responsive web patterns to ensure brand consistency across platforms
              </li>
            </ol>
          </div>

        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-end">
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
