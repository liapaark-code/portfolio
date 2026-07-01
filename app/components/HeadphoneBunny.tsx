"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Reactive headphone bunny for the hero.
 * Uses Lydia's exact asset (no-eyes base) with live pupils overlaid at the
 * real eye positions, so they can track the cursor and blink. Idle-floats and
 * hops (with a greeting) on click.
 */
export default function HeadphoneBunny({ className = "" }: { className?: string }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const eyeL = useRef<HTMLSpanElement>(null);
  const eyeR = useRef<HTMLSpanElement>(null);
  const [greet, setGreet] = useState<string | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);
  const msgIndex = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);

  const MESSAGES = [
    "안녕!",
    "hi there!",
    "welcome to my corner",
    "반가워요",
    "i'm a product + brand designer",
    "check out my work below",
    "psst — try the tabs up top",
    "i also paint & sculpt",
    "let's build something",
    "thanks for stopping by!",
  ];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eyes = [
      { el: eyeL.current, lx: 0.535, ly: 0.79, cur: { x: 0, y: 0 } },
      { el: eyeR.current, lx: 0.682, ly: 0.792, cur: { x: 0, y: 0 } },
    ];
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let blink = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      const inner = innerRef.current;
      if (inner) {
        const r = inner.getBoundingClientRect();
        const ampX = r.width * 0.014;   // subtle horizontal gaze
        const ampY = r.height * 0.012;  // subtle vertical gaze
        for (const eye of eyes) {
          if (!eye.el) continue;
          const bx = r.left + eye.lx * r.width;
          const by = r.top + eye.ly * r.height;
          const ang = Math.atan2(my - by, mx - bx);
          const tx = Math.cos(ang) * ampX;
          const ty = Math.sin(ang) * ampY;
          eye.cur.x += (tx - eye.cur.x) * 0.14;
          eye.cur.y += (ty - eye.cur.y) * 0.14;
          eye.el.style.transform =
            `translate(calc(-50% + ${eye.cur.x.toFixed(2)}px), calc(-50% + ${eye.cur.y.toFixed(2)}px)) scaleY(${blink})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    let blinkTimer: ReturnType<typeof setTimeout>;
    const doBlink = () => {
      blink = 0.1;
      setTimeout(() => { blink = 1; }, 120);
      blinkTimer = setTimeout(doBlink, 2600 + Math.random() * 3600);
    };
    if (!reduce) blinkTimer = setTimeout(doBlink, 1600);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(blinkTimer);
    };
  }, []);

  const hop = () => {
    const el = innerRef.current;
    if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-16px)" },
          { transform: "translateY(3px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 560, easing: "cubic-bezier(.34,1.56,.64,1)" }
      );
    }
    setGreet(MESSAGES[msgIndex.current % MESSAGES.length]);
    setBubbleKey((k) => k + 1);
    msgIndex.current += 1;
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setGreet(null), 2400);
  };

  const eyeStyle: CSSProperties = {
    position: "absolute",
    width: "3%",
    height: "4.2%",
    background: "#15171e",
    borderRadius: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
    willChange: "transform",
  };

  return (
    <div className={`bunny-float ${className}`}>
      <div ref={innerRef} onClick={hop} className="relative w-full cursor-pointer select-none">
        {/* speech bubble — tucked by the right ear so the bunny looks like it's talking */}
        {greet && (
          <span
            key={bubbleKey}
            className="bubble-pop absolute z-10 rounded-[14px] rounded-br-[4px] px-3 py-1.5 text-[13px] font-medium text-white whitespace-nowrap"
            style={{
              right: "8%",
              top: "-9%",
              background: "#1e40af",
              boxShadow: "0 8px 18px -8px rgba(30,64,175,0.6)",
              transformOrigin: "bottom right",
            }}
          >
            {greet}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/keychain/bunny-headphones-noeyes.png" alt="lydia park bunny" className="w-full h-auto" draggable={false} />
        <span ref={eyeL} style={{ ...eyeStyle, left: "53.5%", top: "79%" }} />
        <span ref={eyeR} style={{ ...eyeStyle, left: "68.2%", top: "79.2%" }} />
      </div>
    </div>
  );
}
