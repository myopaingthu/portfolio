import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ProjectExhibit } from "@/components/editorial/ProjectExhibit";
import { projects, galleries } from "@/content/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

function entry(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const project = projects[index];
  const siblings = projects.filter((p) => p.category === project.category);
  const rank = siblings.findIndex((p) => p.slug === slug);
  const prefix = project.category === "Professional Work" ? "PRO" : "LAB";

  return {
    project,
    id: `${prefix}-${pad(rank + 1)}`,
    previous: siblings[rank - 1] ?? null,
    next: siblings[rank + 1] ?? null,
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = entry(slug);
  if (!found) return {};

  return {
    title: found.project.title,
    description: found.project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const found = entry(slug);
  if (!found) notFound();

  const { project, id, previous, next } = found;
  const gallery = project.gallery ? galleries[project.gallery] : null;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
      <Link
        href="/projects"
        className="label-mono inline-flex items-center gap-3 text-[11px] text-paper-2 no-underline transition-colors duration-200 hover:text-paper-0"
      >
        <span aria-hidden="true">←</span> projects — the registry
      </Link>

      <header className="border-b border-hairline pt-10 pb-14 md:pt-14 md:pb-16">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2" data-hero-reveal>
          <p className="label-mono border border-hairline bg-ink-0 px-3 py-1.5 text-[11px] text-paper-1">
            {id}
          </p>
          <p className="label-mono border border-hairline bg-ink-0 px-3 py-1.5 text-[11px] text-chrome-mid">
            {project.status}
          </p>
        </div>

        <h1
          className="mt-8 max-w-[18ch] text-display font-semibold text-paper-0"
          data-hero-reveal
          data-field-mask
        >
          {project.title}
        </h1>

        <p
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-2"
          data-hero-reveal
          data-field-mask
        >
          {project.kind}
        </p>

        <p
          className="mt-8 max-w-[68ch] text-[16px] leading-[1.7] text-paper-1"
          data-hero-reveal
          data-field-mask
        >
          {project.description}
        </p>
      </header>

      <section className="border-b border-hairline py-14 md:py-16">
        <Eyebrow className="mb-8">readouts</Eyebrow>
        <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2" data-reveal>
          {project.readouts.map((readout) => (
            <div key={readout.label} className="bg-ink-0 px-6 py-7">
              <p className="font-mono text-[clamp(1.2rem,1rem+0.8vw,1.7rem)] leading-none tracking-[-0.02em] text-paper-0">
                {readout.value}
              </p>
              <p className="mt-3 max-w-[40ch] text-[13.5px] leading-snug text-paper-1">
                {readout.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-14 md:py-16">
        <Eyebrow className="mb-8">the build</Eyebrow>

        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" data-reveal>
          <div>
            <dt className="label-mono text-[11px]">category</dt>
            <dd className="mt-3 text-[14.5px] leading-[1.7] text-paper-1">
              {project.category}
            </dd>
          </div>

          <div>
            <dt className="label-mono text-[11px]">stack</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="label-mono border border-hairline px-2.5 py-1 text-[10.5px]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {project.links.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3" data-reveal>
            {project.links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group label-mono text-[11px] text-paper-1 transition-colors duration-200 hover:text-paper-0"
                >
                  {link.label}{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {gallery ? (
        <section className="border-b border-hairline py-14 md:py-16">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <Eyebrow>exhibit</Eyebrow>
            <p className="label-mono text-[11px] text-chrome-lo">
              {pad(gallery.images.length)} plates · click to enlarge
            </p>
          </div>

          <ProjectExhibit images={gallery.images} project={project.title} />
        </section>
      ) : null}

      <section className="py-14 md:py-16">
        <Eyebrow className="mb-8">the registry</Eyebrow>

        <div className="grid gap-px border-t border-l border-hairline md:grid-cols-2">
          {[
            { label: "previous file", item: previous },
            { label: "next file", item: next },
          ].map(({ label, item }) => (
            <div key={label} className="border-r border-b border-hairline px-6 py-8">
              <p className="label-mono text-[11px]">{label}</p>
              {item ? (
                <Link
                  href={`/projects/${item.slug}`}
                  className="group mt-4 block text-editorial font-semibold tracking-[-0.015em] text-paper-1 no-underline transition-colors duration-300 hover:text-paper-0"
                >
                  <span className="inline">{item.title}&nbsp;</span>
                  <span className="inline-block font-mono text-[15px] text-paper-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-chrome-hi">
                    →
                  </span>
                </Link>
              ) : (
                <p className="mt-4 text-editorial font-semibold tracking-[-0.015em] text-chrome-lo">
                  end of run
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
