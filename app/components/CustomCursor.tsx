"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
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
    };
  }, []);

  return (
    <div
      ref={cursorRef}
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
