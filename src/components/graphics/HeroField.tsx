"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

export function HeroField() {
  return <ParticleField maskSelector="[data-field-mask]" />;
}
