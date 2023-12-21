import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { useStateWithHistory } from "react-use";
import { createContext, useEffect } from "react";

export const ChatInputAreaContext = createContext({
  back: (amount?: number) => {},
  forward: (amount?: number) => {},
});

export default function Footer() {
  const [state, setState, stateHistory] = useStateWithHistory("", 100, []);

  const { back, forward, history } = stateHistory;

  console.trace(state, history);

  return (
    <ChatInputAreaContext.Provider value={{ back, forward }}>
      <ChatInputAreaSimple value={state} onInput={setState}></ChatInputAreaSimple>
      <ChatInputArea value={state} onInput={setState}></ChatInputArea>
    </ChatInputAreaContext.Provider>
  );
}
