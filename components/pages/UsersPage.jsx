"use client";

import { useMemo, useState } from "react";
import { Edit3, Eye, Filter, KeyRound, Lock, Plus, Trash2, Upload } from "lucide-react";
import { usersData } from "../../data/mockData";
import { Badge, Button, MiniButton, PageHeading, SearchField, SelectField } from "../ui";

export default function UsersPage({ onCreate, onImport, onDelete }) {
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

