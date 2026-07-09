"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeadphoneBunny from "./components/HeadphoneBunny";
import CoverVideo from "./components/CoverVideo";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"work" | "gallery" | "about">("work");
  const [lightbox, setLightbox] = useState<{ images: { src: string; title: string }[]; index: number; category: string } | null>(null);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [galleryMode, setGalleryMode] = useState<"ux" | "art">("ux");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navInd, setNavInd] = useState({ left: 0, width: 0, ready: false });
  const folderRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const [fdim, setFdim] = useState({ w: 0, h: 0, tabw: 0 });
  const asideRef = useRef<HTMLElement>(null);
  const [asideTop, setAsideTop] = useState(24);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion: swap autoplaying video covers for their poster frame
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Some browsers pause looping covers in background tabs without resuming — re-kick on return
  useEffect(() => {
    const resume = () => {
      if (document.hidden) return;
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => {
        if (v.paused && !v.ended) v.play().catch(() => {});
      });
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);

  // Measure the folder + its tab so we can draw one continuous outline stroke
  useLayoutEffect(() => {
    const measure = () => {
      const f = folderRef.current;
      if (f) setFdim({ w: f.offsetWidth, h: f.offsetHeight, tabw: tabRef.current?.offsetWidth ?? 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (folderRef.current) ro.observe(folderRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [activeTab]);

  // Sticky-but-fully-visible left profile panel: if it's taller than the
  // viewport, offset its sticky top so scrolling reveals the whole panel.
  useLayoutEffect(() => {
    const compute = () => {
      const a = asideRef.current;
      if (!a) return;
      const margin = 24;
      const extra = a.offsetHeight + margin * 2 - window.innerHeight;
      setAsideTop(extra > 0 ? margin - extra : margin);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (asideRef.current) ro.observe(asideRef.current);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, [activeTab]);

  // Single continuous path: tab (top-left bump) flowing into the folder body
  const folderOutline = (W: number, H: number, TW: number) => {
    const O = 20, R = 40, rt = 20; // tab overhang, folder radius, tab radius
    return (
      `M ${rt} 0 H ${TW - rt} A ${rt} ${rt} 0 0 1 ${TW} ${rt} ` +
      `H ${W - R} A ${R} ${R} 0 0 1 ${W} ${O + R} ` +
      `V ${H + O - R} A ${R} ${R} 0 0 1 ${W - R} ${H + O} ` +
      `H ${R} A ${R} ${R} 0 0 1 0 ${H + O - R} ` +
      `V ${rt} A ${rt} ${rt} 0 0 1 ${rt} 0 Z`
    );
  };

  // Slide the nav's active pill smoothly to the selected tab
  useEffect(() => {
    const measure = () => {
      const btn = navRef.current?.querySelector<HTMLElement>(`[data-tab="${activeTab}"]`);
      if (btn) setNavInd({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeTab]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(l => l && l.index < l.images.length - 1 ? { ...l, index: l.index + 1 } : l);
      if (e.key === "ArrowLeft") setLightbox(l => l && l.index > 0 ? { ...l, index: l.index - 1 } : l);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);


  // Honor /?tab=work|gallery|about (e.g. nav links from sub-pages)
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "work" || tab === "gallery" || tab === "about") {
      setActiveTab(tab);
      setTimeout(() => document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  }, []);

  const scrollToTabs = () =>
    document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen font-[family-name:var(--font-clother)] bg-white">

      {/* ══ FIXED PILL NAV — top-right, frosted, sticks on scroll, never overlaps the folder ══ */}
      <div className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-3 sm:px-8 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex justify-end">
        <nav ref={navRef} className="pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5 border border-white/70 backdrop-blur-xl shadow-[0_14px_36px_-16px_rgba(30,64,175,0.42)]" style={{ background: "rgba(231,237,255,0.92)" }}>
          {/* sliding active pill */}
          <span
            aria-hidden
            className="absolute top-1.5 bottom-1.5 rounded-full shadow-[0_2px_8px_-2px_rgba(30,64,175,0.55)] transition-all duration-300 ease-out"
            style={{ left: navInd.left, width: navInd.width, background: "#1e40af", opacity: navInd.ready ? 1 : 0 }}
          />
          {(["work", "gallery", "about"] as const).map((tab) => (
            <button
              key={tab}
              data-tab={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? "page" : undefined}
              className={`relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-[15px] font-medium transition-colors duration-300 ${
                activeTab === tab ? "text-white" : "text-[#1e40af] hover:text-[#1e40af]"
              }`}
            >
              {tab}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1jwPjB_1K1uUPAzZvG07NmMOscvQHCwWI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-[15px] font-medium text-[#1e40af] hover:text-[#1e40af] transition-colors duration-200"
          >
            resume
          </a>
        </nav>
        </div>
      </div>

      {/* ══ FOLDER ══ */}
      <div id="tabs-section" className="px-3 sm:px-8 pt-20 sm:pt-24 pb-20">

        {/* The big folder */}
        <div
          ref={folderRef}
          className="relative max-w-[1320px] mx-auto rounded-tr-[2.5rem] rounded-b-[2.5rem] shadow-[0_40px_100px_-52px_rgba(29,78,216,0.22)] px-5 sm:px-14 pt-11 sm:pt-14 pb-16"
          style={{ background: "#f4f7ff" }}
        >

          {/* Folder left tab (background fill only; outline drawn by the SVG below) */}
          <div ref={tabRef} className="absolute -top-5 left-0 h-7 w-36 sm:w-56 rounded-t-[20px]" style={{ background: "#f4f7ff" }} />

          {/* One continuous outline stroke for the tab + folder, perfectly aligned */}
          {fdim.w > 0 && (
            <svg
              className="pointer-events-none absolute left-0 z-10"
              style={{ top: -20, width: fdim.w, height: fdim.h + 20, overflow: "visible" }}
              viewBox={`0 0 ${fdim.w} ${fdim.h + 20}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d={folderOutline(fdim.w, fdim.h, fdim.tabw)} stroke="#c9d5f7" strokeWidth={1} />
            </svg>
          )}

          {/* HERO — work tab */}
          {activeTab === "work" && (
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 pt-6 sm:pt-10 pb-10 sm:pb-16">
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.02em] text-[#1D4ED8] mb-8">lydia park</h1>
                <p className="text-[14px] sm:text-base text-[#6e6e73] leading-[1.9] max-w-xl">
                  A product designer who bridges{" "}
                  <span className="hl-hover">systems thinking<span className="hl-tip">structure, patterns, scale</span></span> and{" "}
                  <span className="hl-hover">visual craft<span className="hl-tip">type, color, motion</span></span>, grounding interface decisions in{" "}
                  <span className="hl-hover">how real people think and feel<span className="hl-tip">research + psychology</span></span>, to make complex products{" "}
                  <span className="hl-hover">clear and human<span className="hl-tip">simple, honest, usable</span></span>.
                </p>
              </div>
              <div className="shrink-0 flex justify-center lg:justify-end lg:w-[420px]">
                <HeadphoneBunny className="w-40 sm:w-52 lg:w-[280px] lg:mr-28" />
              </div>
            </div>
          )}

          {/* WORK — folder-style project cards */}
          {activeTab === "work" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10 items-start">
              {[
                { href: "/sparc",         cover: "/images/sparc/cover-poster.webp",           video: "/videos/sparc-cover.mp4", bg: "#0C0C0C",                          title: "SPARC Sports",      label: "Product Design", tags: ["Shipped", "Systems", "Website"], desc: "Led brand and UI redesign for SPARC — boosting athlete engagement by 60%", cta: "view case study!", meta: [["Role", "Lead Product Designer"], ["Team", "2 Product Designers"], ["Timeframe", "Aug 2025 – Present"]] },
                { href: "/copilot",       cover: "/images/copilot-hero.png",                  video: null,                      bg: "#d0e4ff",                          title: "Microsoft Copilot", label: "AI Product", tags: ["Shipped", "AI"],      desc: "Redesigned Copilot interactions — enabling 10× faster AI access",          cta: "view case study!", meta: [["Role", "Product Designer"], ["Team", "2 Designers, 2 PMs"], ["Timeframe", "Aug 2025 – Jan 2026"]] },
                { href: "/blumiin",       cover: "/images/blumiin/cover-poster.png",          video: "/videos/blumiin-cover.mp4", bg: "#365a3d",                        title: "Blumiin",           label: "Product Concept", tags: ["Hackathon Winner", "Concept"],  desc: "Designed an honest herbal-remedy app — winner of the Skandalaris intern pitch", cta: "view case study!", meta: [["Role", "Designer — team of 5"], ["Context", "Skandalaris Hackathon"], ["Timeframe", "June 2026"]] },
                { href: "/little-prince", cover: "/images/little-prince/lp-card-cover-v2.png", video: null,                     bg: "#1a1a2e",                          title: "Le Petite Route",   label: "Mobile Concept", tags: ["Concept", "Mobile"],  desc: "Created a story-driven travel experience inspired by The Little Prince",    cta: "view the journey!", meta: [["Timeframe", "March 2025"], ["Duration", "5 Weeks"], ["Tools", "Figma, Photoshop, Procreate"]] },
                { href: "/amc",           cover: "/images/amc/amc-card-cover.png",            video: null,                      bg: "linear-gradient(135deg, #c0392b 0%, #e8a598 100%)", title: "AMC Rebrand", label: "Brand Identity", tags: ["Shipped", "Brand"],   desc: "Designed a new brand identity system for AMC",                             cta: "view rebrand!", meta: [["Role", "Brand Designer"], ["Client", "AMC @ WashU"], ["Timeframe", "August 2025"]] },
              ].map((p, i) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group relative block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1"
                >
                  {/* Folder tab — tucked behind the card at rest, rises up on hover */}
                  <div className="pointer-events-none absolute left-7 -top-[26px] z-0 flex items-center gap-2 rounded-t-[0.85rem] border border-b-0 border-[#8ea6ef] bg-white px-4 pt-1.5 pb-3.5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span className="font-mono text-[11px] font-semibold tracking-widest text-[#1D4ED8]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1d1d1f]">{p.label}</span>
                  </div>

                  {/* Card — clean bordered container at rest, blue folder on hover */}
                  <div className="relative z-10 rounded-[1.6rem] border border-[#e5e7f1] bg-white p-3.5 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_10px_30px_-24px_rgba(30,64,175,0.22)] group-hover:border-[#8ea6ef] group-hover:shadow-[0_22px_48px_-26px_rgba(30,64,175,0.32)]">
                    {/* Cover — inset, rounded; video covers loop muted, fall back to the poster for reduced motion */}
                    <div className="relative aspect-[16/10] rounded-[1.15rem] overflow-hidden" style={{ background: p.bg }}>
                      {p.video && !reducedMotion ? (
                        <video
                          src={p.video}
                          poster={p.cover}
                          autoPlay
                          muted
                          loop
                          playsInline
                          // React doesn't serialize `muted` into SSR HTML, so Chrome blocks the
                          // pre-hydration autoplay attempt — re-kick playback on mount
                          ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
                          aria-label={p.title}
                          className="absolute inset-0 h-full w-full object-contain transition-transform duration-[650ms] ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <Image src={p.cover} alt={p.title} fill className={`${p.video ? "object-contain" : "object-cover"} transition-transform duration-[650ms] ease-out group-hover:scale-[1.04]`} />
                      )}
                    </div>
                    {/* Text */}
                    <div className="px-2 pt-4 pb-1.5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[#1D4ED8] transition-colors duration-300">{p.title}</h3>
                        {p.tags.length > 0 && (
                          <div className="flex flex-wrap justify-end gap-1.5 shrink-0 opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                            {p.tags.map((t) => (
                              <span key={t} className="rounded-full border border-[#c3d0ff] px-2.5 py-[3px] text-[11px] font-medium text-[#1D4ED8] whitespace-nowrap">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#6e6e73] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (() => {
            type Piece = { src: string; title: string; medium: string; cat: string };
            const pieces: Piece[] = [
              { src: "/images/gallery/Out-of-Reach.JPG", title: "Out of Reach", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/My-Obsessions.JPG", title: "My Obsessions", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/Ties-That-Binds.JPG", title: "Ties That Bind", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/Unmasking-Still-Life.JPG", title: "Unmasking Still Life", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/Refined.JPG", title: "Refined", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/Karma-Bunny.JPG", title: "Karma Bunny", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/IMG_0752-2.jpg", title: "", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/IMG_0760.jpg", title: "", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/IMG_0761.jpg", title: "", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/IMG_0762.jpg", title: "", medium: "Painting", cat: "painting" },
              { src: "/images/gallery/clay/IMG_9299.jpg", title: "", medium: "Ceramics", cat: "clay" },
              { src: "/images/gallery/clay/IMG_9301.jpg", title: "", medium: "Ceramics", cat: "clay" },
              { src: "/images/gallery/clay/IMG_9307.jpg", title: "", medium: "Ceramics", cat: "clay" },
              { src: "/images/gallery/clay/IMG_9308.jpg", title: "", medium: "Ceramics", cat: "clay" },
              { src: "/images/gallery/clay/IMG_9309.jpg", title: "", medium: "Ceramics", cat: "clay" },
              ...[1, 2, 3, 4, 5].map((n) => ({ src: `/images/gallery/Gesture_Drawing-${n}.${n === 5 ? "jpg" : "JPG"}`, title: `Gesture Study 0${n}`, medium: "Gesture", cat: "gestural" })),
              { src: "/images/gallery/Collaged-Reminiscence.JPG", title: "Collaged Reminiscence", medium: "Collage", cat: "collage" },
              { src: "/images/gallery/IMG_3542.jpg", title: "", medium: "Collage", cat: "collage" },
              { src: "/images/gallery/IMG_3332-min.png", title: "", medium: "Collage", cat: "collage" },
              { src: "/images/gallery/LydiaPark_2D_Zine-copy.png", title: "2D Zine", medium: "Collage", cat: "collage" },
              { src: "/images/gallery/stainline-font-post-1.png", title: "Stainline", medium: "Type", cat: "type" },
              { src: "/images/gallery/stainline-font-post-2.png", title: "", medium: "Type", cat: "type" },
              { src: "/images/gallery/stainline-font-post-3.png", title: "", medium: "Type", cat: "type" },
              { src: "/images/gallery/stainline-font-post-4.png", title: "", medium: "Type", cat: "type" },
              { src: "/images/gallery/type-I-post-1.png", title: "Type I", medium: "Type", cat: "type" },
              { src: "/images/gallery/type-I-post-2.png", title: "", medium: "Type", cat: "type" },
              { src: "/images/gallery/type-I-post-3.png", title: "", medium: "Type", cat: "type" },
              { src: "/images/gallery/Untitled_Artwork-55.png", title: "", medium: "Digital", cat: "digital" },
              { src: "/images/gallery/Me-Myself-and-I.JPG", title: "Me, Myself, and I", medium: "Digital", cat: "digital" },
              { src: "/images/gallery/Childhood.JPG", title: "Childhood", medium: "Digital", cat: "digital" },
            ];

            const filters = [
              { id: "all", label: "All" },
              { id: "painting", label: "Painting" },
              { id: "clay", label: "Ceramics" },
              { id: "gestural", label: "Gesture" },
              { id: "collage", label: "Collage" },
              { id: "type", label: "Type" },
              { id: "digital", label: "Digital" },
            ];

            const shown = galleryFilter === "all" ? pieces : pieces.filter((p) => p.cat === galleryFilter);

            // UX design extras — add projects here. Example:
            // { src: "/images/gallery/ux/project-cover.png", title: "Project Name", desc: "One-line description", href: "/project-page" }
            type UxProject = { src: string; title: string; desc: string; href?: string; video?: string; tags?: string[]; hoverSrc?: string; breakBefore?: boolean };
            const uxProjects: UxProject[] = [
              { src: "/images/gallery/ux/robbie-meadow-poster.png", video: "/videos/robbie-meadow.mp4", title: "WashUX Club Website Game", desc: "Playable meadow for Robbie, the WashUX mascot — built for the club site", href: "https://washuxclub.com/", tags: ["WashUX", "Interactive"] },
              { src: "/images/gallery/ux/focusghost-cover.png", video: "/videos/focusghost-cover.mp4", title: "FocusGhost — DevFest '26 Hackathon Project", desc: "Focus-tracking desktop app that visualizes when work becomes ghosted", href: "https://devpost.com/software/focusghost", tags: ["Hackathon", "Desktop"] },
              { src: "/images/gallery/ux/referencepoint-cover.png", video: "/videos/referencepoint-branding.mp4", title: "ReferencePoint Branding", desc: "Brand identity and spring-physics logo reveal for ReferencePoint", tags: ["Branding", "Motion"] },
              { src: "/images/gallery/ux/atmosense-cover.jpg", title: "Atmosense — Figbuild '26 Hackathon Project", desc: "Sensory-aware navigation app that maps the city by comfort level", href: "https://sensory-compass.vercel.app/", tags: ["Hackathon", "Mobile"] },
              { src: "/images/gallery/ux/logofolio-poster.png", video: "/videos/logofolio.mp4", title: "Logofolio", desc: "Twelve marks drop, tumble, and lock into a glass grid: an animated logo folio", tags: ["Logos", "Motion"], breakBefore: true },
              { src: "/images/gallery/ux/amass-logo-skeleton.png", hoverSrc: "/images/gallery/ux/amass-logo-hover.png", title: "AMASS Logo Branding", desc: "Logo construction — the AMASS mark built on a geometric grid system", tags: ["Branding", "Logo"] },
              { src: "/images/gallery/ux/touchdesigner-hike-process-poster.jpg", video: "/videos/touchdesigner-hike-process.mp4", title: "Touch Designer Hike Video — Process", desc: "Behind the scenes — the node network driving the hike visuals", tags: ["TouchDesigner", "Process"] },
            ];

            return (
              <div className="pt-2 pb-16">
                {/* Header row — title + description left, mode toggle right, top-aligned */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#1d1d1f]">Gallery</h2>
                    <p className="text-sm text-[#8e8e93] mt-1">
                      {galleryMode === "art" ? "Paintings, ceramics, type, and everything in between." : "UX design extras and side explorations."}
                    </p>
                  </div>
                  {/* Mode toggle: UX Extras ↔ Art */}
                  <div className="inline-flex items-center gap-0.5 rounded-full bg-[#eef2ff] p-1 shrink-0">
                    {([["ux", "UX Extras"], ["art", "Art"]] as const).map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setGalleryMode(id)}
                        aria-pressed={galleryMode === id}
                        className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${galleryMode === id ? "bg-white text-[#1D4ED8] shadow-[0_2px_8px_rgba(29,78,216,0.14)]" : "text-[#6e6e73] hover:text-[#1D4ED8]"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Art filter chips — own row below the header */}
                {galleryMode === "art" && (
                  <div className="flex flex-wrap gap-2 mb-8 -mt-2">
                    {filters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setGalleryFilter(f.id)}
                        className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${galleryFilter === f.id ? "bg-[#1D4ED8] text-white" : "bg-[#eef2ff] text-[#1D4ED8] hover:bg-[#e0e8ff]"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}

                {galleryMode === "art" ? (
                  /* Staggered masonry */
                  <div className="columns-2 md:columns-3 gap-5">
                    {shown.map((p, i) => (
                      <figure
                        key={p.src}
                        className="group break-inside-avoid mb-6 cursor-zoom-in"
                        onClick={() => setLightbox({ images: shown, index: i, category: p.medium })}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt={p.title || p.medium} loading="lazy" className="w-full rounded-[10px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90" />
                        <figcaption className="mt-2 px-0.5">
                          <p className="text-[13px] text-[#1d1d1f] leading-tight">{p.title || "Untitled"}</p>
                          <p className="text-[11px] uppercase tracking-[0.1em] text-[#8b8fe8] mt-0.5">{p.medium}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : uxProjects.length > 0 ? (
                  /* UX extras — masonry columns so rows don't force-match heights */
                  <div className="columns-1 sm:columns-2 gap-6">
                    {uxProjects.map((p) => {
                      const card = (
                        <>
                          <div className="relative rounded-[10px] overflow-hidden border border-[#e5e7f1]">
                            {p.video ? (
                              <CoverVideo src={p.video} poster={p.src} label={p.title} className="w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]" />
                            ) : (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={p.src} alt={p.title} loading="lazy" className="w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]" />
                            )}
                            {p.hoverSrc && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={p.hoverSrc} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
                            )}
                          </div>
                          <div className="mt-2.5 px-0.5 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[14px] font-medium text-[#1d1d1f] leading-tight">{p.title}</p>
                              <p className="text-[13px] text-[#8e8e93] mt-0.5">{p.desc}</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 pt-0.5 opacity-0 translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-y-0">
                              {(p.tags ?? []).map((t) => (
                                <span key={t} className="rounded-full border border-[#c3d0ff] px-2.5 py-[3px] text-[11px] font-medium text-[#1D4ED8] whitespace-nowrap">{t}</span>
                              ))}
                              {p.href?.startsWith("http") && (
                                <svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true" className="ml-1 text-[#1D4ED8]">
                                  <path d="M4 10L10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </>
                      );
                      const external = p.href?.startsWith("http");
                      const wrapCls = `group break-inside-avoid mb-6${p.breakBefore ? " sm:[break-before:column]" : ""}`;
                      return p.href ? (
                        <a key={p.title} href={p.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`${wrapCls} block`}>{card}</a>
                      ) : (
                        <div key={p.title} className={wrapCls}>{card}</div>
                      );
                    })}
                  </div>
                ) : (
                  /* UX extras — empty state until projects are added */
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-[10px] border border-dashed border-[#c9d5f7] bg-white/60 flex items-center justify-center text-[13px] text-[#8e8e93]"
                      >
                        coming soon ✦
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

                    {activeTab === "about" && (
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

              {/* ── PROFILE CARD ── */}
              <aside ref={asideRef} className="self-start lg:sticky" style={{ top: asideTop }}>
                <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden border border-[#e5e7f1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/about/headshot.webp" alt="Lydia Park" className="w-full h-full object-cover" style={{ objectPosition: "center top" }} />
                </div>
                <p className="text-xs text-[#8e8e93] mt-2 mb-4">At a hanok village in Korea ☁️</p>
                <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#1d1d1f]">lydia park</h2>
                <p className="text-sm font-medium text-[#1D4ED8] mt-0.5">Product Designer</p>
                <p className="text-[13px] text-[#6e6e73] leading-[1.7] mt-3">
                  <span className="text-[#1d1d1f] font-medium">St. Louis, MO</span><br />
                  Comm Design B.F.A. + HCI<br />
                  WashU ’28
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <a href="https://drive.google.com/file/d/1jwPjB_1K1uUPAzZvG07NmMOscvQHCwWI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-[13px] font-medium bg-[#1D4ED8] text-white hover:bg-[#1740b8] transition-colors">Resume</a>
                  <a href="mailto:liapaark@gmail.com" className="rounded-full px-4 py-2 text-[13px] font-medium border border-[#c9d5f7] bg-white text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-colors">Email</a>
                  <a href="https://www.linkedin.com/in/lydia-paark" target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-[13px] font-medium border border-[#c9d5f7] bg-white text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-colors">LinkedIn</a>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["UX / Product", "AI Experiences", "Design Systems", "Brand", "Illustration", "Prototyping", "Creative Coding"].map((sk) => (
                    <span key={sk} className="bg-[#eef2ff] text-[#1D4ED8] rounded-full px-3 py-1.5 text-xs font-medium">{sk}</span>
                  ))}
                </div>
              </aside>

              {/* ── MAIN ── */}
              <main className="min-w-0 pb-4">

                {/* About */}
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b8fe8] mb-4">About</p>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#1d1d1f] mb-4">Hi, I’m Lydia!</h3>
                  <div className="space-y-3.5 text-[15px] text-[#3a3a3c] leading-[1.75] max-w-2xl">
                    <p>I’m a <span className="hl">Communication Design</span> major with a minor in <span className="hl">Human-Computer Interaction</span> at WashU, but more than that, I’m someone who’s always creating.</p>
                    <p>My journey started doodling bunnies in notebook corners and evolved into painting murals, designing t-shirts, and building visual stories that connect people. I love finding that sweet spot where creativity meets purpose.</p>
                    <p>Right now I’m diving into <span className="hl">visual storytelling, UI/UX, and interactive design</span>, projects that mix strategy with emotion; designs that don’t just look good, but feel right.</p>
                    <p>When I’m not designing I’m probably sipping matcha, listening to music, or daydreaming about my next painting.</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b8fe8]">Experience</p>
                    <a href="https://drive.google.com/file/d/1jwPjB_1K1uUPAzZvG07NmMOscvQHCwWI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8edff] text-[#1D4ED8] text-[11px] font-semibold hover:bg-[#d0daff] active:scale-95 transition-all duration-150">Resume ↗</a>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "Skandalaris Design Agency", role: "Creator / Product Design Intern", period: "Aug 2025–Present",  logo: "/images/about/logo-washu.webp",         contain: false, href: "https://skandalaris.wustl.edu/resource/skandalaris-design-agency/", tags: ["Brand Systems", "MVP", "Product", "Startups"], desc: "Designed brand identities and product interfaces for early-stage startups, translating founder goals into scalable digital experiences." },
                      { name: "SPARC",                     role: "UI/UX & Web Designer",       period: "Sept 2025–Present", logo: "/images/about/logo-sparc.webp",         contain: false, href: null,                                                                  tags: ["UI/UX", "Brand Systems", "Athlete Platform"], desc: "Redesigned UI/UX and brand systems for an athlete recruiting platform, driving +60% athlete engagement through improved interface hierarchy and visual identity." },
                      { name: "Product Space",             role: "VP of Design",               period: "Aug 2025–Present",  logo: "/images/about/logo-product-space.webp", contain: true,  href: "https://www.washuproduct.com/",                                       tags: ["Design Leadership", "Mentorship", "Community"], desc: "Led design initiatives for a student product design community, mentoring designers and organizing product workshops for a growing cohort of fellows." },
                      { name: "Bear Studios LLC",          role: "Design Consultant & Director of Marketing", period: "Aug 2025–Present",  logo: "/images/about/logo-bear-studios.webp",  contain: false, href: null,                                                                  tags: ["Product", "Brand", "Strategy", "Marketing"],  desc: "Consulted in a 2-person design team to deliver product, brand, and strategy solutions for startup clients." },
                    ].map(({ name, role, period, logo, contain, href, tags, desc }) => (
                      <div
                        key={name}
                        className={`border rounded-2xl px-4 py-3.5 cursor-pointer transition-colors duration-200 ${expandedExp === name ? "bg-[#f0f4ff] border-[#c9d5f7]" : "bg-white border-[#e5e7f1] hover:bg-[#f6f8ff] hover:border-[#c9d5f7]"}`}
                        onClick={() => setExpandedExp(expandedExp === name ? null : name)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-[#e8e8ed] overflow-hidden" style={{ background: "#f5f5f7" }}>
                            {logo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={logo} alt={name} className={contain ? "w-8 h-8 object-contain" : "w-full h-full object-cover"} />
                            ) : (
                              <span className="text-[18px] font-bold" style={{ color: "#e67e22" }}>P</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {href ? (
                              <a href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[15px] font-semibold text-[#1d1d1f] hover:text-[#1D4ED8] transition-colors block">{name} ↗</a>
                            ) : (
                              <p className="text-[15px] font-semibold text-[#1d1d1f]">{name}</p>
                            )}
                            <p className="text-[13px] text-[#6e6e73]">{role}<span className="text-[#c0c0c0] mx-1">·</span>{period}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {tags.map((t, ti) => (
                                <span key={t} className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide font-medium ${ti === 0 || t === "MVP" ? "bg-[#dbe4ff] text-[#1D4ED8]" : "bg-white border border-[#e5e7f1] text-[#6e6e73]"}`}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[#c0c0c0] text-xs shrink-0 self-start mt-1">{expandedExp === name ? "▲" : "▼"}</span>
                        </div>
                        {expandedExp === name && (
                          <p className="mt-3 text-[13px] text-[#6e6e73] leading-relaxed pl-16">{desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community */}
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b8fe8] mb-4">Community</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Asian Multicultural Council", role: "Public Relations Chair", img: "/images/about/amc.webp", alt: "AMC group photo", href: "https://www.instagram.com/wustlamc/" },
                      { name: "Skandalaris Design Agency", role: "Agency Web Designer", img: "/images/about/skandalaris.webp", alt: "Skandalaris Center", href: "https://skandalaris.wustl.edu/resource/skandalaris-design-agency/" },
                      { name: "Product Space", role: "Product Design Fellow · VP of Design", img: "/images/about/product-space.webp", alt: "Product Space fellows", href: "https://www.washuproduct.com/" },
                    ].map(({ name, role, img, alt, href }) => (
                      <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="block border border-[#e5e7f1] rounded-2xl overflow-hidden bg-white hover:bg-[#f6f8ff] hover:border-[#c9d5f7] transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={alt} loading="lazy" className="w-full h-64 object-cover" />
                        <div className="p-4">
                          <p className="text-[15px] font-semibold text-[#1d1d1f]">{name}</p>
                          <p className="text-[13px] text-[#8e8e93] mt-0.5">{role}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Values */}
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b8fe8] mb-4">Values</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Always Stay Curious.", desc: "There's always more to learn and more ways to see the world." },
                      { title: "Less is more.", desc: "Simplicity is harder than complexity. Editing is the real design skill." },
                      { title: "Learn from mistakes.", desc: "Every wrong turn is data. Iterate relentlessly and grow." },
                      { title: "Design with purpose.", desc: "Not decoration. Good design solves real problems for real people." },
                    ].map(({ title, desc }) => (
                      <div key={title} className="border border-[#e6eaf6] rounded-2xl p-4 bg-white hover:bg-[#f6f8ff] transition-colors">
                        <p className="text-[#8b8fe8] text-sm mb-2">✦</p>
                        <p className="text-sm font-semibold text-[#1d1d1f] mb-1">{title}</p>
                        <p className="text-xs text-[#8e8e93] leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Life, lately */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b8fe8] mb-4">Life, lately</p>
                  <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                    {[
                      { src: "/images/about/gangeung.webp", alt: "Gangeung beach" },
                      { src: "/images/about/areum.webp", alt: "Areum the dog" },
                      { src: "/images/about/painting.webp", alt: "Painting" },
                      { src: "/images/about/pullman.webp", alt: "Pullman fields" },
                      { src: "/images/about/matcha.webp", alt: "Matcha" },
                    ].map(({ src, alt }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt={alt} loading="lazy" className="shrink-0 h-40 w-auto rounded-2xl object-cover" />
                    ))}
                  </div>
                </div>

              </main>
            </div>
          )}

        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Window */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ width: "72vw", maxWidth: 860 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa] rounded-t-2xl select-none shrink-0">
              <button onClick={() => setLightbox(null)} className="group flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200"><path d="M1 1L13 13M13 1L1 13" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <span className="ml-3 text-xs font-medium truncate max-w-[300px] uppercase tracking-wide opacity-30" style={{ color: "#1D4ED8" }}>
                {lightbox.category}
              </span>
              <span className="ml-auto text-xs text-[#c0c0c0]">{lightbox.index + 1} / {lightbox.images.length}</span>
            </div>

            {/* Image area — fixed height, black bg, image centered */}
            <div className="relative flex items-center justify-center bg-black" style={{ height: "65vh" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.images[lightbox.index].src}
                alt={lightbox.images[lightbox.index].title}
                style={{ maxWidth: "calc(100% - 100px)", maxHeight: "65vh", objectFit: "contain", display: "block" }}
              />

              {/* Left arrow — centered, always visible */}
              <button
                onClick={() => setLightbox(l => l && l.index > 0 ? { ...l, index: l.index - 1 } : l)}
                className="absolute left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#e5e5e7] flex items-center justify-center hover:bg-white shadow-sm transition-all"
                style={{ top: "50%", transform: "translateY(-50%)", opacity: lightbox.index === 0 ? 0.3 : 1, cursor: lightbox.index === 0 ? "default" : "pointer" }}
              ><svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M8 2L2 8L8 14" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>

              {/* Right arrow — centered, always visible */}
              <button
                onClick={() => setLightbox(l => l && l.index < l.images.length - 1 ? { ...l, index: l.index + 1 } : l)}
                className="absolute right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#e5e5e7] flex items-center justify-center hover:bg-white shadow-sm transition-all"
                style={{ top: "50%", transform: "translateY(-50%)", opacity: lightbox.index === lightbox.images.length - 1 ? 0.3 : 1, cursor: lightbox.index === lightbox.images.length - 1 ? "default" : "pointer" }}
              ><svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M2 2L8 8L2 14" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            </div>

            {/* Caption */}
            {lightbox.images[lightbox.index].title && (
              <div className="px-5 py-2.5 border-t border-[#f0f0f0] bg-white rounded-b-2xl shrink-0">
                <p className="text-xs text-[#1d1d1f] font-medium">{lightbox.images[lightbox.index].title}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="relative z-30 bg-[#f4f7ff] px-8 sm:px-16 py-10 mt-6">

        {/* 3-column desktop, stacked mobile */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-start gap-8 mb-10">

          {/* Left: name */}
          <div>
            <p className="text-base font-bold text-[#1D4ED8]">lydia park</p>
            <p className="text-xs text-[#8e8e93] mt-1.5">Thanks for dropping in, let&apos;s chat!</p>
          </div>

          {/* Center: nav */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <button onClick={() => { setActiveTab("work");    scrollToTabs(); }} className="text-left text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(work)</button>
            <button onClick={() => { setActiveTab("gallery"); scrollToTabs(); }} className="text-left text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(gallery)</button>
            <button onClick={() => { setActiveTab("about");   scrollToTabs(); }} className="text-left text-xs text-[#8e8e93] hover:text-[#1D4ED8] transition-colors">(about)</button>
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
          <p className="text-[11px] text-gray-400">Designed &amp; built with Next.js</p>
          <p className="text-[11px] text-gray-400">© 2026 Lydia Park</p>
        </div>

      </footer>

    </div>
  );
}
