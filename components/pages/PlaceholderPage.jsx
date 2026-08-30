import { navSections } from "../../data/navigation";
import { FeedbackAlert, PageHeading } from "../ui";

export default function PlaceholderPage({ view }) {
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

