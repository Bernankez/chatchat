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
  isSending: boolean;
  setIsSending: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function createConversation(id?: string) {
  return {
    id: id || IdGenerator(),
    model: useSettingsStore.getState().defaultModel,
    prompts: useSettingsStore.getState().defaultPrompts,
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
        isSending: false,
        setIsSending: (value) => {
          set((state) => {
            state.isSending = value;
          });
        },
        isEditing: false,
        setIsEditing: (value) => {
          set((state) => {
            state.isEditing = value;
          });
        },
      })),
      {
        name: "chat",
        storage: createJSONStorage(() => createStorage()),
        // Omit key from state
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["isSending", "isEditing"].includes(key))),
      },
    ),
  ),
);
