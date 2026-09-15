import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { projects, galleries } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Nineteen shipped projects across core banking, FinTech, e-commerce, AI automation and developer tooling.",
};

const professional = projects.filter((p) => p.category === "Professional Work");
const personal = projects.filter((p) => p.category === "Personal Project");

function ProjectRow({
  project,
  id,
}: {
  project: (typeof projects)[number];
  id: string;
}) {
  const gallery = project.gallery ? galleries[project.gallery] : null;

  return (
    <article className="border-b border-hairline py-12" data-reveal>
      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        <div className="shrink-0 md:w-32">
          <p className="label-mono text-[11px]">{id}</p>
        </div>

        <div className="flex-1">
          <h2 className="text-editorial font-semibold tracking-[-0.015em] text-paper-0">
            {project.title}
          </h2>

          <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-paper-1">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="label-mono border border-hairline px-2.5 py-1 text-[10.5px]"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              {project.links.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group label-mono transition-colors duration-200 hover:text-paper-0"
                  >
                    {link.label}{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {gallery ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {gallery.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.label}
                  width={image.orientation === "portrait" ? 220 : 480}
                  height={image.orientation === "portrait" ? 476 : 300}
                  className="border border-hairline object-cover opacity-70 transition-opacity duration-300 hover:opacity-100"
                  sizes="(max-width: 768px) 45vw, 480px"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="border-b border-hairline pb-16">
        <Eyebrow className="mb-8" data-hero-reveal>projects — the record</Eyebrow>
        <h1 className="max-w-[14ch] text-display font-semibold text-paper-0" data-hero-reveal>
          Shipped, not
          <br />
          shelved.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-paper-1" data-hero-reveal>
          Nineteen projects across core banking, FinTech, e-commerce, AI automation
          and developer tooling. Ten in production for employers and clients, nine
          built to learn something specific.
        </p>
      </header>

      <section className="pt-16">
        <Eyebrow className="mb-4">professional work — {professional.length}</Eyebrow>
        <div data-reveal-group>
          {professional.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              id={`PRO-${String(index + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </section>

      <section className="pt-16">
        <Eyebrow className="mb-4">personal projects — {personal.length}</Eyebrow>
        <div data-reveal-group>
          {personal.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              id={`LAB-${String(index + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
