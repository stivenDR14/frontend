"use client";

import { ThemeMode } from "../models";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  // Inicializar tema basado en preferencia almacenada o sistema
  useEffect(() => {
    setMounted(true);
    const initialTheme = initializeTheme() as ThemeMode;
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  };

  const toggleTheme = (currentTheme: ThemeMode) => {
    return currentTheme === "light" ? "dark" : "light";
  };

  const applyTheme = (theme: ThemeMode) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.body.style.background = `linear-gradient(45deg, var(--background-light-medium) 30%, var(--background-light) 90%)`;
      document.body.style.backgroundSize = "400% 400%";
      document.body.style.animation = "wave 10s ease-in-out infinite";
    } else {
      document.body.style.background = `linear-gradient(45deg, var(--background-dark-medium) 30%, var(--background-dark) 90%)`;
      document.body.style.backgroundSize = "400% 400%";
      document.body.style.animation = "wave 10s ease-in-out infinite";
    }
  };

  return { theme, handleToggleTheme, mounted };
};
