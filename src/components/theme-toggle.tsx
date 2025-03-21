"use client";

import { useTheme } from "@/app/hooks/use-theme";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, handleToggleTheme, mounted } = useTheme();
  const [isChanging, setIsChanging] = useState(false);
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const toggleWithAnimation = () => {
    setIsChanging(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleToggleTheme();
      setTimeout(() => {
        setIsChanging(false);
      }, 150);
    }, 150);
  };

  return mounted ? (
    <button
      onClick={toggleWithAnimation}
      className="mr-2 p-3 rounded-full bg-background-dark dark:bg-background-light text-foreground-dark dark:text-foreground-light shadow-lg hover:bg-secondary-dark dark:hover:bg-secondary-light transition-all duration-300"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div
        className={`transform transition-all duration-300 ${
          isChanging ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {theme === "light" ? (
          // Moon icon for dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          // Sun icon for light mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </div>
    </button>
  ) : null;
}
