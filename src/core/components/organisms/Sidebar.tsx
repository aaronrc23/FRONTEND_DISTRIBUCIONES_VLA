import clsx from 'clsx';
import { useState } from 'react'
import HeaderSidebar from '../molecules/HeaderSidebar';
import useWindowSize from '../../../shared/hooks/useWindowSize';
import { menusid } from '../../utils/constants/MenuSidebar';
import { SidebarItem } from '../molecules/SidebarItem';

import { Icon } from '@iconify-icon/react';
import { useAuthStoreSession } from '@/features/auth/store/useAuthStoreSession';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui';
import { showConfirmation } from '@/shared/hooks/useSwalert';
import { usePerfilName } from '@/features/administracion/common/hooks/useCrudPerfil';


interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const nameempresa = import.meta.env.VITE_NAME_EMPRESA;
    const width = useWindowSize();
    const isMobile = width < 1024;
    const isCollapsed = !isMobile && collapsed;
    const { data: profile } = usePerfilName();
    const { logout } = useAuthStoreSession();
    const handleClose = async () => {
        const showConfirm = await showConfirmation("¿Cerrar sesión?", "¿Estás seguro de que deseas cerrar sesión?", "warning");
        if (showConfirm) {
            logout();
        }
    }
    return (
        <div> <aside
            className={clsx(
                "z-40 top-0 left-0 h-screen flex flex-col",
                "bg-linear-to-bl from-sidebar to-sidebar-500 border-r border-border shadow-xl",
                "transition-all duration-500 ease-in-out",

                // ancho base
                "w-72",

                // 🔥 comportamiento responsive
                "fixed lg:static",
                "lg:flex",

                // modal (< lg)
                open ? "translate-x-0" : "-translate-x-full",
                "lg:translate-x-0",

                // 🔥 collapse SOLO en lg
                isCollapsed && "lg:w-21"
            )}
        >


            {/* ===== HEADER ===== */}
            <HeaderSidebar
                isCollapsed={isCollapsed}
                setCollapsed={setCollapsed}
                nameempresa={nameempresa}
                collapsed={collapsed}
            />

            {/* ===== MAIN MENU ===== */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollsidebar">
                {menusid.map((item) => (
                    <SidebarItem
                        key={item.label}
                        item={item}
                        isCollapsed={isCollapsed}
                        isOpen={openMenu === item.label}
                        onToggle={(label) =>
                            setOpenMenu(openMenu === label ? null : label)
                        }
                    />
                ))}
            </nav>

            {/* ===== FOOTER ===== */}


            <div className="p-3">
                <div className={`bg-sidebar-accent/20 hover:bg-sidebar-accent/30 rounded-2xl p-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border border-sidebar-border/20 transition-all duration-300`}>
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <Avatar size="sm" className="ring-2 ring-sidebar-accent ring-offset-2 ring-offset-sidebar shrink-0">
                            <AvatarImage
                                src={profile.avatar || undefined}
                                alt="avatar"
                            />
                            <AvatarFallback size="sm" className="bg-blue-500/20 text-blue-300">
                                {profile.name?.charAt(0)?.toUpperCase() || "?"}
                            </AvatarFallback>
                        </Avatar>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
                                    {profile.name || 'Usuario'}
                                </span>
                                <span className="text-xs text-sidebar-accent-foreground/70">
                                    Administrador
                                </span>
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button
                            className="text-sidebar-accent-foreground/60 pr-2 cursor-pointer hover:text-sidebar-primary transition-all duration-200 hover:scale-110"
                            onClick={handleClose}
                            title="Cerrar sesión"
                        >
                            <Icon
                                icon="solar:logout-2-linear"
                                className="text-lg"
                            />
                        </button>
                    )}
                </div>
            </div>
        </aside>

            {/* Overlay mobile */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                />
            )}</div>
    )
}
