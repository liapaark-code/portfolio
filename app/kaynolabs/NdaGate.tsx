"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "kayno-nda-unlocked";

/**
 * Private approval link. Send someone
 *   https://lydiapaark.com/kaynolabs?access=kl-douglass-7bf42a9e
 * and clicking it unlocks the case study for them permanently on their device,
 * with no password to type. Change this string anytime to revoke old links.
 */
const ACCESS_TOKEN = "kl-douglass-7bf42a9e";

/**
 * Optional: paste a Web3Forms access key (free, from https://web3forms.com) to have
 * recruiter requests emailed straight to you. If left empty, the request button
 * falls back to opening a pre-filled email in the visitor's mail app.
 */
const WEB3FORMS_KEY = "95a80eb4-3841-4a94-b824-aacff6ed180e";
const CONTACT_EMAIL = "liapaark@gmail.com";

/**
 * NDA gate for the Kayno Labs case study. The preview (title, TL;DR, cover, brief)
 * renders above this; everything passed as `children` stays locked behind a password.
 * When locked, a blurred, clipped peek sits behind a horizontal lock card. Visitors
 * can request access; an approval link unlocks it for them automatically.
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
  const [ready, setReady] = useState(false);       // storage / link checked yet?
  const [animate, setAnimate] = useState(false);    // only fade in on a fresh unlock
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(false);

  // Recruiter request form
  const [mode, setMode] = useState<"locked" | "request" | "requested">("locked");
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqCompany, setReqCompany] = useState("");
  const [sending, setSending] = useState(false);

  // Restore the unlock (approval link or prior visit) before first paint.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access");
      if (token && token === ACCESS_TOKEN) {
        localStorage.setItem(STORAGE_KEY, "1");
        // Strip the token out of the address bar so it looks clean.
        params.delete("access");
        const clean = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
        window.history.replaceState(null, "", clean);
        setUnlocked(true);
      } else if (localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {}
    setReady(true);
  }, []);

  // While we haven't checked yet, render a neutral spacer so a returning
  // (already-unlocked) visitor never sees the lock screen flash.
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

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName.trim() || !reqEmail.trim()) return;
    setSending(true);

    const summary = `${reqName}${reqCompany ? ` (${reqCompany})` : ""} is requesting access to the Kayno Labs case study. Reply to ${reqEmail} with the access link.`;

    try {
      if (WEB3FORMS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: "Kayno Labs case study: access request",
            from_name: reqName,
            email: reqEmail,
            company: reqCompany,
            message: summary,
          }),
        });
      } else {
        const subject = encodeURIComponent("Kayno Labs case study: access request");
        const body = encodeURIComponent(
          `Name: ${reqName}\nCompany: ${reqCompany}\nEmail: ${reqEmail}\n\nRequesting access to the Kayno Labs case study.`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      }
      setMode("requested");
    } catch {
      const subject = encodeURIComponent("Kayno Labs case study: access request");
      const body = encodeURIComponent(
        `Name: ${reqName}\nCompany: ${reqCompany}\nEmail: ${reqEmail}\n\nRequesting access to the Kayno Labs case study.`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setMode("requested");
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full rounded-full border border-[#c3d0ff] bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#1D4ED8]";

  return (
    <div className="relative mb-24 sm:mb-32">
      {/* Blurred, clipped peek of the locked case study */}
      <div className="pointer-events-none select-none h-[520px] overflow-hidden opacity-50 [filter:blur(8px)]" aria-hidden="true">
        {children}
      </div>
      {/* Fade the peek into white so nothing readable leaks past the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/65 to-white" />

      {/* Lock card, centered over the peek, portfolio blue system */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-[1.6rem] px-6 py-6 sm:px-9 sm:py-7 shadow-[0_30px_80px_-38px_rgba(30,64,175,0.4)]" style={{ background: "var(--card-blue)", border: "1px solid var(--card-blue-border)" }}>

          {/* ── Default locked state: copy + password ── */}
          {mode === "locked" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
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
                      Under NDA with Kayno Labs. Enter the password, or request access below.
                    </p>
                  </div>
                </div>

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
                <p className="mt-3 text-xs text-[#e5484d] sm:pl-[60px]">That password didn&rsquo;t match. Try again, or request access below.</p>
              )}

              <div className="mt-5 pt-4 border-t border-[#c3d0ff]/60 flex items-center justify-between gap-3 sm:pl-[60px]">
                <p className="text-xs text-gray-500">Recruiter or hiring manager?</p>
                <button
                  type="button"
                  onClick={() => setMode("request")}
                  className="text-xs font-semibold text-[#1D4ED8] hover:underline"
                >
                  Request access &rarr;
                </button>
              </div>
            </>
          )}

          {/* ── Request access form ── */}
          {mode === "request" && (
            <form onSubmit={sendRequest}>
              <div className="flex items-center gap-4 mb-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] border border-[#c3d0ff]">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z" stroke="#1D4ED8" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="m4 7 8 6 8-6" stroke="#1D4ED8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-black leading-snug">Request access</h2>
                  <p className="text-sm text-gray-600 mt-0.5">I&rsquo;ll review and email you a link that unlocks the full case study.</p>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={inputBase}
                />
                <input
                  type="text"
                  value={reqCompany}
                  onChange={(e) => setReqCompany(e.target.value)}
                  placeholder="Company (optional)"
                  aria-label="Company"
                  className={inputBase}
                />
              </div>
              <input
                type="email"
                required
                value={reqEmail}
                onChange={(e) => setReqEmail(e.target.value)}
                placeholder="Work email"
                aria-label="Work email"
                className={`${inputBase} mt-2.5`}
              />

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setMode("locked")}
                  className="text-xs font-medium text-gray-500 hover:text-[#1D4ED8]"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="shrink-0 rounded-full bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1e40af] disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send request"}
                </button>
              </div>
            </form>
          )}

          {/* ── Confirmation ── */}
          {mode === "requested" && (
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eafff4] border border-[#b7ecd2]">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="m5 12 4.5 4.5L19 7" stroke="#0ea77a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-black leading-snug">Request sent.</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Thanks{reqName ? `, ${reqName.split(" ")[0]}` : ""}. I&rsquo;ll review it and email you an access link that opens the full case study, usually within a day.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
