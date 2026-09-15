export const FIELD = {
  countDesktop: 110_000,
  countCoarse: 45_000,
  spreadX: 4.14,
  spreadY: 2.16,
  spreadZ: 3,
  pointerRadius: 0.42,
  pointerStrength: 1.9,
  maskStrength: 2.6,
  drift: 0.035,
  damping: 0.94,
  maxMasks: 6,
} as const;

export function supportsField() {
  if (typeof window === "undefined") return false;
  if (!("gpu" in navigator)) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) return false;

  return true;
}

export function particleCount() {
  return window.matchMedia("(pointer: coarse)").matches
    ? FIELD.countCoarse
    : FIELD.countDesktop;
}
