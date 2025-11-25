'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'light';

        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    const [mounted, setMounted] = useState(false);

    // Initialize on mount and sync with DOM
    useEffect(() => {
        setMounted(true);

        const root = document.documentElement;
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        // Sync with what's actually in the DOM (from ThemeScript)
        const hasDarkClass = root.classList.contains('dark');

        if (savedTheme) {
            // Use saved theme
            if (savedTheme === 'dark') {
                root.classList.add('dark');
                if (theme !== 'dark') setTheme('dark');
            } else {
                root.classList.remove('dark');
                if (theme !== 'light') setTheme('light');
            }
        } else if (hasDarkClass && theme === 'light') {
            // DOM has dark but state is light - sync state
            setTheme('dark');
        } else if (!hasDarkClass && theme === 'dark') {
            // DOM doesn't have dark but state is dark - sync DOM
            root.classList.add('dark');
        } else {
            // Apply current theme
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, []);

    // Update document and localStorage when theme changes
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Update localStorage
        localStorage.setItem('theme', theme);

        // Update document class - Tailwind only uses 'dark' class
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        const currentTheme = theme;
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
        const root = document.documentElement;

        // Immediately update DOM for instant feedback
        // Tailwind only uses 'dark' class - if not present, it's light mode
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Update localStorage immediately
        localStorage.setItem('theme', newTheme);

        // Update state
        setTheme(newTheme);
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

