import { useEffect, type ReactNode } from "react";
import { Icon } from "@iconify-icon/react";
import DrTitle from "../components/atoms/DrTitle";

interface ShopDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    width?: number;
    subtitle?: string;
    icon?: string;
}

export default function ShopDrawer({
    open,
    onClose,
    children,
    title = "",
    width = 420,
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
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                style={{ width }}
                className={`
                    absolute right-0 top-0 h-screen bg-modal shadow-2xl flex flex-col
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    {title && (
                        <div className="relative shrink-0">
                            <DrTitle icon={icon} title={title} subtitle={subtitle} />
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-2xl bg-muted hover:bg-destructive/80 cursor-pointer hover:text-white flex items-center justify-center"
                    >
                        <Icon icon="ep:close" className="text-xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </aside>
        </div>
    );
}