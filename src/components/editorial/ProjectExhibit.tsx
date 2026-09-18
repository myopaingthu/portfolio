"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollEngine } from "@/components/motion/MotionProvider";
import type { Plate } from "@/content/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

const ARROW =
  "flex h-10 w-10 shrink-0 items-center justify-center border border-hairline font-mono text-[15px] text-chrome-mid transition-colors duration-200 hover:border-chrome-lo hover:text-paper-0 md:h-11 md:w-11";

const PLATE =
  "block border border-hairline bg-ink-1 p-2 transition-colors duration-200 group-hover:border-hairline-strong group-hover:bg-ink-2";

export function ProjectExhibit({
  images,
  project,
}: {
  images: Plate[];
  project: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const engineRef = useScrollEngine();

  const step = useCallback(
    (delta: number) =>
      setActive((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;

    const engine = engineRef?.current ?? null;
    const previous = document.body.style.overflow;

    if (engine) engine.stop();
    else document.body.style.overflow = "hidden";

    return () => {
      if (engine) engine.start();
      else document.body.style.overflow = previous;
    };
  }, [isOpen, engineRef]);

  const position = active ?? 0;
  const plate = active === null ? null : images[active];

  return (
    <>
      <ol>
        {images.map((image, index) => (
          <li
            key={image.src}
            className="border-t border-hairline py-10 first:border-t-0 first:pt-0 md:py-12 md:first:pt-0"
            data-reveal
          >
            <p className="label-mono mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
              <span className="text-chrome-lo">{pad(index + 1)}</span>
              <span className="text-paper-1">{image.label}</span>
              <span className="text-chrome-lo">
                {image.orientation === "portrait" ? "mobile" : "desktop"} ·{" "}
                {image.width}×{image.height}
              </span>
            </p>

            {image.orientation === "landscape" ? (
              <>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="group block w-full"
                  aria-label={`Open plate ${pad(index + 1)} — ${image.label}`}
                >
                  <span className={PLATE}>
                    <Image
                      src={image.src}
                      alt={`${project} — ${image.label}`}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 92vw, 1100px"
                      className="h-auto w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </span>
                </button>
                <p className="mt-5 max-w-[68ch] text-[14.5px] leading-[1.7] text-paper-1">
                  {image.note}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-6 md:max-w-[900px] md:flex-row md:items-start md:gap-12">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="group block shrink-0"
                  aria-label={`Open plate ${pad(index + 1)} — ${image.label}`}
                >
                  <span className={PLATE}>
                    <Image
                      src={image.src}
                      alt={`${project} — ${image.label}`}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 60vw, 260px"
                      className="h-[340px] w-auto max-w-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100 md:h-[500px]"
                    />
                  </span>
                </button>
                <p className="max-w-[46ch] text-[14.5px] leading-[1.7] text-paper-1 md:pt-2">
                  {image.note}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-0 h-full max-h-none w-screen max-w-none bg-ink-0/95 p-0 text-paper-1 backdrop-blur-[8px]"
      >
        {plate ? (
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-baseline justify-between gap-6 border-b border-hairline px-6 py-4 md:px-10">
              <p className="label-mono truncate text-[10.5px]">{project}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="label-mono shrink-0 text-[10.5px] transition-colors duration-200 hover:text-paper-0"
              >
                close ✕
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-6 md:px-10">
              <Image
                key={plate.src}
                src={plate.src}
                alt={`${project} — ${plate.label}`}
                width={plate.width}
                height={plate.height}
                sizes="92vw"
                className="h-auto max-h-full w-auto max-w-full border border-hairline bg-ink-1 object-contain p-2"
              />
            </div>

            <div className="flex shrink-0 items-center justify-between gap-6 border-t border-hairline px-6 py-4 md:px-10">
              <p className="label-mono truncate text-[10.5px] text-paper-1">
                {pad(position + 1)} — {plate.label}
              </p>

              <div className="flex shrink-0 items-center gap-3">
                <p className="label-mono text-[10.5px]">
                  {pad(position + 1)} / {pad(images.length)}
                </p>
                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous plate"
                      className={ARROW}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next plate"
                      className={ARROW}
                    >
                      →
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
