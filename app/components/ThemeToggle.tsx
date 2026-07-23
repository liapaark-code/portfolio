"use client";
import { useEffect, useState } from "react";
import BunnyToggle from "./BunnyToggle";

/** Footer BunnyToggle wired to the site theme: on (blue) = dark mode.
 *  The pre-paint script in layout.tsx applies the stored theme before
 *  hydration; this component syncs to it on mount. */
export default function ThemeToggle({ scale = 1 }: { scale?: number }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const apply = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <BunnyToggle
      checked={dark}
      onChange={apply}
      scale={scale}
      label={dark ? "Switch to light mode" : "Switch to dark mode"}
    />
  );
}
