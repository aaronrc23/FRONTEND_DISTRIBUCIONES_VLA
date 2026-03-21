import Cookies from "js-cookie";
import { create } from "zustand";
interface AuthStoreSession {
    isAuth: boolean;
    hydrate: () => void;
    login: (token: string) => void;
    logout: () => void;
}
export const useAuthStoreSession = create<AuthStoreSession>((set) => ({
    isAuth: !!Cookies.get("tokenp"),
    hydrate: () => {
        set({ isAuth: !!Cookies.get("tokenp") });
    },
    login: (token: string) => {
        Cookies.set("tokenp", token);
        set({ isAuth: true });
    },
    logout: () => {
        Cookies.remove("tokenp");
        set({ isAuth: false });
    }

}));
