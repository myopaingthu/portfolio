import Link from "next/link";

export function IndexRow({
  index,
  title,
  body,
  href,
}: {
  index: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-6 border-b border-hairline py-9 no-underline md:gap-10"
      data-reveal
    >
      <span className="label-mono mt-3 shrink-0 text-[11px]">{index}</span>

      <span className="flex-1">
        <span className="block text-editorial font-semibold tracking-[-0.015em] text-paper-0">
          {title}
        </span>
        <span className="mt-3 block max-w-[62ch] font-mono text-[12.5px] leading-[1.75] text-paper-2 transition-colors group-hover:text-chrome-mid">
          {body}
        </span>
      </span>

      <span className="mt-3 shrink-0 font-mono text-[13px] text-paper-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-chrome-hi">
        →
      </span>
    </Link>
  );
}
