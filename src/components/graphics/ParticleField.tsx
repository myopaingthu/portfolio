"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
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

export function ParticleField({ maskSelector }: { maskSelector?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

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

    const pointer = uniform(new THREE.Vector3(0, -0.6, 0));
    const pointerActive = uniform(0);
    const pointerDir = uniform(new THREE.Vector2(1, 0));
    const pointerSpeed = uniform(0);
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
      const base = vec2(
        home.x.mul(FIELD.blobRadiusX),
        home.y.mul(FIELD.blobRadiusY)
      );

      const along = base.x.mul(pointerDir.x).add(base.y.mul(pointerDir.y));
      const alongVec = pointerDir.mul(along);
      const perpVec = base.sub(alongVec);

      const squash = mix(float(1), float(FIELD.blobSquash), pointerSpeed);
      const bulge = mix(float(1), float(FIELD.blobBulge), pointerSpeed);
      const trail = pointerDir
        .mul(along)
        .mul(float(FIELD.blobStretch))
        .mul(pointerSpeed);

      const stretched = alongVec.mul(squash).add(perpVec.mul(bulge)).add(trail);

      const wander = vec2(
        sin(time.mul(1.7).add(param.x.mul(6.283))),
        cos(time.mul(1.3).add(param.y.mul(6.283)))
      )
        .mul(float(FIELD.blobJitter))
        .mul(float(1).sub(pointerSpeed.mul(0.85)));

      return vec3(blobCentre.add(stretched).add(wander), home.z);
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

      const dt = clamp(deltaTime, float(0), float(0.04));
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

      velocity.addAssign(ambientForce.mul(dt));
      velocity.mulAssign(float(FIELD.ambientDamping));
      const ambientPosition = position.add(velocity.mul(dt));

      const follow = clamp(
        dt.mul(float(FIELD.blobFollow)).mul(param.y.mul(0.4).add(0.8)),
        float(0),
        float(1)
      );
      const blobPosition = mix(position, blobTargetOf(home, param), follow);

      position.assign(mix(ambientPosition, blobPosition, role));
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
    const blobLift = pointerSpeed.mul(1.15).add(0.5);

    const ambientAlpha = depth.mul(0.055).add(0.058).mul(max(param.y, float(0.45)));
    const blobAlpha = depth
      .mul(0.05)
      .add(0.082)
      .mul(max(param.y, float(0.55)))
      .mul(blobLift);

    const ambientSize = mix(float(1.25), float(3.4), param.x);
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

    let worldPerPixel = 0.0023;

    const syncLayout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      halfExtent.value.set(projection.halfW, projection.halfH, 1);
      worldPerPixel = projection.worldPerPixel;
      pixelToWorld.value = projection.worldPerPixel;
      scrollWorld.value = window.scrollY * worldPerPixel;

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
      scrollWorld.value = window.scrollY * worldPerPixel;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height || !renderer) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      syncLayout();
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let smoothedSpeed = 0;
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

        renderer.setAnimationLoop(() => {
          if (disposed || !renderer) return;
          const now = performance.now();
          const step = frameTime ? Math.min(0.05, (now - frameTime) / 1000) : 0.016;
          frameTime = now;

          scrollWorld.value = window.scrollY * worldPerPixel;
          targetSpeed *= FIELD.speedDecay;
          smoothedSpeed += (targetSpeed - smoothedSpeed) * FIELD.speedRise;
          pointerSpeed.value = smoothedSpeed;

          const centre = blobCentre.value;
          const chaseX = pointer.value.x - centre.x;
          const chaseY = pointer.value.y - centre.y;
          const chase = Math.hypot(chaseX, chaseY);
          if (chase > 1e-5) pointerDir.value.set(chaseX / chase, chaseY / chase);

          centreVelocity.x +=
            (chaseX * FIELD.centreStiffness - centreVelocity.x * FIELD.centreDamping) * step;
          centreVelocity.y +=
            (chaseY * FIELD.centreStiffness - centreVelocity.y * FIELD.centreDamping) * step;
          centre.set(
            centre.x + centreVelocity.x * step,
            centre.y + centreVelocity.y * step
          );
          renderer.compute(update);
          renderer.render(scene, camera);
        });
      })
      .catch(() => {
        canvas.remove();
      });

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
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
