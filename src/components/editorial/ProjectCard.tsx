import Link from "next/link";
import type { Project } from "@/content/portfolio";

function host(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function ProjectCard({ project, id }: { project: Project; id: string }) {
  const external = project.links[0];
  const domain = external ? host(external.href) : null;

  return (
    <article
      className="group panel ticks relative flex flex-col overflow-hidden bg-ink-1 p-8 md:p-9"
      data-reveal
    >
      <span className="exhibit-sweep" aria-hidden="true" />

      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[11px] text-paper-2 transition-colors duration-300 group-hover:text-chrome-hi">
          {id}
        </p>
        <p className="label-mono text-[11px] text-chrome-mid">{project.status}</p>
      </div>

      <h3 className="mt-5 text-editorial font-semibold tracking-[-0.015em] text-paper-0">
        <Link href={`/projects/${project.slug}`} className="no-underline">
          {project.title}
        </Link>
      </h3>

      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-2">
        {project.kind}
      </p>

      <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-paper-1">
        {project.summary}
      </p>

      <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        {project.readouts.map((readout) => (
          <div key={readout.label} className="bg-ink-0 px-4 py-3.5">
            <p className="readout-value font-mono text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-none tracking-[-0.02em]">
              {readout.value}
            </p>
            <p className="mt-2 text-[12.5px] leading-snug text-paper-1">{readout.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <hr className="chrome-rule opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="label-mono text-[11px] text-paper-0 no-underline transition-transform duration-300 hover:translate-x-1"
          >
            open case file →
          </Link>

          {external && domain ? (
            <a
              href={external.href}
              target="_blank"
              rel="noreferrer"
              className="label-mono max-w-[55%] truncate text-[11px] text-paper-1 underline decoration-chrome-lo underline-offset-4 transition-colors duration-200 hover:text-paper-0"
            >
              {domain}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
