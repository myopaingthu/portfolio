"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const REVEAL = "[data-reveal]:not([data-reveal-group] [data-reveal])";
const GROUP = "[data-reveal-group]";

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = window.matchMedia("(pointer: coarse)").matches
      ? null
      : new Lenis({ lerp: 0.12, wheelMultiplier: 1 });

    const raf = (time: number) => lenis?.raf(time * 1000);

    if (lenis) {
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const triggers: ScrollTrigger[] = [];

    for (const el of gsap.utils.toArray<HTMLElement>(REVEAL)) {
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    for (const group of gsap.utils.toArray<HTMLElement>(GROUP)) {
      const items = group.querySelectorAll("[data-reveal]");
      if (!items.length) continue;
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return children;
}
