
import { Icon } from '@iconify-icon/react';
import { useState } from 'react'

import { Outlet } from 'react-router-dom';
import Sidebar from '../../../core/components/organisms/Sidebar';
import { Button } from '../../ui';
import { ModeToggle } from '../../themes/mode-toggle';

export default function PlantPanel() {
    const [open, setOpen] = useState(false)


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


                        <div className="h-8 w-[1px] bg-border"></div>
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/40"
                                className="w-9 h-9 rounded-full"
                            />
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

