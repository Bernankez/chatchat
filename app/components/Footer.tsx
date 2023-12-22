import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { createContext, useState } from "react";
import { useStateHistory } from "@/hooks/use-state-history";

export const ChatInputAreaContext = createContext({
  back: (amount?: number) => {},
  forward: (amount?: number) => {},
});

export default function Footer() {
  const [state, setState, { undo, redo, history, index }] = useStateHistory<string>();

  // console.log(state, history, index);

  // console.trace(state, history);

  return (
    <ChatInputAreaContext.Provider value={{ back: undo, forward: redo }}>
      <ChatInputAreaSimple value={state} onInput={setState}></ChatInputAreaSimple>
      <ChatInputArea value={state} onInput={setState}></ChatInputArea>
    </ChatInputAreaContext.Provider>
  );
}
