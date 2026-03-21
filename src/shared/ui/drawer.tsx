
import { Icon } from "@iconify-icon/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import DrTitle from "../components/atoms/DrTitle";




type DrawerPosition = "left" | "right" | "top" | "bottom";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    position?: DrawerPosition;
    children: ReactNode;
    showOverlay?: boolean;
    closeOnOverlayClick?: boolean;
    width?: string;
    height?: string;
    className?: string;
    title?: string;
    icon?: string;
    subtitle?: string;
}

export function Drawer({
    open,
    onClose,
    position = "right",
    children,
    showOverlay = true,
    closeOnOverlayClick = true,
    width = "",
    height = "300px",
    title,
    icon,
    subtitle,
    className,
}: DrawerProps) {
    const [isMounted, setIsMounted] = useState(open);
    const [isVisible, setIsVisible] = useState(open);

    // 🎬 Controlar montaje + animación
    useEffect(() => {
        if (open) {
            setIsMounted(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            const timeout = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    // 🔐 ESC
    useEffect(() => {
        if (!isMounted) return;
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [isMounted, onClose]);

    if (!isMounted) return null;

    const baseDrawer =
        "fixed z-50 bg-modal shadow-xl transition-transform duration-300 ease-out";

    const positions = {
        left: cn(
            "top-0 left-0 h-full",
            isVisible ? "translate-x-0" : "-translate-x-full"
        ),
        right: cn(
            "top-0 right-0 h-full",
            isVisible ? "translate-x-0" : "translate-x-full"
        ),
        top: cn(
            "top-0 left-0 w-full",
            isVisible ? "translate-y-0" : "-translate-y-full"
        ),
        bottom: cn(
            "bottom-0 left-0 w-full",
            isVisible ? "translate-y-0" : "translate-y-full"
        ),
    };

    const size =
        position === "left" || position === "right"
            ? { width }
            : { height };

    return (
        <>
            {/* Overlay */}
            {showOverlay && (
                <div
                    className={cn(
                        "fixed inset-0 z-40 bg-black/30 backdrop-blur-xs transition-opacity duration-300",
                        isVisible ? "opacity-100" : "opacity-0"
                    )}
                    onClick={closeOnOverlayClick ? onClose : undefined}
                />
            )}

            {/* Drawer */}
            <aside
                style={size}
                className={cn(baseDrawer, "flex flex-col", positions[position], className)}
            >
                {/* Botón cerrar */}

                {/* HEADER */}
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



                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto px-4 scrollsidebar">
                    {children}
                </div>

            </aside>
        </>
    );
}
