import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e7] bg-white px-6 py-12 mt-4">
      <div className="max-w-5xl mx-auto">

        {/* Name */}
        <p className="text-2xl font-bold text-[#1D4ED8] mb-5">lydia park</p>

        {/* Tagline */}
        <p className="text-sm text-gray-400 mb-1">Thanks for dropping in, let&apos;s chat!</p>

        {/* Email */}
        <a
          href="mailto:liapaark@gmail.com"
          className="text-sm font-semibold text-black hover:text-[#1D4ED8] transition-colors block mb-6"
        >
          liapaark@gmail.com
        </a>

        {/* Social icons */}
        <div className="flex gap-5 mb-10">
          <a href="https://linkedin.com" className="text-gray-300 hover:text-[#1D4ED8] transition-colors" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:liapaark@gmail.com" className="text-gray-300 hover:text-[#1D4ED8] transition-colors" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Nav links */}
        <div className="space-y-4 mb-10">
          <Link href="/" className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(work)</Link>
          <Link href="/?tab=gallery" className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(gallery)</Link>
          <Link href="/?tab=about" className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(about)</Link>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">Built in Next.js &amp; with love</p>
          <p className="text-xs text-gray-400">@Lydia Park 2026</p>
        </div>

      </div>
    </footer>
  );
}
