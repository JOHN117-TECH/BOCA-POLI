export default function MiniButton({ children, icon: Icon, variant = "secondary", onClick }) {
  const variants = {
    secondary: "border-boca-border bg-white text-boca-primary hover:bg-boca-bg",
    danger: "border-red-200 bg-red-50 text-boca-danger hover:bg-red-100"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${variants[variant]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </button>
  );
}

