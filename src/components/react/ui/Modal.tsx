import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
  closeOnOverlayClick?: boolean;
  overlayClassName?: string;
  contentClassName?: string;
};

const FOCUSABLE_SELECTORS =
  'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  describedBy,
  closeOnOverlayClick = true,
  overlayClassName = "",
  contentClassName = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return undefined;

    lastActiveElement.current = document.activeElement;
    document.body.classList.add("modal-open");

    const content = contentRef.current;
    const firstFocusable = content?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTORS,
    );
    (firstFocusable ?? content)?.focus();

    return () => {
      document.body.classList.remove("modal-open");
      if (lastActiveElement.current instanceof HTMLElement) {
        lastActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!contentRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "Tab") {
        const focusables = Array.from(
          contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusables.length === 0) {
          event.preventDefault();
          contentRef.current.focus();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const isShift = event.shiftKey;

        if (!active || !contentRef.current.contains(active)) {
          event.preventDefault();
          (isShift ? last : first).focus();
          return;
        }

        if (!isShift && active === last) {
          event.preventDefault();
          first.focus();
        } else if (isShift && active === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const portalTarget = useMemo(
    () => (typeof document !== "undefined" ? document.body : null),
    [],
  );

  if (!mounted || !isOpen || !portalTarget) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`modal-overlay ${overlayClassName}`.trim()}
      role="presentation"
      onMouseDown={handleOverlayClick}
      ref={overlayRef}
    >
      <div
        className={`modal-card ${contentClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        ref={contentRef}
      >
        {children}
      </div>
    </div>,
    portalTarget,
  );
}
