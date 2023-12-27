import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IndexedDBStorage } from "./storage";

interface SettingsState {
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: (open: boolean) => void;
  wideScreenMode: boolean;
  setWideScreenMode: (mode: boolean) => void;
  swapEnter: boolean;
  setSwapEnter: (value: boolean) => void;
  useSimpleInput: boolean;
  setUseSimpleInput: (value: boolean) => void;
  reset: () => void;
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
        swapEnter: false,
        setSwapEnter: (value) => {
          set((state) => {
            state.swapEnter = value;
          });
        },
        useSimpleInput: true,
        setUseSimpleInput: (value) => {
          set((state) => {
            state.useSimpleInput = value;
          });
        },
        reset: () => {
          set((state) => {
            state.swapEnter = false;
            state.useSimpleInput = true;
          });
        },
      })),
      {
        name: "settings",
        storage: createJSONStorage(() => IndexedDBStorage),
        // Omit key from state
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["settingsPanelOpen"].includes(key))),
      },
    ),
  ),
);
