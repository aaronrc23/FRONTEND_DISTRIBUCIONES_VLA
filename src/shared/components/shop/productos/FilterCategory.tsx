"use client";

import { useEffect, useState } from "react";
import { Texto, Modal } from "../../../ui";
import { Check, ChevronDown, ChevronRight, SlidersHorizontal, X, Filter } from "lucide-react";

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
    const [expandedParents, setExpandedParents] = useState<Set<number>>(new Set());
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Auto-expandir el padre cuando se selecciona una subcategoría
    useEffect(() => {
        if (!categoriaId || !categorias) return;
        const cat = categorias.find((c: any) => String(c.id) === categoriaId || c.slug === categoriaId);
        if (cat && cat.parent_id && cat.level === "subcategoria") {
            setExpandedParents((prev) => {
                const next = new Set(prev);
                next.add(Number(cat.parent_id));
                return next;
            });
        }
    }, [categoriaId, categorias]);

    const parentCategories = (categorias ?? []).filter(
        (cat: any) => cat.level === "categoria"
    );
    const subCategories = (categorias ?? []).filter(
        (cat: any) => cat.level === "subcategoria" && cat.parent_id
    );

    const childrenByParent: Record<number, any[]> = {};
    for (const sub of subCategories) {
        const pid = Number(sub.parent_id);
        if (!childrenByParent[pid]) childrenByParent[pid] = [];
        childrenByParent[pid].push(sub);
    }

    const toggleParent = (parentId: number) => {
        setExpandedParents((prev) => {
            const next = new Set(prev);
            if (next.has(parentId)) {
                next.delete(parentId);
            } else {
                next.add(parentId);
            }
            return next;
        });
    };

    const isSubSelected = (subId: number) => {
        return categoriaId === String(subId) || categorias?.some(
            (c: any) => c.slug === categoriaId && String(c.id) === String(subId)
        );
    };

    const isParentSelected = (parentId: number) => {
        if (categoriaId === String(parentId)) return true;
        const children = childrenByParent[parentId] || [];
        return children.some((child: any) => String(child.id) === categoriaId || child.slug === categoriaId);
    };

    const activeFiltersCount = (categoriaId ? 1 : 0) + (marcaId ? 1 : 0);

    // ─── Shared filter UI ────────────────────────────────────────
    const renderFilterContent = (isMobile: boolean) => (
        <div className={isMobile ? "pb-6" : ""}>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-shoprimary" />
                    <Texto className="font-bold text-lg text-foreground/90">Filtros</Texto>
                </div>
                <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                        <span className="text-[10px] font-bold bg-shoprimary/10 text-shoprimary px-2 py-0.5 rounded-full">
                            {activeFiltersCount} activo{activeFiltersCount !== 1 ? "s" : ""}
                        </span>
                    )}
                    <button
                        type="button"
                        aria-label="limpiar filtros"
                        onClick={() => {
                            setCategoriaId(undefined);
                            setMarcaId(undefined);
                        }}
                        className="text-[11px] uppercase tracking-wider font-bold bg-shoprimary/15 px-3 py-1 rounded-md text-shoprimary transition-colors cursor-pointer hover:bg-shoprimary/25 active:scale-95"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {/* ── CATEGORÍAS ── */}
            <div className="mb-1 px-1">
                <div className="flex items-center justify-between mb-3">
                    <Texto className="font-semibold text-sm text-accent-foreground uppercase tracking-tight flex items-center gap-1.5">
                        Categorías
                    </Texto>
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-sm">
                        {parentCategories.length}
                    </span>
                </div>

                {loading && (
                    <div className="flex items-center gap-2 py-3">
                        <div className="w-4 h-4 border-2 border-shoprimary/30 border-t-shoprimary rounded-full animate-spin" />
                        <p className="text-xs text-accent-foreground font-medium">Actualizando...</p>
                    </div>
                )}

                <div className="space-y-1 mt-2  overflow-y-auto pr-1 custom-scrollbar">
                    {parentCategories.map((parent: any) => {
                        const children = childrenByParent[parent.id] || [];
                        const isExpanded = expandedParents.has(parent.id);
                        const isActive = isParentSelected(parent.id);
                        const hasChildren = children.length > 0;

                        return (
                            <div key={parent.id} className="mb-0.5">
                                {/* Parent row */}
                                <div
                                    className={[
                                        "group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200",
                                        isActive ? "bg-shoprimary/20 text-white" : "hover:bg-white/5 hover:text-white"
                                    ].join(" ")}
                                >
                                    <div
                                        className="flex items-center gap-3 flex-1 min-w-0"
                                        onClick={() => {
                                            if (isActive && children.every((c: any) => !isSubSelected(c.id))) {
                                                setCategoriaId(undefined);
                                            } else {
                                                setCategoriaId(String(parent.id));
                                            }
                                        }}
                                    >
                                        <div
                                            className={[
                                                "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 shrink-0",
                                                isActive
                                                    ? "bg-linear-to-br from-shoprimary to-shoprimary2 border-transparent shadow-sm  scale-110"
                                                    : "border-border bg-white/8 group-hover:border-orange-300"
                                            ].join(" ")}
                                        >
                                            {isActive && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                                        </div>

                                        <span className={["text-sm transition-colors duration-200 truncate", isActive ? "font-semibold text-shoprimary" : "text-foreground/90 group-hover:text-foreground"].join(" ")}>
                                            {parent.nombre}
                                        </span>

                                        {hasChildren && (
                                            <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full shrink-0">
                                                {children.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* Expand/collapse */}
                                    {hasChildren && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleParent(parent.id);
                                            }}
                                            className="p-1 rounded-md hover:bg-gray-200/50 transition-colors shrink-0 ml-1 active:scale-90"
                                            aria-label={isExpanded ? "Colapsar" : "Expandir"}
                                        >
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-slate-400" />
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Subcategories */}
                                {hasChildren && isExpanded && (
                                    <div className="ml-7 mt-0.5 space-y-0.5 border-l-2 border-orange-100 pl-3">
                                        {children.map((child: any) => {
                                            const childActive = isSubSelected(child.id);
                                            return (
                                                <div
                                                    key={child.id}
                                                    className={[
                                                        "group flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200",
                                                        childActive ? "bg-orange-50/40" : "hover:bg-gray-50/60"
                                                    ].join(" ")}
                                                    onClick={() => {
                                                        if (childActive) {
                                                            setCategoriaId(String(parent.id));
                                                        } else {
                                                            setCategoriaId(String(child.id));
                                                        }
                                                    }}
                                                >
                                                    <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                                    <span className={["text-xs transition-colors duration-200", childActive ? "font-semibold text-shoprimary" : "text-slate-500 group-hover:text-slate-700"].join(" ")}>
                                                        {child.nombre}
                                                    </span>
                                                    {childActive && (
                                                        <Check className="w-3 h-3 text-shoprimary ml-auto shrink-0" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {parentCategories.length === 0 && !loading && (
                        <p className="text-xs text-slate-400 text-center py-4">
                            No hay categorías disponibles
                        </p>
                    )}
                </div>
            </div>

            {/* ── MARCAS ── */}
            <div className="mt-6 px-1">
                <div className="flex items-center justify-between mb-3">
                    <Texto className="font-semibold text-sm text-slate-600 uppercase tracking-tight flex items-center gap-1.5">
                        Marcas
                    </Texto>
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-sm">
                        {marcas?.length ?? 0}
                    </span>
                </div>

                {marcaId && (
                    <button
                        type="button"
                        onClick={() => {
                            setMarcaId(undefined);
                            if (isMobile) setMobileFilterOpen(false);
                        }}
                        className="text-[11px] uppercase tracking-wider font-bold bg-shoprimary/15 px-3 py-1 rounded-md text-shoprimary transition-colors cursor-pointer hover:bg-shoprimary/25 active:scale-95 mb-3"
                    >
                        Limpiar marcas
                    </button>
                )}

                <div className={[
                    "flex flex-wrap gap-2",
                    isMobile ? "overflow-y-auto pr-1" : " overflow-y-auto pr-1"
                ].join(" ")}>
                    {marcas?.map((marca: any) => {
                        const active = marcaId === String(marca.id);

                        return (
                            <button
                                key={marca.id}
                                onClick={() => {
                                    setMarcaId(String(marca.id));
                                    if (isMobile) setMobileFilterOpen(false);
                                }}
                                className={[
                                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border active:scale-95",
                                    active
                                        ? "bg-shoprimary text-white border-transparent shadow-sm shadow-orange-200"
                                        : "bg-white text-slate-600 border-gray-200 hover:border-orange-300 hover:text-orange-500 hover:shadow-sm"
                                ].join(" ")}
                            >
                                {marca.nombre}
                            </button>
                        );
                    })}

                    {(!marcas || marcas.length === 0) && (
                        <p className="text-xs text-slate-400 text-center py-4 w-full">
                            No hay marcas disponibles
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* ─── Desktop Sidebar ───────────────────────────── */}
            <aside className="w-full md:w-72 shrink-0 hidden lg:block">
                <div className="bg-shopcard p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-shopborder/50">
                    {renderFilterContent(false)}
                </div>
            </aside>

            {/* ─── Mobile Filter FAB ────────────────────────── */}
            <div className="group fixed bottom-6 left-6 z-40 lg:hidden">
                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-black/10 whitespace-nowrap transition-all duration-300 ease-out opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
                    <div className="absolute -bottom-1.5 left-7 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 shadow-sm" />
                    <div className="relative flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-shoprimary" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Filtrar productos
                        </span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-shoprimary/15 text-shoprimary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Pulse rings when filters active */}
                {activeFiltersCount > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-shoprimary/20 animate-[whatsapp-wave_2.5s_ease-out_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-shoprimary/15 animate-[whatsapp-wave_2.5s_ease-out_infinite_0.8s]" />
                    </div>
                )}

                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-shoprimary to-shoprimary2 text-white shadow-lg hover:shadow-xl hover:shadow-orange-400/30 hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer"
                    aria-label="Abrir filtros"
                >
                    <Filter className="w-6 h-6" />

                    {/* Badge de filtros activos */}
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-shoprimary text-[10px] font-extrabold flex items-center justify-center shadow-sm border-2 border-shoprimary">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {/* ─── Mobile Filter Drawer ─────────────────────── */}
            <Modal
                isOpen={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
                position="bottom"
                mobileAsDrawer={true}
                title=""
                showCloseButton={false}
                className="max-sm:max-h-[88vh] max-sm:rounded-t-[2rem] py-4"
            >
                {/* Drag handle */}
               
                {/* Close button */}
                <div className="flex items-center relative justify-end mb-4">
                  
                    <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-2 rounded-xl absolute -top-7 right-2 bg-gray-100 hover:bg-gray-200 transition-colors active:scale-90 cursor-pointer"
                        aria-label="Cerrar filtros"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {renderFilterContent(true)}
            </Modal>
        </>
    );
}
