"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { pass } from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import {
  Fn,
  abs,
  clamp,
  cos,
  deltaTime,
  float,
  instanceIndex,
  instancedArray,
  length,
  max,
  mix,
  normalize,
  sign,
  pow,
  sin,
  smoothstep,
  time,
  uniform,
  vec2,
  vec3,
  vec4,
} from "three/tsl";
import { FIELD, buildFieldBuffers, particleCount, supportsField } from "@/lib/particles/config";
import {
  CAMERA_DISTANCE,
  CAMERA_FOV,
  createProjection,
  rectToWorld,
} from "@/lib/particles/projection";
import {
  PARTICLE_PARK_EVENT,
  type ParticleParkDetail,
} from "@/lib/particles/parking";

type AmbientUniform = { value: number };

export function ParticleField({
  maskSelector,
  ambient = true,
}: {
  maskSelector?: string;
  ambient?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const ambientVisibleRef = useRef<AmbientUniform | null>(null);
  const ambientRef = useRef(ambient);

  useEffect(() => {
    ambientRef.current = ambient;
    if (ambientVisibleRef.current) {
      ambientVisibleRef.current.value = ambient ? 1 : 0;
    }
  }, [ambient]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !supportsField()) return;

    let disposed = false;
    let renderer: THREE.WebGPURenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const count = particleCount();
    const { homes, params } = buildFieldBuffers(count, Math.random);

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 20);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const positions = instancedArray(count, "vec3");
    const velocities = instancedArray(count, "vec3");
    const homeBuffer = instancedArray(homes, "vec3");
    const paramBuffer = instancedArray(params, "vec3");

    const ambientVisible = uniform(ambientRef.current ? 1 : 0);
    ambientVisibleRef.current = ambientVisible;

    const pointer = uniform(new THREE.Vector3(0, -0.6, 0));
    const pointerActive = uniform(0);
    const pointerDir = uniform(new THREE.Vector2(1, 0));
    const pointerSpeed = uniform(0);
    const pointerSpin = uniform(0);
    const blobCentre = uniform(new THREE.Vector2(0, -0.6));
    const halfExtent = uniform(new THREE.Vector3(1.86, 1.04, 1));
    const scrollWorld = uniform(0);
    const pixelToWorld = uniform(0.0023);
    const maskCentres = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(99, 99, 0))
    );
    const maskExtents = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(0.001, 0.001, 0))
    );

    type Element = ReturnType<typeof homeBuffer.element>;

    const ambientHomeOf = (home: Element) =>
      vec3(home.x.mul(halfExtent.x), home.y.mul(halfExtent.y).add(scrollWorld), home.z);

    const blobTargetOf = (home: Element, param: Element) => {
      const perpDir = vec2(pointerDir.y.negate(), pointerDir.x);
      const radius = float(FIELD.blobRadius);

      const along = home.x
        .mul(radius)
        .mul(float(1).add(pointerSpeed.mul(float(FIELD.blobElongate))));
      const across = home.y
        .mul(radius)
        .mul(float(1).sub(pointerSpeed.mul(float(FIELD.blobNarrow))));

      const lag = float(1).sub(param.y);
      const tail = pointerDir
        .mul(pointerSpeed)
        .mul(float(FIELD.blobTail))
        .mul(lag)
        .negate();

      const turbulence = vec2(
        sin(
          time
            .mul(float(FIELD.blobNoiseFreq))
            .add(param.x.mul(6.283))
            .add(home.y.mul(3.1))
        ),
        cos(
          time
            .mul(float(FIELD.blobNoiseFreq * 0.83))
            .add(param.y.mul(6.283))
            .add(home.x.mul(2.7))
        )
      ).mul(float(FIELD.blobNoiseAmp));

      const offset = pointerDir
        .mul(along)
        .add(perpDir.mul(across))
        .add(tail)
        .add(turbulence);

      return vec3(blobCentre.add(offset), home.z);
    };

    const init = Fn(() => {
      const home = homeBuffer.element(instanceIndex);
      const param = paramBuffer.element(instanceIndex);
      positions
        .element(instanceIndex)
        .assign(mix(ambientHomeOf(home), blobTargetOf(home, param), param.z));
      velocities.element(instanceIndex).assign(vec3(0));
    })().compute(count);

    const update = Fn(() => {
      const position = positions.element(instanceIndex);
      const velocity = velocities.element(instanceIndex);
      const home = homeBuffer.element(instanceIndex);
      const param = paramBuffer.element(instanceIndex);
      const role = param.z;

      const dt = clamp(deltaTime, float(0), float(0.033));
      const phase = time.mul(0.3).add(param.x.mul(6.283));

      const drift = vec3(
        sin(phase.add(position.y.mul(2.1))),
        cos(phase.mul(0.7).add(position.x.mul(1.7))).mul(0.55),
        float(0)
      ).mul(FIELD.drift);

      let ambientForce = ambientHomeOf(home).sub(position).mul(FIELD.homePull).add(drift);

      const toPointer = position.sub(pointer);
      const falloff = smoothstep(float(FIELD.pointerRadius), float(0), length(toPointer.xy));
      ambientForce = ambientForce.add(
        normalize(vec3(toPointer.xy, 0.001))
          .mul(falloff)
          .mul(float(FIELD.pointerStrength))
          .mul(pointerActive)
      );

      for (let i = 0; i < FIELD.maxMasks; i++) {
        const delta = position.sub(maskCentres[i]);
        const extent = maskExtents[i];
        const inside = smoothstep(extent.x, extent.x.mul(0.5), abs(delta.x)).mul(
          smoothstep(extent.y, extent.y.mul(0.5), abs(delta.y))
        );
        ambientForce = ambientForce.add(
          normalize(vec3(delta.xy, 0.001)).mul(inside).mul(float(FIELD.maskStrength))
        );
      }

      const omega = float(FIELD.blobFreq).mul(
        param.y.mul(float(FIELD.blobFreqSpread)).add(1 - FIELD.blobFreqSpread / 2)
      );

      const fromCentre = position.xy.sub(blobCentre);
      const spread = length(fromCentre);
      const radial = fromCentre.div(max(spread, float(0.0008)));
      const tangent = vec2(radial.y.negate(), radial.x).mul(sign(pointerSpin));
      const spin = abs(pointerSpin);

      const orbit = tangent
        .mul(float(FIELD.spinTorque))
        .mul(spin)
        .mul(smoothstep(float(0), float(FIELD.spinCore), spread));

      const centrifugal = radial
        .mul(float(FIELD.spinPush))
        .mul(spin)
        .mul(spread.div(float(FIELD.blobRadius)));

      const grip = mix(float(1), float(FIELD.spinLoosen), spin).div(
        spread.mul(float(FIELD.spinDistanceLag)).mul(spin).add(1)
      );

      const blobForce = blobTargetOf(home, param)
        .sub(position)
        .mul(omega.mul(omega))
        .mul(grip)
        .sub(
          velocity.mul(
            omega
              .mul(2 * FIELD.blobDampingRatio)
              .mul(mix(float(1), float(FIELD.spinDrag), spin))
          )
        )
        .add(vec3(orbit.add(centrifugal), float(0)));

      velocity.addAssign(mix(ambientForce, blobForce, role).mul(dt));
      velocity.mulAssign(mix(float(FIELD.ambientDamping), float(1), role));
      position.addAssign(velocity.mul(dt));
    })().compute(count);

    const material = new THREE.SpriteNodeMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const param = paramBuffer.element(instanceIndex);
    const depth = smoothstep(float(-1.6), float(0), positions.element(instanceIndex).z);
    const role = param.z;
    const flare = pow(pointerSpeed, float(2));
    const blobLift = flare.mul(0.62).add(0.72);

    const ambientAlpha = depth
      .mul(0.055)
      .add(0.058)
      .mul(max(param.y, float(0.45)))
      .mul(ambientVisible);
    const blobAlpha = depth
      .mul(0.05)
      .add(0.082)
      .mul(max(param.y, float(0.55)))
      .mul(blobLift);

    const ambientSize = mix(float(1.25), float(3.4), param.x).mul(ambientVisible);
    const blobSize = mix(float(1.6), float(4.4), param.x).mul(
      mix(float(1), float(0.94), pointerSpeed)
    );

    material.positionNode = positions.element(instanceIndex);
    material.colorNode = vec4(
      mix(vec3(0.52, 0.55, 0.59), vec3(0.97, 0.98, 0.99), param.x),
      mix(ambientAlpha, blobAlpha, role)
    );
    material.scaleNode = mix(ambientSize, blobSize, role)
      .mul(depth.mul(0.2).add(0.88))
      .mul(pixelToWorld);

    const sprites = new THREE.Sprite(material);
    sprites.count = count;
    sprites.frustumCulled = false;
    scene.add(sprites);

    renderer = new THREE.WebGPURenderer({ canvas, antialias: false, alpha: true });
    renderer.setClearColor(0x0b0c0e, 0);

    const scenePass = pass(scene, camera);
    const bloomed = new THREE.PostProcessing(renderer);
    bloomed.outputNode = scenePass.add(
      bloom(
        scenePass.getTextureNode(),
        FIELD.bloomStrength,
        FIELD.bloomRadius,
        FIELD.bloomThreshold
      )
    );
    const plain = new THREE.PostProcessing(renderer);
    plain.outputNode = scenePass;

    let output = bloomed;
    let strikes = 0;
    let quality = 0;

    let worldPerPixel = 0.0023;
    let scrollOffset = 0;
    let parkPageScroll = 0;
    let parkScroll = 0;
    let parked = false;

    const effectiveScroll = () => (parked ? parkScroll : window.scrollY - scrollOffset);

    const syncScroll = () => {
      scrollWorld.value = effectiveScroll() * worldPerPixel;
    };

    const onParticlePark = (event: Event) => {
      const detail = (event as CustomEvent<ParticleParkDetail>).detail;

      if (detail.reset) {
        scrollOffset = 0;
        parkPageScroll = 0;
        parkScroll = 0;
        parked = false;
        syncScroll();
        return;
      }

      const next = detail.parked ?? false;
      if (next === parked) return;

      if (next) {
        parkScroll = window.scrollY - scrollOffset;
        parkPageScroll = window.scrollY;
        parked = true;
      } else {
        scrollOffset += window.scrollY - parkPageScroll;
        parked = false;
      }

      syncScroll();
    };

    const syncLayout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      halfExtent.value.set(projection.halfW, projection.halfH, 1);
      worldPerPixel = projection.worldPerPixel;
      pixelToWorld.value = projection.worldPerPixel;
      syncScroll();

      const targets = maskSelector
        ? Array.from(document.querySelectorAll<HTMLElement>(maskSelector)).slice(
            0,
            FIELD.maxMasks
          )
        : [];

      for (let i = 0; i < FIELD.maxMasks; i++) {
        const element = targets[i];
        if (!element) {
          maskCentres[i].value.set(99, 99, 0);
          maskExtents[i].value.set(0.001, 0.001, 0);
          continue;
        }
        const { centre, extent } = rectToWorld(
          element.getBoundingClientRect(),
          projection,
          rect
        );
        maskCentres[i].value.set(centre[0], centre[1], centre[2]);
        maskExtents[i].value.set(extent[0], extent[1], extent[2]);
      }
    };

    const onScroll = () => {
      syncScroll();
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height || !renderer) return;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const cap = coarse ? FIELD.maxPixelRatioCoarse : FIELD.maxPixelRatio;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality >= 1 ? 1 : cap));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      syncLayout();
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let smoothedSpeed = 0;
    let angular = 0;
    let prevDirX = 1;
    let prevDirY = 0;
    let targetSpeed = 0;
    let centreInitialised = false;
    let frameTime = 0;
    const centreVelocity = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      const x = projection.toWorldX(event.clientX);
      const y = projection.toWorldY(event.clientY);

      const now = performance.now();
      const elapsed = Math.max(1, now - lastTime);

      if (lastTime) {
        const distance = Math.hypot(x - lastX, y - lastY);
        targetSpeed = Math.min(1, (distance / elapsed) * 1000 * FIELD.speedRamp);
      }

      lastX = x;
      lastY = y;
      lastTime = now;
      pointer.value.set(x, y, 0);
      pointerActive.value = 1;

      if (!centreInitialised) {
        blobCentre.value.set(x, y);
        centreVelocity.set(0, 0);
        centreInitialised = true;
      }
    };

    const onPointerLeave = () => {
      pointerActive.value = 0;
    };

    renderer
      .init()
      .then(async () => {
        if (disposed || !renderer) return;

        resize();
        await renderer.computeAsync(init);

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener(PARTICLE_PARK_EVENT, onParticlePark);
        if (document.documentElement.hasAttribute("data-particle-parked")) {
          onParticlePark(
            new CustomEvent<ParticleParkDetail>(PARTICLE_PARK_EVENT, {
              detail: { parked: true },
            })
          );
        }

        renderer.setAnimationLoop(() => {
          if (disposed || !renderer) return;
          const now = performance.now();
          const step = frameTime ? Math.min(0.05, (now - frameTime) / 1000) : 0.016;
          frameTime = now;

          syncScroll();
          targetSpeed *= FIELD.speedDecay;
          smoothedSpeed += (targetSpeed - smoothedSpeed) * FIELD.speedRise;
          pointerSpeed.value = smoothedSpeed;

          const dirNow = pointerDir.value;
          const turn = prevDirX * dirNow.y - prevDirY * dirNow.x;
          prevDirX = dirNow.x;
          prevDirY = dirNow.y;
          angular += (turn / Math.max(step, 1e-4) - angular) * FIELD.spinRise;
          angular *= FIELD.spinDecay;
          pointerSpin.value = Math.max(
            -1,
            Math.min(1, (angular / FIELD.spinFull) * smoothedSpeed)
          );

          const centre = blobCentre.value;
          const chaseX = pointer.value.x - centre.x;
          const chaseY = pointer.value.y - centre.y;
          const chase = Math.hypot(chaseX, chaseY);
          if (chase > 0.012) {
            const targetX = chaseX / chase;
            const targetY = chaseY / chase;
            const dir = pointerDir.value;
            dir.set(
              dir.x + (targetX - dir.x) * FIELD.dirSmoothing,
              dir.y + (targetY - dir.y) * FIELD.dirSmoothing
            );
            const len = Math.hypot(dir.x, dir.y) || 1;
            dir.set(dir.x / len, dir.y / len);
          }

          centreVelocity.x +=
            (chaseX * FIELD.centreStiffness - centreVelocity.x * FIELD.centreDamping) * step;
          centreVelocity.y +=
            (chaseY * FIELD.centreStiffness - centreVelocity.y * FIELD.centreDamping) * step;
          centre.set(
            centre.x + centreVelocity.x * step,
            centre.y + centreVelocity.y * step
          );
          if (step > FIELD.slowFrameMs / 1000) strikes++;
          if (strikes > FIELD.slowFrameStrikes && quality < 3) {
            strikes = 0;
            quality++;
            if (quality === 1) resize();
            if (quality === 2) output = plain;
            if (quality === 3) sprites.count = Math.floor(count / 2);
          }

          renderer.compute(update);
          output.renderAsync();
        });
      })
      .catch(() => {
        canvas.remove();
      });

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      ambientVisibleRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(PARTICLE_PARK_EVENT, onParticlePark);
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
      material.dispose();
      canvas.remove();
    };
  }, [maskSelector]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
