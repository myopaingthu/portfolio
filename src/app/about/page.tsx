import type { Metadata } from "next";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ToolkitAssembly } from "@/components/editorial/ToolkitAssembly";
import { aboutPage, availability, personalInfo } from "@/content/portfolio";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: personalInfo.about,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="flex min-h-[calc(100svh-64px)] flex-col justify-center border-b border-hairline py-16 md:py-20">
        <div>
          <Eyebrow className="mb-8" data-hero-reveal>{aboutPage.eyebrow}</Eyebrow>
          <h1 className="max-w-[16ch] text-display font-semibold text-paper-0" data-hero-reveal data-field-mask>
            {aboutPage.headline[0]}
            <br />
            {aboutPage.headline[1]}
          </h1>
          <p className="label-mono mt-10" data-hero-reveal data-field-mask>
            {aboutPage.register}
          </p>
        </div>

        <div className="mt-16 grid border-t border-hairline lg:grid-cols-[minmax(0,1.35fr)_minmax(21rem,0.65fr)]" data-hero-reveal>
          <div className="grid gap-5 py-7 pr-0 sm:grid-cols-[8rem_minmax(0,1fr)] lg:pr-14">
            <p className="label-mono text-[10px]">{aboutPage.profileLabel}</p>
            <div data-field-mask>
              <p className="max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.28rem)] leading-[1.58] text-paper-0">
                {personalInfo.about}
              </p>
              <p className="mt-4 max-w-[58ch] text-[13.5px] leading-[1.65] text-paper-2">
                {availability.intro}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 border-t border-hairline lg:border-t-0 lg:border-l" data-field-mask>
            {[
              ["in practice since", String(site.since)],
              ["current focus", personalInfo.currentFocus],
              ["experience", personalInfo.experience],
              ["based", site.location],
            ].map(([label, value]) => (
              <div className="border-r border-b border-hairline px-5 py-5 even:border-r-0" key={label}>
                <dt className="label-mono text-[9px]">{label}</dt>
                <dd className="mt-2 text-[12.5px] leading-[1.5] text-paper-1">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <ToolkitAssembly />

      <section className="py-16">
        <Eyebrow className="mb-10">{aboutPage.workEyebrow}</Eyebrow>
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
