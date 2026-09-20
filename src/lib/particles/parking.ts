export const PARTICLE_PARK_EVENT = "portfolio:particle-park";

export type ParticleParkDetail = {
  parked?: boolean;
  reset?: boolean;
};

export function setParticleParked(parked: boolean) {
  document.documentElement.toggleAttribute("data-particle-parked", parked);
  window.dispatchEvent(
    new CustomEvent<ParticleParkDetail>(PARTICLE_PARK_EVENT, {
      detail: { parked },
    })
  );
}

export function resetParticleParking() {
  document.documentElement.removeAttribute("data-particle-parked");
  window.dispatchEvent(
    new CustomEvent<ParticleParkDetail>(PARTICLE_PARK_EVENT, {
      detail: { reset: true },
    })
  );
}
