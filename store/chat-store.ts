import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { createJSONStorage, createStorage } from "./storage";
import { Conversation } from "@/lib/types";
import { useSettingsStore } from "./settings-store";
import { IdGenerator } from "@/lib/utils";

interface ChatState {
  conversation: Conversation;
  setConversation: (conversation: Conversation) => void;
  history: Map<string, Conversation>;
  addHistory: () => void;
}

export function createConversation(id?: string) {
  return {
    id: id || IdGenerator(),
    temperature: useSettingsStore.getState().defaultTemperature,
    messages: [],
  };
}

enableMapSet();
export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      immer((set, get) => ({
        conversation: createConversation(),
        setConversation: (conversation) => {
          set((state) => {
            state.conversation = conversation;
          });
        },
        history: new Map(),
        addHistory: () => {
          const conversation = get().conversation;
          set((state) => {
            state.history.set(conversation.id, conversation);
          });
        },
        conversations: new Map(),
      })),
      {
        name: "chat",
        storage: createJSONStorage(() => createStorage()),
      },
    ),
  ),
);
