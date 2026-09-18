import type { Metadata } from "next";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ProjectCard } from "@/components/editorial/ProjectCard";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Nineteen shipped projects across SaaS, financial services, digital health, e-commerce, HR tech and developer tooling.",
};

const professional = projects.filter((p) => p.category === "Professional Work");
const personal = projects.filter((p) => p.category === "Personal Project");

const pad = (n: number) => String(n).padStart(2, "0");

const CHIP = "label-mono border border-hairline bg-ink-0 px-3 py-1.5 text-[11px] text-paper-1";

function Registry({
  left,
  right,
  prefix,
  entries,
  last,
}: {
  left: string;
  right: string;
  prefix: string;
  entries: typeof projects;
  last?: boolean;
}) {
  return (
    <section className={`py-16 md:py-20 ${last ? "" : "border-b border-hairline"}`}>
      <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
        <p className={CHIP}>{left}</p>
        <p className={CHIP}>{right}</p>
      </div>

      <div className="grid gap-px bg-hairline md:grid-cols-2" data-reveal-group>
        {entries.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            id={`${prefix}-${pad(index + 1)}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="flex min-h-[calc(100svh-64px)] flex-col justify-center border-b border-hairline pb-[30vh]">
        <Eyebrow className="mb-8" data-hero-reveal>
          projects — the registry
        </Eyebrow>
        <h1
          className="max-w-[14ch] text-display font-semibold text-paper-0"
          data-hero-reveal
          data-field-mask
        >
          Shipped, not
          <br />
          shelved.
        </h1>
        <p
          className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-paper-1"
          data-hero-reveal
          data-field-mask
        >
          Nineteen projects across SaaS, financial services, digital health,
          e-commerce and HR tech. Ten in production for employers and clients,
          nine built to learn something specific.
        </p>
        <p className="label-mono mt-12" data-hero-reveal data-field-mask>
          on file: 19 projects · 10 professional · 09 personal
        </p>
      </header>

      <Registry
        left="pro — built & shipped"
        right={`${pad(professional.length)} entries · engineered to production`}
        prefix="PRO"
        entries={professional}
      />

      <Registry
        left="lab — built to learn"
        right={`${pad(personal.length)} entries · built outside the day job`}
        prefix="LAB"
        entries={personal}
        last
      />
    </div>
  );
}
