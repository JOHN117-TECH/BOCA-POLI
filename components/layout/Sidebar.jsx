import { X } from "lucide-react";
import { navSections } from "../../data/navigation";

export default function Sidebar({ activeView, isOpen, onClose, onNavigate }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col bg-boca-primary text-white shadow-panel transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navegación principal de BOCA"
      >
        <div className="flex min-h-[92px] items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/25 bg-white/10 font-bold">
            BO
          </div>
          <div>
            <p className="text-[28px] font-bold leading-none tracking-normal">BOCA</p>
            <p className="mt-1 text-sm text-blue-100">Administrador online</p>
          </div>
          <button
            className="ml-auto rounded-lg p-2 text-blue-100 hover:bg-white/10 lg:hidden"
            onClick={onClose}
            type="button"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div className="mb-5" key={section.title}>
              <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.08em] text-blue-100">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      className={`group flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                        active
                          ? "bg-white text-boca-primary shadow-sm"
                          : "text-blue-50 hover:bg-white/10"
                      }`}
                      type="button"
                      onClick={() => onNavigate(item.id)}
                    >
                      <span
                        className={`h-7 w-1 rounded-full ${
                          active ? "bg-boca-secondary" : "bg-transparent group-hover:bg-white/30"
                        }`}
                        aria-hidden="true"
                      />
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

