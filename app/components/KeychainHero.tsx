"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/**
 * Hero keychain that swings from its ring like a real acrylic keychain.
 * - Follows the cursor with a damped spring (premium, springy — not linear).
 * - On mouse-leave it swings back through gravity + a small damped bounce.
 * - Crossfades to the "hover" pose (keychain 3) while interacting.
 * Respects prefers-reduced-motion.
 */
export default function KeychainHero({ className = "" }: { className?: string }) {
  const swingRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // physics: a damped harmonic oscillator on the swing angle (deg)
  const phys = useRef({ angle: 0, vel: 0, target: 0, raf: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const loop = () => {
      const p = phys.current;
      const stiffness = 0.05;  // spring pull toward target
      const damping = 0.86;    // < 1 → overshoot + settle (the "bounce")
      p.vel += (p.target - p.angle) * stiffness;
      p.vel *= damping;
      p.angle += p.vel;
      if (Math.abs(p.vel) < 0.0015 && Math.abs(p.target - p.angle) < 0.01) {
        p.angle = p.target;
        p.vel = 0;
      }
      if (swingRef.current) {
        swingRef.current.style.transform = `rotate(${p.angle.toFixed(3)}deg)`;
      }
      p.raf = requestAnimationFrame(loop);
    };
    phys.current.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(phys.current.raf);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const host = swingRef.current?.parentElement;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const rel = (e.clientX - (r.left + r.width / 2)) / (r.width / 2); // -1 … 1
    phys.current.target = Math.max(-1, Math.min(1, rel)) * 12; // capped swing
  };

  const handleLeave = () => {
    setHovered(false);
    phys.current.target = 0; // spring + damping naturally swings it home with a bounce
  };

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      {/* swing pivot at the metal ring (top-left of the artwork) */}
      <div ref={swingRef} className="will-change-transform" style={{ transformOrigin: "23% 16%" }}>
        <Image
          src="/keychain/bunny-keychain.png"
          alt="lydia park bunny keychain"
          width={1522}
          height={1551}
          priority
          className={`w-full h-auto transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src="/keychain/bunny-keychain-3.png"
          alt=""
          aria-hidden
          width={1689}
          height={1551}
          className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
