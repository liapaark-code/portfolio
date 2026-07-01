"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeadphoneBunny from "./components/HeadphoneBunny";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"work" | "gallery" | "about">("work");
  const [lightbox, setLightbox] = useState<{ images: { src: string; title: string }[]; index: number; category: string } | null>(null);
  const [activeGallerySection, setActiveGallerySection] = useState("gallery-clay");
  const [activeAboutSection, setActiveAboutSection] = useState("about-bio");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navInd, setNavInd] = useState({ left: 0, width: 0, ready: false });

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

  // Track active gallery section via IntersectionObserver
  useEffect(() => {
    if (activeTab !== "gallery") return;
    setActiveGallerySection("gallery-painting");
    const ids = ["gallery-painting", "gallery-clay", "gallery-gestural", "gallery-collage", "gallery-type", "gallery-digital-art"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveGallerySection(id);
      }, { threshold: 0.2 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [activeTab]);

  // Track active about section via IntersectionObserver
  useEffect(() => {
    if (activeTab !== "about") return;
    const ids = ["about-bio", "about-experience", "about-leadership", "about-values", "about-photos"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveAboutSection(id);
      }, { threshold: 0.2 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [activeTab]);

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
            href="https://drive.google.com/file/d/1gS96a0bIVfhp9Ei2HXeb5uNuoHeEzZLq/view?usp=drive_link"
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
          className="relative max-w-[1320px] mx-auto rounded-tr-[2.5rem] rounded-b-[2.5rem] border border-[#c9d5f7] shadow-[0_40px_100px_-52px_rgba(29,78,216,0.22)] px-5 sm:px-14 pt-11 sm:pt-14 pb-16"
          style={{ background: "#f4f7ff" }}
        >

          {/* Folder left tab */}
          <div className="absolute -top-5 left-0 h-7 w-36 sm:w-56 rounded-tl-[1.5rem] rounded-tr-[2.5rem] border-t border-l border-[#c9d5f7]" style={{ background: "#f4f7ff" }} />

          {/* HERO — work tab */}
          {activeTab === "work" && (
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 pt-6 sm:pt-10 pb-10 sm:pb-16">
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.02em] text-[#1D4ED8] mb-8">lydia park</h1>
                <p className="text-[14px] sm:text-base text-[#6e6e73] leading-[1.9] max-w-xl">
                  <span className="hl-hover">System-fluent<span className="hl-tip">tokens, patterns, scale</span></span> product designer bringing clarity to complex, ambiguous problem spaces through{" "}
                  <span className="hl-hover">prototyping<span className="hl-tip">test before build</span></span>,{" "}
                  <span className="hl-hover">interaction design<span className="hl-tip">states, flows, feedback</span></span>, and{" "}
                  <span className="hl-hover">rapid iteration<span className="hl-tip">learn, refine, repeat</span></span>.
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
                { href: "/sparc",         cover: "/images/sparc/cover-frame.png",             bg: "#0a2e1c",                                           title: "SPARC Sports",      label: "Product Design", tags: ["Shipped", "Systems"], desc: "Led brand and UI redesign for SPARC — boosting athlete engagement by 60%", cta: "view case study!", meta: [["Role", "Lead Product Designer"], ["Team", "2 Product Designers"], ["Timeframe", "Aug 2025 – Present"]] },
                { href: "/copilot",       cover: "/images/copilot-hero.png",                  bg: "#d0e4ff",                                           title: "Microsoft Copilot", label: "AI Product", tags: ["Shipped", "AI"],      desc: "Redesigned Copilot interactions — enabling 10× faster AI access",          cta: "view case study!", meta: [["Role", "Product Designer"], ["Team", "2 Designers, 2 PMs"], ["Timeframe", "Aug 2025 – Jan 2026"]] },
                { href: "/little-prince", cover: "/images/little-prince/lp-card-cover-v2.png", bg: "#1a1a2e",                                           title: "Le Petite Route",   label: "Mobile Concept", tags: ["Concept", "Mobile"],  desc: "Created a story-driven travel experience inspired by The Little Prince",    cta: "view the journey!", meta: [["Timeframe", "March 2025"], ["Duration", "5 Weeks"], ["Tools", "Figma, Photoshop, Procreate"]] },
                { href: "/amc",           cover: "/images/amc/amc-card-cover.png",            bg: "linear-gradient(135deg, #c0392b 0%, #e8a598 100%)", title: "AMC Rebrand",       label: "Brand Identity", tags: ["Shipped", "Brand"],   desc: "Designed a new brand identity system for AMC",                             cta: "view rebrand!", meta: [["Role", "Brand Designer"], ["Client", "AMC @ WashU"], ["Timeframe", "August 2025"]] },
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
                    {/* Cover — inset, rounded */}
                    <div className="relative aspect-[16/10] rounded-[1.15rem] overflow-hidden" style={{ background: p.bg }}>
                      <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.04]" />
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
            const clay = [
              { src: "/images/gallery/clay/IMG_9299.jpg", title: "" },
              { src: "/images/gallery/clay/IMG_9301.jpg", title: "" },
              { src: "/images/gallery/clay/IMG_9307.jpg", title: "" },
              { src: "/images/gallery/clay/IMG_9308.jpg", title: "" },
              { src: "/images/gallery/clay/IMG_9309.jpg", title: "" },
            ];
            const paintings = [
              { src: "/images/gallery/Out-of-Reach.JPG", title: "Out of Reach" },
              { src: "/images/gallery/My-Obsessions.JPG", title: "My Obsessions" },
              { src: "/images/gallery/Ties-That-Binds.JPG", title: "Ties That Bind" },
              { src: "/images/gallery/Unmasking-Still-Life.JPG", title: "Unmasking Still Life" },
              { src: "/images/gallery/Refined.JPG", title: "Refined" },
              { src: "/images/gallery/Karma-Bunny.JPG", title: "Karma Bunny" },
              { src: "/images/gallery/IMG_0752-2.jpg", title: "" },
              { src: "/images/gallery/IMG_0760.jpg", title: "" },
              { src: "/images/gallery/IMG_0761.jpg", title: "" },
              { src: "/images/gallery/IMG_0762.jpg", title: "" },
            ];
            const gesturals = [1,2,3,4,5].map(n => ({ src: `/images/gallery/Gesture_Drawing-${n}.${n===5?"jpg":"JPG"}`, title: `Gestural 0${n}` }));
            const collages = [
              { src: "/images/gallery/Collaged-Reminiscence.JPG", title: "Collaged Reminiscence" },
              { src: "/images/gallery/IMG_3542.jpg", title: "" },
              { src: "/images/gallery/IMG_3332-min.png", title: "" },
              { src: "/images/gallery/LydiaPark_2D_Zine-copy.png", title: "2D Zine" },
            ];
            const typeWork = [
              { src: "/images/gallery/stainline-font-post-1.png", title: "Stainline" },
              { src: "/images/gallery/stainline-font-post-2.png", title: "" },
              { src: "/images/gallery/stainline-font-post-3.png", title: "" },
              { src: "/images/gallery/stainline-font-post-4.png", title: "" },
              { src: "/images/gallery/type-I-post-1.png", title: "Type I" },
              { src: "/images/gallery/type-I-post-2.png", title: "" },
              { src: "/images/gallery/type-I-post-3.png", title: "" },
            ];
            const digitalArt = [
              { src: "/images/gallery/Untitled_Artwork-55.png", title: "" },
              { src: "/images/gallery/Me-Myself-and-I.JPG", title: "Me, Myself, and I" },
              { src: "/images/gallery/Childhood.JPG", title: "Childhood" },
            ];

            const GalleryImg = ({ item, allImages, category }: { item: {src:string;title:string}; allImages: {src:string;title:string}[]; category: string }) => (
              <div className="break-inside-avoid mb-2 cursor-zoom-in" onClick={() => setLightbox({ images: allImages, index: allImages.indexOf(item), category })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.title} className="w-full rounded-lg hover:opacity-90 transition-opacity" />
                {item.title && <p className="text-[10px] text-gray-400 mt-1 px-0.5">{item.title}</p>}
              </div>
            );

            const navItems = [
              { group: "Fine Art", items: [
                { id: "gallery-painting", label: "Painting", count: paintings.length },
                { id: "gallery-clay",     label: "Clay",     count: clay.length     },
                { id: "gallery-gestural", label: "Gestural", count: gesturals.length },
                { id: "gallery-collage",  label: "Collage",  count: collages.length },
              ]},
              { group: "Digital", items: [
                { id: "gallery-type",        label: "Type", count: typeWork.length },
                { id: "gallery-digital-art", label: "Digital Art",         count: digitalArt.length },
              ]},
            ];

            const scrollTo = (id: string) => {
              setActiveGallerySection(id);
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            };

            return (
              <div className="pb-16 pt-2 flex gap-10">

                {/* ── LEFT SIDEBAR ── */}
                <div className="hidden sm:block w-36 shrink-0">
                  <div className="sticky top-24 space-y-5">
                    {navItems.map(({ group, items }) => (
                      <div key={group}>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black mb-2">{group}</p>
                        <div className="space-y-1.5">
                          {items.map(({ id, label, count }) => (
                            <button
                              key={id}
                              onClick={() => scrollTo(id)}
                              className="flex items-center gap-1.5 text-left w-full transition-all duration-200"
                            >
                              <span className={`text-sm transition-colors duration-200 ${activeGallerySection === id ? "text-[#1D4ED8] font-semibold" : "text-gray-400 hover:text-[#1D4ED8]"}`}>{label}</span>
                              <span className={`text-xs transition-colors duration-200 ${activeGallerySection === id ? "text-[#1D4ED8]" : "text-gray-300"}`}>({count})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 min-w-0">
                  {/* Fine Art */}
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-8">
                      <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-black shrink-0">Fine Art</p>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    {[
                      { id: "gallery-painting", label: "Painting", images: paintings, category: "Painting", cols: "mb-10" },
                      { id: "gallery-clay",     label: "Clay",     images: clay,     category: "Clay",     cols: "mb-10" },
                      { id: "gallery-gestural", label: "Gestural", images: gesturals, category: "Gestural", cols: "mb-10" },
                      { id: "gallery-collage",  label: "Collage",  images: collages,  category: "Collage",  cols: "mb-2"  },
                    ].map(({ id, label, images, category, cols }) => (
                      <div key={id} id={id} className={`${cols} scroll-mt-24`}>
                        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-3">{label}</p>
                        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                          {images.map(item => (
                            <div
                              key={item.src}
                              className="shrink-0 cursor-zoom-in rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                              style={{ height: 340 }}
                              onClick={() => setLightbox({ images, index: images.indexOf(item), category })}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.src} alt={item.title} className="h-full w-auto object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Digital */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-black shrink-0">Digital</p>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div id="gallery-type" className="mb-10 scroll-mt-24">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-3">Type and Letterform</p>
                      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                        {typeWork.map(item => (
                          <div
                            key={item.src}
                            className="shrink-0 cursor-zoom-in rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                            style={{ height: 340 }}
                            onClick={() => setLightbox({ images: typeWork, index: typeWork.indexOf(item), category: "Type and Letterform" })}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.src} alt={item.title} className="h-full w-auto object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div id="gallery-digital-art" className="scroll-mt-24">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-3">Digital Art</p>
                      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                        {digitalArt.map(item => (
                          <div
                            key={item.src}
                            className="shrink-0 cursor-zoom-in rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                            style={{ height: 340 }}
                            onClick={() => setLightbox({ images: digitalArt, index: digitalArt.indexOf(item), category: "Digital Art" })}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.src} alt={item.title} className="h-full w-auto object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}

          {activeTab === "about" && (
            <div className="flex gap-10 -mx-2 min-h-[600px]">

              {/* ── LEFT SIDEBAR ── */}
              <div className="hidden lg:block w-32 shrink-0">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <p className="text-sm font-bold text-[#1d1d1f]">lydia park</p>
                    <p className="text-xs text-[#8e8e93] mt-1 leading-relaxed">design + hci · washu ʼ28</p>
                  </div>
                  <nav className="space-y-2.5">
                    {[
                      { label: "Hi!", id: "about-bio" },
                      { label: "Experience", id: "about-experience" },
                      { label: "Community", id: "about-leadership" },
                      { label: "Values", id: "about-values" },
                      { label: "Life Photos!", id: "about-photos" },
                    ].map(({ label, id }) => (
                      <button
                        key={id}
                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                        className={`block text-sm text-left transition-colors duration-200 ${activeAboutSection === id ? "text-[#1D4ED8] font-semibold" : "text-[#8e8e93] hover:text-[#1D4ED8]"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* ── MAIN CONTENT ── */}
              <div className="flex-1 min-w-0 pb-12">

                {/* ── BIO ── */}
                <div id="about-bio" className="flex flex-col lg:flex-row gap-8 lg:items-stretch mb-16">
                  <div className="lg:shrink-0 lg:w-64 flex flex-col items-center lg:items-stretch">
                    <div className="relative w-64 h-72 md:w-72 md:h-80 lg:w-full lg:h-0 lg:flex-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/about/headshot.jpg"
                        alt="Lydia Park"
                        className="w-full h-full rounded-2xl object-cover shadow-sm border border-[#e5e5e7]"
                        style={{ objectPosition: "center top" }}
                      />
                    </div>
                    <p className="text-xs text-[#8e8e93] mt-2 text-center leading-relaxed">At a hanok village in Korea ☁️</p>
                  </div>
                  <div className="flex-1 min-w-0 lg:pt-1 flex flex-col">
                    <h2 className="flex flex-col items-start gap-2 text-[26px] font-bold text-[#1d1d1f] mb-3">
                      <Image src="/nav-bunny-logo.png" alt="" width={56} height={56} className="w-14 h-14 bunny-bob" />
                      Hi, I&apos;m Lydia!
                    </h2>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#8e8e93] mb-5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        St. Louis, MO
                      </span>
                      <span className="text-[#d0d0d5]">/</span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/></svg>
                        Comm Design B.F.A. + HCI
                      </span>
                      <span className="text-[#d0d0d5]">/</span>
                      <span>WashU &apos;28</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white border border-[#e5e5e7] p-6 flex flex-col justify-between text-[16px] text-[#3a3a3c] leading-[1.75]">
                      <div className="space-y-4">
                        <p>I&apos;m a <strong>Communication Design major (B.F.A.) with a minor in Human-Computer Interaction Design at WashU</strong> — but more than that, I&apos;m someone who&apos;s always creating.</p>
                        <p>My journey started doodling bunnies in notebook corners and evolved into painting murals, designing t-shirts, and building visual stories that connect people. I love finding that sweet spot where creativity meets purpose.</p>
                        <p>Right now I&apos;m diving into <strong>visual storytelling, UI/UX, and interactive design</strong> — projects that mix strategy with emotion; designs that don&apos;t just look good, but feel right.</p>
                        <p>When I&apos;m not designing I&apos;m probably sipping matcha, listening to music, or daydreaming about my next painting.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── EXPERIENCE ── */}
                <div id="about-experience" className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start mb-16">
                  <div className="lg:shrink-0 lg:w-64">
                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">Experience</h3>
                    <a href="https://drive.google.com/file/d/1gS96a0bIVfhp9Ei2HXeb5uNuoHeEzZLq/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-[#e8edff] text-[#1D4ED8] text-[11px] font-semibold hover:bg-[#d0daff] active:scale-95 transition-all duration-150">
                      Resume ↗
                    </a>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { name: "Skandalaris Design Agency", role: "Creator / Product Designer", period: "Aug 2025–Present",  logo: "/images/about/logo-washu.png",         contain: false, href: "https://skandalaris.wustl.edu/resource/skandalaris-design-agency/", desc: "Designed brand identities and product interfaces for early-stage startups, translating founder goals into scalable digital experiences." },
                      { name: "SPARC",                     role: "UI/UX & Web Designer",       period: "Sept 2025–Present", logo: "/images/about/logo-sparc.png",         contain: false, href: null,                                                                  desc: "Redesigned UI/UX and brand systems for an athlete recruiting platform, driving +60% athlete engagement through improved interface hierarchy and visual identity." },
                      { name: "Product Space",             role: "VP of Design",               period: "Aug 2025–Present",  logo: "/images/about/logo-product-space.png", contain: true,  href: "https://www.washuproduct.com/",                                       desc: "Led design initiatives for a student product design community, mentoring designers and organizing product workshops for a growing cohort of fellows." },
                      { name: "Bear Studios LLC",          role: "Design Consultant",          period: "Aug 2025–Present",  logo: "/images/about/logo-bear-studios.png",  contain: false, href: null,                                                                  desc: "Consulted in a 2-person design team to deliver product, brand, and strategy solutions for startup clients." },
                      { name: "PLOT App",                  role: "Lead Product Designer",      period: "July 2025–Present", logo: null,                                   contain: false, href: null,                                                                  desc: "Led end-to-end design of a mobile app, producing 20+ iterative wireframes and prototypes while collaborating with 2 engineers to ship production-ready interfaces." },
                    ].map(({ name, role, period, logo, contain, href, desc }) => (
                      <div
                        key={name}
                        className={`border rounded-xl px-4 py-3 cursor-pointer transition-colors duration-200 ${expandedExp === name ? "bg-[#f0f4ff] border-[#d0daff]" : "bg-white border-[#f0f0f5] hover:bg-[#f0f4ff] hover:border-[#d0daff]"}`}
                        onClick={() => setExpandedExp(expandedExp === name ? null : name)}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 border border-[#e8e8ed] overflow-hidden" style={{ background: "#f5f5f7" }}>
                            {logo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={logo} alt={name} className={contain ? "w-10 h-10 object-contain" : "w-full h-full object-cover"} />
                            ) : (
                              <span className="text-[22px] font-bold" style={{ color: "#e67e22" }}>P</span>
                            )}
                          </div>
                          <div className="flex-1">
                            {href ? (
                              <a href={href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[17px] font-semibold text-[#1d1d1f] hover:text-[#1D4ED8] transition-colors mb-0.5 block">{name} ↗</a>
                            ) : (
                              <p className="text-[17px] font-semibold text-[#1d1d1f] mb-0.5">{name}</p>
                            )}
                            <p className="text-[15px] text-[#6e6e73]">{role}<span className="text-[#c0c0c0] mx-1">,</span>{period}</p>
                          </div>
                          <span className="text-[#c0c0c0] text-sm shrink-0">{expandedExp === name ? "▲" : "▼"}</span>
                        </div>
                        {expandedExp === name && (
                          <p className="mt-3 text-[13px] text-[#6e6e73] leading-relaxed pl-[84px]">{desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── COMMUNITY / LEADERSHIP ── */}
                <div id="about-leadership" className="mb-16">
                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">Community</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        dot: "#1D4ED8", name: "Asian Multicultural Council", role: "Public Relations Chair",
                        desc: "Organizing cultural events and building community across WashU's diverse student population with 30+ events annually.",
                        img: "/images/about/amc.png", alt: "AMC group photo", href: "https://www.instagram.com/wustlamc/",
                      },
                      {
                        dot: "#5c3fd1", name: "Skandalaris Design Agency", role: "Agency Web Designer",
                        desc: "Designing web experiences for student entrepreneurs at WashU's interdisciplinary innovation center.",
                        img: "/images/about/skandalaris.png", alt: "Skandalaris Center", href: "https://skandalaris.wustl.edu/resource/skandalaris-design-agency/",
                      },
                      {
                        dot: "#e84a4a", name: "Product Space", role: "Product Design Fellow",
                        desc: "Selected as a fellow to develop product design skills through mentorship, workshops, and real-world projects.",
                        img: "/images/about/product-space.png", alt: "Product Space fellows", href: "https://www.washuproduct.com/",
                      },
                    ].map(({ dot, name, role, desc, img, alt, href }) => (
                      <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="block border border-[#e5e5e7] rounded-2xl overflow-hidden bg-white hover:bg-[#f0f4ff] hover:border-[#d0daff] transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={alt} className="w-full h-64 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
                            <p className="text-sm font-semibold text-[#1d1d1f]">{name}</p>
                          </div>
                          <p className="text-[13px] text-[#8e8e93] mb-2">{role}</p>
                          <p className="text-[13px] text-[#6e6e73] leading-relaxed">{desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── VALUES ── */}
                <div id="about-values" className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start mb-16">
                  <div className="lg:shrink-0 lg:w-64">
                    <h3 className="text-xl font-bold text-[#1d1d1f]">Values</h3>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {[
                      { title: "Always Stay Curious.", desc: "There's always more to learn and more ways to see the world." },
                      { title: "Less is more.", desc: "Simplicity is harder than complexity. Editing is the real design skill." },
                      { title: "Learn from mistakes.", desc: "Every wrong turn is data. Iterate relentlessly and grow." },
                      { title: "Design with purpose.", desc: "Not decoration. Good design solves real problems for real people." },
                    ].map(({ title, desc }) => (
                      <div key={title} className="border border-[#e6eaf6] rounded-2xl p-4 bg-white hover:bg-[#f6f8ff] transition-colors shadow-[0_10px_24px_-18px_rgba(45,97,253,0.25)]">
                        <p className="text-[#1D4ED8] text-sm mb-2">✦</p>
                        <p className="text-sm font-semibold text-[#1d1d1f] mb-1">{title}</p>
                        <p className="text-xs text-[#8e8e93] leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── EXTRA PHOTOS ── */}
                <div id="about-photos">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
                    <div className="lg:shrink-0 lg:w-64">
                      <h3 className="text-xl font-bold text-[#1d1d1f]">Life Photos!</h3>
                      <p className="text-xs text-[#8e8e93] mt-1 leading-relaxed">doggo, art, beaches, fields, matcha</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                        {[
                          { src: "/images/about/gangeung.png", alt: "Gangeung beach" },
                          { src: "/images/about/areum.png", alt: "Areum the dog" },
                          { src: "/images/about/painting.png", alt: "Painting" },
                          { src: "/images/about/pullman.png", alt: "Pullman fields" },
                          { src: "/images/about/matcha.png", alt: "Matcha" },
                        ].map(({ src, alt }) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={src} src={src} alt={alt} className="shrink-0 h-40 w-auto rounded-2xl object-cover" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
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
