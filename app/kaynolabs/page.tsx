import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import CoverVideo from "../components/CoverVideo";
import ProgressRail, { type RailSection } from "../components/ProgressRail";
import BeforeAfter from "./BeforeAfter";
import AuditExhibit from "./AuditExhibit";
import LiveDemo from "./LiveDemo";
import NdaGate from "./NdaGate";

const RAIL: RailSection[] = [
  {
    id: "overview",
    label: "The Brief",
    subs: [
      { id: "outcome", label: "Outcome" },
      { id: "problem", label: "The problem" },
      { id: "process", label: "Iterations" },
    ],
  },
  {
    id: "homepage",
    label: "Homepage",
    subs: [
      { id: "h-answer", label: "Show the answer" },
      { id: "h-metaphor", label: "Audit the message" },
      { id: "h-story", label: "Argue, don't state" },
      { id: "h-connectors", label: "Surface the moat" },
      { id: "h-connect", label: "Connect it once" },
      { id: "h-act", label: "Show the leash" },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence Page",
    subs: [
      { id: "i-header", label: "Tool, not landing page" },
      { id: "i-card", label: "Card anatomy" },
      { id: "i-craft", label: "Craft as arithmetic" },
    ],
  },
  { id: "decisions", label: "Design decisions" },
  { id: "reflection", label: "Reflection" },
];

/** Brand-blue keyword highlight - used sparingly for the words that carry the argument. */
function Hl({ children }: { children: React.ReactNode }) {
  return <span className="bg-[#e8edff] text-[#1D4ED8] font-medium px-1 rounded">{children}</span>;
}

/** Minimal browser chrome around desktop screenshots - the case study is about a website, so the frame says so. */
function BrowserFrame({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.1rem] overflow-hidden border border-gray-200 bg-[#0b0d13] shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e1017] border-b border-[#1b1f2c]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4e]" />
        {label && <span className="ml-3 font-mono text-[10px] tracking-wide text-[#8b93a7] bg-[#151826] border border-[#232838] rounded-md px-2.5 py-0.5">{label}</span>}
      </div>
      {children}
    </div>
  );
}

export default function KaynoLabsCaseStudy() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-clother)]">

      <main>

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
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4 [text-wrap:balance]">
            Earning a B2B buyer&rsquo;s trust in the first scroll, before a single logo exists to prove it
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black leading-relaxed">June &ndash; July 2026</p>
              <p className="text-sm text-gray-400 italic">Summer Internship</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Context</p>
              <p className="text-sm text-black font-medium">Kayno Labs</p>
              <p className="text-sm text-gray-400 italic">via Skandalaris Design Agency</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Team</p>
              <p className="text-sm text-black">Lead Product Designer</p>
              <p className="text-sm text-gray-400 italic">Kaynolabs founder · Engineering team</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tools</p>
              <p className="text-sm text-black">Figma, Claude Code, HTML/CSS/JS</p>
              <p className="text-xs text-gray-400 mt-3 mb-1">Skills</p>
              <p className="text-sm text-black">Web design, copy strategy, competitive audit, prototyping</p>
            </div>
          </div>
        </section>


        {/* ── TL;DR ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 pb-8">
          <div className="rounded-2xl px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6" style={{ background: "var(--card-blue)", border: "1px solid rgba(195, 208, 255, 0.4)" }}>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1D4ED8] shrink-0">TL;DR</span>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              Redesigned and shipped Douglass&rsquo;s homepage and Intelligence surface in weekly loops with
              Kayno&rsquo;s founder and engineer: <strong className="text-black">60% less copy, receipts on every
              claim, one system from promise to product.</strong>
            </p>
          </div>
        </section>

        {/* ── HERO - looping cover animation ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-0 border-t border-gray-200 pt-8">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#07080c]">
            <CoverVideo
              src="/videos/kaynolabs-cover.mp4"
              poster="/images/kaynolabs/cover-poster.webp"
              label="Douglass homepage in a browser window, with the answer card, agent draft, and connector pills floating around it"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ── THE BRIEF ── */}
        <section id="overview" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 mt-6 scroll-mt-24">
          <div className="rounded-[2rem] px-8 py-12 sm:px-14 sm:py-14 text-center" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-5">The Brief</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black leading-snug [text-wrap:balance]">
              How might we help B2B buyers{" "}
              <span className="hl-hover">trust an AI with their company&rsquo;s most sensitive data<span className="hl-tip">it reads your CRM, email, and files</span></span>{" "}
              within the{" "}
              <span className="hl-hover">first moments<span className="hl-tip">before they bounce</span></span> of landing on the product
              page, before{" "}
              <span className="hl-hover">social proof<span className="hl-tip">pre-launch: zero logos or testimonials</span></span>{" "}
              exists?
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mt-6">
              Kayno Labs was launching <strong className="text-black">Douglass</strong>, an AI that reads a company&rsquo;s
              tools and answers questions with sources. My brief: redesign the homepage and design the Intelligence
              page. Our answer: <strong className="text-black">an AI asked to be trusted must show its receipts, on
              every surface.</strong>
            </p>
          </div>
        </section>

        {/* ── LOCKED (NDA) ── everything from Outcome onward ── */}
        <NdaGate rail={<ProgressRail sections={RAIL} />} password="bunny">

        {/* ── OUTCOME ── */}
        <section id="outcome" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Outcome</p>
          <h2 className="text-2xl font-semibold text-black mb-4">What the redesign moved: fewer words, more proof</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-xl mb-10">
            Every change below carries a number. The redesign started as an audit: word counts, headline counts,
            repetition maps, <Hl>benchmarked against the two clearest B2B sites in the space</Hl>.
          </p>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {[
              { stat: "0 → 1", label: "Sourced answers above the fold", sub: "The differentiator, previously never rendered" },
              { stat: "−56%", label: "Homepage copy", sub: "870 → 380 words, same page length" },
              { stat: "24", label: "Integrations made visible", sub: "From one FAQ sentence to a dedicated section" },
            ].map((item) => (
              <div key={item.stat} className="flex-1 py-6 sm:py-0 sm:px-10 first:pt-0 sm:first:pt-0 first:pl-0 last:pb-0 sm:last:pb-0">
                <p className="text-5xl font-bold text-[#1D4ED8] mb-3">{item.stat}</p>
                <p className="text-base font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 mt-10">
            instrumented for launch · demo CTR · scroll depth to connectors · ask-bar engagement
          </p>
        </section>

        {/* ── THE PROBLEM ── */}
        <section id="problem" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Problem</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                A homepage that asked for trust and offered vibes
              </h2>
            </div>
            <div className="flex flex-col items-start pt-8 gap-6">
              <p className="text-[15px] text-gray-600 leading-relaxed">
                The live site called Douglass <Hl>&ldquo;your new decision-making partner&rdquo;</Hl>, and never
                showed a single answer. Abstract star graphics, an empty ask bar, zero named integrations, zero social
                proof. The page asked visitors to hand an AI their CRM and email, <Hl>on vibes alone</Hl>.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Auditing my own v3 against Lemma and Corgi exposed the deeper tell: the page explained itself{" "}
                <strong className="text-black">six times</strong> because it wasn&rsquo;t sure you believed it the
                first time. Confident pages say each thing once.
              </p>
            </div>
          </div>

          <BrowserFrame label="kaynolabs.ai (before)">
            <CoverVideo
              src="/videos/kayno-homepage-before.mp4"
              poster="/images/kaynolabs/before-loop-poster.webp"
              label="Screen recording: scrolling the original kaynolabs.ai homepage, top to bottom"
              className="w-full h-auto"
            />
          </BrowserFrame>

          {/* Six metaphors - typographic evidence */}
          <div className="mt-12 rounded-2xl border border-gray-200 px-8 py-10 sm:px-12">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-gray-400 mb-6">Exhibit: six ways the old page said the same thing</p>
            <div className="space-y-3">
              {[
                { text: "“…in one brain you can just ask.”", kept: true },
                { text: "“…builds a living model of how your business operates.”", kept: false },
                { text: "“…slowly builds a memory of how your company runs.”", kept: false },
                { text: "“…become a shared memory Douglass can draw on.”", kept: false },
                { text: "“Douglass builds a private model of your business.”", kept: false },
                { text: "“The one place your company remembers everything.”", kept: false },
              ].map((m) => (
                <p key={m.text} className={`text-base sm:text-lg leading-snug ${m.kept ? "font-semibold text-[#1D4ED8]" : "text-gray-300 line-through decoration-gray-300"}`}>
                  {m.text}
                  {m.kept && <span className="ml-3 align-middle text-[10px] uppercase tracking-[0.14em] font-medium bg-[#e8edff] rounded-full px-2.5 py-1 no-underline">kept</span>}
                </p>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6">One claim survived. Every section below exists to prove it.</p>
          </div>
        </section>

        {/* ── PROCESS: ITERATIONS ── */}
        <section id="process" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-2">Process</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">Four versions, two audits, one shipped page</h2>
            </div>
            <div className="space-y-4">
              <p className="text-[15px] text-gray-600 leading-relaxed">
                The redesign wasn&rsquo;t one pass; it was a loop. Weekly reviews with Kayno&rsquo;s founder set
                direction, and a pair-review with their engineer shaped what could ship. <Hl>The hardest critiques in
                this case study are ones I wrote against my own versions.</Hl>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { tag: "v1 · audited", title: "The live site", points: ["Three findings, annotated above", "Rebuild, not patch: the message was the problem"] },
              { tag: "v2 · rebuilt", title: "First redesign", points: ["Cohesive dark system, still no answer shown", "My own teardown became the direction doc"] },
              { tag: "v3 · audited again", title: "The copy audit", points: ["870 words counted vs Lemma’s 180", "Audience grid cut; connectors took its slot"] },
              { tag: "v4 · shipped", title: "The page above", points: ["380 words, receipts everywhere", "Wrote the engineering handoff"] },
            ].map((v, i) => (
              <div key={v.tag} className={`rounded-2xl p-6 border ${i === 3 ? "border-[#2ce5a2] bg-[#f2fdf8]" : "border-gray-200 bg-white"}`}>
                <p className={`font-mono text-[11px] uppercase tracking-[0.14em] mb-3 ${i === 3 ? "text-[#0ea77a]" : "text-gray-400"}`}>{v.tag}</p>
                <p className="text-sm font-semibold text-black mb-2">{v.title}</p>
                <ul className="space-y-1.5">
                  {v.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className={`shrink-0 font-semibold ${i === 3 ? "text-[#0ea77a]" : "text-gray-500"}`}>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOMEPAGE ── */}
        <section id="homepage" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <div className="rounded-[2rem] px-8 py-12 sm:px-14 sm:py-14 text-center mb-16" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-5">The Homepage</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black leading-snug [text-wrap:balance]">
              Six changes, each with a reason and a receipt: <span className="hl-hover">show the answer</span>,{" "}
              <span className="hl-hover">audit the message</span>, <span className="hl-hover">argue the problem</span>,{" "}
              <span className="hl-hover">surface the moat</span>, <span className="hl-hover">connect it once</span>,{" "}
              <span className="hl-hover">show&nbsp;the&nbsp;leash</span>.
            </h2>
          </div>

          {/* Row 1 - Show the answer */}
          <div id="h-answer" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Show, don&rsquo;t ask</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">From an empty ask bar to an answer with receipts</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Every AI landing page shows a chat box. Douglass&rsquo;s differentiator is the <Hl>answer</Hl>{" "}
                  (sourced, confident, structured), and the old page never rendered one. The new hero resolves a real
                  question into <Hl>+18% repeat revenue, $4,200 overdue</Hl>: source chips, confidence dot, receipts.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> designed around one rendered answer because claims
                  can&rsquo;t out-argue proof. The &ldquo;just a chat wrapper&rdquo; skeptic converts on receipts,
                  never on copy.
                </p>
              </div>
            </div>
            <BeforeAfter
              url="kaynolabs.ai"
              before={{ src: "/images/kaynolabs/before-hero2.webp", alt: "Before: the original kaynolabs.ai hero with a vague tagline and an empty ask bar", width: 3022, height: 1526 }}
              after={{ src: "/images/kaynolabs/hero-loop-poster.webp", alt: "After: the live hero with sources, agent draft, and the one-brain claim in motion", width: 3024, height: 1498, video: "/videos/kayno-hero.mp4" }}
            />
          </div>

          {/* Row 2 - Audit the message */}
          <div id="h-metaphor" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Audit, then design</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">A copy audit and two competitor teardowns, so one message could land</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  The site said what Douglass was six different ways, so it never landed once. Before touching pixels
                  I audited the page like an outsider: <Hl>counted every word, headline, and repeated claim</Hl>, then
                  tore down <Hl>Lemma and Corgi</Hl> to extract the mechanics behind their clarity.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> designed audit-first because you can&rsquo;t fix a
                  message you haven&rsquo;t measured. The audit turned &ldquo;make it cleaner&rdquo; into{" "}
                  <Hl>numbered directives</Hl> and made every cut defensible to the founder.
                </p>
              </div>
            </div>
            <AuditExhibit />

            <div className="rounded-2xl p-8 mt-6" style={{ background: "var(--card-blue)", border: "1px solid rgba(195, 208, 255, 0.4)" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 mb-6">the audit, step by step</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                {[
                  { num: "01", title: "Count everything", points: ["870 words, 9 headlines, 6 theses", "Tool logos appearing 5 times", "The message problem, quantified"] },
                  { num: "02", title: "Benchmark the clearest", points: ["Lemma: ~180 words, one thesis", "Corgi: ~420 words, proof-dense", "Mechanics, not vibes"] },
                  { num: "03", title: "Convert to rules", points: ["12 numbered directives", "One metaphor, four-color budget", "Mono voice, figure furniture"] },
                  { num: "04", title: "Sweep and verify", points: ["6 metaphors → 1, 9 H2s → 6", "4 repeated promises → 1", "Recounted to confirm"] },
                ].map((step) => (
                  <div key={step.num}>
                    <p className="font-mono text-sm font-semibold text-[#1D4ED8] mb-2">{step.num}</p>
                    <p className="text-sm font-semibold text-black mb-2">{step.title}</p>
                    <ul className="space-y-1.5">
                      {step.points.map((pt) => (
                        <li key={pt} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                          <span className="shrink-0 font-semibold text-gray-500">·</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 - Argue, don't state */}
          <div id="h-story" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Argue, don&rsquo;t state</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">From a claim you read to an argument you scroll</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <Hl>&ldquo;Your data isn&rsquo;t missing. It&rsquo;s in nine different tools.&rdquo;</Hl> The problem
                  section became pinned scrollytelling: your tools orbit scattered → they link to the brain, one by one →{" "}
                  <Hl>&ldquo;LINKED · NOTHING MOVED.&rdquo;</Hl>
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> staged it across scroll because an argument you
                  experience outlasts one you read. It also absorbed two redundant logo walls into a single beat.
                </p>
              </div>
            </div>
            <div className="rounded-[1.1rem] overflow-hidden border border-gray-200 shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
              <CoverVideo
                src="/videos/kayno-story.mp4"
                poster="/images/kaynolabs/story-loop-poster.webp"
                label="Screen recording: the pinned problem section playing its three beats as the page scrolls"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Row 4 - Surface the moat */}
          <div id="h-connectors" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Surface the moat</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">24 connectors, rescued from a buried FAQ answer</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  The brief named 25 connectors. The old page showed <Hl>zero</Hl>: decorative icons, plus one
                  sentence buried in FAQ 3. The audit&rsquo;s biggest finding became the biggest addition:{" "}
                  <Hl>24 real tiles in 4 categories</Hl>, closed by the trust line <Hl>&ldquo;Read-only by default.&rdquo;</Hl>
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> promoted connectors because &ldquo;does it work with
                  my stack?&rdquo; is the buyer&rsquo;s first unspoken question, and the FAQ was the most expensive
                  place to hide the answer.
                </p>
              </div>
            </div>
            <div className="rounded-[1.1rem] overflow-hidden border border-gray-200 shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
              <CoverVideo
                src="/videos/kayno-connectors.mp4"
                poster="/images/kaynolabs/connectors-loop-poster.webp"
                label="Screen recording: the Connectors section, 24 real tool tiles across four categories"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Row 5 - Connect it once */}
          <div id="h-connect" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Connect it once</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">From a feature grid to three steps that end in an answer</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  The old page sold capabilities: four generic feature cards and a logo marquee, with no story
                  connecting them. The redesign tells one sequence instead: <Hl>connect your tools, it learns your
                  world, ask in plain English</Hl>, with &ldquo;read-only by default&rdquo; doing the reassuring.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> designed it as a sequence because a feature list asks
                  for belief. <Hl>A path that ends in an answer</Hl> shows what happens after you click connect,
                  which is where the fear lives.
                </p>
              </div>
            </div>
            <BeforeAfter
              url="kaynolabs.ai"
              fit="contain"
              before={{ src: "/images/kaynolabs/connect-before-poster.webp", alt: "Before: a generic feature grid and a logo marquee", width: 3024, height: 1490, video: "/videos/kayno-connect-before.mp4" }}
              after={{ src: "/images/kaynolabs/connect-after-poster.webp", alt: "After: the three-step how-it-works: connect your tools, it learns your world, ask in plain English", width: 3024, height: 1244, video: "/videos/kayno-connect-after.mp4" }}
            />
          </div>

          {/* Row 6 - Show the leash */}
          <div id="h-act" className="scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Show the leash</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">Selling AI agents by leading with what they can&rsquo;t do</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Agents that draft emails from your data are the scariest promise on the page, so the copy leads with the
                  leash: <Hl>&ldquo;Nothing goes out without you.&rdquo;</Hl> The section&rsquo;s animation ends on the
                  payoff artifact: a drafted Monday update, <Hl>held for review</Hl>.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> the held-for-review pattern came out of a founder
                  conversation about agent risk. Control is the whole trust argument, so it earned its own full-width
                  section instead of a bento tile.
                </p>
              </div>
            </div>
            <LiveDemo
              src="/demos/douglass-homepage-v4.html#act"
              label="kaynolabs.ai · #then-douglass-acts"
              caption="live section · the draft assembles in real time, and the whole shipped page is scrollable from here"
              viewHeight={820}
            />
          </div>
        </section>

        {/* ── INTELLIGENCE - mint-washed band to mark the product chapter ── */}
        <div className="bg-[#2ce5a2]/[0.05] border-y border-[#2ce5a2]/20">
          <section id="intelligence" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 scroll-mt-24">
          <div className="rounded-[2rem] px-8 py-12 sm:px-14 sm:py-14 text-center mb-16" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-5">The Intelligence Page</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black leading-snug [text-wrap:balance]">
              The product surface itself: every insight card shows its{" "}
              <span className="hl-hover">summary<span className="hl-tip">headline with the number in it</span></span>,{" "}
              <span className="hl-hover">sources<span className="hl-tip">chips naming the tools it read</span></span>, and a{" "}
              <span className="hl-hover">clear action<span className="hl-tip">save · dismiss · follow up</span></span>{" "}
              without expanding.
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mt-6">
              The brief&rsquo;s acceptance criteria, taken literally, then held to the same standard as the
              homepage: <strong className="text-black">receipts on every claim.</strong>
            </p>
          </div>

          {/* Row 6 - Tool, not landing page */}
          <div id="i-header" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Tool, not landing page</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">Un-marketing the header: 380px of ceremony &rarr; a working surface</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  v2 opened with 380 pixels of centered ceremony before the first insight.{" "}
                  <Hl>Centered stacks are the #1 &ldquo;AI-built dashboard&rdquo; tell.</Hl> v4 compresses it to a
                  left-aligned working band: <Hl>&ldquo;Good morning, Maya&rdquo;</Hl>, five things worth knowing, and
                  the ask bar on the feed&rsquo;s own grid.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> designed it left-aligned after trying a slimmer
                  centered version first; anything centered still read as marketing. A daily tool should surface its
                  first insight in one glance, not one scroll.
                </p>
              </div>
            </div>
            <LiveDemo
              src="/demos/douglass-intelligence-v4.html"
              label="app.kaynolabs.ai/intelligence"
              caption="live surface · ask, save, dismiss, and pin real insights in the working prototype"
              viewHeight={950}
            />
          </div>

          {/* Row 7 - Card anatomy */}
          <div id="i-card" className="mb-32 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Judge without expanding</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">An insight card that earns belief in one glance</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  One anatomy, every card: category &middot; type &middot; time &rarr;{" "}
                  <Hl>headline with the number in it</Hl> &rarr; one-line teaser &rarr; the <Hl>receipts row</Hl> of
                  source chips, confidence, save / dismiss / follow&nbsp;up. Confidence went from a 20px dashboard ring to
                  a <Hl>7px micro-dot with a lowercase mono label</Hl>.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> designed to the acceptance criteria: &ldquo;judge each
                  card without expanding it.&rdquo; So the trust signals live in the card&rsquo;s last 24 pixels, not
                  in the detail view.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
                <Image src="/images/kaynolabs/insight-day.webp" alt="Insight of the day card: a headline with the number in it, Slack and Notion source chips, a high-confidence marker, and an open-deep-dive action" width={1458} height={402} className="w-full h-auto" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_18px_44px_-28px_rgba(15,20,40,0.45)]">
                <Image src="/images/kaynolabs/insight-card-amber.webp" alt="The needs-attention state: amber category chip, quiet-accounts headline, medium-confidence dot" width={714} height={190} className="w-full h-auto" />
              </div>
              <p className="text-xs text-gray-400 text-center">Top: the canonical card. Bottom: amber, reserved for &ldquo;needs attention,&rdquo; and nothing else.</p>
            </div>
          </div>

          {/* Row 8 - Craft as arithmetic */}
          <div id="i-craft" className="scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4d7a52] mb-2">Budget every treatment</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-black leading-snug [text-wrap:balance]">15 type sizes &rarr; 6, six glows &rarr; two: craft as arithmetic</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  The craft pass was <Hl>subtraction with numbers</Hl>. Every treatment got a budget and spent it once:
                  glow means <em>unread</em>, amber means <em>attention</em>, one gradient phrase per page. The
                  character stayed; the spending got capped.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="text-black">Why:</strong> if a color isn&rsquo;t carrying meaning, it&rsquo;s noise.
                  And because the budgets are rules, not styles, <Hl>one edit updates the system, not thirty
                  screens</Hl>: that&rsquo;s what makes the design system maintainable after I hand it off.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-8 sm:p-10" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-8 items-center">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 mb-4">the budgets</p>
                  <div className="space-y-3">
                    {[
                      ["font sizes", "15", "6-step ramp"],
                      ["glow effects", "6", "2 (unread · empty state)"],
                      ["meanings of amber", "4", "1 (attention)"],
                      ["spacing values", "13, 15, 18, 22, 26…", "8-pt scale"],
                      ["confidence viz", "20px conic ring", "7px micro-dot"],
                    ].map(([label, before, after]) => (
                      <div key={label} className="flex items-center justify-between gap-4 text-sm border-b border-[#d0daff]/60 pb-3">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-mono text-right shrink-0"><span className="text-gray-400 line-through mr-2">{before}</span><span className="text-[#1D4ED8] font-semibold">{after}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden border border-[#d0daff]">
                    <Image src="/images/kaynolabs/digest.webp" alt="The weekly digest card: the week's canonical numbers: +18% repeat revenue, 3 quiet accounts, $4,200 overdue, 4.4% newsletter CTR" width={714} height={235} className="w-full h-auto" />
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-3">Same numbers everywhere: the digest re-uses the homepage&rsquo;s canonical figures.</p>
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>

        {/* ── DESIGN DECISIONS ── */}
        <section id="decisions" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Design Decisions</p>
          <h2 className="text-2xl font-semibold text-black mb-14">Cutting my own work before the client could</h2>

          {/* Decision 1 - benchmark audit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4">I tore down v2 like an outsider</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Before anyone reviewed my work, I wrote the review: teardowns of <Hl>Lemma (discipline)</Hl> and{" "}
                <Hl>Corgi (clarity)</Hl>, converted into 12 directives the redesign simply executed. Seniority you
                don&rsquo;t have yet can be <Hl>borrowed, systematically</Hl>.
              </p>
            </div>
            <div className="rounded-2xl p-8" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 mb-4">the audit that started it</p>
              <div className="space-y-3">
                {[
                  ["Douglass v3", "870 words", "6 theses, 0 proof"],
                  ["Lemma", "~180 words", "1 thesis, YC badge"],
                  ["Corgi", "~420 words", "1 thesis, 13 logos"],
                ].map(([site, words, note]) => (
                  <div key={site} className="flex items-center justify-between gap-3 text-sm">
                    <span className={site === "Douglass v3" ? "font-semibold text-black" : "text-gray-600"}>{site}</span>
                    <span className="font-mono text-[#1D4ED8]">{words}</span>
                    <span className="text-gray-400 text-xs text-right">{note}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-5">4.8&times; the words of the best page in the audit, while saying less. That number set the whole redesign&rsquo;s target.</p>
            </div>
          </div>

          {/* Decision 2 - the cut */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4">The audience grid died so connectors could live</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Four cards (freelancers, marketers, small businesses, growing teams) that together described{" "}
                <Hl>everyone, and therefore no one</Hl>. Its slot went to the section with actual information density.
                Same lesson as Blumiin&rsquo;s Q&amp;A tab: <Hl>subtraction is a first-class move</Hl>.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                <strong className="text-[#1D4ED8]">OUTCOME:</strong>{" "}
                11 sections &rarr; 10, two repeats removed, two missing sections added, zero new page length. The
                strongest content finally sits above the FAQ.
              </p>
            </div>
          </div>
        </section>

        {/* ── REFLECTION ── */}
        <section id="reflection" className="max-w-5xl mx-auto px-4 sm:px-8 py-24 border-t border-gray-100 scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Reflection</p>
          <h2 className="text-2xl font-semibold text-black mb-10">What Douglass taught me about earning trust before you have proof</h2>

          <div className="rounded-2xl border border-[#1D4ED8] mb-12">
            <div className="rounded-2xl px-10 py-10 space-y-8">
              {[
                {
                  title: "An audit with numbers beats an opinion with taste",
                  body: (
                    <>
                      &ldquo;It feels wordy&rdquo; starts a debate; <Hl>&ldquo;870 words vs Lemma&rsquo;s 180&rdquo;</Hl>{" "}
                      ends one. Counting made every cut defensible.
                    </>
                  ),
                },
                {
                  title: "Benchmarks are borrowed seniority",
                  body: (
                    <>
                      I can&rsquo;t have ten years of judgment yet, but I can <Hl>systematically steal</Hl> Lemma&rsquo;s
                      discipline and Corgi&rsquo;s clarity, and write down the mechanics, not the vibes.
                    </>
                  ),
                },
                {
                  title: "The marketing page and the product are one design system",
                  body: (
                    <>
                      The answer card renders identically on the homepage and the Intelligence feed: same anatomy,
                      same canonical numbers. <Hl>The promise and the product agree</Hl>, and that agreement is the
                      trust argument.
                    </>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-[#93aff5] font-medium shrink-0 text-sm pt-0.5">{i + 1}.</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-2">{item.title}</p>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 border-2 border-[#4d7a52]/30 bg-white">
            <p className="text-sm font-semibold text-[#4d7a52] mb-3">What I&rsquo;d do differently</p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              The redesign shipped with <Hl>zero social proof</Hl>, flagged in every audit pass, unresolved
              because none honestly existed yet. And none of it is user-tested: the confidence dot and the card anatomy
              are <Hl>reasoned calls, not validated ones</Hl>. Receipts on every claim, including this one.
            </p>
          </div>
        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-between">
          <a
            href="/sparc"
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

        </NdaGate>

        {/* ── FOOTER ── */}
        <Footer />

      </main>
    </div>
  );
}
