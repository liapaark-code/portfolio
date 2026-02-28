"use client";
import { useState } from "react";

export default function HoverDot({ href, text }: { href: string; text: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2 align-middle no-underline"
      style={{ textDecoration: "none" }}
    >
      <span
        style={{
          display: "inline-block",
          width: 9,
          height: 9,
          borderRadius: "50%",
          backgroundColor: "#080CD6",
          flexShrink: 0,
          transition: "transform 0.2s ease",
          transform: hovered ? "scale(1.3)" : "scale(1)",
        }}
      />
      <span
        style={{
          maxWidth: hovered ? "280px" : "0px",
          overflow: "hidden",
          transition: "max-width 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
          opacity: hovered ? 1 : 0,
          whiteSpace: "nowrap",
          color: "#080CD6",
          fontWeight: 500,
          fontSize: "inherit",
        }}
      >
        {text}
      </span>
    </a>
  );
}
