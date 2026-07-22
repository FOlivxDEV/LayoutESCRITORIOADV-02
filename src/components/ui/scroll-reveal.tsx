"use client";

import { useEffect } from "react";

const SELECTOR = [
  "main section > .container",
  "main > .section.container",
  "main > article.section.container",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!elements.length) return;

    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 45}ms`);
    });

    let animationFrame = 0;
    const updateStates = () => {
      animationFrame = 0;
      const revealTop = window.innerHeight * 0.1;
      const revealBottom = window.innerHeight * 0.9;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        element.dataset.revealState =
          rect.bottom <= revealTop
            ? "above"
            : rect.top >= revealBottom
              ? "below"
              : "visible";
      });
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateStates);
    };

    updateStates();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return null;
}
