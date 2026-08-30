"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Download,
  Edit3,
  Eye,
  FileArchive,
  FileCheck2,
  Filter,
  Flag,
  Gauge,
  HelpCircle,
  Info,
  KeyRound,
  Languages,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Menu,
  Play,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  ShieldAlert,
  SquarePen,
  Trash2,
  Trophy,
  Upload,
  UserRound,
  UserRoundCog,
  Users,
  X
} from "lucide-react";

const availableViews = new Set(["dashboard", "users", "competition", "problems"]);

const navSections = [
  {
    title: "Panel principal",
    items: [
      { id: "dashboard", label: "Resumen del contest", icon: LayoutDashboard }
    ]
  },
  {
    title: "Competencia",
    items: [
      { id: "competition", label: "Configuración general", icon: Trophy },
      { id: "sites", label: "Sitios", icon: Server },
      { id: "languages", label: "Lenguajes", icon: Languages },
      { id: "answers", label: "Respuestas", icon: BookOpenCheck }
    ]
  },
  {
    title: "Participantes",
    items: [
      { id: "users", label: "Usuarios", icon: Users },
      { id: "teams", label: "Equipos", icon: UserRoundCog },
      { id: "judges", label: "Jueces", icon: ShieldAlert },
      { id: "staff", label: "Personal", icon: UserRound }
    ]
  },
  {
    title: "Evaluación",
    items: [
      { id: "problems", label: "Problemas", icon: Code2 },
      { id: "submissions", label: "Envíos", icon: Upload },
      { id: "clarifications", label: "Aclaraciones", icon: HelpCircle },
      { id: "tasks", label: "Tareas", icon: ListChecks }
    ]
  },
  {
    title: "Resultados",
    items: [
      { id: "scoreboard", label: "Clasificación", icon: BarChart3 },
      { id: "reports", label: "Reportes", icon: FileCheck2 },
      { id: "logs", label: "Registros de sistema", icon: Archive }
    ]
  },
  {
    title: "Cuenta",
    items: [
      { id: "profile", label: "Perfil", icon: UserRound },
      { id: "logout", label: "Cerrar sesión", icon: LogOut }
    ]
  }
];

const usersData = [
  {
    user: "admin",
    fullName: "Administrador Principal",
    type: "Administrador",
    site: "Principal",
    status: "Activo",
    lastAccess: "Hoy 08:10",
    detail: "Control total de la competencia"
  },
  {
    user: "judge1",
    fullName: "María Fernanda Ríos",
    type: "Juez",
    site: "Bogotá",
    status: "Activo",
    lastAccess: "Hoy 09:21",
    detail: "Revisa envíos y responde aclaraciones"
  },
  {
    user: "team15",
    fullName: "Algoritmos Poli",
    type: "Equipo",
    site: "Bogotá",
    status: "Activo",
    lastAccess: "Hoy 09:44",
    detail: "Equipo participante"
  },
  {
    user: "score",
    fullName: "Usuario de resultados",
    type: "Resultados",
    site: "General",
    status: "Activo",
    lastAccess: "Ayer 18:05",
    detail: "Consulta de clasificación"
  },
  {
    user: "staff03",
    fullName: "Carlos Ramírez",
    type: "Personal",
    site: "Medellín",
    status: "Inactivo",
    lastAccess: "26/08/2026",
    detail: "Apoyo operacional"
  }
];

const problemsData = [
  {
    number: "A",
    title: "Sumas rápidas",
    color: "#2563EB",
    colorName: "Azul",
    file: "problema-a.zip",
    automatic: "Activa",
    status: "Publicado"
  },
  {
    number: "B",
    title: "Rutas de la ciudad",
    color: "#15803D",
    colorName: "Verde",
    file: "problema-b.zip",
    automatic: "Activa",
    status: "Borrador"
  },
  {
    number: "C",
    title: "Inventario binario",
    color: "#B45309",
    colorName: "Naranja",
    file: "problema-c.zip",
    automatic: "Pausada",
    status: "Publicado"
  },
  {
    number: "D",
    title: "Grafos seguros",
    color: "#B91C1C",
    colorName: "Rojo",
    file: "problema-d.zip",
    automatic: "Activa",
    status: "Inactivo"
  }
];

const activityItems = [
  { icon: Upload, title: "Nuevo envío realizado", text: "team15 envió una solución para el problema A.", time: "Hace 2 min", tone: "info" },
  { icon: CheckCircle2, title: "Problema aceptado", text: "judge1 marcó como aceptado el envío #184.", time: "Hace 9 min", tone: "success" },
  { icon: HelpCircle, title: "Aclaración pendiente", text: "Equipo Medellín solicita precisión sobre el problema C.", time: "Hace 18 min", tone: "warning" },
  { icon: Users, title: "Usuario registrado", text: "Se agregó el equipo Algoritmos Poli.", time: "Hoy 08:41", tone: "info" }
];

const passwordOptions = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789#$%";

export default function HomePage() {
  const [view, setView] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(null);
  const [notice, setNotice] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const syncViewFromHash = () => {
      const nextView = window.location.hash.replace("#", "");
      if (nextView) setView(nextView);
    };

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  const handleNavigation = (id) => {
    setView(id);
    window.history.pushState(null, "", `#${id}`);
    setMobileMenuOpen(false);
  };

  const openDrawer = (name) => {
    setDrawer(name);
    setNotice(null);
  };

  const currentView = availableViews.has(view) ? view : "placeholder";

  return (
    <div className="app-shell bg-boca-bg">
      <Sidebar
        activeView={view}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
      />

      <div className="min-h-screen lg:pl-[290px]">
        <Header onMenu={() => setMobileMenuOpen(true)} />

        <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {notice && (
            <FeedbackAlert
              type={notice.type}
              title={notice.title}
              text={notice.text}
              onClose={() => setNotice(null)}
            />
          )}

          {currentView === "dashboard" && (
            <Dashboard
              onOpenUsers={() => {
                handleNavigation("users");
                openDrawer("user");
              }}
              onOpenProblems={() => {
                handleNavigation("problems");
                openDrawer("problem");
              }}
              onOpenCompetition={() => handleNavigation("competition")}
            />
          )}

          {currentView === "users" && (
            <UsersPage
              onCreate={() => openDrawer("user")}
              onImport={() =>
                setNotice({
                  type: "info",
                  title: "Importación preparada",
                  text: "Seleccione un archivo CSV para cargar usuarios manteniendo la validación previa."
                })
              }
              onDelete={(user) =>
                setConfirmAction({
                  title: "Eliminar usuario",
                  text: `Está a punto de eliminar el usuario "${user}". Esta operación retirará su acceso a la competencia y no se ejecutará al seleccionar el número del usuario.`,
                  confirmText: "Eliminar usuario",
                  tone: "danger",
                  onConfirm: () =>
                    setNotice({
                      type: "success",
                      title: "Acción simulada correctamente",
                      text: `El usuario "${user}" fue marcado para eliminación en este prototipo.`
                    })
                })
              }
            />
          )}

          {currentView === "competition" && (
            <CompetitionPage
              onCriticalAction={() =>
                setConfirmAction({
                  title: "Finalizar competencia",
                  text: "Está a punto de finalizar la competencia \"Maratón de Programación 2026\". Luego de confirmarlo, los equipos no podrán seguir haciendo envíos.",
                  confirmText: "Finalizar competencia",
                  tone: "danger",
                  requiresText: "Maratón de Programación 2026",
                  onConfirm: () =>
                    setNotice({
                      type: "warning",
                      title: "Competencia finalizada",
                      text: "La acción crítica fue confirmada y los envíos quedaron bloqueados en la simulación."
                    })
                })
              }
            />
          )}

          {currentView === "problems" && (
            <ProblemsPage
              onCreate={() => openDrawer("problem")}
              onDelete={(problem) =>
                setConfirmAction({
                  title: "Eliminar problema",
                  text: `¿Desea eliminar el problema ${problem}? Esta operación también eliminará la información referida a sus evaluaciones y no podrá deshacerse.`,
                  confirmText: "Eliminar problema",
                  tone: "danger",
                  onConfirm: () =>
                    setNotice({
                      type: "success",
                      title: "Problema eliminado",
                      text: `El problema ${problem} fue eliminado en la simulación.`
                    })
                })
              }
            />
          )}

          {currentView === "placeholder" && <PlaceholderPage view={view} />}
        </main>
      </div>

      {drawer === "user" && (
        <UserDrawer
          onClose={() => setDrawer(null)}
          onSaved={(message) => {
            setDrawer(null);
            setNotice(message);
          }}
        />
      )}

      {drawer === "problem" && (
        <ProblemDrawer
          onClose={() => setDrawer(null)}
          onSaved={(message) => {
            setDrawer(null);
            setNotice(message);
          }}
        />
      )}

      {confirmAction && (
        <ConfirmDialog
          action={confirmAction}
          onClose={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}

function Sidebar({ activeView, isOpen, onClose, onNavigate }) {
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

function Header({ onMenu }) {
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

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-boca-muted">Competencia activa</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <h1 className="break-words text-[18px] font-bold leading-tight tracking-normal text-boca-text sm:text-[22px]">
              Maratón de Programación 2026
            </h1>
            <Badge label="En curso" tone="success" icon={Play} />
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

function Dashboard({ onOpenUsers, onOpenProblems, onOpenCompetition }) {
  const metrics = [
    { title: "Equipos registrados", value: "42", change: "+6 hoy", icon: Users, tone: "blue" },
    { title: "Problemas publicados", value: "8", change: "2 en borrador", icon: Code2, tone: "green" },
    { title: "Envíos recibidos", value: "186", change: "+24 última hora", icon: Upload, tone: "blue" },
    { title: "Pendientes por evaluar", value: "11", change: "requieren juez", icon: Clock3, tone: "orange" },
    { title: "Aclaraciones pendientes", value: "5", change: "3 urgentes", icon: HelpCircle, tone: "orange" },
    { title: "Usuarios conectados", value: "67", change: "en 3 sitios", icon: Activity, tone: "green" }
  ];

  return (
    <section className="flex flex-col gap-6" aria-labelledby="dashboard-title">
      <PageHeading
        id="dashboard-title"
        eyebrow="Panel principal"
        title="Resumen del contest"
        description="Estado general de BOCA sin ingresar a cada módulo de administración."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <section className="rounded-lg border border-boca-border bg-white p-5 shadow-panel" aria-labelledby="competition-state-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 id="competition-state-title" className="text-[22px] font-bold tracking-normal">
                Estado de la competencia
              </h2>
              <p className="mt-1 text-base text-boca-muted">
                Información visible con texto, color e iconos para evitar ambigüedad.
              </p>
            </div>
            <Badge label="En curso" tone="success" icon={Gauge} />
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoItem label="Fecha y hora de inicio" value="20/09/2026 - 08:00" />
            <InfoItem label="Tiempo restante" value="2 h 48 min" />
            <InfoItem label="Equipos registrados" value="42 equipos" />
            <InfoItem label="Problemas publicados" value="8 problemas" />
            <InfoItem label="Envíos recibidos" value="186 envíos" />
            <InfoItem label="Aclaraciones pendientes" value="5 solicitudes" />
          </dl>

          <FeedbackAlert
            className="mt-5"
            type="warning"
            title="Cambios con la competencia en marcha"
            text="Los cambios realizados durante la competencia pueden afectar la visualización y los envíos de los equipos."
          />
        </section>

        <section className="rounded-lg border border-boca-border bg-white p-5 shadow-panel" aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title" className="text-[22px] font-bold tracking-normal">
            Accesos rápidos
          </h2>
          <div className="mt-4 grid gap-3">
            <Button icon={Plus} onClick={onOpenUsers}>
              Crear usuario
            </Button>
            <Button icon={Code2} onClick={onOpenProblems}>
              Crear problema
            </Button>
            <Button variant="secondary" icon={Upload}>
              Consultar envíos
            </Button>
            <Button variant="secondary" icon={HelpCircle}>
              Responder aclaración
            </Button>
            <Button variant="secondary" icon={BarChart3}>
              Ver clasificación
            </Button>
            <Button variant="secondary" icon={Settings} onClick={onOpenCompetition}>
              Configurar competencia
            </Button>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-boca-border bg-white p-5 shadow-panel" aria-labelledby="activity-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="activity-title" className="text-[22px] font-bold tracking-normal">
              Actividad reciente
            </h2>
            <p className="mt-1 text-base text-boca-muted">Eventos operativos que ayudan al administrador a decidir rápido.</p>
          </div>
          <Button variant="secondary" icon={RefreshCw}>
            Actualizar actividad
          </Button>
        </div>

        <div className="mt-5 divide-y divide-gray-100">
          {activityItems.map((item) => (
            <ActivityRow key={`${item.title}-${item.time}`} {...item} />
          ))}
        </div>
      </section>
    </section>
  );
}

function UsersPage({ onCreate, onImport, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        user.user.toLowerCase().includes(query) ||
        user.fullName.toLowerCase().includes(query) ||
        user.site.toLowerCase().includes(query);
      const matchesType = typeFilter === "Todos" || user.type === typeFilter;
      const matchesStatus = statusFilter === "Todos" || user.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="users-title">
      <PageHeading
        id="users-title"
        eyebrow="Participantes"
        title="Gestión de usuarios"
        description="Administre equipos, jueces, personal y usuarios autorizados para participar en la competición."
        actions={
          <>
            <Button icon={Plus} onClick={onCreate}>
              Crear usuario
            </Button>
            <Button variant="secondary" icon={Upload} onClick={onImport}>
              Importar usuarios
            </Button>
          </>
        }
      />

      <section className="rounded-lg border border-boca-border bg-white p-4 shadow-panel" aria-label="Filtros de usuarios">
        <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_220px_200px_auto]">
          <SearchField
            label="Buscar usuarios"
            placeholder="Buscar por nombre, usuario o número"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <SelectField
            label="Tipo"
            value={typeFilter}
            onChange={setTypeFilter}
            options={["Todos", "Administrador", "Juez", "Equipo", "Personal", "Resultados"]}
          />
          <SelectField
            label="Estado"
            value={statusFilter}
            onChange={setStatusFilter}
            options={["Todos", "Activo", "Inactivo"]}
          />
          <div className="flex items-end">
            <div className="flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-boca-border bg-boca-bg px-3 text-sm font-bold text-boca-primary">
              <Filter className="h-4 w-4" />
              {filteredUsers.length} resultados
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-boca-border bg-white shadow-panel" aria-labelledby="users-table-title">
        <div className="border-b border-boca-border px-5 py-4">
          <h2 id="users-table-title" className="text-[22px] font-bold tracking-normal">
            Usuarios autorizados
          </h2>
          <p className="mt-1 text-sm text-boca-muted">
            La tabla muestra solo los datos principales; las acciones destructivas son explícitas.
          </p>
        </div>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Nombre completo</th>
              <th scope="col">Tipo</th>
              <th scope="col">Sitio</th>
              <th scope="col">Estado</th>
              <th scope="col">Último acceso</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.user}>
                <td data-label="Usuario">
                  <div>
                    <p className="font-bold text-boca-text">{user.user}</p>
                    <p className="text-sm text-boca-muted">{user.detail}</p>
                  </div>
                </td>
                <td data-label="Nombre completo">{user.fullName}</td>
                <td data-label="Tipo">{user.type}</td>
                <td data-label="Sitio">{user.site}</td>
                <td data-label="Estado">
                  <Badge label={user.status} tone={user.status === "Activo" ? "success" : "neutral"} />
                </td>
                <td data-label="Último acceso">{user.lastAccess}</td>
                <td data-label="Acciones">
                  <div className="action-row">
                    <MiniButton icon={Eye}>Ver detalles</MiniButton>
                    <MiniButton icon={Edit3}>Editar</MiniButton>
                    <MiniButton icon={KeyRound}>Restablecer</MiniButton>
                    <MiniButton icon={Lock}>
                      {user.status === "Activo" ? "Desactivar" : "Activar"}
                    </MiniButton>
                    <MiniButton icon={Trash2} variant="danger" onClick={() => onDelete(user.user)}>
                      Eliminar
                    </MiniButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

function CompetitionPage({ onCriticalAction }) {
  const [step, setStep] = useState(1);
  const [competition, setCompetition] = useState({
    name: "Maratón de Programación 2026",
    description: "Competencia académica intersedes para equipos universitarios.",
    home: "https://boca.local/contest",
    status: "Programada",
    date: "2026-09-20",
    time: "08:00",
    durationHours: "5",
    durationMinutes: "00",
    answerPause: "30",
    freeze: "60",
    timezone: "America/Bogota",
    autoFinish: true,
    publicScore: true,
    allowLogin: true,
    detailLevel: "Completo",
    multisite: true
  });

  const updateCompetition = (name, value) => {
    setCompetition((current) => ({ ...current, [name]: value }));
  };

  const steps = [
    { number: 1, label: "Información", icon: Info },
    { number: 2, label: "Programar", icon: Clock3 },
    { number: 3, label: "Configuración", icon: Settings },
    { number: 4, label: "Revisión", icon: CheckCircle2 }
  ];

  return (
    <section className="flex flex-col gap-6" aria-labelledby="competition-title">
      <PageHeading
        id="competition-title"
        eyebrow="Competencia"
        title="Creación y configuración de competencia"
        description="Asistente de cuatro pasos para reducir errores en fechas, estados y opciones críticas."
      />

      <section className="rounded-lg border border-boca-border bg-white p-5 shadow-panel" aria-labelledby="wizard-title">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 id="wizard-title" className="text-[22px] font-bold tracking-normal">
              Asistente por pasos
            </h2>
            <p className="mt-1 text-base text-boca-muted">
              Puede volver a cualquier paso antes de publicar la información.
            </p>
          </div>
          <Badge label={`Paso ${step} de 4`} tone="info" icon={ChevronRight} />
        </div>

        <ol className="mt-5 grid gap-3 md:grid-cols-4" aria-label="Pasos de creación de competencia">
          {steps.map((item) => {
            const Icon = item.icon;
            const active = step === item.number;
            const complete = step > item.number;
            return (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={() => setStep(item.number)}
                  className={`flex min-h-[64px] w-full items-center gap-3 rounded-lg border px-3 text-left transition ${
                    active
                      ? "border-boca-secondary bg-blue-50 text-boca-primary"
                      : complete
                        ? "border-green-200 bg-green-50 text-boca-success"
                        : "border-boca-border bg-white text-boca-muted"
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">Etapa {item.number}</span>
                    <span className="block text-sm">{item.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6">
          {step === 1 && (
            <FieldGroup title="Información general">
              <TextField label="Nombre de la competición" required value={competition.name} onChange={(value) => updateCompetition("name", value)} />
              <SelectField label="Estado" value={competition.status} onChange={(value) => updateCompetition("status", value)} options={["Borrador", "Programada", "Activa"]} />
              <TextField label="Página principal" value={competition.home} onChange={(value) => updateCompetition("home", value)} help="URL visible para los participantes." />
              <TextAreaField label="Descripción" value={competition.description} onChange={(value) => updateCompetition("description", value)} />
            </FieldGroup>
          )}

          {step === 2 && (
            <FieldGroup title="Programar">
              <TextField type="date" label="Fecha de inicio" required value={competition.date} onChange={(value) => updateCompetition("date", value)} />
              <TextField type="time" label="Hora de inicio" required value={competition.time} onChange={(value) => updateCompetition("time", value)} />
              <TextField label="Duración en horas" required value={competition.durationHours} onChange={(value) => updateCompetition("durationHours", value)} help="Ejemplo: 5" />
              <TextField label="Duración en minutos" value={competition.durationMinutes} onChange={(value) => updateCompetition("durationMinutes", value)} help="Ejemplo: 00" />
              <TextField label="Cierre de envíos antes del final" value={competition.answerPause} onChange={(value) => updateCompetition("answerPause", value)} help="Minutos antes de terminar." />
              <TextField label="Congelar clasificación" value={competition.freeze} onChange={(value) => updateCompetition("freeze", value)} help="Minutos antes de terminar." />
              <SelectField label="Zona horaria" value={competition.timezone} onChange={(value) => updateCompetition("timezone", value)} options={["America/Bogota", "America/Lima", "America/Mexico_City"]} />
            </FieldGroup>
          )}

          {step === 3 && (
            <FieldGroup title="Configuración">
              <Toggle label="Finalización automática" checked={competition.autoFinish} onChange={(value) => updateCompetition("autoFinish", value)} />
              <Toggle label="Clasificación visible" checked={competition.publicScore} onChange={(value) => updateCompetition("publicScore", value)} />
              <Toggle label="Permitir nuevos ingresos" checked={competition.allowLogin} onChange={(value) => updateCompetition("allowLogin", value)} />
              <Toggle label="Competencia con varios sitios" checked={competition.multisite} onChange={(value) => updateCompetition("multisite", value)} />
              <SelectField label="Nivel de detalle de resultados" value={competition.detailLevel} onChange={(value) => updateCompetition("detailLevel", value)} options={["Completo", "Resumido", "Solo ranking"]} />
            </FieldGroup>
          )}

          {step === 4 && (
            <section className="rounded-lg border border-boca-border bg-boca-bg p-4" aria-labelledby="review-title">
              <h3 id="review-title" className="text-[18px] font-bold tracking-normal">
                Revisión y confirmación
              </h3>
              <p className="mt-3 text-base leading-7 text-boca-text">
                La competición <strong>{competition.name}</strong> se inicia el <strong>{competition.date}</strong> a las <strong>{competition.time}</strong> y tendrá una duración de <strong>{competition.durationHours} h {competition.durationMinutes} min</strong>. La clasificación dejará de verse durante los últimos <strong>{competition.answerPause} min</strong> y se congelará durante los últimos <strong>{competition.freeze} min</strong>.
              </p>
              <FeedbackAlert
                className="mt-4"
                type="success"
                title="Resumen listo para guardar"
                text="La información puede corregirse volviendo a cualquiera de las etapas anteriores."
              />
            </section>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-boca-border pt-4 sm:flex-row sm:justify-between">
          <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep((current) => Math.max(1, current - 1))}>
            Regresar
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            {step < 4 ? (
              <Button icon={ChevronRight} onClick={() => setStep((current) => Math.min(4, current + 1))}>
                Continuar
              </Button>
            ) : (
              <Button icon={CheckCircle2}>
                Publicar competencia
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-boca-border bg-white p-5 shadow-panel" aria-labelledby="critical-title">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="critical-title" className="text-[22px] font-bold tracking-normal">
              Zona de acciones críticas
            </h2>
            <p className="mt-1 text-base text-boca-muted">
              Acciones como iniciar, pausar, reiniciar, finalizar o eliminar requieren una confirmación descriptiva.
            </p>
          </div>
          <Button variant="danger" icon={Flag} onClick={onCriticalAction}>
            Finalizar competencia
          </Button>
        </div>
      </section>
    </section>
  );
}

function ProblemsPage({ onCreate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [autoFilter, setAutoFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("Número");

  const filteredProblems = useMemo(() => {
    return problemsData
      .filter((problem) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          problem.number.toLowerCase().includes(query) ||
          problem.title.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "Todos" || problem.status === statusFilter;
        const matchesAuto = autoFilter === "Todos" || problem.automatic === autoFilter;

        return matchesSearch && matchesStatus && matchesAuto;
      })
      .sort((a, b) => {
        if (sortBy === "Nombre") return a.title.localeCompare(b.title);
        return a.number.localeCompare(b.number);
      });
  }, [autoFilter, searchTerm, sortBy, statusFilter]);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="problems-title">
      <PageHeading
        id="problems-title"
        eyebrow="Evaluación"
        title="Problemas de la competencia"
        description="Cree, organice y configure los problemas que deben resolver los equipos para su exposición."
        actions={
          <Button icon={Plus} onClick={onCreate}>
            Nuevo problema
          </Button>
        }
      />

      <section className="rounded-lg border border-boca-border bg-white p-4 shadow-panel" aria-label="Filtros de problemas">
        <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_180px_220px_180px_auto]">
          <SearchField
            label="Buscar problemas"
            placeholder="Buscar por número o nombre"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <SelectField label="Estado" value={statusFilter} onChange={setStatusFilter} options={["Todos", "Publicado", "Borrador", "Inactivo"]} />
          <SelectField label="Evaluación automática" value={autoFilter} onChange={setAutoFilter} options={["Todos", "Activa", "Pausada"]} />
          <SelectField label="Ordenar por" value={sortBy} onChange={setSortBy} options={["Número", "Nombre"]} />
          <div className="flex items-end">
            <div className="flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-boca-border bg-boca-bg px-3 text-sm font-bold text-boca-primary">
              <Filter className="h-4 w-4" />
              {filteredProblems.length} problemas
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-boca-border bg-white shadow-panel" aria-labelledby="problems-table-title">
        <div className="border-b border-boca-border px-5 py-4">
          <h2 id="problems-table-title" className="text-[22px] font-bold tracking-normal">
            Listado de problemas
          </h2>
          <p className="mt-1 text-sm text-boca-muted">
            Acciones peligrosas con botones explícitos.
          </p>
        </div>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Problema</th>
              <th scope="col">Color</th>
              <th scope="col">Archivo</th>
              <th scope="col">Evaluación automática</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.number}>
                <td data-label="Número">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-boca-border bg-boca-bg font-bold text-boca-primary">
                    {problem.number}
                  </span>
                </td>
                <td data-label="Problema">
                  <div>
                    <p className="font-bold">{problem.title}</p>
                    <p className="text-sm text-boca-muted">Visible para equipos participantes</p>
                  </div>
                </td>
                <td data-label="Color">
                  <div className="flex items-center justify-end gap-2 md:justify-start">
                    <span className="h-6 w-6 rounded-full border border-boca-border" style={{ backgroundColor: problem.color }} />
                    <span>{problem.colorName}</span>
                  </div>
                </td>
                <td data-label="Archivo">{problem.file}</td>
                <td data-label="Evaluación automática">{problem.automatic}</td>
                <td data-label="Estado">
                  <Badge label={problem.status} tone={problem.status === "Publicado" ? "info" : problem.status === "Borrador" ? "warning" : "neutral"} />
                </td>
                <td data-label="Acciones">
                  <div className="action-row">
                    <MiniButton icon={Eye}>Ver</MiniButton>
                    <MiniButton icon={SquarePen}>Editar</MiniButton>
                    <MiniButton icon={Download}>Descargar</MiniButton>
                    <MiniButton icon={Archive}>Duplicar</MiniButton>
                    <MiniButton icon={Lock}>Desactivar</MiniButton>
                    <MiniButton icon={Trash2} variant="danger" onClick={() => onDelete(problem.number)}>
                      Eliminar
                    </MiniButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

function UserDrawer({ onClose, onSaved }) {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    number: "",
    icpc: "",
    type: "",
    status: "Activo",
    multipleSessions: false,
    site: "Bogotá",
    ip: "",
    firstLoginChange: true,
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [localNotice, setLocalNotice] = useState(null);
  const strength = getPasswordStrength(form.password);

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const generatePassword = () => {
    let value = "";
    for (let index = 0; index < 12; index += 1) {
      value += passwordOptions[Math.floor(Math.random() * passwordOptions.length)];
    }
    setForm((current) => ({ ...current, password: value, confirmPassword: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.username.trim()) nextErrors.username = "El nombre de usuario no puede estar en blanco.";
    if (form.username.trim().toLowerCase() === "team15") {
      nextErrors.username = "El nombre de usuario \"team15\" ya está registrado. Cambie el nombre o edite el usuario existente.";
    }
    if (!/^[0-9]+$/.test(form.number.trim())) nextErrors.number = "Introduzca un número de usuario. Se admiten únicamente enteros positivos.";
    if (!form.type) nextErrors.type = "Seleccione un tipo de usuario.";
    if (form.ip.trim() && !/^(\d{1,3}\.){3}\d{1,3}$/.test(form.ip.trim())) nextErrors.ip = "La dirección IP debe tener formato válido, por ejemplo 192.168.1.10.";
    if (form.password.length < 8) nextErrors.password = "La contraseña debe tener mínimo 8 caracteres.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "La confirmación debe coincidir con la contraseña.";
    return nextErrors;
  };

  const submit = (event, createAnother = false) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setLocalNotice(null);
    if (Object.keys(nextErrors).length > 0) return;

    if (createAnother) {
      setLocalNotice({
        type: "success",
        title: "Usuario creado correctamente",
        text: `El usuario "${form.username}" ya puede entrar a la competencia.`
      });
      setForm((current) => ({
        ...current,
        username: "",
        fullName: "",
        number: "",
        icpc: "",
        password: "",
        confirmPassword: ""
      }));
      return;
    }

    onSaved({
      type: "success",
      title: "Usuario creado correctamente",
      text: `El usuario "${form.username}" ya puede entrar a la competencia.`
    });
  };

  return (
    <Drawer title="Crear usuario" description="Formulario separado de la tabla, organizado por información básica, acceso y seguridad." onClose={onClose}>
      <form className="flex flex-col gap-5" onSubmit={submit}>
        {localNotice && <FeedbackAlert {...localNotice} onClose={() => setLocalNotice(null)} />}
        <FieldGroup title="Información básica">
          <TextField label="Nombre de usuario" required value={form.username} onChange={(value) => update("username", value)} error={errors.username} />
          <TextField label="Nombre completo" required value={form.fullName} onChange={(value) => update("fullName", value)} />
          <TextField label="Número de usuario" required value={form.number} onChange={(value) => update("number", value)} help="Introduzca un número exclusivo dentro del sitio." error={errors.number} />
          <TextField label="Identificador ICPC" value={form.icpc} onChange={(value) => update("icpc", value)} />
          <SelectField label="Tipo de usuario" required value={form.type} onChange={(value) => update("type", value)} options={["", "Administrador", "Juez", "Equipo", "Personal", "Resultados"]} error={errors.type} />
        </FieldGroup>

        <FieldGroup title="Acceso y permisos">
          <SelectField label="Estado" value={form.status} onChange={(value) => update("status", value)} options={["Activo", "Inactivo"]} />
          <SelectField label="Sitio de asignación" value={form.site} onChange={(value) => update("site", value)} options={["Bogotá", "Medellín", "Cali", "General"]} />
          <TextField label="Dirección IP permitida" value={form.ip} onChange={(value) => update("ip", value)} help="Opcional. Si se completa, el usuario solo podrá ingresar desde esta dirección." error={errors.ip} />
          <Toggle label="Permitir varias sesiones" checked={form.multipleSessions} onChange={(value) => update("multipleSessions", value)} />
          <Toggle label="Obligar cambio de contraseña en el primer ingreso" checked={form.firstLoginChange} onChange={(value) => update("firstLoginChange", value)} />
        </FieldGroup>

        <FieldGroup title="Seguridad">
          <TextField type="password" label="Contraseña" required value={form.password} onChange={(value) => update("password", value)} error={errors.password} />
          <TextField type="password" label="Confirmación de contraseña" required value={form.confirmPassword} onChange={(value) => update("confirmPassword", value)} error={errors.confirmPassword} />
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-boca-text">Fortaleza de contraseña</span>
              <span className="text-sm text-boca-muted">{strength.label}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
              <div className={`h-full ${strength.color}`} style={{ width: `${strength.value}%` }} />
            </div>
            <Button className="mt-3" variant="secondary" icon={KeyRound} type="button" onClick={generatePassword}>
              Generar contraseña segura
            </Button>
          </div>
        </FieldGroup>

        <div className="sticky bottom-0 -mx-5 flex flex-col gap-3 border-t border-boca-border bg-white px-5 py-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" icon={X} type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="secondary" icon={Plus} type="button" onClick={(event) => submit(event, true)}>
            Guardar y crear otro
          </Button>
          <Button icon={CheckCircle2} type="submit">
            Guardar usuario
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

function ProblemDrawer({ onClose, onSaved }) {
  const [problem, setProblem] = useState({
    number: "E",
    shortName: "E",
    fullName: "Secuencia energética",
    description: "Problema de programación dinámica para equipos avanzados.",
    color: "#2563EB",
    colorName: "Azul",
    autoEvaluation: true,
    languages: "C, C++, Java, Python",
    timeLimit: "1.0"
  });
  const [fileInfo, setFileInfo] = useState(null);

  const update = (name, value) => {
    setProblem((current) => ({ ...current, [name]: value }));
  };

  const handleFile = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFileInfo({
      name: selected.name,
      size: `${(selected.size / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString("es-CO"),
      valid: selected.name.toLowerCase().endsWith(".zip")
    });
  };

  const save = (event) => {
    event.preventDefault();
    onSaved({
      type: "success",
      title: "Problema creado correctamente",
      text: `El problema ${problem.number} ha sido preparado con validación visible del paquete ZIP.`
    });
  };

  return (
    <Drawer title="Nuevo problema" description="Formulario dividido en identificación, presentación, archivo de problema y evaluación automática." onClose={onClose}>
      <form className="flex flex-col gap-5" onSubmit={save}>
        <FieldGroup title="Identificación">
          <TextField label="Número del problema" required value={problem.number} onChange={(value) => update("number", value)} />
          <TextField label="Nombre corto" required value={problem.shortName} onChange={(value) => update("shortName", value)} help="Ejemplo: A" />
          <TextField label="Nombre completo" required value={problem.fullName} onChange={(value) => update("fullName", value)} />
          <TextAreaField label="Descripción breve" value={problem.description} onChange={(value) => update("description", value)} />
        </FieldGroup>

        <FieldGroup title="Presentación">
          <div>
            <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor="problem-color">
              Color del problema <span className="text-boca-danger">*</span>
            </label>
            <div className="flex min-h-[44px] items-center gap-3 rounded-lg border border-boca-border bg-white px-3">
              <input
                id="problem-color"
                type="color"
                value={problem.color}
                onChange={(event) => update("color", event.target.value)}
                className="h-9 w-12 cursor-pointer border-0 bg-transparent"
              />
              <input
                aria-label="Valor hexadecimal"
                value={problem.color}
                onChange={(event) => update("color", event.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold outline-none"
              />
            </div>
          </div>
          <TextField label="Nombre del color" value={problem.colorName} onChange={(value) => update("colorName", value)} />
          <div className="md:col-span-2 rounded-lg border border-boca-border bg-boca-bg p-4">
            <p className="text-sm font-bold text-boca-text">Preview del indicador</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full font-bold text-white shadow-panel" style={{ backgroundColor: problem.color }}>
                {problem.shortName || problem.number}
              </span>
              <span className="text-sm text-boca-muted">Este color se verá en el globo o indicador del problema.</span>
            </div>
          </div>
        </FieldGroup>

        <section className="rounded-lg border border-boca-border bg-white p-4" aria-labelledby="zip-title">
          <h3 id="zip-title" className="text-[18px] font-bold tracking-normal">
            Archivo de problema
          </h3>
          <div className="mt-4 rounded-lg border-2 border-dashed border-boca-border bg-boca-bg p-5 text-center">
            <FileArchive className="mx-auto h-9 w-9 text-boca-secondary" />
            <p className="mt-2 font-bold text-boca-text">Arrastre el archivo ZIP o selecciónelo</p>
            <p className="mt-1 text-sm text-boca-muted">Extensión aceptada: .zip. Tamaño máximo recomendado: 30 MB.</p>
            <label className="mt-4 inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-boca-secondary px-4 py-2 text-sm font-bold text-white">
              <Upload className="h-4 w-4" />
              Seleccionar archivo
              <input className="sr-only" type="file" accept=".zip" onChange={handleFile} />
            </label>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-boca-border bg-white p-4">
              <p className="text-sm font-bold text-boca-text">Estructura requerida</p>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-boca-muted">
                {["Compare", "Compile", "Description", "Input", "Limits", "Output", "Run", "Tests"].map((folder) => (
                  <li className="flex items-center gap-2" key={folder}>
                    <CheckCircle2 className="h-4 w-4 text-boca-success" />
                    {folder}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-boca-border bg-white p-4">
              <p className="text-sm font-bold text-boca-text">Resultado de validación</p>
              {fileInfo ? (
                <div className="mt-2 space-y-2 text-sm text-boca-muted">
                  <p><strong>Archivo:</strong> {fileInfo.name}</p>
                  <p><strong>Tamaño:</strong> {fileInfo.size}</p>
                  <p><strong>Fecha:</strong> {fileInfo.date}</p>
                  {fileInfo.valid ? (
                    <FeedbackAlert type="success" title="Paquete validado" text="Se encontraron carpetas de entrada, salida y descripción." />
                  ) : (
                    <FeedbackAlert type="error" title="Archivo no válido" text="El paquete no puede publicarse porque no tiene extensión ZIP." />
                  )}
                </div>
              ) : (
                <FeedbackAlert type="info" title="Archivo pendiente" text="El archivo será validado antes de publicarse." />
              )}
            </div>
          </div>
        </section>

        <FieldGroup title="Evaluación automática">
          <Toggle label="Activar evaluación automática" checked={problem.autoEvaluation} onChange={(value) => update("autoEvaluation", value)} />
          <TextField label="Lenguajes habilitados" value={problem.languages} onChange={(value) => update("languages", value)} help="Separe los lenguajes por coma." />
          <TextField label="Límite de tiempo" value={problem.timeLimit} onChange={(value) => update("timeLimit", value)} help="Tiempo en segundos para la ejecución." />
          <TextAreaField label="Respuestas del evaluador" value="Accepted, Wrong Answer, Time Limit, Runtime Error" onChange={() => {}} />
        </FieldGroup>

        <div className="sticky bottom-0 -mx-5 flex flex-col gap-3 border-t border-boca-border bg-white px-5 py-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" icon={X} type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button icon={CheckCircle2} type="submit">
            Guardar problema
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

function PlaceholderPage({ view }) {
  const label = navSections.flatMap((section) => section.items).find((item) => item.id === view)?.label ?? "Sección";
  return (
    <section className="rounded-lg border border-boca-border bg-white p-6 shadow-panel">
      <PageHeading
        eyebrow="Módulo disponible en navegación"
        title={label}
        description="Esta primera versión implementa por completo las pantallas priorizadas en el PDF: panel principal, usuarios, competencias y problemas."
      />
      <FeedbackAlert
        className="mt-4"
        type="info"
        title="Alcance de la entrega"
        text="La sección queda visible en el menú para mantener la estructura propuesta, pero su desarrollo detallado se concentra en los prototipos solicitados."
      />
    </section>
  );
}

function Drawer({ title, description, children, onClose }) {
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

function ConfirmDialog({ action, onClose }) {
  const [typed, setTyped] = useState("");
  const canConfirm = !action.requiresText || typed === action.requiresText;

  const confirm = () => {
    if (!canConfirm) return;
    action.onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <section className="w-full max-w-lg rounded-lg border border-boca-border bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-50 text-boca-danger">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h2 id="confirm-title" className="text-[22px] font-bold tracking-normal">
              {action.title}
            </h2>
            <p className="mt-2 text-base leading-6 text-boca-muted">{action.text}</p>
          </div>
        </div>

        {action.requiresText && (
          <div className="mt-4">
            <TextField
              label={`Escriba "${action.requiresText}" para confirmar`}
              value={typed}
              onChange={setTyped}
              help="Esta confirmación evita acciones irrecuperables por accidente."
            />
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" icon={X} type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant={action.tone === "danger" ? "danger" : "primary"} icon={Trash2} type="button" onClick={confirm} disabled={!canConfirm}>
            {action.confirmText}
          </Button>
        </div>
      </section>
    </div>
  );
}

function PageHeading({ id, eyebrow, title, description, actions }) {
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

function MetricCard({ title, value, change, icon: Icon, tone }) {
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

function ActivityRow({ icon: Icon, title, text, time, tone }) {
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

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg border border-boca-border bg-white p-4">
      <dt className="text-sm font-bold text-boca-muted">{label}</dt>
      <dd className="mt-1 text-base font-bold text-boca-text">{value}</dd>
    </div>
  );
}

function FeedbackAlert({ type = "info", title, text, onClose, className = "" }) {
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

function FieldGroup({ title, children }) {
  return (
    <fieldset className="rounded-lg border border-boca-border bg-white p-4">
      <legend className="px-2 text-[18px] font-bold tracking-normal text-boca-text">{title}</legend>
      <div className="drawer-grid pt-2">{children}</div>
    </fieldset>
  );
}

function TextField({ label, value, onChange, type = "text", required = false, help, error }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-boca-text ${
          error ? "border-boca-danger" : "border-boca-border"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={help || error ? `${id}-support` : undefined}
      />
      {(help || error) && (
        <p id={`${id}-support`} className={`mt-1 text-sm ${error ? "text-boca-danger" : "text-boca-muted"}`}>
          {error || help}
        </p>
      )}
    </div>
  );
}

function TextAreaField({ label, value, onChange, required = false, help, error }) {
  const id = useStableFieldId(label);
  return (
    <div className="md:col-span-2">
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-base text-boca-text ${
          error ? "border-boca-danger" : "border-boca-border"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={help || error ? `${id}-support` : undefined}
      />
      {(help || error) && (
        <p id={`${id}-support`} className={`mt-1 text-sm ${error ? "text-boca-danger" : "text-boca-muted"}`}>
          {error || help}
        </p>
      )}
    </div>
  );
}

function SearchField({ label, placeholder, value, onChange }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label}
      </label>
      <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-boca-border bg-white px-3">
        <Search className="h-5 w-5 shrink-0 text-boca-muted" />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent text-base outline-none"
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, required = false, error }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-boca-text ${
          error ? "border-boca-danger" : "border-boca-border"
        }`}
        aria-invalid={Boolean(error)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "Seleccione una opción"}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-boca-danger">{error}</p>}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex min-h-[54px] cursor-pointer items-center justify-between gap-3 rounded-lg border border-boca-border bg-white px-3">
      <span className="text-sm font-bold text-boca-text">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-boca-secondary"
      />
    </label>
  );
}

function Button({ children, icon: Icon, variant = "primary", className = "", type = "button", disabled = false, onClick }) {
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

function MiniButton({ children, icon: Icon, variant = "secondary", onClick }) {
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

function Badge({ label, tone = "info", icon: Icon }) {
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

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const options = [
    { value: 18, label: "Muy débil", color: "bg-boca-danger" },
    { value: 42, label: "Débil", color: "bg-boca-warning" },
    { value: 70, label: "Aceptable", color: "bg-boca-secondary" },
    { value: 100, label: "Fuerte", color: "bg-boca-success" }
  ];

  return options[Math.max(0, score - 1)] ?? options[0];
}

function useStableFieldId(label) {
  const reactId = useId().replace(/:/g, "");
  return `${makeId(label)}-${reactId}`;
}

function makeId(label) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
