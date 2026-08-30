# BOCA - Entrega 2 Semana 5

Primera versión funcional de la propuesta de mejora para la interfaz administrativa de BOCA.

## Ejecutar

```bash
npm install
npm run dev
```

La aplicación usa Next.js, React, JavaScript y Tailwind CSS. Las pantallas implementadas siguen la propuesta del PDF de la entrega 1: panel principal, gestión de usuarios, asistente de competencia, gestión de problemas, mensajes del sistema, acciones críticas y diseño responsive.

## Estructura

```text
app/                  Rutas, layout global y estilos
components/
  BocaApp.jsx         Estado y coordinación de la aplicación
  layout/             Cabecera y navegación lateral
  pages/              Pantallas principales de cada módulo
  forms/              Formularios laterales de usuarios y problemas
  ui/                 Controles visuales reutilizables
data/                 Navegación y datos demostrativos
hooks/                Hooks reutilizables de React
lib/                  Funciones auxiliares sin interfaz
```
