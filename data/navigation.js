import {
  Archive,
  BarChart3,
  BookOpenCheck,
  Code2,
  FileCheck2,
  HelpCircle,
  Languages,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Server,
  ShieldAlert,
  Trophy,
  Upload,
  UserRound,
  UserRoundCog,
  Users
} from "lucide-react";

export const availableViews = new Set(["dashboard", "users", "competition", "problems"]);

export const navSections = [
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

