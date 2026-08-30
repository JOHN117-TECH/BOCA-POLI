"use client";

import { useState } from "react";
import { CheckCircle2, FileArchive, Upload, X } from "lucide-react";
import { Button, Drawer, FeedbackAlert, FieldGroup, TextAreaField, TextField, Toggle } from "../ui";

export default function ProblemDrawer({ onClose, onSaved }) {
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

