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
        <div className="relative flex items-center justify-between px-4 py-6 border-b border-white/5 bg-gradient-to-b from-sidebar/80 to-sidebar-500/40 backdrop-blur-md">

            {/* LOGO + NOMBRE */}
            {!isCollapsed && (
                <div className="flex items-center gap-3">

                    {/* Icono con fondo */}
                    {/* <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-emerald-500/20 shadow-inner shadow-emerald-900/30">
                        <Icon
                            icon="solar:shop-2-bold"
                            className="text-xl text-emerald-400"
                        />
                    </div> */}

                    {/* Nombre empresa */}
                    <div className="flex flex-col leading-tight">
                        <Texto
                            weight="bold"
                            className="text-white text-base tracking-wide"
                        >
                            {nameempresa ?? "Distribucciones VLA"}
                        </Texto>

                        {/* Subtexto */}
                        <span className="text-sm text-sidebar-foreground">
                            Panel de control
                        </span>
                    </div>
                </div>
            )}

            {/* BOTÓN COLAPSAR */}
            <Button
                onClick={() => setCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl absolute -right-4 top-6 
        bg-emerald-500  transition-all duration-300 shadow-lg border-1 border-white/20 cursor-pointer"
            >
                <Icon
                    icon={
                        collapsed
                            ? "solar:arrow-right-linear"
                            : "solar:arrow-left-linear"
                    }
                    className="text-lg text-white"
                />
            </Button>
        </div>
    );
}