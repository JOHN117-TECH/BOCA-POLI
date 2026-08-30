import { LogOut, Menu, Play, UserRound } from 'lucide-react';
import { Badge, Button } from '../ui';

export default function Header({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 border-b border-boca-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-boca-border bg-white text-boca-primary lg:hidden"
          onClick={onMenu}
          type="button"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1 pt-4">
          <p className="text-sm font-semibold text-boca-muted">
            Competencia activa
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <h1 className="break-words text-[18px] font-bold leading-tight tracking-normal text-boca-text sm:text-[22px]">
              Maratón de Programación 2026
            </h1>
            <div className="mb-4">
              <Badge label="En curso" tone="success" icon={Play} />
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-lg border border-boca-border bg-boca-bg px-3 py-2 text-sm">
            <span className="font-bold text-boca-primary">02:48:15</span>
            <span className="ml-2 text-boca-muted">restantes</span>
          </div>
          <Button variant="secondary" icon={UserRound}>
            Administrador
          </Button>
          <Button variant="secondary" icon={LogOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}
