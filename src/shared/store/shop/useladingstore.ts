import { create } from 'zustand';

interface UIStore {
    showBanner: boolean;
    bannerHeight: number;
    hideBanner: () => void;
    setBannerHeight: (height: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    showBanner: true,
    bannerHeight: 40, // valor inicial (puedes medirlo luego)
    hideBanner: () => set({ showBanner: false, bannerHeight: 0 }),
    setBannerHeight: (height) => set({ bannerHeight: height }),
}));