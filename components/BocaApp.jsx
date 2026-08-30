"use client";

import { useEffect, useState } from "react";
import { availableViews } from "../data/navigation";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import CompetitionPage from "./pages/CompetitionPage";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProblemsPage from "./pages/ProblemsPage";
import UsersPage from "./pages/UsersPage";
import ProblemDrawer from "./forms/ProblemDrawer";
import UserDrawer from "./forms/UserDrawer";
import { ConfirmDialog, FeedbackAlert } from "./ui";

export default function BocaApp() {
  const [view, setView] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(null);
  const [notice, setNotice] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const syncViewFromHash = () => {
      const nextView = window.location.hash.replace("#", "");
      if (nextView) setView(nextView);
    };

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  const handleNavigation = (id) => {
    setView(id);
    window.history.pushState(null, "", `#${id}`);
    setMobileMenuOpen(false);
  };

  const openDrawer = (name) => {
    setDrawer(name);
    setNotice(null);
  };

  const currentView = availableViews.has(view) ? view : "placeholder";

  return (
    <div className="app-shell bg-boca-bg">
      <Sidebar
        activeView={view}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
      />

      <div className="min-h-screen lg:pl-[290px]">
        <Header onMenu={() => setMobileMenuOpen(true)} />

        <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {notice && (
            <FeedbackAlert
              type={notice.type}
              title={notice.title}
              text={notice.text}
              onClose={() => setNotice(null)}
            />
          )}

          {currentView === "dashboard" && (
            <Dashboard
              onOpenUsers={() => {
                handleNavigation("users");
                openDrawer("user");
              }}
              onOpenProblems={() => {
                handleNavigation("problems");
                openDrawer("problem");
              }}
              onOpenCompetition={() => handleNavigation("competition")}
            />
          )}

          {currentView === "users" && (
            <UsersPage
              onCreate={() => openDrawer("user")}
              onImport={() =>
                setNotice({
                  type: "info",
                  title: "Importación preparada",
                  text: "Seleccione un archivo CSV para cargar usuarios manteniendo la validación previa."
                })
              }
              onDelete={(user) =>
                setConfirmAction({
                  title: "Eliminar usuario",
                  text: `Está a punto de eliminar el usuario "${user}". Esta operación retirará su acceso a la competencia y no se ejecutará al seleccionar el número del usuario.`,
                  confirmText: "Eliminar usuario",
                  tone: "danger",
                  onConfirm: () =>
                    setNotice({
                      type: "success",
                      title: "Acción simulada correctamente",
                      text: `El usuario "${user}" fue marcado para eliminación en este prototipo.`
                    })
                })
              }
            />
          )}

          {currentView === "competition" && (
            <CompetitionPage
              onCriticalAction={() =>
                setConfirmAction({
                  title: "Finalizar competencia",
                  text: "Está a punto de finalizar la competencia \"Maratón de Programación 2026\". Luego de confirmarlo, los equipos no podrán seguir haciendo envíos.",
                  confirmText: "Finalizar competencia",
                  tone: "danger",
                  requiresText: "Maratón de Programación 2026",
                  onConfirm: () =>
                    setNotice({
                      type: "warning",
                      title: "Competencia finalizada",
                      text: "La acción crítica fue confirmada y los envíos quedaron bloqueados en la simulación."
                    })
                })
              }
            />
          )}

          {currentView === "problems" && (
            <ProblemsPage
              onCreate={() => openDrawer("problem")}
              onDelete={(problem) =>
                setConfirmAction({
                  title: "Eliminar problema",
                  text: `¿Desea eliminar el problema ${problem}? Esta operación también eliminará la información referida a sus evaluaciones y no podrá deshacerse.`,
                  confirmText: "Eliminar problema",
                  tone: "danger",
                  onConfirm: () =>
                    setNotice({
                      type: "success",
                      title: "Problema eliminado",
                      text: `El problema ${problem} fue eliminado en la simulación.`
                    })
                })
              }
            />
          )}

          {currentView === "placeholder" && <PlaceholderPage view={view} />}
        </main>
      </div>

      {drawer === "user" && (
        <UserDrawer
          onClose={() => setDrawer(null)}
          onSaved={(message) => {
            setDrawer(null);
            setNotice(message);
          }}
        />
      )}

      {drawer === "problem" && (
        <ProblemDrawer
          onClose={() => setDrawer(null)}
          onSaved={(message) => {
            setDrawer(null);
            setNotice(message);
          }}
        />
      )}

      {confirmAction && (
        <ConfirmDialog
          action={confirmAction}
          onClose={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}

