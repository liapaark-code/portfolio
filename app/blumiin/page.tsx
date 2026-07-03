import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import CoverVideo from "../components/CoverVideo";

/** Brand-blue keyword highlight — used sparingly for the words that carry the product. */
function Hl({ children }: { children: React.ReactNode }) {
  return <span className="bg-[#e8edff] text-[#1D4ED8] font-medium px-1 rounded">{children}</span>;
}

export default function BlumiinCaseStudy() {
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
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            Blumiin — Herbal Remedies, Told Honestly
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black leading-relaxed">June 2026</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Context</p>
              <p className="text-sm text-black font-medium">Skandalaris Hackathon</p>
              <p className="text-sm text-gray-400 italic">Intern Pitch Winner</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm text-black">Designer — team of 5</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tools</p>
              <p className="text-sm text-black">Claude Code, Figma Slides, HTML/CSS/JS</p>
            </div>
          </div>
        </section>

        {/* ── HERO — looping cover animation ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-0 border-t border-gray-200 pt-8">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#365a3d]">
            <CoverVideo
              src="/videos/blumiin-cover.mp4"
              poster="/images/blumiin/cover-poster.png"
              label="Blumiin — feature tour: symptom chips, evidence meters, expert input, and allergy excludes"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ── THE QUESTION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Question</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                How are we supposed to know what actually works?
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  Herbal advice is either <Hl>wellness hype</Hl> or <Hl>dense research</Hl> — neither gives a straight
                  answer.
                </p>
                <p>
                  Only <Hl>15% strongly trust pharma</Hl>. <Hl>84% don&rsquo;t believe herbal medicine is regulated</Hl>.
                  Millions self-experiment with no honest guide.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">How people describe herbal medicine</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["Ineffective", "Expensive", "Myth", "Complicated", "Unknown", "Unregulated", "Dangerous", "Scarce"].map((w) => (
              <span key={w} className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-500">{w}</span>
            ))}
          </div>
          <div className="rounded-2xl p-6" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#1D4ED8]">THE OPPORTUNITY:</strong>{" "}
              nobody owns <strong className="text-black">honest</strong> in this space.
            </p>
          </div>
        </section>

        {/* ── OUTCOME ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Outcome</p>
          <h2 className="text-2xl font-semibold text-black mb-10">A two-hour pitch that won the room</h2>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
            {[
              { stat: "1st", label: "Skandalaris intern pitch", sub: "Team of 5 — I was the designer" },
              { stat: "2 hrs", label: "From assets to winning pitch", sub: "Deck, live demo, go-to-market" },
              { stat: "84%", label: "Distrust herbal regulation", sub: "The research behind our claim" },
            ].map((item) => (
              <div key={item.stat} className="flex-1 py-6 sm:py-0 sm:px-10 first:pt-0 sm:first:pt-0 first:pl-0 last:pb-0 sm:last:pb-0">
                <p className="text-5xl font-bold text-[#1D4ED8] mb-3">{item.stat}</p>
                <p className="text-base font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#f5f5f7] border border-[#e5e5e7] rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#1D4ED8] mb-4">Designer Impact</p>
            <ul className="space-y-3">
              {[
                "Killed the clinical blue/teal direction — rebuilt as a warm forest system",
                "Made honesty visual: evidence badges, sourced verdicts, dashed community cards",
                "Deleted a working Q&A tab — a filter covered it with one fewer destination",
                "Designed safety as behavior: allergies exclude, flags never green-light",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1D4ED8] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── THE SOLUTION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Solution</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                Tradition and evidence, side by side
              </h2>
            </div>
            <div className="flex flex-col items-start pt-8 gap-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                A <Hl>phone-first remedy guide</Hl> where every claim carries its receipts — what tradition says, what
                research found, what to watch out for.
              </p>
              <blockquote className="border-l-4 border-[#4d7a52] pl-4 bg-[#f0f7f1] rounded-r-xl py-3 pr-4">
                <p className="text-sm text-[#3d6142] italic">
                  &ldquo;Clear about what&rsquo;s proven, honest about what isn&rsquo;t.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Features</p>
          <h2 className="text-2xl font-semibold text-black mb-4">Trust you can see at a glance</h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mb-14">
            Four surfaces, one system: <Hl>evidence status is always visible</Hl>.
          </p>

          {/* Row 1 — text left, media right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Search by symptom, not by species</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                People think in problems, not Latin names. Home opens on a <Hl>symptom-first search</Hl> with{" "}
                <Hl>Myth vs Evidence</Hl> verdicts: &ldquo;Detox teas? Not supported.&rdquo;
              </p>
            </div>
            <div className="flex justify-center">
              <div className="rounded-[1.6rem] bg-[#0e1a14] p-[14px] max-w-[300px] w-full">
                <div className="rounded-[1.1rem] overflow-hidden">
                  <Image src="/images/blumiin/home-mobile.png" alt="Home — symptom-first search with personalized quick chips" width={390} height={844} className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 — media left, text right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center order-2 sm:order-1">
              <div className="rounded-[1.6rem] bg-[#0e1a14] p-[14px] max-w-[300px] w-full">
                <div className="rounded-[1.1rem] overflow-hidden">
                  <Image src="/images/blumiin/detail-mobile.png" alt="Remedy detail — evidence strength and safety meters above the fold" width={390} height={844} className="w-full h-auto" />
                </div>
              </div>
            </div>
            <div className="order-1 sm:order-2">
              <h3 className="text-xl font-semibold text-black mb-4">Every remedy leads with its evidence</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <Hl>Badge color = evidence strength</Hl>. Every detail page opens on two meters —{" "}
                <Hl>evidence and safety</Hl> — before a single benefit.
              </p>
            </div>
          </div>

          {/* Row 3 — text left, media right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Community remedies earn their status</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                User posts render as <Hl>dashed cards</Hl> — never confusable with rated content.{" "}
                <Hl>Expert backing or 25 saves</Hl> graduates a remedy to Explore.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="rounded-[1.6rem] overflow-hidden max-w-[300px]">
                <CoverVideo
                  src="/videos/blumiin-community.mp4"
                  poster="/images/blumiin/community-loop-poster.png"
                  label="Screen recording — browsing Community: rooms, the expert-input filter, sharing a remedy"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Row 4 — media left, text right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 sm:order-1">
              <div className="rounded-[1.6rem] overflow-hidden max-w-[300px]">
                <CoverVideo
                  src="/videos/blumiin-profile.mp4"
                  poster="/images/blumiin/profile-loop-poster.png"
                  label="Screen recording — Profile: allergies as hard excludes, medications, the My Herbs log"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 sm:order-2">
              <h3 className="text-xl font-semibold text-black mb-4">Allergies don&rsquo;t warn — they exclude</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Flagged allergens <Hl>vanish from the app</Hl>. Medication flags <Hl>never green-light</Hl>. My Herbs
                logs real use — the loop that brings people back.
              </p>
            </div>
          </div>
        </section>

        {/* ── DESIGN DECISIONS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Design Decisions</p>
          <h2 className="text-2xl font-semibold text-black mb-14">Two calls I&rsquo;d defend in any review</h2>

          {/* Decision 1 — text left, swatches right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Killing the clinical direction</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Blue/teal read as pharma — the one authority this product can&rsquo;t claim. Rebuilt as a{" "}
                <Hl>warm forest system</Hl> in one evening; the IA carried over untouched.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { hex: "#16291F", name: "forest", light: false },
                  { hex: "#4D7A52", name: "fern", light: false },
                  { hex: "#7DA383", name: "fern-lt", light: false },
                  { hex: "#D98A8A", name: "bloom", light: false },
                  { hex: "#F3D9D4", name: "bloom-sf", light: true },
                  { hex: "#C8954A", name: "amber", light: false },
                  { hex: "#F6F1E6", name: "cream", light: true },
                  { hex: "#FBF8F1", name: "paper", light: true },
                ].map((s) => (
                  <div key={s.name} className="rounded-xl border border-gray-200 aspect-square relative" style={{ background: s.hex }}>
                    <span className={`absolute left-2 bottom-1.5 text-[10px] font-mono ${s.light ? "text-gray-600" : "text-white/90"}`}>{s.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">The token set that replaced blue/teal.</p>
            </div>
          </div>

          {/* Decision 2 — text left, outcome right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Deleting a working Q&amp;A tab</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Expert comments plus a <Hl>&ldquo;Has expert input&rdquo; filter</Hl> covered the whole use case — so
                the tab went. The recordings above still show the old five-tab nav, days before the cut.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#e8edff", border: "1px solid #d0daff" }}>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#1D4ED8]">OUTCOME:</strong>{" "}
                one fewer destination, same capability. Subtraction is a design move.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE PITCH ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">The Pitch</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                Lead with the claim, close with a label
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Five of us, <Hl>two hours</Hl>: claim → research → live demo → close. The closer:{" "}
                <Hl>free samples with honest labels</Hl> — benefits and cautions side by side, QR into Blumiin.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { stat: "15%", label: "Strongly trust pharmaceutical companies" },
              { stat: "84%", label: "Don't believe herbal medicine is well regulated" },
              { stat: "Millions", label: "Turning to natural remedies with no honest guide" },
            ].map((m) => (
              <div key={m.stat} className="bg-[#e8edff] rounded-2xl p-8 text-center" style={{ border: "1px solid #d0daff" }}>
                <p className="text-4xl font-bold text-[#1D4ED8] mb-3">{m.stat}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── REFLECTION ── */}
        <section id="reflection" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#1D4ED8] mb-4">Reflection</p>
          <h2 className="text-2xl font-semibold text-black mb-10">What Blumiin taught me about designing for trust</h2>

          <div className="rounded-2xl border border-[#1D4ED8] mb-12">
            <div className="rounded-2xl px-10 py-10 space-y-8">
              {[
                {
                  title: "Honesty is a design system, not a paragraph",
                  body: "Badge colors, dashed borders, hard excludes — the interface makes it impossible to confuse proven with unproven. No disclaimer required.",
                },
                {
                  title: "Deleting a feature is a design decision",
                  body: "The Q&A tab worked, but it duplicated expert comments. Subtraction is a first-class move.",
                },
                {
                  title: "A pitch is a design artifact too",
                  body: "Lead with the claim, let evidence carry the weight, end with something tangible — the honest-label sample did more than any feature list.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-[#93aff5] font-medium shrink-0 text-sm pt-0.5">{i + 1}.</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-2">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 border-2 border-[#4d7a52]/30 bg-white">
            <p className="text-sm font-semibold text-[#4d7a52] mb-3">What I&rsquo;d do differently</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              The win validated the pitch, not the trust system. The badge colors and the 25-save threshold were never
              user-tested — honest about what&rsquo;s proven, honest about what isn&rsquo;t.
            </p>
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
            href="/little-prince"
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
