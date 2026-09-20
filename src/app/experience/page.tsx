import type { Metadata } from "next";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ProvenanceStory } from "@/components/editorial/ProvenanceStory";
import { personalInfo } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Four roles across SaaS, financial services, digital health, e-commerce and HR tech.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="flex min-h-[calc(100svh-64px)] flex-col justify-center border-b border-hairline pb-[30vh]">
        <Eyebrow className="mb-8" data-hero-reveal>experience — the timeline</Eyebrow>
        <h1 className="max-w-[16ch] text-display font-semibold text-paper-0" data-hero-reveal data-field-mask>
          Five years.
          <br />
          Four rooms.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-paper-1" data-hero-reveal data-field-mask>
          {personalInfo.description}
        </p>
        <p className="label-mono mt-12" data-hero-reveal data-field-mask>
          on file: 04 roles · saas · finance · health · commerce · hr
        </p>
      </header>

      <ProvenanceStory />

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
