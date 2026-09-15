"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const REVEAL = "[data-reveal]:not([data-reveal-group] [data-reveal])";
const GROUP = "[data-reveal-group]";
const HERO = "[data-hero-reveal]";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showEverything() {
  document
    .querySelectorAll<HTMLElement>("[data-reveal], [data-hero-reveal]")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = window.matchMedia("(pointer: coarse)").matches
      ? null
      : new Lenis({ lerp: 0.12, wheelMultiplier: 1 });

    lenisRef.current = lenis;

    const raf = (time: number) => lenis?.raf(time * 1000);

    if (lenis) {
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      showEverything();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });

    const context = gsap.context(() => {
      const hero = gsap.utils.toArray<HTMLElement>(HERO);
      if (hero.length) {
        gsap.to(hero, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.05,
        });
      }

      for (const el of gsap.utils.toArray<HTMLElement>(REVEAL)) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }

      for (const group of gsap.utils.toArray<HTMLElement>(GROUP)) {
        const items = group.querySelectorAll("[data-reveal]");
        if (!items.length) continue;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    const settle = window.setTimeout(refresh, 120);

    return () => {
      window.clearTimeout(settle);
      context.revert();
    };
  }, [pathname]);

  return children;
}
