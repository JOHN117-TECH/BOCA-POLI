"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import Button from "./Button";
import TextField from "./TextField";

export default function ConfirmDialog({ action, onClose }) {
  const [typed, setTyped] = useState("");
  const canConfirm = !action.requiresText || typed === action.requiresText;

  const confirm = () => {
    if (!canConfirm) return;
    action.onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <section className="w-full max-w-lg rounded-lg border border-boca-border bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-50 text-boca-danger">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h2 id="confirm-title" className="text-[22px] font-bold tracking-normal">
              {action.title}
            </h2>
            <p className="mt-2 text-base leading-6 text-boca-muted">{action.text}</p>
          </div>
        </div>

        {action.requiresText && (
          <div className="mt-4">
            <TextField
              label={`Escriba "${action.requiresText}" para confirmar`}
              value={typed}
              onChange={setTyped}
              help="Esta confirmación evita acciones irrecuperables por accidente."
            />
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" icon={X} type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant={action.tone === "danger" ? "danger" : "primary"} icon={Trash2} type="button" onClick={confirm} disabled={!canConfirm}>
            {action.confirmText}
          </Button>
        </div>
      </section>
    </div>
  );
}

