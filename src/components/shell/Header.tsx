import Link from "next/link";
import { nav, site } from "@/content/site";

const NAV_LINK =
  "relative text-[13.5px] font-medium tracking-[0.005em] text-paper-1 transition-colors duration-200 hover:text-paper-0 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-chrome-lo after:via-chrome-hi after:to-chrome-lo after:transition-all after:duration-300 hover:after:w-full";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink-0/85 backdrop-blur-[8px]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-baseline gap-3 no-underline">
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-paper-0">
            {site.name.toLowerCase().replace(/\s+/g, "")}
            <span className="text-paper-2">.dev</span>
          </span>
          <span className="hidden text-[12px] text-paper-2 transition-colors group-hover:text-paper-1 lg:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={NAV_LINK}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
