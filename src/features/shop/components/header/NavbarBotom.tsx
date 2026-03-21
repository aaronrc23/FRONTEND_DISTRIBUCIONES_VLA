import { LayoutGrid, ChevronDown } from "lucide-react"

const categories = [
    {
        id: 1,
        name: "Adhesivos y Cintas",
        subcategories: ["Masking Tape", "Duct Tape", "Cinta Embalaje"]
    },
    {
        id: 2,
        name: "Pinturas y Acabados",
        subcategories: ["Térmicas", "Adhesivas", "Industriales"]
    },
    {
        id: 3,
        name: "Herramientas Manuales",
        subcategories: ["Cajas", "Stretch Film", "Bolsas"]
    },
    {
        id: 4,
        name: "Seguridad Industrial",
        subcategories: ["Descuentos", "Liquidación"]
    }
]

export default function NavbarBottom() {
    return (
        <nav className="hidden md:block bg-white  dark:bg-zinc-800/60 py-0 backdrop-blur border-b border-slate-200 dark:border-zinc-800">

            <div className="container mx-auto px-4 flex items-center gap-6">

                {/* Botón Categorías */}
                <button className="flex items-center gap-2 py-3 px-4  bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow hover:scale-[1.02] transition">
                    <LayoutGrid size={16} />
                    Categorías
                </button>

                {/* Lista categorías */}
                <div className="flex items-center gap-6">
                    {categories.map(cat => (
                        <div key={cat.id} className="group relative">

                            {/* Botón */}
                            <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 transition py-3">
                                {cat.name}
                                <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition" />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute top-full left-0 w-56 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 rounded-xl shadow-xl z-50 overflow-hidden">

                                {cat.subcategories.map(sub => (
                                    <a
                                        key={sub}
                                        href="#"
                                        className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition"
                                    >
                                        {sub}
                                    </a>
                                ))}

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </nav>
    )
}