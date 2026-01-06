import React, { useCallback, useEffect, useId, useState } from "react";
import Modal from "./Modal";

const STORAGE_KEY = "portfolio_development_notice";
const ONE_DAY = 24 * 60 * 60 * 1000;

type NoticePreference = {
  hideUntil?: number;
  permanentlyDismissed?: boolean;
};

const parsePreference = (): NoticePreference | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as NoticePreference;
  } catch {
    return null;
  }
};

export default function DevelopmentNotice() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const preference = parsePreference();
    if (preference?.permanentlyDismissed) return;
    if (preference?.hideUntil && Date.now() < preference.hideUntil) return;
    setIsOpen(true);
  }, []);

  const persistPreference = useCallback(
    (days: number | null, permanentlyDismissed = false) => {
      if (typeof window === "undefined") return;
      const hideUntil = days ? Date.now() + days * ONE_DAY : undefined;
      const payload: NoticePreference = {
        hideUntil,
        permanentlyDismissed,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [],
  );

  const handleCloseForNow = useCallback(() => {
    persistPreference(7);
    setIsOpen(false);
  }, [persistPreference]);

  const handleNeverShow = useCallback(() => {
    persistPreference(null, true);
    setIsOpen(false);
  }, [persistPreference]);

  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseForNow}
      labelledBy={titleId}
      describedBy={descriptionId}
      contentClassName="dev-modal"
    >
      <div className="dev-modal__header">
        <div className="dev-modal__icon" aria-hidden="true">
          🚧
        </div>
        <div>
          <p className="dev-modal__eyebrow">Nota rápida</p>
          <h3 id={titleId}>Portfolio en construcción</h3>
        </div>
      </div>
      <p id={descriptionId} className="dev-modal__body">
        Estoy iterando el contenido y los proyectos. Si ves algo incompleto, es
        parte del proceso.
      </p>
      <div className="dev-modal__actions">
        <button className="btn primary" type="button" onClick={handleCloseForNow}>
          Entendido
        </button>
        <button className="btn ghost" type="button" onClick={handleNeverShow}>
          No volver a mostrar
        </button>
      </div>
    </Modal>
  );
}
