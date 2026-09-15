import type { Metadata } from "next";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { availability, personalInfo, skillGroups } from "@/content/portfolio";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: personalInfo.about,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="border-b border-hairline pb-16">
        <Eyebrow className="mb-8" data-hero-reveal>about — the operator</Eyebrow>
        <h1 className="max-w-[16ch] text-display font-semibold text-paper-0" data-hero-reveal>
          One person.
          <br />
          Whole stack.
        </h1>
      </header>

      <section className="grid gap-12 border-b border-hairline py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-20">
        <div data-reveal>
          <p className="text-[1.22rem] leading-[1.65] text-paper-0">
            {personalInfo.about}
          </p>
          <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.7] text-paper-1">
            {personalInfo.description}
          </p>
          <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.7] text-paper-1">
            {availability.intro}
          </p>
        </div>

        <dl className="space-y-6 self-start border-l border-hairline pl-8" data-reveal>
          {[
            ["in practice since", String(site.since)],
            ["current focus", personalInfo.currentFocus],
            ["experience", personalInfo.experience],
            ["based", site.location],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="label-mono text-[11px]">{label}</dt>
              <dd className="mt-2 text-[14.5px] leading-[1.6] text-paper-1">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-hairline py-16">
        <Eyebrow className="mb-12">the toolkit</Eyebrow>
        <div
          className="grid border-t border-l border-hairline md:grid-cols-2 lg:grid-cols-4"
          data-reveal-group
        >
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className="border-r border-b border-hairline px-6 py-8"
              data-reveal
            >
              <p className="label-mono text-[11px]">
                {String(index + 1).padStart(2, "0")} — {group.title}
              </p>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-[12.5px] text-paper-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <Eyebrow className="mb-10">how I work</Eyebrow>
        <ul className="border-t border-hairline" data-reveal-group>
          {availability.points.map((point, index) => (
            <li
              key={point}
              className="flex items-start gap-6 border-b border-hairline py-7 md:gap-10"
              data-reveal
            >
              <span className="label-mono mt-1 shrink-0 text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="max-w-[68ch] text-[15.5px] leading-[1.7] text-paper-1">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
