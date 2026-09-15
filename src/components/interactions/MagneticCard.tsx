"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const STRENGTH_X = 8;
const STRENGTH_Y = 6;

export function MagneticCard({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (parseFloat(getComputedStyle(el).opacity) < 1) return;

    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translate(${STRENGTH_X * nx}px, ${STRENGTH_Y * ny}px)`;
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={href}
      data-magnetic
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group relative flex flex-col justify-between bg-ink-0 p-8 no-underline transition-transform duration-200 ease-out md:p-10",
        className
      )}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-chrome-lo via-chrome-hi to-chrome-lo transition-transform duration-500 ease-out group-hover:scale-x-100" />
      {children}
    </Link>
  );
}
