import { create } from "zustand";

interface BannerState {
    info: any;
    setInfo: (info: any) => void;
}

export const useBannerStore = create<BannerState>((set) => ({
    info: null,
    setInfo: (info: any) => set({ info }),
}));
