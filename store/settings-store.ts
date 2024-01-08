import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, createStorage } from "./storage";
import { ChatModel } from "@/lib/types";
import { modelList } from "@/lib/utils/const";

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
  useFloatingInput: boolean;
  setUseFloatingInput: (value: boolean) => void;
  useClearButton: boolean;
  setUseClearButton: (value: boolean) => void;
  resetInterfaceSettings: () => void;
  /** ------ OpenAI API Settings ------ */
  /** Use stream for response */
  useStream: boolean;
  setUseStream: (value: boolean) => void;
  /** ------ Default Settings ------ */
  defaultModel: ChatModel;
  setDefaultModel: (value: ChatModel) => void;
  defaultPrompts: string;
  setDefaultPrompts: (value: string) => void;
  defaultTemperature: number;
  setDefaultTemperature: (value: number) => void;
  resetDefaultSettings: () => void;
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
        useFloatingInput: false,
        setUseFloatingInput: (value) => {
          set((state) => {
            state.useFloatingInput = value;
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
        useStream: true,
        setUseStream: (value) => {
          set((state) => {
            state.useStream = value;
          });
        },
        defaultModel: modelList[0],
        setDefaultModel: (value) => {
          set((state) => {
            state.defaultModel = value;
          });
        },
        defaultPrompts: "",
        setDefaultPrompts: (value) => {
          set((state) => {
            state.defaultPrompts = value;
          });
        },
        defaultTemperature: 0.6,
        setDefaultTemperature: (value) => {
          set((state) => {
            state.defaultTemperature = value;
          });
        },
        resetDefaultSettings: () => {
          set((state) => {
            state.defaultModel = modelList[0];
            state.defaultPrompts = "";
            state.defaultTemperature = 0.6;
          });
        },
      })),
      {
        name: "settings",
        storage: createJSONStorage(() => createStorage()),
        // Omit key from state
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["settingsPanelOpen"].includes(key))),
      },
    ),
  ),
);
