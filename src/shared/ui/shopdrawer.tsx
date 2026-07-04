import { useEffect, type ReactNode } from "react";
import { Icon } from "@iconify-icon/react";
import DrTitle from "../components/atoms/DrTitle";

interface ShopDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    /** Ancho mínimo del drawer. Por defecto 280px. */
    minWidth?: string | number;
    /** Ancho máximo del drawer. Por defecto 420px. */
    maxWidth?: string | number;
    subtitle?: string;
    icon?: string;
}

export default function ShopDrawer({
    open,
    onClose,
    children,
    title = "",
    minWidth = 280,
    maxWidth = 420,
    subtitle = "",
    icon = "",
}: ShopDrawerProps) {

    // Tecla Escape + bloqueo de scroll
    useEffect(() => {
        if (!open) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    return (
        <div
            className={`
                fixed inset-0 z-[100]
                transition-all duration-300 ease-out
                ${open
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }
            `}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                style={{
                    minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
                    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
                }}
                className={`
                    absolute right-0 top-0 h-screen bg-gradient-to-b from-white to-slate-50 shadow-2xl flex flex-col
                    transition-transform duration-300 ease-out
                    w-full sm:w-auto
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="relative flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
                    {title && (
                        <div className="shrink-0">
                            <DrTitle icon={icon} title={title} subtitle={subtitle} />
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="ml-auto p-2.5 rounded-xl bg-slate-100 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-200 active:scale-90 flex items-center justify-center"
                        aria-label="Cerrar"
                    >
                        <Icon icon="ep:close" className="text-lg" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </aside>
        </div>
    );
}