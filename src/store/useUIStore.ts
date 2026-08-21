import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isDarkMode: boolean;
  searchQuery: string;
  toggleDarkMode: () => void;
  setSearchQuery: (searchQuery: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      searchQuery: "",
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    }),
    {
      name: "campus-ui",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    },
  ),
);
