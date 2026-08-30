import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export default function FeedbackAlert({ type = "info", title, text, onClose, className = "" }) {
  const config = {
    success: {
      icon: CheckCircle2,
      wrapper: "border-green-200 bg-green-50 text-boca-success"
    },
    info: {
      icon: Info,
      wrapper: "border-blue-200 bg-blue-50 text-boca-secondary"
    },
    warning: {
      icon: AlertTriangle,
      wrapper: "border-amber-200 bg-amber-50 text-boca-warning"
    },
    error: {
      icon: AlertCircle,
      wrapper: "border-red-200 bg-red-50 text-boca-danger"
    }
  };
  const selected = config[type] ?? config.info;
  const Icon = selected.icon;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 ${selected.wrapper} ${className}`} role={type === "error" ? "alert" : "status"}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-bold">{title}</p>
        {text && <p className="mt-1 text-sm leading-6 text-boca-text">{text}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-boca-muted hover:bg-white/70"
          aria-label="Cerrar mensaje"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

