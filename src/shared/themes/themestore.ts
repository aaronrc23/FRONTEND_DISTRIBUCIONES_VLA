import { create } from "zustand";

interface ThemeState {
    theme: "light" | "dark";
    toggleTheme: () => void;
}
const getInitialTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
};


const useThemeStore = create<ThemeState>((set) => ({
    theme: getInitialTheme(),
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }),
}));

export default useThemeStore;