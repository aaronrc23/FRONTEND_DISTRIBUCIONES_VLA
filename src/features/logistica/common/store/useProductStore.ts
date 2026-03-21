import { create } from "zustand";

interface ProductStore {
    data: any;
    setData: (data: any) => void;
}
export const useProductStore = create<ProductStore>((set) => ({
    data: null,
    setData: (data) => set({ data }),
}))