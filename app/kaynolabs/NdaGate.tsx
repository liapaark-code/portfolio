"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "kayno-nda-unlocked";

/**
 * NDA gate for the Kayno Labs case study. The preview (title, TL;DR, cover, brief)
 * renders above this; everything passed as `children` stays locked behind a password.
 * When locked, a blurred, clipped peek sits behind a horizontal lock card.
 * Soft client-side gate, appropriate for a portfolio NDA, not real access control.
 */
export default function NdaGate({
  children,
  rail,
  password,
}: {
  children: React.ReactNode;
  rail?: React.ReactNode;
  password: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);       // localStorage checked yet?
  const [animate, setAnimate] = useState(false);    // only fade in on a fresh unlock
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(false);

  // Restore the unlock across reloads and future visits before first paint.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
    setReady(true);
  }, []);

  // While we haven't checked storage yet, render a neutral spacer so a
  // returning (already-unlocked) visitor never sees the lock screen flash.
  if (!ready) {
    return <div className="mb-24 sm:mb-32" style={{ minHeight: 520 }} aria-hidden="true" />;
  }

  if (unlocked) {
    return (
      <>
        {rail}
        <div className={animate ? "nda-reveal" : undefined}>{children}</div>
        <style>{`
          @keyframes nda-reveal { from { opacity: 0; } to { opacity: 1; } }
          .nda-reveal { animation: nda-reveal 0.6s ease both; }
        `}</style>
      </>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.trim().toLowerCase() === password.toLowerCase()) {
      setAnimate(true);
      setUnlocked(true);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative mb-24 sm:mb-32">
      {/* Blurred, clipped peek of the locked case study */}
      <div className="pointer-events-none select-none h-[520px] overflow-hidden opacity-50 [filter:blur(8px)]" aria-hidden="true">
        {children}
      </div>
      {/* Fade the peek into white so nothing readable leaks past the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/65 to-white" />

      {/* Horizontal lock card, centered over the peek, portfolio blue system */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-[1.6rem] px-6 py-6 sm:px-9 sm:py-7 shadow-[0_30px_80px_-38px_rgba(30,64,175,0.4)]" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            {/* Left: lock + copy */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] border border-[#c3d0ff]">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2.2" stroke="#1D4ED8" strokeWidth="1.7" />
                  <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="12" cy="15" r="1.4" fill="#1D4ED8" />
                </svg>
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-black leading-snug">This work is confidential.</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Under NDA with Kayno Labs. Please{" "}
                  <a href="mailto:liapaark@gmail.com" className="text-[#1D4ED8] font-medium hover:underline">email me</a>{" "}
                  for the password.
                </p>
              </div>
            </div>

            {/* Right: password form */}
            <form onSubmit={submit} className="flex gap-2 shrink-0">
              <input
                type="password"
                value={entry}
                onChange={(e) => { setEntry(e.target.value); setError(false); }}
                placeholder="Password"
                aria-label="Case study password"
                className={`w-full sm:w-36 rounded-full border px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#1D4ED8] ${
                  error ? "border-[#e5484d] bg-[#fef2f2]" : "border-[#c3d0ff] bg-white"
                }`}
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1e40af]"
              >
                Unlock
              </button>
            </form>
          </div>

          {error && (
            <p className="mt-3 text-xs text-[#e5484d] sm:pl-[60px]">That password didn&rsquo;t match. Try again, or email me for access.</p>
          )}
        </div>
      </div>
    </div>
  );
}
