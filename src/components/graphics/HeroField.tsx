"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

const NO_AMBIENT = [/^\/projects\/[^/]+\/?$/, /^\/experience\/?$/, /^\/about\/?$/];

export function HeroField() {
  const pathname = usePathname();
  const ambient = !NO_AMBIENT.some((route) => route.test(pathname));

  return <ParticleField maskSelector="[data-field-mask]" ambient={ambient} />;
}
