
import { Icon } from '@iconify-icon/react';
import { useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../../core/components/organisms/Sidebar';
import { Avatar, AvatarImage, AvatarFallback, Button } from '../../ui';
import { ModeToggle } from '../../themes/mode-toggle';
import { usePerfilName } from '../../../features/administracion/common/hooks/useCrudPerfil';

export default function PlantPanel() {
    const [open, setOpen] = useState(false)
    const { data: profile } = usePerfilName();
    const navigate = useNavigate();

    return (
        <div className="h-full bg-background text-foreground flex">
            <Sidebar open={open} onClose={() => setOpen(false)} />


            {/* Main */}
            <div className="flex-1 flex flex-col ">
                {/* Topbar */}
                <header className="h-16 bg-white dark:bg-background border-b border-slate-200  dark:border-border flex items-center justify-between px-4 sm:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => setOpen(!open)}
                            size={'icon'}

                            className="lg:hidden p-2 border-none shadow-none bg-transparent hover:bg-transparent"
                        >
                            <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
                        </Button>

                    </div>

                    <div className="flex justify-center items-center  gap-3">
                        <ModeToggle />
                        <Button className="flex items-center gap-3  rounded-xl p-2 cursor-pointer" size={"icon"}>

                            <Icon icon="ion:notifications-outline"  className="text-2xl text-secondary-foreground"/>
                        </Button>


                        <div className="h-8 w-px bg-border"></div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/panel/perfil')}
                                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                                title="Ir a Mi Perfil"
                            >
                                <Avatar size="sm" className="ring-2 ring-blue-500/20">
                                    <AvatarImage
                                        src={profile.avatar || undefined}
                                        alt="avatar"
                                    />
                                    <AvatarFallback size="sm">
                                        {profile.name?.charAt(0)?.toUpperCase() || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-foreground leading-tight">
                                        {profile.name || 'Usuario'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Administrador</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>
                {/* Content */}
                <main className="  h-[calc(100vh-60px)] overflow-auto p-2  py-8 ">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

