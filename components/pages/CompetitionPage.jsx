"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Clock3, Flag, Info, Settings } from "lucide-react";
import { Badge, Button, FeedbackAlert, FieldGroup, PageHeading, SelectField, TextAreaField, TextField, Toggle } from "../ui";

export default function CompetitionPage({ onCriticalAction }) {
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

