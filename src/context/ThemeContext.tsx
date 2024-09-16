"use client";
import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme?: string;
    changeTheme?: (nextTheme?: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        setIsMounted(true);
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
    }, []);

    if (!isMounted) {
        return <div></div>
    }

    const changeTheme = (event?: any) => {
        const nextTheme: string | null = event.target.value || null;
        if (nextTheme) {
            setTheme(nextTheme);
        } else {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}