import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import { type ReactNode, useEffect } from "react";
import DrTitle from "../components/atoms/DrTitle";

interface ShopDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    width?: number;
    subtitle?: string
    icon?: string
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
        <AnimatePresence mode="wait">
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: width }}
                        animate={{ x: 0 }}
                        exit={{ x: width }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 280,
                        }}
                        style={{ width }}
                        className="fixed right-0 top-0 z-50 h-screen bg-modal shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between ">
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

                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}