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
const STORY = '[data-story]:not([data-story="assembly"])';
const ASSEMBLY = '[data-story="assembly"]';
const SCRUB_WIDTH = "(min-width: 1024px)";
const STACK_WIDTH = "(max-width: 1023px)";

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

function registerStory() {
  const media = gsap.matchMedia();

  for (const story of gsap.utils.toArray<HTMLElement>(STORY)) {
    const track = story.querySelector<HTMLElement>(".story-track");
    const head = story.querySelector<HTMLElement>("[data-story-head]");
    const panes = gsap.utils.toArray<HTMLElement>(
      story.querySelectorAll("[data-story-pane]")
    );
    const ticks = gsap.utils.toArray<HTMLElement>(
      story.querySelectorAll("[data-story-tick]")
    );

    if (!track || panes.length < 2) continue;

    media.add(SCRUB_WIDTH, () => {
      story.classList.add("story-scrub");

      const setX = head ? gsap.quickSetter(head, "x", "px") : null;
      let railWidth = head?.parentElement?.clientWidth ?? 0;
      let current = -1;

      const paint = (progress: number) => {
        setX?.(progress * railWidth);

        const next = Math.min(
          panes.length - 1,
          Math.max(0, Math.floor(progress * panes.length))
        );
        if (next === current) return;
        current = next;
        panes.forEach((pane, i) => pane.toggleAttribute("data-active", i === next));
        ticks.forEach((tick, i) => tick.toggleAttribute("data-active", i === next));
      };

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onRefresh: (self) => {
          railWidth = head?.parentElement?.clientWidth ?? 0;
          paint(self.progress);
        },
        onUpdate: (self) => paint(self.progress),
      });

      return () => {
        trigger.kill();
        story.classList.remove("story-scrub");
        panes.forEach((pane, i) => pane.toggleAttribute("data-active", i === 0));
        ticks.forEach((tick, i) => tick.toggleAttribute("data-active", i === 0));
        if (head) gsap.set(head, { clearProps: "transform" });
      };
    });

    media.add(STACK_WIDTH, () => {
      const tweens = panes.map((pane) =>
        gsap.from(pane, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: pane, start: "top 88%", once: true },
        })
      );

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.revert();
        });
      };
    });
  }

  return media;
}

function registerAssembly() {
  const media = gsap.matchMedia();

  for (const assembly of gsap.utils.toArray<HTMLElement>(ASSEMBLY)) {
    const cards = gsap.utils.toArray<HTMLElement>(
      assembly.querySelectorAll("[data-story-pane]")
    );
    const summary = assembly.querySelector<HTMLElement>("[data-assembly-summary]");

    if (cards.length < 2) continue;

    media.add(SCRUB_WIDTH, () => {
      assembly.classList.add("toolkit-scrub");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: assembly,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      timeline.fromTo(
        cards,
        {
          x: (_, card) => Number((card as HTMLElement).dataset.assemblyX ?? 0),
          y: (_, card) => Number((card as HTMLElement).dataset.assemblyY ?? 0),
          rotation: (_, card) =>
            Number((card as HTMLElement).dataset.assemblyRotation ?? 0),
          scale: (_, card) =>
            Number((card as HTMLElement).dataset.assemblyScale ?? 1),
          opacity: 0.9,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.04,
        },
        0.42
      );

      if (summary) {
        timeline.fromTo(
          summary,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power3.out" },
          0.88
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.revert();
        assembly.classList.remove("toolkit-scrub");
      };
    });

    media.add(STACK_WIDTH, () => {
      const tween = gsap.from(cards, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: assembly, start: "top 88%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.revert();
      };
    });
  }

  return media;
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

    let storyMedia: gsap.MatchMedia | undefined;
    let assemblyMedia: gsap.MatchMedia | undefined;

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
      storyMedia = registerStory();
      assemblyMedia = registerAssembly();
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
      storyMedia?.revert();
      assemblyMedia?.revert();
      context.revert();
    };
  }, [pathname]);

  return <ScrollEngine value={lenisRef}>{children}</ScrollEngine>;
}
