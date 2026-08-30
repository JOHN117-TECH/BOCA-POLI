import { X } from "lucide-react";

export default function Drawer({ title, description, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="absolute inset-0 bg-slate-950/45" onClick={onClose} aria-hidden="true" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start gap-3 border-b border-boca-border bg-white px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-boca-secondary">Formulario</p>
            <h2 id="drawer-title" className="text-[28px] font-bold tracking-normal text-boca-text">
              {title}
            </h2>
            <p className="mt-1 text-sm text-boca-muted">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-lg border border-boca-border text-boca-muted hover:bg-boca-bg"
            aria-label="Cerrar formulario"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </aside>
    </div>
  );
}

