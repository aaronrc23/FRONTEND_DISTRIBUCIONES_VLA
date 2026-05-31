import { create } from "zustand";

export interface ProfileData {
    name: string;
    apellidos: string;
    email: string;
    phone: string;
    avatar: string;
    rol: string;
}

interface PerfilStore {
    profile: ProfileData;
    setProfile: (data: Partial<ProfileData>) => void;
    hydrate: () => void;
}

const PROFILE_KEY = "profile_data";

const defaultProfile: ProfileData = {
    name: "Aaron",
    apellidos: "M.",
    email: "aaron@vla.com",
    phone: "999 999 999",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    rol: "Administrador",
};

function loadFromStorage(): ProfileData {
    try {
        const stored = localStorage.getItem(PROFILE_KEY);
        if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return defaultProfile;
}

function saveToStorage(profile: ProfileData) {
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch { /* ignore */ }
}

export const usePerfilStore = create<PerfilStore>((set, get) => ({
    profile: loadFromStorage(),
    setProfile: (data) => {
        const updated = { ...get().profile, ...data };
        saveToStorage(updated);
        set({ profile: updated });
    },
    hydrate: () => {
        set({ profile: loadFromStorage() });
    },
}));
