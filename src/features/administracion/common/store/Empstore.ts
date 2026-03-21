import { create } from "zustand";
interface EmpStore {
    data: any[];
    setData: (data: any[]) => void;
}
export const useEmpStore = create<EmpStore>((set) => ({
    data: [],
    setData: (data) => set({ data })
}))


interface SeriesStore {
    data: any[];
    setData: (data: any[]) => void;
}
export const useSeriesStore = create<SeriesStore>((set) => ({
    data: [],
    setData: (data) => set({ data })
}))