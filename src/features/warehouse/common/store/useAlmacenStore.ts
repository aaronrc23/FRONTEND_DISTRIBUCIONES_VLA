import { create } from "zustand";
import type { Almacen } from "../validation/fr_val_almacen";

interface AlmacenState {
    data: Almacen | null;
    setData: (data: Almacen) => void;
}

export const useAlmacenStore = create<AlmacenState>((set) => ({
    data: null,
    setData: (data: Almacen) => set({ data }),
}));