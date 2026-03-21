import { create } from "zustand";
interface SessionState {
    sesionexpired: boolean;
    setSesionexp: (value: boolean) => void;
}
export const useSessionStore = create<SessionState>((set) => ({
    sesionexpired: false,
    setSesionexp: (value) => set({ sesionexpired: value }),
}));