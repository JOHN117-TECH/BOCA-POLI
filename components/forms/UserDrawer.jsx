"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, Plus, X } from "lucide-react";
import { getPasswordStrength, passwordOptions } from "../../lib/password";
import { Button, Drawer, FeedbackAlert, FieldGroup, SelectField, TextField, Toggle } from "../ui";

export default function UserDrawer({ onClose, onSaved }) {
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

