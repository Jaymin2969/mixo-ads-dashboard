'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        setMounted(true);

        // Get saved theme or system preference
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        let initialTheme: Theme = 'light';

        if (savedTheme === 'dark' || savedTheme === 'light') {
            initialTheme = savedTheme;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialTheme = 'dark';
        }

        setTheme(initialTheme);

        // Apply theme to document immediately
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Update document and localStorage when theme changes
    useEffect(() => {
        if (!mounted) return;

        // Update localStorage
        localStorage.setItem('theme', theme);

        // Update document class
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            // Immediately update DOM for instant feedback
            const root = document.documentElement;
            if (newTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            return newTheme;
        });
    };

    // Always provide the context
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

