import { CheckCircle2, HelpCircle, Upload, Users } from "lucide-react";

export const usersData = [
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

export const problemsData = [
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

export const activityItems = [
  { icon: Upload, title: "Nuevo envío realizado", text: "team15 envió una solución para el problema A.", time: "Hace 2 min", tone: "info" },
  { icon: CheckCircle2, title: "Problema aceptado", text: "judge1 marcó como aceptado el envío #184.", time: "Hace 9 min", tone: "success" },
  { icon: HelpCircle, title: "Aclaración pendiente", text: "Equipo Medellín solicita precisión sobre el problema C.", time: "Hace 18 min", tone: "warning" },
  { icon: Users, title: "Usuario registrado", text: "Se agregó el equipo Algoritmos Poli.", time: "Hoy 08:41", tone: "info" }
];

