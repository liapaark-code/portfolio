"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
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
        transform:       "translate(-50%, -50%)",
        pointerEvents:   "none",
        zIndex:          2147483647,
        top:             "-100px",
        left:            "-100px",
      }}
    />
  );
}
