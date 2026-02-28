"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Pos = { x: number; y: number };

/** Default pixel positions (left, top) inside the 1100×520 hero container */
const DEFAULTS: Record<string, Pos> = {
  bunny:    { x: 184, y: 3   },
  carrot:   { x: 443, y: -62 },
  logo:     { x: 215, y: 301 },
  gif:      { x: 792, y: 243 },
  pdBtn:    { x: 707, y: 312 },
  aboutBtn: { x: 609, y: 347 },
};

const STORAGE_KEY = "lydia-hero-pos";
const STORAGE_VERSION = 2;

export default function Home() {
  const [activeTab, setActiveTab] = useState<"work" | "gallery" | "about">("work");
  const [pos, setPos] = useState<Record<string, Pos>>(DEFAULTS);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [heroScale, setHeroScale] = useState(1);
  const [lightbox, setLightbox] = useState<{ images: { src: string; title: string }[]; index: number; category: string } | null>(null);
  const [activeGallerySection, setActiveGallerySection] = useState("gallery-painting");
  const [activeAboutSection, setActiveAboutSection] = useState("about-bio");
  // ref so hover handlers can read dragging state synchronously
  const draggingRef = useRef<string | null>(null);
  const heroWrapRef = useRef<HTMLElement>(null);

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
    const ids = ["gallery-painting", "gallery-gestural", "gallery-collage", "gallery-type", "gallery-digital-art"];
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

  // Scale hero to fit viewport width
  useEffect(() => {
    const update = () => {
      if (heroWrapRef.current) {
        const w = heroWrapRef.current.offsetWidth;
        // Use smaller base on mobile so items appear bigger (accepts slight edge clipping)
        const base = w < 640 ? 680 : 1100;
        setHeroScale(Math.min(1, w / base));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Load saved positions on mount, migrating carrot to new default if version is old
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.__version === STORAGE_VERSION) {
          setPos(parsed.pos);
        } else {
          // Migrate: keep all positions except carrot, reset carrot to new default
          const migrated = { ...DEFAULTS, ...parsed.pos ?? parsed, carrot: DEFAULTS.carrot };
          setPos(migrated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ __version: STORAGE_VERSION, pos: migrated }));
        }
      }
    } catch {}
  }, []);

  const scrollToTabs = () =>
    document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth" });

  /** Attach drag behaviour to an element. Optional onClick fires only on a real click (no drag). */
  const drag = (key: string, onClickFn?: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    const startMX = e.clientX;
    const startMY = e.clientY;
    const origX   = pos[key].x;
    const origY   = pos[key].y;
    let moved = false;

    const onMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startMX) / heroScale;
      const dy = (ev.clientY - startMY) / heroScale;
      if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        moved = true;
        draggingRef.current = key;
        setDraggingKey(key);
      }
      if (moved) {
        setPos(prev => ({ ...prev, [key]: { x: origX + dx, y: origY + dy } }));
      }
    };

    const onUp = () => {
      draggingRef.current = null;
      setDraggingKey(null);
      if (moved) {
        setPos(prev => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ __version: STORAGE_VERSION, pos: prev }));
          return prev;
        });
      } else {
        onClickFn?.();
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  /** Shared style for every draggable wrapper div */
  const wrapStyle = (
    key: string,
    zBase: number,
    width: number,
    rotation = 0
  ): React.CSSProperties => ({
    position: "absolute",
    left: pos[key].x,
    top:  pos[key].y,
    width,
    zIndex: draggingKey === key ? 20 : zBase,
    cursor: draggingKey === key ? "grabbing" : "grab",
    userSelect: "none",
    transform: `rotate(${rotation}deg)`,
    transition: draggingKey === key ? "none" : "transform 0.3s ease",
  });

  /** Hover handlers that play nicely with drag (use ref for sync check) */
  const hoverHandlers = (key: string, rotation = 0, scaleAmt = 1.04) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current !== key)
        (e.currentTarget as HTMLElement).style.transform =
          `rotate(${rotation}deg) scale(${scaleAmt})`;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current !== key)
        (e.currentTarget as HTMLElement).style.transform =
          `rotate(${rotation}deg) scale(1)`;
    },
  });

  const resetLayout = () => {
    setPos(DEFAULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ __version: STORAGE_VERSION, pos: DEFAULTS }));
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-clother)] bg-white pt-20">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-3 bg-white/80 backdrop-blur-md border-b border-[#f0f0f0]">
        <a href="/" className="text-sm font-bold text-[#1D4ED8] tracking-wide hover:opacity-70 transition-opacity">
          lydia park
        </a>
      </nav>

      {/* ── HERO — sticky so tabs scroll up over it ── */}
      <section
        ref={heroWrapRef}
        className="w-full select-none sticky top-20 z-10 bg-white overflow-hidden"
        style={{ height: 580 * heroScale }}
      >
        <div
          className="relative"
          style={{
            width: 1100,
            height: 580,
            paddingTop: 60,
            transform: `scale(${heroScale})`,
            transformOrigin: "top center",
            position: "absolute",
            left: "50%",
            marginLeft: -550,
          }}
        >
          {/* Reset button */}
          <button
            onClick={resetLayout}
            className="absolute top-5 right-4 z-50 text-sm text-[#6e6e73] hover:text-[#1D4ED8] transition-colors bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-[#e5e5e7] rounded-full px-5 py-2.5 shadow-sm font-medium"
          >
            reset layout
          </button>

          {/* ── 1. Bunny stickynote ── */}
          <div
            style={wrapStyle("bunny", 2, 440, -5)}
            onMouseDown={drag("bunny")}
            {...hoverHandlers("bunny", -5)}
          >
            <Image
              src="/bunny-stickynote.png"
              alt="lydia designs with intention, curiosity, and passion"
              width={5919}
              height={5138}
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
              priority
            />
          </div>

          {/* ── 2. Carrot stickynote ── */}
          <div
            style={wrapStyle("carrot", 1, 450, 7)}
            onMouseDown={drag("carrot")}
            {...hoverHandlers("carrot", 7)}
          >
            <Image
              src="/carrotstickynote.png"
              alt="studying bfa graphic design and hci at WashU"
              width={7475}
              height={8478}
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
              priority
            />
          </div>

          {/* ── 3. Bunny logo (hover swaps image) ── */}
          <div
            className="group"
            style={wrapStyle("logo", 4, 90)}
            onMouseDown={drag("logo")}
          >
            <Image
              src="/bunny-logo.png"
              alt="bunny logo"
              width={5234}
              height={5240}
              className="transition-opacity duration-200 group-hover:opacity-0"
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
            />
            <Image
              src="/bunny-logo-hover.png"
              alt="bunny logo hover"
              width={5234}
              height={5240}
              className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
            />
          </div>

          {/* ── 4. Walking bunny GIF ── */}
          <div
            style={wrapStyle("gif", 4, 58)}
            onMouseDown={drag("gif")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bunnywalking.gif"
              alt="walking bunny"
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
            />
          </div>

          {/* ── 5. "product designer" button ── */}
          <div
            style={wrapStyle("pdBtn", 5, 150, 5)}
            onMouseDown={drag("pdBtn", () => {
              setActiveTab("work");
              scrollToTabs();
            })}
            {...hoverHandlers("pdBtn", 5, 1.06)}
          >
            <Image
              src="/productdesignerbutton.png"
              alt="product designer"
              width={2562}
              height={1046}
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
            />
          </div>

          {/* ── 6. "about me" button — click navigates to about tab ── */}
          <div
            style={wrapStyle("aboutBtn", 5, 145, -2)}
            onMouseDown={drag("aboutBtn", () => {
              setActiveTab("about");
              scrollToTabs();
            })}
            {...hoverHandlers("aboutBtn", -2, 1.06)}
          >
            <Image
              src="/aboutme-button.png"
              alt="about me"
              width={2553}
              height={939}
              style={{ width: "100%", height: "auto", pointerEvents: "none" }}
            />
          </div>

        </div>
      </section>

      {/* ── FILE TABS — slides up over sticky hero ── */}
      <div id="tabs-section" className="px-10 pb-16 -mt-16 relative z-20" style={{ background: "linear-gradient(to bottom, transparent 0%, white 56px)" }}>

        {/* Tab row */}
        <div className="flex items-end gap-0.5">
          {(["work", "gallery", "about"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-7 py-2 text-sm font-medium rounded-t-2xl transition-all duration-200",
                activeTab === tab
                  ? "bg-[#f5f5f7] text-[#1D4ED8] border border-b-0 border-[#e5e5e7]"
                  : "bg-transparent text-[#8e8e93] border border-transparent border-b-0 hover:bg-[#f0f0f5]/70 hover:text-[#6e6e73]",
              ].join(" ")}
              style={{ marginBottom: "-1px" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          className="rounded-b-3xl rounded-tr-3xl p-6 pb-10"
          style={{ background: "#f5f5f7", border: "1px solid #e5e5e7" }}
        >

          {/* WORK */}
          {activeTab === "work" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Link href="/sparc" className="group relative block rounded-2xl">
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl bg-[#0a2e1c] transition-transform duration-500 ease-in-out group-hover:scale-[0.993]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/sparc/cover-frame.png" alt="SPARC Sports" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scale(1.08) translateY(-2px)", transformOrigin: "center center" }} />
                  {/* GIF on back iPhone screen */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/sparc/sparc-screen.gif" alt="" aria-hidden className="absolute" style={{ left: "calc(64% + 17px)", top: "calc(6% - 1px)", height: "80%", width: "auto", borderRadius: "22px" }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 transition-opacity duration-200 group-hover:opacity-0">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm">
                      SPARC Sports <span className="text-[#8e8e93] font-normal text-xs">· 2026</span>
                    </span>
                  </div>
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Redesigning the athlete recruitment platform
                  </p>
                </div>
              </Link>

              <Link href="/copilot" className="group relative block rounded-2xl">
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-[0.993]" style={{ background: "#d0e4ff" }}>
                  <Image src="/images/copilot-hero.png" alt="Microsoft Copilot" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 transition-opacity duration-200 group-hover:opacity-0">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm">
                      Microsoft Copilot <span className="text-[#8e8e93] font-normal text-xs">· 2025</span>
                    </span>
                  </div>
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Integrating AI into enterprise workflows
                  </p>
                </div>
              </Link>

              <Link href="/little-prince" className="group relative block rounded-2xl">
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl bg-[#1a1a2e] transition-transform duration-500 ease-in-out group-hover:scale-[0.993]">
                  <Image src="/images/little-prince/lp-card-cover-v2.png" alt="Le Petite Route" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 transition-opacity duration-200 group-hover:opacity-0">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm">
                      Le Petite Route <span className="text-[#8e8e93] font-normal text-xs">· 2025</span>
                    </span>
                  </div>
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Location-based storytelling experience
                  </p>
                </div>
              </Link>

              <Link href="/amc" className="group relative block rounded-2xl">
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-[0.993]" style={{ background: "linear-gradient(135deg, #c0392b 0%, #e8a598 100%)" }}>
                  <Image src="/images/amc/amc-card-cover.png" alt="AMC Rebrand" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 transition-opacity duration-200 group-hover:opacity-0">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm">
                      AMC Rebrand <span className="text-[#8e8e93] font-normal text-xs">· 2025</span>
                    </span>
                  </div>
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Rebranding AMC's visual identity
                  </p>
                </div>
              </Link>

            </div>
          )}

          {activeTab === "gallery" && (() => {
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
                { id: "gallery-gestural", label: "Gestural", count: gesturals.length },
                { id: "gallery-collage",  label: "Collage",  count: collages.length },
              ]},
              { group: "Digital", items: [
                { id: "gallery-type",        label: "Type and Letterform", count: typeWork.length },
                { id: "gallery-digital-art", label: "Digital Art",         count: digitalArt.length },
              ]},
            ];

            const scrollTo = (id: string) => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            };

            return (
              <div className="pb-16 pt-2 flex gap-10">

                {/* ── LEFT SIDEBAR ── */}
                <div className="hidden sm:block w-36 shrink-0">
                  <div className="sticky top-24 space-y-5">
                    {navItems.map(({ group, items }) => (
                      <div key={group}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black opacity-30 mb-2">{group}</p>
                        <div className="space-y-1.5">
                          {items.map(({ id, label, count }) => (
                            <button
                              key={id}
                              onClick={() => scrollTo(id)}
                              className="flex items-center gap-1.5 text-left w-full transition-all duration-200"
                            >
                              <span className={`text-xs transition-colors duration-200 ${activeGallerySection === id ? "text-[#1D4ED8] font-semibold" : "text-gray-400 hover:text-[#4169e1]"}`}>{label}</span>
                              <span className={`text-[10px] transition-colors duration-200 ${activeGallerySection === id ? "text-[#4169e1]" : "text-gray-300"}`}>({count})</span>
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
                    <p className="text-xs font-bold text-[#1d1d1f]">lydia park</p>
                    <p className="text-[10px] text-[#8e8e93] mt-1 leading-relaxed">design + hci · washu ʼ28</p>
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
                        className={`block text-xs text-left transition-colors duration-200 ${activeAboutSection === id ? "text-[#1D4ED8] font-semibold" : "text-[#8e8e93] hover:text-[#4169e1]"}`}
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
                  <div className="lg:shrink-0 lg:w-64 flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about/headshot.jpg"
                      alt="Lydia Park"
                      className="w-full h-72 lg:h-0 lg:flex-1 rounded-2xl object-cover shadow-sm border border-[#e5e5e7]"
                      style={{ objectPosition: "center top" }}
                    />
                    <p className="text-[10px] text-[#8e8e93] mt-2 text-center leading-relaxed">At a hanok village in Korea ☁️</p>
                  </div>
                  <div className="flex-1 min-w-0 lg:pt-1 flex flex-col">
                    <h2 className="text-[22px] font-bold text-[#1d1d1f] mb-3">Hi, I&apos;m Lydia!</h2>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8e8e93] mb-5 flex-wrap">
                      <span>📍 St. Louis, MO</span>
                      <span className="text-[#d0d0d5]">/</span>
                      <span>🎓 Comm Design B.F.A. + HCI</span>
                      <span className="text-[#d0d0d5]">/</span>
                      <span>WashU &apos;28</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white border border-[#e5e5e7] p-6 flex flex-col justify-between text-[15px] text-[#3a3a3c] leading-[1.75]">
                      <div className="space-y-4">
                        <p>I&apos;m a <strong>Communication Design major (B.F.A.) with a minor in Human-Computer Interaction Design at WashU</strong> — but more than that, I&apos;m someone who&apos;s always creating.</p>
                        <p>My journey started doodling bunnies in notebook corners and evolved into painting murals, designing t-shirts, and building visual stories that connect people. I love finding that sweet spot where creativity meets purpose.</p>
                        <p>Right now I&apos;m diving into <strong>visual storytelling, UI/UX, and interactive design</strong> — projects that mix strategy with emotion; designs that don&apos;t just look good, but feel right.</p>
                        <p>When I&apos;m not designing I&apos;m probably sipping matcha, listening to music, or daydreaming about my next painting.</p>
                      </div>
                      <a href="mailto:liapaark@gmail.com" className="inline-flex items-center gap-2 pt-4 text-[13px] text-[#1D4ED8] font-medium hover:opacity-70 transition-opacity">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                        Working on something cool? Get in <span className="w-2 h-2 rounded-full bg-[#4169e1] inline-block mx-1" /> <strong>touch!</strong>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── EXPERIENCE ── */}
                <div id="about-experience" className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-start mb-16">
                  <div className="lg:shrink-0 lg:w-1/2">
                    <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">Experience</h3>
                    <a href="/Lydia-Park-Resume-2026.pdf" download="Lydia-Park-Resume-2026.pdf"
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-[#e8edff] text-[#1D4ED8] text-[11px] font-semibold hover:bg-[#d0daff] active:scale-95 transition-all duration-150">
                      Resume ↓
                    </a>
                  </div>
                  <div className="flex-1 space-y-6">
                    {[
                      { name: "Skandalaris Design Agency", role: "Creator / Product Designer", period: "Aug 2025–Present",  logo: "/images/about/logo-washu.png",         contain: false },
                      { name: "SPARC",                     role: "UI/UX & Web Designer",  period: "Sept 2025–Present", logo: "/images/about/logo-sparc.png",         contain: false },
                      { name: "Product Space",             role: "VP of Design",          period: "Aug 2025–Present",  logo: "/images/about/logo-product-space.png", contain: true  },
                      { name: "Bear Studios LLC",          role: "Design Consultant",     period: "Aug 2025–Present",  logo: "/images/about/logo-bear-studios.png",  contain: false },
                      { name: "PLOT App",                  role: "Lead Product Designer", period: "July 2025–Present", logo: null,                                   contain: false },
                    ].map(({ name, role, period, logo, contain }) => (
                      <div key={name} className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 border border-[#e8e8ed] overflow-hidden" style={{ background: "#f5f5f7" }}>
                          {logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo} alt={name} className={contain ? "w-10 h-10 object-contain" : "w-full h-full object-cover"} />
                          ) : (
                            <span className="text-[22px] font-bold" style={{ color: "#e67e22" }}>P</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[15px] font-semibold text-[#1d1d1f] mb-0.5">{name}</p>
                          <p className="text-[13px] text-[#6e6e73]">{role}<span className="text-[#c0c0c0] mx-1">,</span>{period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── COMMUNITY / LEADERSHIP ── */}
                <div id="about-leadership" className="mb-16">
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-6">Community</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        dot: "#1D4ED8", name: "Asian Multicultural Council", role: "Public Relations Chair",
                        desc: "Organizing cultural events and building community across WashU's diverse student population with 30+ events annually.",
                        img: "/images/about/amc.png", alt: "AMC group photo",
                      },
                      {
                        dot: "#5c3fd1", name: "Skandalaris Design Agency", role: "Agency Web Designer",
                        desc: "Designing web experiences for student entrepreneurs at WashU's interdisciplinary innovation center.",
                        img: "/images/about/skandalaris.png", alt: "Skandalaris Center",
                      },
                      {
                        dot: "#e84a4a", name: "Product Space", role: "Product Design Fellow",
                        desc: "Selected as a fellow to develop product design skills through mentorship, workshops, and real-world projects.",
                        img: "/images/about/product-space.png", alt: "Product Space fellows",
                      },
                    ].map(({ dot, name, role, desc, img, alt }) => (
                      <div key={name} className="border border-[#e5e5e7] rounded-2xl overflow-hidden bg-white hover:shadow-sm transition-shadow">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={alt} className="w-full h-64 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
                            <p className="text-[12px] font-semibold text-[#1d1d1f]">{name}</p>
                          </div>
                          <p className="text-[11px] text-[#8e8e93] mb-2">{role}</p>
                          <p className="text-[11px] text-[#6e6e73] leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── VALUES ── */}
                <div id="about-values" className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-start mb-16">
                  <div className="lg:shrink-0 lg:w-36">
                    <h3 className="text-lg font-bold text-[#1d1d1f]">Values</h3>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {[
                      { title: "Always Stay Curious.", desc: "There's always more to learn and more ways to see the world." },
                      { title: "Less is more.", desc: "Simplicity is harder than complexity. Editing is the real design skill." },
                      { title: "Learn from mistakes.", desc: "Every wrong turn is data. Iterate relentlessly and grow." },
                      { title: "Design with purpose.", desc: "Not decoration. Good design solves real problems for real people." },
                    ].map(({ title, desc }) => (
                      <div key={title} className="border border-[#d0daff] rounded-2xl p-4 bg-[#e8edff] hover:bg-[#d8e4ff] transition-colors">
                        <p className="text-[#1D4ED8] text-sm mb-2">✦</p>
                        <p className="text-[12px] font-semibold text-[#1d1d1f] mb-1">{title}</p>
                        <p className="text-[11px] text-[#8e8e93] leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DIVIDER ── */}
                <div className="border-t border-[#e5e5e7] mb-14" />

                {/* ── EXTRA PHOTOS ── */}
                <div id="about-photos">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-start">
                    <div className="lg:shrink-0 lg:w-36">
                      <h3 className="text-lg font-bold text-[#1d1d1f]">Life Photos!</h3>
                      <p className="text-[10px] text-[#8e8e93] mt-1 leading-relaxed">doggo, art, beaches, fields, matcha</p>
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
      <footer className="relative z-30 border-t border-[#e5e5e7] bg-white px-6 py-12 mt-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-2xl font-bold text-[#1D4ED8] mb-5">lydia park</p>
          <p className="text-sm text-gray-400 mb-1">Thanks for dropping in, let&apos;s chat!</p>
          <a href="mailto:liapaark@gmail.com" className="text-sm font-semibold text-black hover:text-[#1D4ED8] transition-colors block mb-6">liapaark@gmail.com</a>
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
          <div className="space-y-4 mb-10">
            <button onClick={() => { setActiveTab("work");    scrollToTabs(); }} className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(work)</button>
            <button onClick={() => { setActiveTab("gallery"); scrollToTabs(); }} className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(gallery)</button>
            <button onClick={() => { setActiveTab("about");   scrollToTabs(); }} className="block text-xs text-gray-400 uppercase tracking-[0.15em] hover:text-[#1D4ED8] transition-colors">(about)</button>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-400">Built in Next.js &amp; with love</p>
            <p className="text-xs text-gray-400">@Lydia Park 2026</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
