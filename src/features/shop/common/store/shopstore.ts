import { create } from "zustand";

export const useCategoriaStore = create<any>((set) => ({
    categoriaId: null,
    setCategoriaId: (categoriaId: any) => set({ categoriaId }),
    sort: "default",
    setSort: (sort: string) => set({ sort }),
    view: "grid",
    setView: (view: string) => set({ view }),

    marcaId : null,
    setMarcaId: (marcaId: any) => set({ marcaId }),

}));
