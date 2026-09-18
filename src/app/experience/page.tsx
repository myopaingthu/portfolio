import type { Metadata } from "next";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { experienceTimeline, personalInfo } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Five roles across SaaS, financial services, digital health, e-commerce and HR tech.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="flex min-h-[calc(100svh-64px)] flex-col justify-center border-b border-hairline pb-[30vh]">
        <Eyebrow className="mb-8" data-hero-reveal>experience — the timeline</Eyebrow>
        <h1 className="max-w-[16ch] text-display font-semibold text-paper-0" data-hero-reveal data-field-mask>
          Five years.
          <br />
          Five rooms.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-paper-1" data-hero-reveal data-field-mask>
          {personalInfo.description}
        </p>
        <p className="label-mono mt-12" data-hero-reveal data-field-mask>
          on file: 05 roles · saas · finance · health · commerce · hr
        </p>
      </header>

      <div className="pt-8" data-reveal-group>
        {experienceTimeline.map((role, index) => (
          <article
            key={`${role.company}-${role.period}`}
            className="border-b border-hairline py-12"
            data-reveal
          >
            <div className="flex flex-col gap-6 md:flex-row md:gap-12">
              <div className="shrink-0 md:w-52">
                <p className="label-mono text-[11px]">
                  {String(experienceTimeline.length - index).padStart(2, "0")}
                </p>
                <p className="mt-3 font-mono text-[12.5px] text-paper-1">
                  {role.period}
                </p>
              </div>

              <div className="flex-1">
                <h2 className="text-editorial font-semibold tracking-[-0.015em] text-paper-0">
                  {role.company}
                </h2>
                <p className="mt-2 text-[14px] text-paper-2">{role.role}</p>

                <ul className="mt-6 space-y-4">
                  {role.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex gap-4 text-[15px] leading-[1.7] text-paper-1"
                    >
                      <span className="mt-2 h-px w-4 shrink-0 bg-chrome-lo" />
                      <span className="max-w-[72ch]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="py-16">
        <Eyebrow className="mb-6">education</Eyebrow>
        <p className="text-editorial font-semibold tracking-[-0.015em] text-paper-0">
          {personalInfo.education.degree}
        </p>
        <p className="mt-3 font-mono text-[13px] text-paper-2">
          {personalInfo.education.institution}
        </p>
      </section>
    </div>
  );
}
