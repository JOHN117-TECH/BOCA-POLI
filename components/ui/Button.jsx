export default function Button({ children, icon: Icon, variant = "primary", className = "", type = "button", disabled = false, onClick }) {
  const variants = {
    primary: "border-boca-secondary bg-boca-secondary text-white hover:bg-blue-700",
    secondary: "border-boca-border bg-white text-boca-primary hover:bg-boca-bg",
    danger: "border-boca-danger bg-boca-danger text-white hover:bg-red-800"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}

