import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, createStorage } from "./storage";

interface AppState {
  password: string;
  setPassword: (password: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        password: "",
        setPassword: (password) => {
          set((state) => {
            state.password = password;
          });
        },
      })),
      {
        name: "app",
        storage: createJSONStorage(() => createStorage()),
      },
    ),
  ),
);
