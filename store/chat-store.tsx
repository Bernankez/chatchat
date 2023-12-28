import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "./storage";
import { Conversation } from "@/lib/types";

interface ChatState {
  conversations: Record<string, Conversation>;
  getConversation: (id: string) => Conversation | undefined;
  setConversations: (id: string, conversation: Conversation) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      immer((set, get) => ({
        conversations: {},
        getConversation: (id: string) => get().conversations[id],
        setConversations: (id, conversation) => {
          set((state) => {
            state.conversations[id] = conversation;
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
