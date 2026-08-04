import { create } from "zustand";

interface FooterState {
    footerData: any;
    setFooterData: (data: any) => void;
}

export const useFooterStore = create<FooterState>((set) => ({
    footerData: null,
    setFooterData: (data: any) => set({ footerData: data }),
}));
