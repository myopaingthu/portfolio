import Link from "next/link";
import { readouts, site } from "@/content/site";
import { contactMethods } from "@/content/portfolio";
import { MetricReadout } from "@/components/editorial/MetricReadout";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
        <p className="label-mono mb-6">the record</p>

        <div
          className="grid grid-cols-2 border-t border-l border-hairline md:grid-cols-4"
          data-reveal-group
        >
          {readouts.map((readout) => (
            <MetricReadout key={readout.label} {...readout} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-hairline pt-8">
          <p className="max-w-[46ch] text-[14px] text-paper-2">
            {site.name} — {site.description}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contactMethods
              .filter((method) => method.label !== "Phone")
              .map((method) => (
                <li key={method.label}>
                  <Link
                    href={method.href}
                    className="label-mono transition-colors duration-200 hover:text-paper-0"
                  >
                    {method.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <p className="label-mono mt-8 text-[11px]">
          {site.location} · available for work
        </p>
      </div>
    </footer>
  );
}
