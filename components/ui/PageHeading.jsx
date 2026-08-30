export default function PageHeading({ id, eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-boca-secondary">{eyebrow}</p>
        <h1 id={id} className="mt-1 break-words text-[26px] font-bold leading-tight tracking-normal text-boca-text sm:text-[28px]">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-base leading-7 text-boca-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
    </div>
  );
}

