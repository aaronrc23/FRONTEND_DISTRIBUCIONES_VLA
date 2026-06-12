import { Icon } from "@iconify-icon/react";
import { Button, Texto } from "../../../shared/ui";

interface Props {
    collapsed: boolean;
    isCollapsed: boolean;
    setCollapsed: (value: boolean) => void;
    nameempresa: string;
}

export default function HeaderSidebar({
    isCollapsed,
    setCollapsed,
    nameempresa,
    collapsed,
}: Props) {
    return (
        <div className="relative flex items-center justify-between px-4 py-6 border-b border-sidebar-border/20 bg-gradient-to-b from-sidebar/80 to-sidebar-500/40">

            {/* LOGO + NOMBRE */}
            {!isCollapsed && (
                <div className="flex items-center gap-3">

                    {/* Icono decorativo */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-sidebar-primary/20 border border-sidebar-primary/30 shadow-sm shrink-0">
                        <Icon
                            icon="solar:shop-2-bold"
                            className="text-lg text-sidebar-primary"
                        />
                    </div>

                    {/* Nombre empresa */}
                    <div className="flex flex-col leading-tight">
                        <Texto
                            weight="bold"
                            className="text-sidebar-foreground text-base tracking-wide"
                        >
                            {nameempresa ?? "Distribucciones VLA"}
                        </Texto>

                        {/* Subtexto */}
                        <span className="text-xs text-sidebar-accent-foreground/60 tracking-wide uppercase">
                            Panel de control
                        </span>
                    </div>
                </div>
            )}

            {/* BOTÓN COLAPSAR */}
            <Button
                onClick={() => setCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl absolute -right-4 top-6 
            bg-indigo-500 hover:bg-indigo-600 border-none shadow-indigo-500/50 drop-shadow-2xl transition-all duration-300 shadow-lg  cursor-pointer group"
            >
                <Icon
                    icon={collapsed ? "solar:arrow-right-linear" : "solar:arrow-left-linear"}
                    className="text-white group-hover:text-white text-xl  transition-colors duration-300"
                />
            </Button>
        </div>
    );
}