import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { availability, contactMethods } from "@/content/portfolio";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "One address, read by the person who does the work. No forms, no funnels.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <header className="border-b border-hairline pb-16">
        <Eyebrow className="mb-8" data-hero-reveal>contact — the direct line</Eyebrow>
        <h1 className="max-w-[14ch] text-display font-semibold text-paper-0" data-hero-reveal>
          No forms.
          <br />
          No funnels.
        </h1>
        <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.7] text-paper-1" data-hero-reveal>
          Two plain sentences beat a brief. Tell me what is broken, or what you are
          building, and I will tell you straight whether I am the right person for it.
        </p>
      </header>

      <section className="border-b border-hairline py-16">
        <div
          className="grid border-t border-l border-hairline md:grid-cols-2"
          data-reveal-group
        >
          {contactMethods.map((method, index) => (
            <Link
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noreferrer" : undefined}
              className="group border-r border-b border-hairline px-7 py-9 no-underline transition-colors duration-200 hover:bg-ink-1"
              data-reveal
            >
              <div className="flex items-baseline justify-between">
                <span className="label-mono text-[11px]">
                  {String(index + 1).padStart(2, "0")} — {method.label}
                </span>
                <span className="font-mono text-[13px] text-paper-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-chrome-hi">
                  →
                </span>
              </div>
              <p className="mt-4 break-all font-mono text-[14px] text-paper-0">
                {method.value}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16">
        <Eyebrow className="mb-10">what I am open to</Eyebrow>
        <p className="max-w-[54ch] text-editorial font-semibold tracking-[-0.015em] text-paper-0">
          {availability.intro}
        </p>

        <ul className="mt-14 grid border-t border-l border-hairline md:grid-cols-3" data-reveal-group>
          {["no recruiters via form", "remote or hybrid", "replies within two days"].map(
            (principle, index) => (
              <li
                key={principle}
                className="border-r border-b border-hairline px-6 py-8"
                data-reveal
              >
                <p className="label-mono text-[11px]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-[14.5px] leading-[1.6] text-paper-1">
                  {principle}
                </p>
              </li>
            )
          )}
        </ul>

        <p className="label-mono mt-12 text-[11px]">
          {site.location} · {site.name.toLowerCase().replace(/\s+/g, "")}.dev
        </p>
      </section>
    </div>
  );
}
