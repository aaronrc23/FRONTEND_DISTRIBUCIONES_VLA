import clsx from 'clsx';
import { useState } from 'react'
import HeaderSidebar from '../molecules/HeaderSidebar';
import useWindowSize from '../../../shared/hooks/useWindowSize';
import { menusid } from '../../utils/constants/MenuSidebar';
import { SidebarItem } from '../molecules/SidebarItem';
import { Power } from 'lucide-react';
import { Icon } from '@iconify-icon/react';
import { useAuthStoreSession } from '@/features/auth/store/useAuthStoreSession';
import { showConfirmation } from '@/shared/hooks/useSwalert';



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
                <div className={`bg-white/3 rounded-2xl p-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border border-sidebar  backdrop-blur-sm transition-all `}>
                    <div className="flex items-center gap-3">

                        {!isCollapsed && (
                            <div className="flex flex-col px-3">
                                <span className="text-sm font-semibold text-white tracking-tight">Aaron M.</span>
                                <span className="text-xs text-slate-400">
                                    Admin
                                </span>
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button
                            className="text-sidebar-foreground pr-2 cursor-pointer hover:text-white transition"
                            onClick={handleClose}
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
