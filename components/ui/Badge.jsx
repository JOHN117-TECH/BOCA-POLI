export default function Badge({ label, tone = "info", icon: Icon }) {
  const tones = {
    info: "border-blue-200 bg-blue-50 text-boca-secondary",
    success: "border-green-200 bg-green-50 text-boca-success",
    warning: "border-amber-200 bg-amber-50 text-boca-warning",
    danger: "border-red-200 bg-red-50 text-boca-danger",
    neutral: "border-gray-200 bg-gray-50 text-boca-muted"
  };

  return (
    <span className={`inline-flex min-h-[28px] items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

