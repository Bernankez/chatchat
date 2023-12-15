import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface SettingsState {
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: (open: boolean) => void;
  wideScreenMode: boolean;
  setWideScreenMode: (mode: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      immer((set) => ({
        settingsPanelOpen: false,
        setSettingsPanelOpen: (open) => {
          set((state) => {
            state.settingsPanelOpen = open;
          });
        },
        wideScreenMode: false,
        setWideScreenMode: (mode) => {
          set((state) => {
            state.wideScreenMode = mode;
          });
        },
      })),
      {
        name: "settings",
        storage: createJSONStorage(() => localStorage),
        // Omit key from state
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["settingsPanelOpen"].includes(key))),
      },
    ),
  ),
);
