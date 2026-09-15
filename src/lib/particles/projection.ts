export const CAMERA_FOV = 34;
export const CAMERA_DISTANCE = 3.4;

export type Projection = {
  halfW: number;
  halfH: number;
  worldPerPixel: number;
  toWorldX: (clientX: number) => number;
  toWorldY: (clientY: number) => number;
};

export function createProjection(canvasRect: DOMRect): Projection {
  const halfH = CAMERA_DISTANCE * Math.tan((CAMERA_FOV * Math.PI) / 360);
  const width = Math.max(1, canvasRect.width);
  const height = Math.max(1, canvasRect.height);
  const halfW = halfH * (width / height);

  return {
    halfW,
    halfH,
    worldPerPixel: (2 * halfH) / height,
    toWorldX: (clientX) => ((clientX - canvasRect.left) / width * 2 - 1) * halfW,
    toWorldY: (clientY) => -(((clientY - canvasRect.top) / height) * 2 - 1) * halfH,
  };
}

export function rectToWorld(rect: DOMRect, projection: Projection, canvasRect: DOMRect) {
  const centreX = projection.toWorldX((rect.left + rect.right) / 2);
  const centreY = projection.toWorldY((rect.top + rect.bottom) / 2);
  const scaleX = (2 * projection.halfW) / Math.max(1, canvasRect.width);

  return {
    centre: [centreX, centreY, 0] as const,
    extent: [
      (rect.width * scaleX) / 2 + 0.06,
      (rect.height * projection.worldPerPixel) / 2 + 0.06,
      0,
    ] as const,
  };
}
