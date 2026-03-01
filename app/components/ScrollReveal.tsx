"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay lets the new page's DOM render before we query sections
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("section");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              Array.from(entry.target.children).forEach((child, i) => {
                const el = child as HTMLElement;
                el.style.transitionDelay = `${i * 0.09}s`;
                el.classList.add("visible");
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      sections.forEach((section) => {
        Array.from(section.children).forEach((child) => {
          child.classList.add("reveal");
        });
        observer.observe(section);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
