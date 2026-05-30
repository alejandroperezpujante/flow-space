"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "system";

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStoredTheme(): Theme {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
            return stored;
        }
    } catch {
        // ignore
    }
    return DEFAULT_THEME;
}

function getSystemPreference(): "light" | "dark" {
    try {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    } catch {
        return "light";
    }
}

function applyTheme(resolved: "light" | "dark") {
    const root = document.documentElement;
    // Disable transitions momentarily to prevent flash
    root.classList.add("[&_*]:!transition-none");
    if (resolved === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
    root.style.colorScheme = resolved;
    // Re-enable transitions on next frame
    requestAnimationFrame(() => {
        root.classList.remove("[&_*]:!transition-none");
    });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    // Mount: read storage, resolve, apply
    useEffect(() => {
        const stored = getStoredTheme();
        setThemeState(stored);
        const resolved = stored === "system" ? getSystemPreference() : stored;
        setResolvedTheme(resolved);
        applyTheme(resolved);
    }, []);

    // Subscribe to system preference changes when theme === "system"
    useEffect(() => {
        if (theme !== "system") return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            const resolved = e.matches ? "dark" : "light";
            setResolvedTheme(resolved);
            applyTheme(resolved);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    const setTheme = useCallback((next: Theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
        setThemeState(next);
        const resolved = next === "system" ? getSystemPreference() : next;
        setResolvedTheme(resolved);
        applyTheme(resolved);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}
