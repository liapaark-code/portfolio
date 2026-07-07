"use client";
import { useEffect, useRef } from "react";

const DOT = 9; // idle dot diameter
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MORPH_MS = 280;
// Elements the cursor merges into (design.google-style fill)
const INTERACTIVE = 'a, button, [role="button"], summary, input[type="submit"], label[for]';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't show custom cursor on touch/mobile devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Hide the native cursor everywhere so only the blue dot shows.
    // Injected via JS so it applies reliably regardless of CSS hot-reload.
    const hideStyle = document.createElement("style");
    hideStyle.setAttribute("data-cursor-hide", "");
    hideStyle.textContent =
      "html, body { cursor: none; } *, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(hideStyle);

    const el = cursorRef.current;
    if (!el) return;

    let mouseX = -200;
    let mouseY = -200;
    let morphTarget: HTMLElement | null = null;
    let revertTimer: ReturnType<typeof setTimeout> | null = null;

    const setDotStyle = () => {
      el.style.width = `${DOT}px`;
      el.style.height = `${DOT}px`;
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#4f7be8";
      el.style.opacity = "1";
    };

    const followDot = () => {
      el.style.transform = `translate(${mouseX - DOT / 2}px, ${mouseY - DOT / 2}px)`;
    };

    // Park the cursor over the hovered element: same box, same corners,
    // translucent brand fill so the control reads as "filled" by the cursor.
    const morphToTarget = () => {
      if (!morphTarget) return;
      const r = morphTarget.getBoundingClientRect();
      const radius = getComputedStyle(morphTarget).borderRadius;
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
      el.style.borderRadius = radius === "0px" ? "10px" : radius;
      el.style.backgroundColor = "rgba(79, 123, 232, 0.18)";
      el.style.transform = `translate(${r.left}px, ${r.top}px)`;
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (morphTarget) return; // parked on a control
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(followDot);
    };

    const enter = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      if (!t || t === morphTarget) return;
      // Merge only into button-scale controls. Large surfaces (project cards,
      // gallery tiles) keep the plain dot; override per element with
      // data-cursor-morph="on" / "off".
      const pref = t.dataset.cursorMorph;
      if (pref !== "on") {
        const b = t.getBoundingClientRect();
        if (pref === "off" || b.width > 380 || b.height > 260) return;
      }
      if (revertTimer) { clearTimeout(revertTimer); revertTimer = null; }
      morphTarget = t;
      el.style.transition = `transform ${MORPH_MS}ms ${EASE}, width ${MORPH_MS}ms ${EASE}, height ${MORPH_MS}ms ${EASE}, border-radius ${MORPH_MS}ms ${EASE}, background-color ${MORPH_MS}ms ${EASE}, opacity ${MORPH_MS}ms ${EASE}`;
      morphToTarget();
    };

    const leave = (e: Event) => {
      if (!morphTarget) return;
      const to = (e as PointerEvent).relatedTarget as Element | null;
      if (to && morphTarget.contains(to)) return; // still inside the control
      morphTarget = null;
      setDotStyle();
      followDot();
      // let the shrink-back animate, then hand control back to the rAF follower
      revertTimer = setTimeout(() => {
        el.style.transition = "none";
        revertTimer = null;
      }, MORPH_MS);
    };

    // Keep the fill glued to the control if the page scrolls or resizes under it
    const resync = () => { if (morphTarget) morphToTarget(); };

    setDotStyle();
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("pointerover", enter, true);
    document.addEventListener("pointerout", leave, true);
    window.addEventListener("scroll", resync, { passive: true, capture: true });
    window.addEventListener("resize", resync);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", enter, true);
      document.removeEventListener("pointerout", leave, true);
      window.removeEventListener("scroll", resync, true);
      window.removeEventListener("resize", resync);
      cancelAnimationFrame(rafRef.current);
      if (revertTimer) clearTimeout(revertTimer);
      hideStyle.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="lydia-cursor-dot"
      style={{
        position:        "fixed",
        width:           DOT,
        height:          DOT,
        borderRadius:    "50%",
        backgroundColor: "#4f7be8",
        pointerEvents:   "none",
        zIndex:          2147483647,
        top:             0,
        left:            0,
        transform:       "translate(-200px, -200px)",
        willChange:      "transform, width, height",
      }}
    />
  );
}
