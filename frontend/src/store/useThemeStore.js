import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("linguaLink-theme") || "luxury",
  setTheme: (theme) => {
    localStorage.setItem("linguaLink-theme", theme);
    set({ theme });
  },
}));