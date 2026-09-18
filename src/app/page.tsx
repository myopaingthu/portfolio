import Link from "next/link";
import { LayerPrism } from "@/components/interactions/LayerPrism";
import { MagneticCard } from "@/components/interactions/MagneticCard";
import { IndexRow } from "@/components/editorial/IndexRow";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { capabilities, doors, site, thesis } from "@/content/site";
import { projects } from "@/content/portfolio";

const featured = projects
  .filter((p) => p.category === "Professional Work")
  .slice(0, 4);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1440px] items-center gap-x-14 gap-y-20 px-6 pt-20 pb-[20vh] md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          <div>
            <p
              className="mb-8 text-[13px] tracking-[0.015em] text-paper-1"
              data-hero-reveal
            >
              {site.name} / {site.role}
            </p>

            <h1
              className="max-w-[16ch] text-[clamp(52px,7.25vw,108px)] font-semibold leading-[0.98] tracking-[-0.058em] text-paper-0"
              data-field-mask
              data-hero-reveal
            >
              Systems that
              <br />
              hold under{" "}
              <span className="bg-gradient-to-r from-paper-0 via-chrome-mid to-chrome-lo bg-clip-text text-transparent">
                load
              </span>
              .
            </h1>

            <p
              className="mt-8 max-w-[43ch] text-[clamp(16px,1.4vw,18px)] leading-[1.65] text-paper-1"
              data-field-mask
              data-hero-reveal
            >
              {site.description}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
              data-field-mask
              data-hero-reveal
            >
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center border border-paper-0 bg-paper-0 px-6 text-[13px] font-medium text-ink-0 no-underline transition-[background-color,border-color] duration-[180ms] hover:border-[#dfe3e9] hover:bg-[#dfe3e9]"
              >
                See the work
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center border border-chrome-lo px-6 text-[13px] font-medium text-paper-0 no-underline transition-[background-color,border-color] duration-[180ms] hover:border-paper-0 hover:bg-paper-0/5"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <div data-hero-reveal>
            <LayerPrism />
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:pr-10 md:pl-24">
          <span className="trace-node" aria-hidden="true" data-trace-node />
          <Eyebrow className="mb-8">{thesis.eyebrow}</Eyebrow>

          <h2
            className="max-w-[20ch] text-display font-semibold text-paper-0"
            data-reveal
          >
            {thesis.lead}{" "}
            <span className="bg-gradient-to-r from-paper-0 via-chrome-mid to-chrome-lo bg-clip-text text-transparent">
              {thesis.emphasis}
            </span>{" "}
            {thesis.tail}
          </h2>

          <div
            className="mt-16 grid gap-px border-t border-l border-hairline md:grid-cols-3"
            data-reveal-group
          >
            {thesis.principles.map((principle) => (
              <div
                key={principle.label}
                className="border-r border-b border-hairline px-6 py-8"
                data-reveal
              >
                <p className="label-mono text-[11px]">{principle.label}</p>
                <p className="mt-4 max-w-[38ch] text-[14.5px] leading-[1.7] text-paper-1">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:pr-10 md:pl-24">
          <span className="trace-node" aria-hidden="true" data-trace-node />
          <Eyebrow className="mb-10">three doors</Eyebrow>

          <div
            className="grid gap-px border border-hairline bg-hairline md:grid-cols-3"
            data-reveal-group
          >
            {doors.map((door) => (
              <MagneticCard key={door.href} href={door.href} data-reveal>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="label-mono text-[11px]">{door.index}</span>
                    <span className="font-mono text-[13px] text-paper-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-chrome-hi">
                      →
                    </span>
                  </div>
                  <h3 className="mt-6 text-editorial font-semibold tracking-[-0.015em] text-paper-0">
                    {door.title}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.7] text-paper-1">
                    {door.body}
                  </p>
                </div>
                <p className="label-mono mt-10 text-[11px] transition-colors group-hover:text-chrome-mid">
                  {door.foot}
                </p>
              </MagneticCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:pr-10 md:pl-24">
          <span className="trace-node" aria-hidden="true" data-trace-node />
          <Eyebrow className="mb-12">capability index</Eyebrow>
          <div className="border-t border-hairline">
            {capabilities.map((capability) => (
              <IndexRow key={capability.index} {...capability} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:pr-10 md:pl-24">
          <span className="trace-node" aria-hidden="true" data-trace-node />
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Eyebrow>selected work</Eyebrow>
            <Link
              href="/projects"
              className="group label-mono transition-colors duration-200 hover:text-paper-0"
            >
              all nineteen projects{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="border-t border-hairline" data-reveal-group>
            {featured.map((project, index) => (
              <div
                key={project.title}
                className="flex flex-col gap-4 border-b border-hairline py-9 md:flex-row md:gap-10"
                data-reveal
              >
                <span className="label-mono shrink-0 text-[11px] md:mt-2 md:w-16">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <h3 className="text-editorial font-semibold tracking-[-0.015em] text-paper-0">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.7] text-paper-1">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="label-mono text-[10.5px]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:pr-10 md:pl-24">
          <span className="trace-node" aria-hidden="true" data-trace-node />
          <div className="flex flex-col justify-between gap-10 border border-hairline p-10 md:flex-row md:items-end md:p-14">
            <div>
              <Eyebrow className="mb-6">the direct line</Eyebrow>
              <h2 className="max-w-[18ch] text-editorial font-semibold tracking-[-0.015em] text-paper-0">
                One address, read by the person who does the work.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.7] text-paper-1">
                Two plain sentences beat a brief. Tell me what is broken or what
                you are building.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center bg-paper-0 px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-0 no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start a conversation
              </Link>
              <Link
                href="/experience"
                className="inline-flex min-h-12 items-center border border-chrome-lo px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper-0 no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                See the record
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
