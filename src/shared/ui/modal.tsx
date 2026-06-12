import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Texto } from "./texto";

/**
 * Utility para combinar clases de Tailwind de forma segura
 */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Tipos para las posiciones permitidas
type ModalPosition = "center" | "top" | "bottom" | "left" | "right";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
    position?: ModalPosition;
    /** Si es true, en móviles se comporta como un drawer que sube desde abajo */
    mobileAsDrawer?: boolean;
    /** Si es true, el click en el backdrop no cierra el modal */
    preventCloseOnOverlay?: boolean;
    showCloseButton?: boolean;
    className?: string;
    description?: string;
}

/** Duración de las transiciones en ms */
const TRANSITION_DURATION = 250;

/**
 * Devuelve la clase CSS correspondiente al estado "cerrado / inicial"
 * para cada posición del modal.
 */
function getClosedTransform(position: ModalPosition, isMobile: boolean, mobileAsDrawer: boolean): string {
    if (isMobile && mobileAsDrawer) return "translate-y-full";
    switch (position) {
        case "center": return "scale-95 opacity-0";
        case "top":    return "-translate-y-full";
        case "bottom": return "translate-y-full";
        case "left":   return "-translate-x-full";
        case "right":  return "translate-x-full";
    }
}

/**
 * Devuelve la clase CSS correspondiente al estado "abierto"
 * para cada posición del modal.
 */
function getOpenTransform(position: ModalPosition, isMobile: boolean, mobileAsDrawer: boolean): string {
    if (isMobile && mobileAsDrawer) return "translate-y-0";
    switch (position) {
        case "center": return "scale-100 opacity-100";
        case "top":    return "translate-y-0";
        case "bottom": return "translate-y-0";
        case "left":   return "translate-x-0";
        case "right":  return "translate-x-0";
    }
}

export const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    icon,
    position = "center",
    mobileAsDrawer = false,
    preventCloseOnOverlay = false,
    showCloseButton = true,
    className,
    description,
}: ModalProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Detectar si estamos en móvil
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Gestionar montaje/desmontaje con animación de entrada/salida
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (isOpen) {
            setMounted(true);
            // Doble requestAnimationFrame para forzar un reflow y activar la transición CSS
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setOpen(true);
                });
            });
        } else {
            setOpen(false);
            timerRef.current = setTimeout(() => {
                setMounted(false);
            }, TRANSITION_DURATION);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isOpen]);

    // Bloquear scroll del body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Manejador del backdrop
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !preventCloseOnOverlay) {
            onClose();
        }
    };

    // Clases de alineación del contenedor (Flexbox)
    const containerAlignment = cn("fixed inset-0 z-60 flex p-0 sm:p-4", {
        "items-center justify-center": position === "center",
        "items-start justify-center": position === "top",
        "items-end justify-center": position === "bottom",
        "items-stretch justify-start": position === "left",
        "items-stretch justify-end": position === "right",
        // Override para móvil como drawer
        "max-sm:items-end max-sm:justify-center": mobileAsDrawer,
    });

    // Estilos del panel
    const panelStyles = cn(
        "bg-modal/99 dark:bg-modal backdrop-blur-xl shadow-xl relative flex flex-col sm:min-w-[400px] max-h-[95vh]",
        {
            "rounded-2xl w-auto": position === "center",
            "rounded-b-2xl sm:rounded-2xl w-full md:w-auto": position === "top",
            "rounded-t-lg w-full max-w-2xl": position === "bottom",
            "w-full max-w-md h-full sm:rounded-r-2xl": position === "left",
            "w-full max-w-md h-full sm:rounded-l-2xl": position === "right",
            // Estilos específicos para Drawer en móvil
            "max-sm:w-full max-sm:max-w-none max-sm:h-auto max-sm:max-h-[90vh] max-sm:rounded-t-[2.5rem] max-sm:rounded-b-none":
                mobileAsDrawer,
        },
        className,
    );

    // Clases para la animación del panel
    const isDrawerOnMobile = isMobile && mobileAsDrawer;
    const panelClosedClass = getClosedTransform(position, isMobile, mobileAsDrawer);
    const panelOpenClass = getOpenTransform(position, isMobile, mobileAsDrawer);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className={cn(                        "absolute inset-0 backdrop-blur-[2px] transition-opacity duration-[250ms] ease-out will-change-[opacity]",
                    open ? "opacity-100" : "opacity-0",
                )}
                style={{ backgroundColor: "var(--backdrop)" }}
                onClick={handleBackdropClick}
            />

            {/* Wrapper de Posicionamiento */}
            <div className={containerAlignment} onClick={handleBackdropClick}>
                <div
                    className={cn(
                        panelStyles,
                        "transition-all duration-[250ms] ease-out will-change-[transform,opacity]",
                        // Estado cerrado (posiciones inicial/final)
                        panelClosedClass,
                        // Estado abierto
                        open && panelOpenClass,
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Indicador de arrastre visual para el drawer en móvil */}
                    {isDrawerOnMobile && (
                        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mt-3 mb-1" />
                    )}

                    {title && (
                        <div className="pt-6 px-6 pb-0">
                            <div className="flex items-center gap-2">
                                {icon && icon}
                                <div className="flex flex-col gap-1">
                                    <Texto className="font-bold text-xl">
                                        {title}
                                    </Texto>
                                    {description && (
                                        <Texto
                                            variant="small"
                                            className="text-xs text-foreground-2"
                                        >
                                            {description}
                                        </Texto>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-accent cursor-pointer rounded-full transition-colors absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                            aria-label="Cerrar"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Contenido del Modal */}
                    <div className="flex-1 overflow-y-auto p-6 text-foreground scrollmodal">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};
