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
  vec3,
  vec4,
  vertexIndex,
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
    const halfExtent = uniform(new THREE.Vector3(1.86, 1.04, 1));
    const maskCentres = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(99, 99, 0))
    );
    const maskExtents = Array.from({ length: FIELD.maxMasks }, () =>
      uniform(new THREE.Vector3(0.001, 0.001, 0))
    );

    const ambientHomeOf = (home: ReturnType<typeof homeBuffer.element>) =>
      vec3(home.x.mul(halfExtent.x), home.y.mul(halfExtent.y), home.z);

    const blobTargetOf = (home: ReturnType<typeof homeBuffer.element>) =>
      vec3(
        pointer.x.add(home.x.mul(FIELD.blobRadiusX)),
        pointer.y.add(home.y.mul(FIELD.blobRadiusY)),
        home.z
      );

    const init = Fn(() => {
      const home = homeBuffer.element(instanceIndex);
      const role = paramBuffer.element(instanceIndex).z;
      positions
        .element(instanceIndex)
        .assign(mix(ambientHomeOf(home), blobTargetOf(home), role));
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

      const ambientHome = ambientHomeOf(home);
      const drift = vec3(
        sin(phase.add(position.y.mul(2.1))),
        cos(phase.mul(0.7).add(position.x.mul(1.7))).mul(0.55),
        float(0)
      ).mul(FIELD.drift);

      let ambientForce = ambientHome
        .sub(position)
        .mul(FIELD.homePull)
        .add(drift);

      const toPointer = position.sub(pointer);
      const distance = length(toPointer.xy);
      const falloff = smoothstep(float(FIELD.pointerRadius), float(0), distance);
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

      const blobForce = blobTargetOf(home).sub(position).mul(FIELD.blobStiffness);

      velocity.addAssign(mix(ambientForce, blobForce, role).mul(dt));
      velocity.mulAssign(mix(float(FIELD.ambientDamping), float(FIELD.blobDamping), role));
      position.addAssign(velocity.mul(dt));
    })().compute(count);

    const material = new THREE.PointsNodeMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const param = paramBuffer.element(vertexIndex);
    const depth = smoothstep(float(-1.6), float(0), positions.element(vertexIndex).z);
    const blobLift = param.z.mul(0.4).add(1);

    material.positionNode = positions.element(vertexIndex);
    material.colorNode = vec4(
      mix(vec3(0.5, 0.53, 0.57), vec3(0.96, 0.97, 0.98), param.x),
      depth.mul(0.18).add(0.3).mul(max(param.y, float(0.66))).mul(blobLift)
    );
    material.sizeNode = mix(float(1), float(1.9), param.x).mul(depth.mul(0.3).add(0.8));

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

    const syncLayout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      halfExtent.value.set(projection.halfW, projection.halfH, 1);

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
      syncLayout();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const projection = createProjection(rect);
      pointer.value.set(
        projection.toWorldX(event.clientX),
        projection.toWorldY(event.clientY),
        0
      );
      pointerActive.value = 1;
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
        window.addEventListener("scroll", syncLayout, { passive: true });

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
      window.removeEventListener("scroll", syncLayout);
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
