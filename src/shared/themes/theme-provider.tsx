import React, { createContext, useContext, useLayoutEffect } from 'react';
import useThemeStore from './themestore';

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    defaultTheme: 'light' | 'dark';
    storageKey: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode, defaultTheme: 'light' | 'dark', storageKey: string }> = ({ children, defaultTheme, storageKey }) => {
    const { theme, toggleTheme } = useThemeStore();
    useLayoutEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, defaultTheme, storageKey }
        }>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe usarse dentro de un ThemeProvider');
    }
    return context;
};