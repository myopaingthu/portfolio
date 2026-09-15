"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import {
  Fn,
  If,
  abs,
  clamp,
  cos,
  deltaTime,
  float,
  hash,
  instancedArray,
  instanceIndex,
  length,
  max,
  mix,
  normalize,
  pow,
  sin,
  step,
  smoothstep,
  time,
  uniform,
  vec3,
  vec4,
  vertexIndex,
} from "three/tsl";
import { FIELD, particleCount, supportsField } from "@/lib/particles/config";
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
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 20);
    camera.position.set(0, 0.1, CAMERA_DISTANCE);

    const positions = instancedArray(count, "vec3");
    const velocities = instancedArray(count, "vec3");
    const seeds = instancedArray(count, "vec3");

    const pointer = uniform(new THREE.Vector3(99, 99, 0));
    const pointerActive = uniform(0);
    const maskCentres = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(99, 99, 0))
    );
    const maskExtents = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(0.001, 0.001, 0))
    );

    const init = Fn(() => {
      const index = instanceIndex.toFloat();
      const rx = hash(instanceIndex);
      const ry = hash(instanceIndex.add(7));
      const rz = hash(instanceIndex.add(13));
      const rs = hash(instanceIndex.add(29));

      const angle = rx.mul(6.283185);
      const radius = pow(ry, float(0.55));
      const clustered = vec3(
        cos(angle).mul(radius).mul(FIELD.spreadX),
        sin(angle).mul(radius).mul(FIELD.spreadY),
        rz.mul(-FIELD.spreadZ)
      );
      const scattered = vec3(
        rz.sub(0.5).mul(2 * FIELD.spreadX),
        rx.sub(0.5).mul(2 * FIELD.spreadY),
        ry.mul(-FIELD.spreadZ)
      );

      positions
        .element(instanceIndex)
        .assign(mix(clustered, scattered, step(float(0.58), rs)));
      velocities.element(instanceIndex).assign(vec3(0));
      seeds.element(instanceIndex).assign(vec3(rs, rx, index.mul(0.0001)));
    })().compute(count);

    const update = Fn(() => {
      const position = positions.element(instanceIndex);
      const velocity = velocities.element(instanceIndex);
      const seed = seeds.element(instanceIndex);

      const dt = clamp(deltaTime, float(0), float(0.05));
      const phase = time.mul(0.22).add(seed.x.mul(6.283));

      const drift = vec3(
        sin(phase.add(position.y.mul(1.4))),
        cos(phase.mul(0.8).add(position.x.mul(1.1))),
        sin(phase.mul(0.5))
      ).mul(FIELD.drift);

      velocity.addAssign(drift.mul(dt));

      const toPointer = position.sub(pointer);
      const pointerDistance = length(toPointer.xy);
      const pointerFalloff = smoothstep(float(FIELD.pointerRadius), float(0), pointerDistance);
      velocity.addAssign(
        normalize(vec3(toPointer.xy, 0.001))
          .mul(pointerFalloff)
          .mul(float(FIELD.pointerStrength))
          .mul(pointerActive)
          .mul(dt)
      );

      for (let i = 0; i < FIELD.maxMasks; i++) {
        const delta = position.sub(maskCentres[i]);
        const extent = maskExtents[i];
        const inside = smoothstep(extent.x, extent.x.mul(0.55), abs(delta.x)).mul(
          smoothstep(extent.y, extent.y.mul(0.55), abs(delta.y))
        );
        velocity.addAssign(
          normalize(vec3(delta.xy, 0.001))
            .mul(inside)
            .mul(float(FIELD.maskStrength))
            .mul(dt)
        );
      }

      velocity.mulAssign(float(FIELD.damping));
      position.addAssign(velocity.mul(dt));

      const limitX = float(FIELD.spreadX);
      const limitY = float(FIELD.spreadY);

      If(abs(position.x).greaterThan(limitX), () => {
        position.x.assign(position.x.negate().mul(0.98));
        velocity.x.assign(velocity.x.mul(-0.4));
      });

      If(abs(position.y).greaterThan(limitY), () => {
        position.y.assign(position.y.negate().mul(0.98));
        velocity.y.assign(velocity.y.mul(-0.4));
      });
    })().compute(count);

    const material = new THREE.PointsNodeMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const seed = seeds.element(vertexIndex);
    const depthFade = smoothstep(float(-FIELD.spreadZ), float(0), positions.element(vertexIndex).z);

    material.positionNode = positions.element(vertexIndex);
    material.colorNode = vec4(
      mix(vec3(0.43, 0.46, 0.5), vec3(0.93, 0.94, 0.96), seed.x),
      depthFade.mul(0.78).add(0.1).mul(max(seed.y, float(0.4)))
    );
    material.sizeNode = mix(float(1), float(2.2), seed.x).mul(depthFade.mul(0.6).add(0.4));

    const geometry = new THREE.BufferGeometry();
    geometry.setDrawRange(0, count);
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    renderer = new THREE.WebGPURenderer({ canvas, antialias: false, alpha: true });
    renderer.setClearColor(0x0b0c0e, 0);

    const syncMasks = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);

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

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height || !renderer) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      syncMasks();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      pointer.value.set(projection.toWorldX(event.clientX), projection.toWorldY(event.clientY), 0);
      pointerActive.value = 1;
    };

    const onPointerLeave = () => {
      pointerActive.value = 0;
    };

    renderer
      .init()
      .then(async () => {
        if (disposed || !renderer) return;

        await renderer.computeAsync(init);
        resize();

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
        window.addEventListener("scroll", syncMasks, { passive: true });

        renderer.setAnimationLoop(() => {
          if (disposed || !renderer) return;
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
      window.removeEventListener("scroll", syncMasks);
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
      geometry.dispose();
      material.dispose();
      canvas.remove();
    };
  }, [maskSelector]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
