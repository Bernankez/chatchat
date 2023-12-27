import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IndexedDBStorage } from "./storage";

interface ChatState {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      immer((set) => ({
        prompt: "",
        setPrompt: (prompt) => {
          set((state) => {
            state.prompt = prompt;
          });
        },
      })),
      {
        name: "chat",
        storage: createJSONStorage(() => IndexedDBStorage),
      },
    ),
  ),
);
