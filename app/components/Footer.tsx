import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { createContext } from "react";
import { useHistoryTravel } from "ahooks";
import { useSettingsStore } from "@/store/settings-store";

export const ChatInputAreaContext = createContext({
  back: () => {},
  forward: () => {},
});

export default function Footer() {
  const { value, setValue, back, forward } = useHistoryTravel<string>();
  const { useSimpleInput } = useSettingsStore();

  const state = value || "";

  return (
    <ChatInputAreaContext.Provider value={{ back, forward }}>
      {useSimpleInput ? (
        <ChatInputAreaSimple value={state} onInput={setValue}></ChatInputAreaSimple>
      ) : (
        <ChatInputArea value={state} onInput={setValue}></ChatInputArea>
      )}
    </ChatInputAreaContext.Provider>
  );
}
