export function MetricReadout({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="border-r border-b border-hairline px-5 py-7" data-reveal>
      <p className="label-mono text-[11px]">{label}</p>
      <p className="mt-3 font-mono text-[clamp(1.6rem,3vw,2.2rem)] leading-none tracking-[-0.02em] text-paper-0">
        {value}
      </p>
      {note ? <p className="mt-3 font-mono text-[11px] text-paper-2">{note}</p> : null}
    </div>
  );
}
