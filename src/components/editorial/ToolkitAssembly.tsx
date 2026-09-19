import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { aboutPage, skillGroups } from "@/content/portfolio";

const scatter = [
  { x: -250, y: -170, rotation: -6.5, scale: 0.96 },
  { x: 250, y: -78, rotation: 5, scale: 0.97 },
  { x: -190, y: 92, rotation: 4, scale: 0.97 },
  { x: 220, y: 178, rotation: -5.5, scale: 0.96 },
];

export function ToolkitAssembly() {
  const { toolkit } = aboutPage;

  return (
    <section
      className="toolkit-assembly"
      data-story="assembly"
      aria-label={toolkit.ariaLabel}
    >
      <div className="toolkit-track">
        <div className="toolkit-stage">
          <div className="toolkit-head">
            <Eyebrow className="toolkit-eyebrow w-fit border border-hairline bg-ink-0 px-3 py-1.5 text-paper-1">
              {toolkit.eyebrow}
            </Eyebrow>
            <p className="label-mono border border-hairline px-3 py-1.5 text-paper-1">
              {toolkit.count}
            </p>
          </div>

          <div className="toolkit-deck">
            {skillGroups.map((group, index) => (
              <article
                key={group.title}
                className="toolkit-card ticks"
                data-story-pane
                data-assembly-x={scatter[index].x}
                data-assembly-y={scatter[index].y}
                data-assembly-rotation={scatter[index].rotation}
                data-assembly-scale={scatter[index].scale}
                style={{ "--toolkit-index": index + 1 } as CSSProperties}
              >
                <span className="toolkit-index label-mono text-[10px] text-chrome-mid">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="toolkit-identity">
                  <p className="label-mono text-[9px] text-chrome-lo">{group.signal}</p>
                  <h2 className="mt-2 text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-none tracking-[-0.025em] text-paper-0">
                    {group.title}
                  </h2>
                </div>

                <div className="toolkit-detail">
                  <p className="text-[13px] leading-[1.55] text-paper-1">
                    {group.description}
                  </p>
                  <ul className="toolkit-tags" aria-label={`${group.title} technologies`}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="toolkit-assembled" data-assembly-summary>
            <p className="label-mono text-[10px] text-paper-1">{toolkit.assembled}</p>
            <p className="font-mono text-[10px] text-paper-2">{toolkit.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
