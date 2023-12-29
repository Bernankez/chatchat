import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { createContext } from "react";
import { useHistoryTravel } from "ahooks";
import { useSettingsStore } from "@/store/settings-store";
import Placeholder from "@/components/ui/placeholder";
import { Skeleton } from "@/components/ui/skeleton";

export const ChatInputAreaContext = createContext({
  back: () => {},
  forward: () => {},
});

export default function Footer() {
  const { value, setValue, back, forward } = useHistoryTravel<string>();
  const { useSimpleInput } = useSettingsStore();

  const state = value || "";

  return (
    // TODO markdown editor
    // TODO disable send when receiving response
    <ChatInputAreaContext.Provider value={{ back, forward }}>
      <Placeholder
        skeleton={
          <div className="flex gap-3">
            <Skeleton className="w-full h-14"></Skeleton>
            <Skeleton className="shrink-0 w-14 h-14"></Skeleton>
            <Skeleton className="shrink-0 w-14 h-14"></Skeleton>
          </div>
        }>
        {useSimpleInput ? (
          <ChatInputAreaSimple value={state} onInput={setValue}></ChatInputAreaSimple>
        ) : (
          <ChatInputArea value={state} onInput={setValue}></ChatInputArea>
        )}
      </Placeholder>
    </ChatInputAreaContext.Provider>
  );
}
