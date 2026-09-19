import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { provenance } from "@/content/portfolio";

const { chapters } = provenance;

export function ProvenanceStory() {
  return (
    <section
      className="story border-b border-hairline py-16 md:py-20"
      data-story
      style={{ "--story-chapters": chapters.length } as CSSProperties}
      aria-label="The record: five rooms, from a junior brief to the automation platform"
    >
      <Eyebrow
        className="story-eyebrow mb-14 w-fit border border-hairline bg-ink-0 px-3 py-1.5 text-paper-1"
        data-reveal
      >
        {provenance.eyebrow}
      </Eyebrow>

      <div className="story-track">
        <div className="story-stage">
          <div className="story-chapters">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.company}
                className="story-chapter"
                data-story-pane
                data-active={index === 0 ? "" : undefined}
              >
                <div className="story-margin">
                  <span className="story-numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="story-meta">
                    <p className="label-mono text-[11px] text-chrome-mid">
                      ch. {String(index + 1).padStart(2, "0")} · {chapter.period}
                    </p>
                    <p className="label-mono mt-2 text-[11px] text-paper-2">
                      {chapter.company}
                    </p>
                    <p className="mt-3 font-mono text-[12.5px] text-paper-1">
                      {chapter.role}
                    </p>
                  </div>
                </div>

                <div className="story-body">
                  <h3 className="max-w-[18ch] text-editorial font-semibold text-paper-0">
                    {chapter.title}{" "}
                    <span className="text-chrome-mid">{chapter.accent}</span>
                  </h3>

                  <div className="mt-6 grid max-w-[62ch] gap-4">
                    {chapter.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="text-[15px] leading-relaxed text-paper-1"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {chapter.quote ? (
                    <p className="mt-5 max-w-[52ch] border-l border-chrome-mid pl-6 text-[16px] font-medium leading-relaxed text-paper-0">
                      {chapter.quote}
                    </p>
                  ) : null}

                  {chapter.readouts ? (
                    <div className="mt-8 flex flex-wrap items-end gap-x-12 gap-y-6">
                      {chapter.readouts.map((readout) => (
                        <div key={readout.label}>
                          <p className="font-mono text-[clamp(1.5rem,2.6vw,2rem)] leading-none tracking-[-0.02em] tabular-nums text-paper-0">
                            {readout.value}
                            <span className="text-chrome-mid">{readout.suffix}</span>
                          </p>
                          <p className="label-mono mt-3 text-[10px]">{readout.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="story-rail" aria-hidden="true">
            <div className="story-rule">
              <span className="story-head" data-story-head />
              {chapters.map((chapter, index) => (
                <span
                  key={chapter.mark}
                  className="story-tick"
                  data-story-tick
                  data-active={index === 0 ? "" : undefined}
                  style={
                    {
                      "--at": `${((index + 0.5) / chapters.length) * 100}%`,
                    } as CSSProperties
                  }
                >
                  <span className="story-tick-mark" />
                  <span className="story-tick-value">{chapter.mark}</span>
                  <span className="story-tick-label">{chapter.tick}</span>
                </span>
              ))}
            </div>
            <p className="label-mono story-rail-note">{provenance.rail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
