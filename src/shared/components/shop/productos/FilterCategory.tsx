"use client";

import { Texto } from "../../../ui";
import { Check } from "lucide-react"; // Opcional: recomiendo usar un icon library para un check más fino

interface Props {
    categorias?: any[];
    categoriaId?: string;
    setCategoriaId: (id?: string) => void;
    loading?: boolean;
    marcas?: any[];
    marcaId?: string;
    setMarcaId: (id?: string) => void;
}

export default function FilterCategory({
    categorias,
    categoriaId,
    setCategoriaId,
    loading,
    marcas,
    marcaId,
    setMarcaId,
}: Props) {
    return (
        <aside className="w-full md:w-72 shrink-0 hidden lg:block">
            <div className="bg-shopcard p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Texto className="font-bold text-lg text-slate-800">Filtros</Texto>
                    <button
                        type="button"
                        aria-label="limpiar"
                        onClick={() => setCategoriaId(undefined)}
                        className="text-[11px] uppercase tracking-wider font-bold bg-shoprimary/15 px-3 py-1 rounded-md text-shoprimary transition-colors cursor-pointer"
                    >
                        Limpiar
                    </button>
                </div>

                {/* Sub header con contador estilo badge */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <Texto className="font-semibold text-sm text-slate-600 uppercase tracking-tight">
                        Categorías
                    </Texto>
                    <span className="bg-muted text-muted-foreground text-sm font-bold px-2 py-0.5 rounded-sm">
                        {categorias?.length ?? 0}
                    </span>
                </div>


                {loading && (
                    <div className="flex items-center gap-2 py-2">
                        <div className="w-4 h-4 border-2 border-shopprimary/30 border-t-shopprimary rounded-full animate-spin" />
                        <p className="text-xs text-zinc-400 font-medium">Actualizando...</p>
                    </div>
                )}

                <div className="space-y-1 mt-2">
                    {/* Opción "Todos" */}
                    <div className="hidden">
                        <CategoryItem
                            label="Todas las categorías"
                            active={!categoriaId}
                            onClick={() => setCategoriaId(undefined)}
                        />
                    </div>


                    {/* Lista de Categorías */}
                    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {categorias?.map((cat: any) => (
                            <CategoryItem
                                key={cat.id}
                                label={cat.nombre}
                                active={categoriaId === String(cat.id)}
                                onClick={() => setCategoriaId(String(cat.id))}
                            />
                        ))}
                    </div>
                </div>



                {/* MARCAS */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <Texto className="font-semibold text-sm text-slate-600 uppercase tracking-tight">
                            Marcas
                        </Texto>

                        <span className="bg-muted text-muted-foreground text-sm font-bold px-2 py-0.5 rounded-sm">
                            {marcas?.length ?? 0}
                        </span>
                    </div>


                    <button
                        type="button"
                        onClick={() => setMarcaId(undefined)}
                        className="text-[11px] uppercase tracking-wider font-bold bg-shoprimary/15 px-3 py-1 rounded-md text-shoprimary transition-colors cursor-pointer"
                    >
                        Limpiar marcas
                    </button>

                    <div className="flex flex-wrap gap-2 mt-5 max-h-[180px] overflow-y-auto pr-1">
                        {marcas?.map((marca: any) => {
                            const active = marcaId === String(marca.id);

                            return (
                                <button
                                    key={marca.id}
                                    onClick={() => setMarcaId(String(marca.id))}
                                    className={`
                        px-3 py-1.5 rounded-full text-xs font-medium transition-all
                        border
                        ${active
                                            ? "bg-shoprimary text-white border-transparent shadow-sm"
                                            : "bg-white text-slate-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"}
                    `}
                                >
                                    {marca.nombre}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}

function CategoryItem({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <label
            className={`
                group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200
                ${active ? "bg-orange-50/60" : "hover:bg-gray-50"}
            `}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`
                        w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300
                        ${active
                            ? "bg-linear-to-br from-shoprimary to-shoprimary border-transparent shadow-sm shadow-orange-200 scale-110"
                            : "border-gray-300 bg-white group-hover:border-orange-300"}
                    `}
                >
                    {active && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                </div>

                <span className={`text-sm transition-colors duration-200 ${active ? "font-semibold text-shoprimary" : "text-slate-600 group-hover:text-slate-900"}`}>
                    {label}
                </span>
            </div>

            {/* Indicador sutil a la derecha */}
            {!active && (
                <div className="w-1 h-1 rounded-full bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </label>
    );
}