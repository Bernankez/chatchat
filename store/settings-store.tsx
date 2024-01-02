import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "./storage";
import { Model } from "@/lib/types";

interface SettingsState {
  /** ------ Interface Settings ------ */
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: (open: boolean) => void;
  wideScreenMode: boolean;
  setWideScreenMode: (mode: boolean) => void;
  swapEnter: boolean;
  setSwapEnter: (value: boolean) => void;
  useSimpleInput: boolean;
  setUseSimpleInput: (value: boolean) => void;
  useClearButton: boolean;
  setUseClearButton: (value: boolean) => void;
  resetInterfaceSettings: () => void;
  /** ------ OpenAI API Settings ------ */
  defaultTemperature: number;
  setDefaultTemperature: (value: number) => void;
  defaultModel: Model;
  setDefaultModel: (value: Model) => void;
  /** Use stream for response */
  useStream: boolean;
  setUseStream: (value: boolean) => void;
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
        useClearButton: false,
        setUseClearButton(value) {
          set((state) => {
            state.useClearButton = value;
          });
        },
        resetInterfaceSettings: () => {
          set((state) => {
            state.swapEnter = false;
            state.useSimpleInput = true;
            state.useClearButton = false;
          });
        },
        defaultTemperature: 0.6,
        setDefaultTemperature: (value) => {
          set((state) => {
            state.defaultTemperature = value;
          });
        },
        defaultModel: "gpt-4-1106-preview",
        setDefaultModel: (value) => {
          set((state) => {
            state.defaultModel = value;
          });
        },
        useStream: true,
        setUseStream: (value) => {
          set((state) => {
            state.useStream = value;
          });
        },
      })),
      {
        name: "settings",
        storage: createStorage(),
        // Omit key from state
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["settingsPanelOpen"].includes(key))),
      },
    ),
  ),
);
