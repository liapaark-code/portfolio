import Image from "next/image";
import Link from "next/link";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
// Label:   text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1]
// Heading: text-2xl font-semibold text-black
// Body:    text-sm text-gray-600 leading-relaxed
// Layout:  max-w-5xl, grid-cols-[180px_1fr] gap-16, py-16, border-t border-gray-100
// Cards:   bg-[#f0f4ff] rounded-2xl   |   border border-gray-200 rounded-2xl
// Accent:  #4169e1
// ─────────────────────────────────────────────────────────────────────────────

// Reusable section wrapper
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
    // SPARC-style: label + heading LEFT col, children RIGHT col
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
  // No heading: label on top, children below full-width
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
      <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{label}</p>
      {children}
    </section>
  );
}

export default function CopilotCaseStudy() {
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
              <span>Copilot</span>
            </Link>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-16">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            Product Space x Microsoft Copilot
          </h1>

          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 pb-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black leading-relaxed">Aug 2025 –<br />Present</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Client</p>
              <p className="text-sm text-black font-medium">Farhan Mian</p>
              <p className="text-sm text-gray-400 italic">Senior Product Designer @ Microsoft</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm text-black">Product Designer</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Team</p>
              <p className="text-sm text-black leading-relaxed">2 Product Designers<br />2 Product Managers</p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-2 mb-10" />

          {/* Hero image */}
          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/copilot-hero.png"
              alt="Microsoft Copilot"
              width={1200}
              height={525}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* ── MAIN QUESTION ── */}
        <Section label="Copilot Main Question">
          <div className="flex items-start gap-4 bg-[#f0f4ff] border border-[#d0daff] rounded-2xl p-6">
            <Image src="/images/Group 17.png" alt="Copilot icon" width={32} height={32} className="shrink-0 mt-1 object-contain" />
            <p className="text-base text-black leading-relaxed">
              How can we reimagine AI on Microsoft interfaces so that it feels intuitive, approachable, and integrated rather than intrusive or confusing?
            </p>
          </div>
        </Section>

        {/* ── OUTCOME / IMPACT ── */}
        <Section label="Outcome" fullWidth>
          <h2 className="text-2xl font-semibold text-black mb-10">Business Impact as a Designer for Copilot</h2>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
            {[
              { stat: "+30%", label: "Increase in Copilot usage", sub: "After inline embedding redesign" },
              { stat: "10x",  label: "Faster AI access", sub: "Fewer steps to reach Copilot" },
              { stat: "+25%", label: "Task completion with AI", sub: "More drafts completed with assistance" },
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
                "Improved AI discoverability by embedding Copilot inline — eliminating the side panel context switch entirely",
                "Reduced friction during email workflows, enabling users to draft, revise, and summarize without leaving the compose window",
                "Increased task completion rate through clear, predictable AI interaction patterns that respect user control and tone",
                "Established a scalable AI interaction foundation ready to extend into calendar, task creation, and meeting prep",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4169e1] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── HUMAN-CENTERED AI INTEGRATION ── */}
        <Section label="Human-Centered AI Integration" heading="Overview" fullWidth>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            We set out to understand how real users experience Copilot in their day-to-day Microsoft workflows — identifying friction points and designing toward an AI that feels like a natural extension of the tools they already use.
          </p>
          <div className="w-full rounded-2xl overflow-hidden border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/copilot-ui-overview.gif" alt="Copilot UI overview" className="w-full h-auto" />
          </div>
        </Section>

        {/* ── WHY COPILOT SEEMS INVISIBLE ── */}
        <Section label="Continuous Assessment" heading="Why Copilot Seems Invisible" fullWidth>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tag: "Knowledge",  title: "Information Overwhelm", desc: "Users are flooded with suggestions they didn't ask for, making Copilot feel noisy rather than helpful." },
              { tag: "Workflow",   title: "Workflow Disruption",   desc: "Copilot interrupts existing task flows instead of integrating into them, pulling users out of context." },
              { tag: "Language",  title: "Low AI Language",       desc: "Responses feel impersonal and disconnected from Microsoft's product voice and design language." },
            ].map((c) => (
              <div key={c.title} className="bg-[#f0f4ff] rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">{c.tag}</p>
                <p className="text-sm font-semibold text-black mb-2">{c.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── THE OPPORTUNITY ── */}
        <Section label="The Opportunity">
          <div className="border-l-4 border-[#4169e1] pl-6 mb-8">
            <p className="text-xl font-medium text-black leading-snug">
              How might Copilot integrate directly into users&apos; own workflows while preserving and addressing pain points?
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f0f4ff] rounded-2xl p-8 text-center">
              <p className="text-5xl font-bold text-[#4169e1] mb-3">61%</p>
              <p className="text-sm text-gray-600 leading-relaxed">of users said Copilot felt invisible or easy to ignore during their daily workflow</p>
            </div>
            <div className="bg-[#f0f4ff] rounded-2xl p-8 text-center">
              <p className="text-5xl font-bold text-[#4169e1] mb-3">73%</p>
              <p className="text-sm text-gray-600 leading-relaxed">wanted AI assistance that felt more context-aware and less interruptive</p>
            </div>
          </div>
        </Section>

        {/* ── USER QUOTES ── */}
        <Section label="Generative Research" heading="Understanding AI in Everyday Workflows" fullWidth>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              "I forget Copilot exists.",
              "It feels like an extra feature, not part of Outlook.",
              "I don\u2019t want to switch contexts just to ask AI to help write.",
            ].map((q, i) => (
              <div key={i} className="bg-[#f0f4ff] border border-[#d0daff] rounded-2xl p-6 flex flex-col">
                <span className="text-4xl text-[#4169e1] leading-none mb-3 font-serif">&ldquo;</span>
                <p className="text-sm font-semibold text-black leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#f0f4ff] border border-[#d0daff] rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Key Insight</p>
            <div className="space-y-2">
              {[
                "Copilot's purpose and capabilities were unclear",
                "Using AI required leaving the drafting flow",
                "The interface felt inconsistent with Outlook's design",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-[#4169e1] font-semibold text-sm shrink-0">{i + 1}.</span>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SCALABLE AI FOUNDATION ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          {/* Two-col header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Product Decisions</p>
              <h2 className="text-2xl font-semibold text-black">Designing a Scalable AI Foundation</h2>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-600 leading-relaxed">
                Rather than designing isolated AI features, we prioritized building a{" "}
                <strong className="text-black font-semibold">scalable interaction foundation</strong>{" "}
                that could support real writing tasks while remaining subtle and predictable.
              </p>
            </div>
          </div>

          {/* Tab pill */}
          <span className="inline-block border border-gray-300 rounded-md px-4 py-1.5 text-sm text-gray-600 mb-6">
            Inline Copilot User Architecture
          </span>

          {/* Architecture diagram */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
            <Image src="/images/copilot-architecture.png" alt="Inline Copilot user architecture" width={1200} height={600} className="w-full h-auto" />
          </div>

          {/* Footer note */}
          <p className="text-sm text-gray-600 leading-relaxed text-right max-w-md ml-auto mb-10">
            <strong className="text-black font-semibold">With this foundation</strong>, users can draft, revise, summarize, and organize emails without leaving the compose window, while maintaining full control over content and tone.
          </p>

        </section>

        {/* ── INLINE FINAL DESIGNS ── */}
        <Section label="Design Explorations" heading="Inline Final Designs: Flow 1–4" fullWidth>
          <div className="flex flex-col gap-6">
            {[
              { src: "/images/copilot-flow1.gif", feature: "Feature: Built-in Scheduling",  label: "Flow 1 — Schedule Meeting",   desc: "Copilot detects scheduling intent inline and surfaces available times directly in the compose window — no context switch required.",   outcome: "Reduced scheduling friction by surfacing meeting times inline, cutting the steps needed to book from 5+ actions to a single tap." },
              { src: "/images/copilot-flow2.gif", feature: "Feature: Improve Writing",       label: "Flow 2 — Draft Email",         desc: "AI drafts a full email from a short prompt, keeping the user anchored in the compose flow while maintaining full editorial control.",    outcome: "Improved draft speed and writing confidence by generating complete emails inline — keeping users in the compose window from start to send." },
              { src: "/images/copilot-flow3.gif", feature: "Feature: Improve Writing",       label: "Flow 3 — Smart Reply",         desc: "Copilot reads the incoming message and generates contextually appropriate reply options that match the user's tone and intent.",          outcome: "Increased reply relevance by grounding Copilot responses to the active thread, reducing back-and-forth and cutting response time." },
              { src: "/images/copilot-flow4.gif", feature: "Feature: Response Templates",   label: "Flow 4 — Response Templates",  desc: "Frequently used reply patterns surface as one-tap templates, reducing repetitive writing and speeding up high-volume workflows.",       outcome: "Reduced repetitive writing effort for high-volume users by surfacing reusable reply patterns directly in the compose experience." },
            ].map((f) => (
              <div key={f.src} className="border border-gray-200 rounded-2xl overflow-hidden transition-colors duration-200 hover:border-[#4169e1] hover:bg-[#f0f4ff]/40">
                <div className="px-6 pt-5 pb-3">
                  <span className="inline-block bg-[#e8edff] text-[#4169e1] text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide mb-2">{f.feature}</span>
                  <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-1">{f.label}</p>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.label} className="w-full h-auto" />
                <div className="px-6 py-4 bg-[#f0f4ff] border-t border-[#d0daff]">
                  <p className="text-sm font-bold text-gray-600 leading-relaxed">
                    <strong className="text-[#4169e1]">OUTCOME:</strong>{" "}{f.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SUCCESS METRICS ── */}
        <Section label="Success Metrics" heading="Copilot Actions Triggered per Session" fullWidth>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { stat: "+30%", label: "Increase in Copilot usage",  desc: "More users actively triggered Copilot features when embedded inline versus surfaced in a side panel." },
              { stat: "10x",  label: "Faster AI access",           desc: "Users reached Copilot in fewer steps with the redesigned inline entry points." },
              { stat: "+25%", label: "Task completion with AI",    desc: "More drafts and summaries were completed with Copilot assistance after the workflow integration redesign." },
            ].map((m) => (
              <div key={m.stat} className="bg-[#f0f4ff] rounded-2xl p-8 text-center">
                <p className="text-5xl font-bold text-[#4169e1] mb-2">{m.stat}</p>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-3">{m.label}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── RISKS & MITIGATIONS ── */}
        <Section label="Risks and Mitigations" heading="Planning for What Could Go Wrong" fullWidth>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Risk",       title: "Over-reliance on AI",    desc: "Users may defer critical thinking to Copilot, reducing engagement and skill development over time." },
              { type: "Mitigation", title: "Transparency by Design",  desc: "Surface AI confidence levels and always give users clear control to edit, reject, or ignore suggestions." },
              { type: "Risk",       title: "Context Misreads",        desc: "Copilot may surface irrelevant suggestions if it misinterprets the user's current task or intent." },
              { type: "Mitigation", title: "Contextual Anchoring",    desc: "Ground responses to the active document or thread, with explanations for why a suggestion was shown." },
            ].map((r, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${r.type === "Risk" ? "bg-[#fff5f5] border-red-100" : "bg-[#f0f4ff] border-[#d0daff]"}`}>
                <p className={`text-[11px] uppercase tracking-[0.14em] font-medium mb-4 ${r.type === "Risk" ? "text-red-400" : "text-[#4169e1]"}`}>{r.type}</p>
                <p className="text-sm font-semibold text-black mb-2">{r.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TAKEAWAYS & NEXT STEPS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Takeaways &amp; Next Steps</p>

          <h2 className="text-2xl font-semibold text-black mb-10">
            What working on Copilot taught me about designing with AI
          </h2>

          <div className="p-px rounded-2xl" style={{ background: "linear-gradient(to right, #4169e1, #93aff5, #facc15)" }}>
            <div className="bg-white rounded-2xl px-10 py-10 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <p className="text-sm font-bold text-[#4169e1] mb-5">Key Takeaways</p>
                <ol className="space-y-4">
                  {[
                    "AI earns trust when embedded naturally into existing workflows",
                    "Subtle interaction design matters more than visibility alone",
                    "Control and transparency are essential for long-term adoption",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="text-gray-300 shrink-0 font-medium">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-sm font-bold text-[#4169e1] mb-5">Next Steps</p>
                <ol className="space-y-4">
                  {[
                    "Extend Copilot into calendar scheduling, task creation, and meeting prep",
                    "Test across desktop, web, and mobile for enterprise consistency",
                    "Validate accessibility and efficiency gains at scale",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="text-gray-300 shrink-0 font-medium">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-end">
          <a
            href="/little-prince"
            className="group flex items-center gap-3 text-sm font-medium text-[#1D4ED8] hover:opacity-70 transition-opacity"
          >
            view next work
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* ── FOOTER ── */}
        <footer className="border-t border-[#d0daff] bg-[#e8edff] px-8 py-12 mt-4">
          <div className="max-w-5xl mx-auto flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-[#080CD6] mb-1">lydia park</p>
              <p className="text-xs text-gray-500">Thanks for dropping in, let&apos;s chat!</p>
            </div>
            <div className="flex gap-10 text-sm text-gray-500">
              <a href="/" className="hover:text-[#080CD6] transition-colors">(work)</a>
              <a href="#" className="hover:text-[#080CD6] transition-colors">(gallery)</a>
              <a href="#" className="hover:text-[#080CD6] transition-colors">(about)</a>
            </div>
            <div className="text-right">
              <a href="mailto:liapaark@gmail.com" className="text-sm text-gray-500 hover:text-[#080CD6] transition-colors block mb-1">liapaark@gmail.com</a>
              <a href="https://linkedin.com"      className="text-sm text-gray-500 hover:text-[#080CD6] transition-colors block mb-3">LinkedIn</a>
              <p className="text-xs text-gray-500">Built in Next.js &amp; with love</p>
              <p className="text-xs text-gray-500">@Lydia Park 2026</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
