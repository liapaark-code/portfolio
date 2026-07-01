"use client";
import { useEffect, useRef } from "react";

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

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        }
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
      hideStyle.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="lydia-cursor-dot"
      style={{
        position:        "fixed",
        width:           9,
        height:          9,
        borderRadius:    "50%",
        backgroundColor: "#4f7be8",
        pointerEvents:   "none",
        zIndex:          2147483647,
        top:             0,
        left:            0,
        transform:       "translate(-200px, -200px)",
        willChange:      "transform",
      }}
    />
  );
}
