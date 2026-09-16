export const FIELD = {
  countDesktop: 118_000,
  countCoarse: 46_000,

  blobRatio: 0.075,
  blobRadius: 0.105,
  blobElongate: 2.4,
  blobNarrow: 0.45,
  blobTail: 0.24,
  blobFreq: 9.5,
  blobFreqSpread: 0.5,
  blobDampingRatio: 0.52,
  blobNoiseAmp: 0.013,
  blobNoiseFreq: 1.6,

  centreStiffness: 13,
  centreDamping: 4,
  speedRamp: 0.13,
  speedDecay: 0.965,
  speedRise: 0.14,
  dirSmoothing: 0.11,

  spinFull: 5.5,
  spinRise: 0.07,
  spinDecay: 0.986,
  spinTorque: 9.5,
  spinPush: 2.6,
  spinCore: 0.055,
  spinLoosen: 0.3,
  spinDistanceLag: 5.5,
  spinDrag: 0.55,

  bandCentre: 0.855,
  bandSpread: 0.062,
  bandMin: 0.735,
  bandMax: 1.04,
  rightBias: 0.8,

  drift: 0.3,
  homePull: 2.1,
  ambientDamping: 0.93,
  pointerRadius: 0.36,
  pointerStrength: 3.2,
  maskStrength: 2.4,
  bloomStrength: 0.35,
  bloomRadius: 0.3,
  bloomThreshold: 0.75,
  maxPixelRatio: 1.5,
  maxPixelRatioCoarse: 2,
  slowFrameMs: 34,
  slowFrameStrikes: 45,
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

function gaussian(random: () => number) {
  const u = Math.max(1e-6, random());
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function buildFieldBuffers(count: number, random: () => number) {
  const blobCount = Math.floor(count * FIELD.blobRatio);
  const homes = new Float32Array(count * 3);
  const params = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const isBlob = i < blobCount;
    const o = i * 3;

    if (isBlob) {
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random());
      homes[o] = Math.cos(angle) * radius;
      homes[o + 1] = Math.sin(angle) * radius;
      homes[o + 2] = (random() - 0.5) * 0.12;
    } else {
      const normalisedY = Math.min(
        FIELD.bandMax,
        Math.max(FIELD.bandMin, FIELD.bandCentre + gaussian(random) * FIELD.bandSpread)
      );
      homes[o] = (Math.pow(random(), FIELD.rightBias) * 2 - 1) * 1.02;
      homes[o + 1] = 1 - normalisedY * 2;
      homes[o + 2] = -random() * 1.1;
    }

    params[o] = random();
    params[o + 1] = random();
    params[o + 2] = isBlob ? 1 : 0;
  }

  return { homes, params, blobCount };
}
