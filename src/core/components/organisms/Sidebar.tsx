import clsx from 'clsx';
import { useState } from 'react'
import HeaderSidebar from '../molecules/HeaderSidebar';
import useWindowSize from '../../../shared/hooks/useWindowSize';
import { menusid } from '../../utils/constants/MenuSidebar';
import { SidebarItem } from '../molecules/SidebarItem';
import { Power } from 'lucide-react';



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
    return (
        <div> <aside
            className={clsx(
                "z-40 top-0 left-0 h-screen flex flex-col",
                "bg-linear-to-bl from-sidebar to-sidebar-500 border-r border-border shadow-2xl",
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


            <div className="p-4">
                <div className={`bg-slate-700/40 rounded-lg p-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border border-white/5 backdrop-blur-sm transition-all hover:bg-slate-700/60`}>
                    <div className="flex items-center gap-3">
                        
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white tracking-tight">Aaron M.</span>
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button className="w-9 h-9 flex items-center justify-center text-white bg-rose-500  cursor-pointer rounded-xl transition-all">
                            <Power size={18} />
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
