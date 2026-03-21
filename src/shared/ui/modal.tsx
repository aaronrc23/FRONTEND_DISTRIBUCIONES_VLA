import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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

/**
 * Variantes de animación dinámicas basadas en la posición y el dispositivo
 */
const getModalVariants = (
    position: ModalPosition,
    isMobile: boolean,
    mobileAsDrawer: boolean,
): Variants => {
    // Comportamiento de Drawer para móvil (siempre desde abajo)
    if (isMobile && mobileAsDrawer) {
        return {
            initial: { y: "100%", x: 0, opacity: 1 },
            animate: { y: 0, x: 0, opacity: 1 },
            exit: { y: "100%", x: 0, opacity: 1 },
        };
    }

    // Comportamientos para Desktop
    const variants: Record<ModalPosition, Variants> = {
        center: {
            initial: { scale: 0.95, opacity: 0, y: 0 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.95, opacity: 0, y: 0 },
        },
        top: {
            initial: { y: "-100%", opacity: 1 },
            animate: { y: 0, opacity: 1 },
            exit: { y: "-120%", opacity: 1 },
        },
        bottom: {
            initial: { y: "100%", opacity: 1 },
            animate: { y: 0, opacity: 1 },
            exit: { y: "100%", opacity: 1 },
        },
        left: {
            initial: { x: "-100%", opacity: 1 },
            animate: { x: 0, opacity: 1 },
            exit: { x: "-100%", opacity: 1 },
        },
        right: {
            initial: { x: "100%", opacity: 1 },
            animate: { x: 0, opacity: 1 },
            exit: { x: "100%", opacity: 1 },
        },
    };

    return variants[position];
};

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

    // Detectar si estamos en móvil para aplicar la lógica de Drawer
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
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

    // Estilos del panel blanco
    const panelStyles = cn(
        "bg-white/99 dark:bg-modal backdrop-blur-xl shadow-xl relative flex flex-col  sm:min-w-[400px] max-h-[95vh]",
        {
            "rounded-2xl w-full w-auto": position === "center",
            " rounded-b-2xl sm:rounded-2xl  w-full md:w-auto": position === "top",
            "rounded-t-lg w-full max-w-2xl": position === "bottom",
            "w-full max-w-md h-full sm:rounded-r-2xl": position === "left",
            "w-full max-w-md h-full sm:rounded-l-2xl": position === "right",
            // Estilos específicos para Drawer en móvil
            "max-sm:w-full max-sm:max-w-none max-sm:h-auto max-sm:max-h-[90vh] max-sm:rounded-t-[2.5rem] max-sm:rounded-b-none":
                mobileAsDrawer,
        },
        className,
    );

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop Animado */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                        onClick={handleBackdropClick}
                    />

                    {/* Wrapper de Posicionamiento */}
                    <div className={containerAlignment} onClick={handleBackdropClick}>
                        <motion.div
                            variants={getModalVariants(position, isMobile, mobileAsDrawer)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={panelStyles}
                            onClick={(e) => e.stopPropagation()} // Evitar cierre al clickear dentro del modal
                        >
                            {/* Indicador de arrastre visual para el drawer en móvil */}
                            {isMobile && mobileAsDrawer && (
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
                                    className="p-2 hover:bg-accent cursor-pointer rounded-full transition-colors absolute top-2 right-2 text-gray-500 hover:text-red-500"
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
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
};
