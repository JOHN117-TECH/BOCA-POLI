export default function MetricCard({ title, value, change, icon: Icon, tone }) {
  const tones = {
    blue: "bg-blue-50 text-boca-secondary",
    green: "bg-green-50 text-boca-success",
    orange: "bg-amber-50 text-boca-warning"
  };

  return (
    <article className="rounded-lg border border-boca-border bg-white p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-boca-muted">{title}</p>
          <p className="mt-2 text-[28px] font-bold leading-none tracking-normal text-boca-text">{value}</p>
          <p className="mt-2 text-sm text-boca-muted">{change}</p>
        </div>
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}

