"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { recallScroll } from "@/lib/scroll-memory";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const REVEAL = "[data-reveal]:not([data-reveal-group] [data-reveal])";
const GROUP = "[data-reveal-group]";
const HERO = "[data-hero-reveal]";
const COUNT = "[data-count]";
const TRACE = "[data-trace-node]";

const ScrollEngine = createContext<RefObject<Lenis | null> | null>(null);

export function useScrollEngine() {
  return useContext(ScrollEngine);
}

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

function registerCounters() {
  for (const el of gsap.utils.toArray<HTMLElement>(COUNT)) {
    const parts = /^(\D*?)(\d+)(\D*)$/.exec(el.dataset.count ?? "");
    if (!parts) continue;

    const [, prefix, digits, suffix] = parts;
    const width = digits.length;
    const counter = { value: 0 };
    const render = () => {
      el.textContent = `${prefix}${String(Math.round(counter.value)).padStart(width, "0")}${suffix}`;
    };

    render();

    gsap.to(counter, {
      value: Number(digits),
      duration: 0.7,
      ease: "power3.out",
      onUpdate: render,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }
}

function registerTraceNodes() {
  for (const node of gsap.utils.toArray<HTMLElement>(TRACE)) {
    ScrollTrigger.create({
      trigger: node,
      start: "top 75%",
      onEnter: () => node.classList.add("trace-lit"),
      onLeaveBack: () => node.classList.remove("trace-lit"),
    });
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = window.matchMedia("(pointer: coarse)").matches
      ? null
      : new Lenis({
          lerp: 0.12,
          wheelMultiplier: 1,
          content: document.body,
        });

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
    const previous = previousPathnameRef.current;
    previousPathnameRef.current = pathname;

    if (prefersReducedMotion()) {
      showEverything();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const isReturningToParent =
      pathname !== "/" &&
      previous !== null &&
      previous !== pathname &&
      previous.startsWith(`${pathname}/`);

    const remembered = isReturningToParent ? recallScroll(pathname) : undefined;
    const target = remembered ?? 0;

    const lenis = lenisRef.current;
    lenis?.resize();
    if (lenis) lenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target, behavior: "instant" });

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

      registerCounters();
      registerTraceNodes();
    });

    let pending = 0;

    const refresh = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };

    const scheduleRefresh = () => {
      window.clearTimeout(pending);
      pending = window.setTimeout(refresh, 120);
    };

    refresh();
    document.fonts.ready.then(scheduleRefresh);

    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);

    return () => {
      window.clearTimeout(pending);
      observer.disconnect();
      context.revert();
    };
  }, [pathname]);

  return <ScrollEngine value={lenisRef}>{children}</ScrollEngine>;
}
