import ChatInputAreaSimple from "@/components/chat/chat-input-area-simple";
import ChatInputArea from "@/components/chat/chat-input-area";
import { createContext, useMemo } from "react";
import { useHistoryTravel, useMap } from "ahooks";
import { useSettingsStore } from "@/store/settings-store";
import Placeholder from "@/components/ui/placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { useTokens } from "@/hooks/chat/use-tokens";

export const ChatInputAreaContext = createContext({
  back: () => {},
  forward: () => {},
  tokens: {
    total: {
      count: 0,
      price: 0,
    },
    current: {
      count: 0,
      price: 0,
    },
  },
});

export default function Footer() {
  const { value, setValue, back, forward } = useHistoryTravel<string>();
  const { useSimpleInput } = useSettingsStore();
  const state = value || "";
  const { totalPrice, totalTokens, currentPrice, currentTokens } = useTokens(state);

  const tokens = useMemo(
    () => ({
      total: {
        count: totalTokens,
        price: totalPrice,
      },
      current: {
        count: currentTokens,
        price: currentPrice,
      },
    }),
    [totalTokens, totalPrice, currentTokens, currentPrice],
  );

  return (
    // TODO markdown editor
    // TODO disable send when receiving response
    <ChatInputAreaContext.Provider
      value={{
        back,
        forward,
        tokens,
      }}>
      TODO add settings bar
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
