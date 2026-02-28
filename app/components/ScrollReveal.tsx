"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
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
  }, []);

  return null;
}
