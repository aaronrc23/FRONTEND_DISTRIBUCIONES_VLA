import { ModeToggle } from '../../../../shared/themes/mode-toggle'
import { Search, ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function HeaderStore() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handlehome = () => {
        navigate('/');
    }

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b py-2 border-slate-200 dark:bg-zinc-900/80 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-6">

                    {/* 🔷 Logo */}
                    <div className="flex-shrink-0 cursor-pointer group" onClick={() => handlehome()}>
                        <h1 className="text-2xl font-black tracking-tighter leading-none">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                DISTRIBUCIONES
                            </span>
                            <span className="text-zinc-400 mx-1 group-hover:opacity-70 transition">
                                _
                            </span>
                            <span className="text-zinc-900 dark:text-white group-hover:text-blue-600 transition">
                                VLA
                            </span>
                        </h1>

                        <div className="flex items-center gap-1 mt-1">
                            <div className="h-[2px] w-4 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                            <p className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                Suministros Industriales
                            </p>
                        </div>
                    </div>

                    {/* 🔍 Buscador */}
                    <div className="hidden md:flex flex-grow max-w-xl relative">
                        <input
                            type="text"
                            placeholder="¿Qué estás buscando hoy?"
                            className="w-full bg-slate-100/80 dark:bg-zinc-800/80 backdrop-blur border border-transparent focus:border-blue-500 rounded-xl py-2.5 px-5 pr-12 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-sm shadow-sm"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-600 transition-colors">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* ⚙️ Acciones */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        <ModeToggle />

                        {/* Carrito */}
                        <div className="relative p-2.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all hover:scale-105">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow">
                                0
                            </span>
                        </div>

                        {/* Mobile menu */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}