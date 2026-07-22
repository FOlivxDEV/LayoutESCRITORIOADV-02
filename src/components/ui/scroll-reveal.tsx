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

    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";
    const trackScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 2) {
        scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        lastScrollY = currentScrollY;
      }
    };
    window.addEventListener("scroll", trackScrollDirection, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.dataset.revealState = "visible";
            return;
          }
          element.dataset.revealState = scrollDirection === "down" ? "above" : "below";
        });
      },
      { rootMargin: "-8% 0px -10%", threshold: 0.08 },
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      element.dataset.revealState =
        rect.top < window.innerHeight && rect.bottom > 0
          ? "visible"
          : rect.bottom <= 0
            ? "above"
            : "below";
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", trackScrollDirection);
    };
  }, []);

  return null;
}
