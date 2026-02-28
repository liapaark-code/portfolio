import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export default function AmcCaseStudy() {
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
              <span>AMC Rebrand</span>
            </Link>
          </div>
        </div>

        {/* ── TITLE + METADATA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-8">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
            AMC Rebranding Logo
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Timeline</p>
              <p className="text-sm text-black leading-relaxed">August 2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Client</p>
              <p className="text-sm text-black font-medium">AMC @ WashU</p>
              <p className="text-sm text-gray-400 italic">Campus Org</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm text-black">Brand Designer</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tools</p>
              <p className="text-sm text-black">Procreate, Figma</p>
            </div>
          </div>
        </section>

        {/* ── HERO BANNER ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-0 border-t border-gray-200 pt-8">
          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/amc/amc-cover.png"
              alt="AMC Rebranding Logo"
              width={1200}
              height={520}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Overview</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">What is AMC?</h2>
              <p className="text-xs text-gray-400 mt-2">August 2025</p>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                AMC is an umbrella organization at the WashU school affiliated with members who are on campus. We program cultural events and run an independency program with <strong className="text-black">30+ events annually</strong>, connecting students across communities.
              </p>
            </div>
          </div>
        </section>

        {/* ── OUTCOME / IMPACT ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Outcome</p>
          <h2 className="text-2xl font-semibold text-black mb-10">Business Impact as a Designer for AMC</h2>

          <div className="flex flex-col sm:flex-row items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
            {[
              { stat: "30k+",  label: "Social interactions",           sub: "Across AMC's rebranded channels" },
              { stat: "30+",   label: "Annual events rebranded",       sub: "New identity across all AMC programming" },
              { stat: "3",     label: "Logo variants delivered",        sub: "Primary, secondary, and emblem" },
            ].map((item) => (
              <div key={item.stat} className="flex-1 py-6 sm:py-0 sm:px-10 first:pt-0 sm:first:pt-0 first:pl-0 last:pb-0 sm:last:pb-0">
                <p className="text-5xl font-bold text-[#4169e1] mb-3">{item.stat}</p>
                <p className="text-base font-semibold text-black mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#f5f5f7] border border-[#e5e5e7] rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#4169e1] mb-4">Designer Impact</p>
            <ul className="space-y-3">
              {[
                "Delivered a full logo rebrand for AMC's name change — replacing the informal panel C motif with a bold, scalable modern mark",
                "Increased visual consistency across 30+ annual events by providing a unified brand system with clear usage guidelines",
                "Designed 3 logo variants (primary, secondary, emblem) giving AMC flexibility across digital, print, and merchandise formats",
                "Strengthened AMC's identity alongside WashU's visual standards while preserving its distinct cultural energy",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4169e1] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── THE REBRAND ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">So... the Rebrand!</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                Why a new logo?
              </h2>
            </div>
            <div className="flex items-start pt-8">
              <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:bg-gray-50 transition-colors duration-200 text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  As a student organization, this year we changed the name of the AMC. We redesigned the logo for this <strong className="text-black">fall season</strong>.
                </p>
                <p>
                  With the name change as the driver, I knew we needed to start fresh with our main logo.
                </p>
                <p>
                  This also stemmed from the online-going discussion of how the <strong className="text-black">"panel C" motif</strong> was confusing and distracting from the AMC's mission and identity — both students and faculty agreed this needed a refresh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Re-Designed Logo</p>
          <p className="text-sm text-gray-500 mb-10">Refreshing AMC for the 2025–26 college season.</p>

          <div className="grid grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-4 bg-[#fafafa]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Before Logo</p>
              <Image
                src="/images/amc/Amclogo-2x.png"
                alt="Old AMC logo"
                width={200}
                height={200}
                className="w-40 h-auto"
              />
              <p className="text-xs text-gray-400 text-center">Circular hand-drawn style — felt informal and unscalable</p>
            </div>
            <div className="rounded-2xl p-8 flex flex-col items-center gap-4" style={{ background: "#fdf0ee" }}>
              <p className="text-xs font-semibold text-[#c0392b] uppercase tracking-widest">After Logo</p>
              <Image
                src="/images/amc/Amc-logo-new-1-2x.png"
                alt="New AMC logo"
                width={200}
                height={200}
                className="w-40 h-auto"
              />
              <p className="text-xs text-[#c0392b] text-center">Bold, modern, and built to scale across all formats</p>
            </div>
          </div>
        </section>

        {/* ── SKETCHES + ITERATIONS ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Sketches + Iterations</p>
              <h2 className="text-2xl font-semibold text-black mb-6">The design process</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Starting from circular form studies and letterform explorations, each iteration pushed toward a more confident, graphic mark that could live anywhere — digital, print, or merch.
              </p>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl overflow-hidden border border-gray-200 w-full">
                <Image
                  src="/images/amc/Untitled-Artwork-55.png"
                  alt="AMC logo sketches and iterations"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL DESIGN / MOCKING ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4169e1] mb-4">Final Design / Mocking</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-xl">
            The final mark across its full range of applications — light, dark, and gradient — showing how the logo holds across every AMC touchpoint.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/amc/Frame-19-4x.png"
                alt="AMC logo on dark gradient"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/amc/Frame-20-4x.png"
                alt="AMC logo on light gradient"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/amc/Amc-red-logo-4x.png"
                alt="AMC logo red gradient"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/amc/Amc-white-logo-4x.png"
                alt="AMC logo white variant"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* ── FINAL RESPONSE ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#c0392b] mb-4">Final Response</p>
              <h2 className="text-2xl font-semibold text-black leading-snug">
                How did it land?
              </h2>
            </div>
          </div>
          <div className="rounded-2xl p-8 border-2 border-[#c0392b]/30 bg-white">
            <p className="text-sm text-gray-600 leading-relaxed">
              The redesigned logo was well-received by both students and faculty. The cleaner, bolder mark felt more at home alongside WashU's visual identity while still carrying AMC's distinct energy. It's now being used across social media, event materials, and merchandise — a full rollout for the 2025–26 year.
            </p>
          </div>
        </section>

        {/* ── NEXT WORK ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 flex justify-end">
          <a
            href="/sparc"
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
