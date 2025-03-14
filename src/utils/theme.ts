// Theme configuration for the application
// This file centralizes color definitions and other theme variables

export const theme = {
  colors: {
    primary: {
      50: "#e6f1fe",
      100: "#cce3fd",
      200: "#99c7fb",
      300: "#66aaf9",
      400: "#338ef7",
      500: "#0072f5", // Main primary color
      600: "#005bc4",
      700: "#004493",
      800: "#002e62",
      900: "#001731",
    },
    secondary: {
      50: "#f2f2f2",
      100: "#e6e6e6",
      200: "#cccccc",
      300: "#b3b3b3",
      400: "#999999",
      500: "#808080", // Main secondary color
      600: "#666666",
      700: "#4d4d4d",
      800: "#333333",
      900: "#1a1a1a",
    },
    success: {
      500: "#17c964",
    },
    warning: {
      500: "#f5a524",
    },
    error: {
      500: "#f31260",
    },
    // Add more color definitions as needed
  },

  // Font sizes can also be defined here if needed
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  // Spacing, breakpoints, etc. can also be defined here
};

// Utility function to access theme values in components
export const getThemeValue = (path: string): unknown => {
  const keys = path.split(".");
  return keys.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined;
  }, theme as any);
};

// Export tailwind class generator functions
export const tw = {
  // Generate text color classes
  text: (color: string) => `text-${color}`,
  bg: (color: string) => `bg-${color}`,
  border: (color: string) => `border-${color}`,
  // Add more utility functions as needed
};

// Add theme mode functionality
export type ThemeMode = "light" | "dark";

// Function to get system preference
export const getSystemThemePreference = (): ThemeMode => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // Default to light if not in browser
};

// Function to toggle theme
export const toggleTheme = (currentTheme: ThemeMode): ThemeMode => {
  return currentTheme === "light" ? "dark" : "light";
};

// Function to apply theme to document
export const applyTheme = (mode: ThemeMode): void => {
  if (typeof document !== "undefined") {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store user preference
    localStorage.setItem("theme", mode);
  }
};

// Function to initialize theme based on stored preference or system preference
export const initializeTheme = (): ThemeMode => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const systemPreference = getSystemThemePreference();

    const theme = storedTheme || systemPreference;
    applyTheme(theme);
    return theme;
  }
  return "light";
};
