"use client";

import { useRef, useState, type PointerEvent } from "react";
import { prism } from "@/content/site";

const POSITIONS = ["front", "mid", "back"] as const;
const SKINS = ["prism-screen", "prism-code-a", "prism-code-b"] as const;

const FIELD_LINES = Array.from(
  { length: 19 },
  (_, i) => `M-20 ${30 + i * 4} C80 ${140 - i * 3}, 200 ${-70 + i * 5}, 380 ${48 + i * 4}`,
);

const ICONS = [
  <path key="interface" d="M2.5 4.5h15v11h-15zM2.5 8h15M6 6.2h.01" />,
  <path key="service" d="m7 4-5 6 5 6m6-12 5 6-5 6M11 2 9 18" />,
  <g key="data">
    <ellipse cx="10" cy="5" rx="6.5" ry="2.5" />
    <path d="M3.5 5v10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5M3.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
  </g>,
];

export function LayerPrism() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const { layers, topline } = prism;
  const current = layers[active];

  const setTilt = (x: string, y: string) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tilt-x", x);
    stage.style.setProperty("--tilt-y", y);
  };

  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt(`${-9 * ny}deg`, `${12 * nx}deg`);
  };

  return (
    <div className="prism" data-layer={active}>
      <p className="prism-topline">
        <span>{topline}</span>
      </p>

      <div
        ref={stageRef}
        className="prism-stage"
        onPointerMove={track}
        onPointerLeave={() => setTilt("0deg", "0deg")}
        aria-hidden="true"
        data-field-mask
      >
        <div className="prism-orbit" />

        <div className="prism-stack">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`prism-sheet ${SKINS[index]}`}
              data-position={POSITIONS[(index - active + layers.length) % layers.length]}
            >
              {layer.sheet.kind === "screen" ? (
                <>
                  <div className="prism-screen-top">
                    <span>{layer.sheet.source}</span>
                    <span>↗</span>
                  </div>
                  <p className="prism-headline">
                    {layer.sheet.headline[0]}
                    <br />
                    <span>{layer.sheet.headline[1]}</span>
                  </p>
                  <div className="prism-field">
                    <svg viewBox="0 0 360 120" fill="none">
                      {FIELD_LINES.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </div>
                  <div className="prism-screen-foot">
                    <span>{layer.sheet.foot}</span>
                    <span>{layer.sheet.mark}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="prism-code-top">
                    <span>{layer.sheet.source}</span>
                    <span>{layer.sheet.badge}</span>
                  </div>
                  <pre>{layer.sheet.code}</pre>
                  <div className="prism-code-foot">{layer.sheet.foot}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="prism-controls">
        {layers.map((layer, index) => (
          <button
            key={layer.id}
            type="button"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {ICONS[index]}
            </svg>
            {layer.label}
          </button>
        ))}
      </div>

      <div className="prism-description" data-field-mask>
        <p className="mt-1.5 text-[19px] font-medium leading-[1.3] tracking-[-0.025em] text-paper-0">
          {current.title}
        </p>
        <p className="mt-2 min-h-[42px] max-w-[42ch] text-[13px] leading-[1.6] text-paper-1">
          {current.body}
        </p>
      </div>

      <noscript>
        <style>{`.prism-stage,.prism-controls{display:none}.prism-description{min-height:0}`}</style>
      </noscript>
    </div>
  );
}
