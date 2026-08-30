"use client";

import { useMemo, useState } from "react";
import { Archive, Download, Eye, Filter, Lock, Plus, SquarePen, Trash2 } from "lucide-react";
import { problemsData } from "../../data/mockData";
import { Badge, Button, MiniButton, PageHeading, SearchField, SelectField } from "../ui";

export default function ProblemsPage({ onCreate, onDelete }) {
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

