import { create } from "zustand";
interface MarcasState {
    info: any;
    setInfo: (info: any) => void;
}
export const useMarcasStore = create<MarcasState>((set) => ({
    info: null,
    setInfo: (info: any) => set({ info }),
}));