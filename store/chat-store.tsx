import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "./storage";
import { Conversation } from "@/lib/types";
import { useSettingsStore } from "./settings-store";

interface ChatState {
  conversations: Record<string, Conversation>;
  getConversation: (id: string) => Conversation | undefined;
  updateConversation: (id: string, conversation: Conversation) => void;
  addConversation: (id: string) => Conversation;
  currentConversationId?: string;
  setCurrentConversationId: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      immer((set, get) => ({
        conversations: {},
        c: () => get().conversations,
        getConversation: (id) => get().conversations[id],
        updateConversation: (id, conversation) => {
          set((state) => {
            updateConversation(state, id, conversation);
          });
        },
        addConversation: (id) => {
          const conversation: Conversation = {
            id,
            temperature: useSettingsStore.getState().defaultTemperature,
            model: useSettingsStore.getState().defaultModel,
            messages: [],
          };
          set((state) => {
            updateConversation(state, id, conversation);
          });
          return conversation;
        },
        currentConversationId: undefined,
        setCurrentConversationId: (id) => {
          set((state) => {
            state.currentConversationId = id;
          });
        },
      })),
      {
        name: "chat",
        storage: createJSONStorage(() => createStorage()),
      },
    ),
  ),
);

function updateConversation(state: ChatState, id: string, conversation: Conversation) {
  state.conversations[id] = conversation;
}
