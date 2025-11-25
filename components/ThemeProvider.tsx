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

    // Initialize on mount
    useEffect(() => {
        setMounted(true);
        
        // Apply initial theme to document
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, []);

    // Update document and localStorage when theme changes
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        
        // Update localStorage
        localStorage.setItem('theme', theme);

        // Update document class
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
            
            // Update localStorage immediately
            localStorage.setItem('theme', newTheme);
            
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

