import { useRef, useEffect, useState, type ReactNode } from "react";
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

const TRANSITION_DURATION = 250;

export default function ShopDrawer({
    open,
    onClose,
    children,
    title = "",
    width = 420,
    subtitle = "",
    icon = "",
}: ShopDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Gestionar montaje/desmontaje con animación
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (open) {
            setMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });
        } else {
            setVisible(false);
            timerRef.current = setTimeout(() => {
                setMounted(false);
            }, TRANSITION_DURATION);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [open]);

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

    if (!mounted) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/30 backdrop-blur-sm
                    transition-opacity duration-[250ms] ease-out will-change-opacity
                    ${visible ? "opacity-100" : "opacity-0"}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                style={{ width }}
                className={`
                    fixed right-0 top-0 z-50 h-screen bg-modal shadow-2xl flex flex-col
                    transition-all duration-[250ms] ease-out will-change-transform
                    ${visible ? "translate-x-0" : "translate-x-full"}
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
        </>
    );
}