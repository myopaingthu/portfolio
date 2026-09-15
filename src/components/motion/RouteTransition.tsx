"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const MELT_MS = 300;

export function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.remove("jm-melt");
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href?.startsWith("/") || href.startsWith("//")) return;

      const destination = new URL(href, window.location.origin);
      if (destination.pathname === window.location.pathname) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      event.stopPropagation();
      document.documentElement.classList.add("jm-melt");
      window.setTimeout(() => router.push(href), MELT_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
