import { create } from "zustand";
interface CatState {
    info: any;
    setInfo: (info: any) => void;
}
export const useCatStore = create<CatState>((set) => ({
    info: null,
    setInfo: (info: any) => set({ info }),
}));