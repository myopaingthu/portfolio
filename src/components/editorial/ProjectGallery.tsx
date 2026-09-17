"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollEngine } from "@/components/motion/MotionProvider";
import type { Plate } from "@/content/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

const FRAME_SIZE: Record<Plate["orientation"], string> = {
  portrait: "h-[248px] w-auto sm:h-[276px] lg:h-[332px]",
  landscape: "h-auto w-full sm:h-[276px] sm:w-auto lg:h-[332px]",
};

const ARROW =
  "flex h-10 w-10 shrink-0 items-center justify-center border border-hairline font-mono text-[15px] text-chrome-mid transition-colors duration-200 hover:border-chrome-lo hover:text-paper-0 md:h-11 md:w-11";

const SIZES: Record<Plate["orientation"], string> = {
  portrait: "(max-width: 640px) 45vw, 200px",
  landscape: "(max-width: 640px) 92vw, 640px",
};

export function ProjectGallery({
  title,
  images,
  project,
}: {
  title: string;
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
    <figure className="mt-10 border-t border-hairline pt-6">
      <figcaption className="label-mono mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px]">
        <span className="text-chrome-lo">gallery</span>
        {title === project ? null : <span className="text-paper-2">{title}</span>}
        <span className="text-chrome-lo">· {pad(images.length)} plates</span>
      </figcaption>

      <ul className="flex flex-wrap items-end gap-5">
        {images.map((image, index) => (
          <li key={image.src} className="max-w-full">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group block w-full text-left"
              aria-label={`Open plate ${pad(index + 1)} — ${image.label}`}
            >
              <span className="block border border-hairline bg-ink-1 p-2 transition-colors duration-200 group-hover:border-hairline-strong group-hover:bg-ink-2">
                <Image
                  src={image.src}
                  alt={`${project} — ${image.label}`}
                  width={image.width}
                  height={image.height}
                  sizes={SIZES[image.orientation]}
                  className={`${FRAME_SIZE[image.orientation]} max-w-full object-cover object-top opacity-85 transition-opacity duration-300 group-hover:opacity-100`}
                />
              </span>

              <span className="label-mono mt-3 flex items-center gap-2 text-[10.5px] transition-colors duration-200 group-hover:text-paper-1">
                <span className="text-chrome-lo">{pad(index + 1)}</span>
                <span>{image.label}</span>
                <span className="inline-block text-chrome-lo transition-all duration-300 group-hover:translate-x-1 group-hover:text-chrome-hi">
                  ↗
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

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
              <p className="label-mono truncate text-[10.5px]">{title}</p>
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
    </figure>
  );
}
