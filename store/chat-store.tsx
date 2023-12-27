import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IndexedDBStorage } from "./storage";
import { Conversation } from "@/lib/types";

interface ChatState {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      immer((set) => ({
        conversations: [],
        setConversations: (conversations) => {
          set((state) => {
            state.conversations = conversations;
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
