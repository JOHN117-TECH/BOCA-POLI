import {
  Activity,
  BarChart3,
  Clock3,
  Code2,
  Gauge,
  HelpCircle,
  Plus,
  RefreshCw,
  Settings,
  Upload,
  Users
} from "lucide-react";
import { activityItems } from "../../data/mockData";
import { ActivityRow, Badge, Button, FeedbackAlert, InfoItem, MetricCard, PageHeading } from "../ui";

export default function Dashboard({ onOpenUsers, onOpenProblems, onOpenCompetition }) {
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
