import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e7] bg-white px-16 py-10 mt-4">

      {/* 3-column desktop, stacked mobile */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-start gap-8 mb-10">

        {/* Left: name */}
        <div>
          <p className="text-base font-bold text-[#1D4ED8]">lydia park</p>
        </div>

        {/* Center: nav */}
        <div className="flex flex-col gap-2.5 sm:items-center">
          <Link href="/"             className="text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(work)</Link>
          <Link href="/?tab=gallery" className="text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(gallery)</Link>
          <Link href="/?tab=about"   className="text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(about)</Link>
        </div>

        {/* Right: tagline, email, icons — right-aligned on desktop */}
        <div className="sm:text-right">
          <p className="text-xs text-[#8e8e93] mb-1">Let&apos;s work together!</p>
          <a href="mailto:liapaark@gmail.com"
             className="text-xs font-bold text-[#1d1d1f] hover:text-[#1D4ED8] transition-colors block mb-3">
            liapaark@gmail.com
          </a>
          <div className="flex gap-3 sm:justify-end">
            <a href="https://www.linkedin.com/in/lydia-paark" className="text-[#c0c0c8] hover:text-[#1D4ED8] transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:liapaark@gmail.com" className="text-[#c0c0c8] hover:text-[#1D4ED8] transition-colors" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-100 pt-5 text-center">
        <p className="text-[11px] text-gray-400">Built in Next.js &amp; with love</p>
        <p className="text-[11px] text-gray-400">@Lydia Park 2026</p>
      </div>

    </footer>
  );
}
