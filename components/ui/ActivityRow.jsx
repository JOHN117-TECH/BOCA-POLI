export default function ActivityRow({ icon: Icon, title, text, time, tone }) {
  const tones = {
    info: "bg-blue-50 text-boca-secondary",
    success: "bg-green-50 text-boca-success",
    warning: "bg-amber-50 text-boca-warning"
  };

  return (
    <article className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold tracking-normal text-boca-text">{title}</h3>
        <p className="mt-1 text-sm text-boca-muted">{text}</p>
      </div>
      <time className="text-sm text-boca-muted">{time}</time>
    </article>
  );
}

