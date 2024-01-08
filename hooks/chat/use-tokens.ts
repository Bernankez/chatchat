import { useEffect, useState, useTransition } from "react";
import { useChat } from "./use-chat";
import { calculatePrice, encodeMessages, encodeText } from "@/lib/chat/tokenizer";

export function useTokens(text: string) {
  const { messagesWithPrompts, conversation } = useChat();
  const [isPending, startTransition] = useTransition();
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTokens, setCurrentTokens] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    startTransition(() => {
      const totalTokens = encodeMessages(messagesWithPrompts, conversation.model).length;
      setTotalTokens(totalTokens);
    });
  }, [messagesWithPrompts, conversation]);

  useEffect(() => {
    startTransition(() => {
      const currentTokens = encodeText(text).length;
      setCurrentTokens(currentTokens);
    });
  }, [text]);

  useEffect(() => {
    startTransition(() => {
      const totalPrice = calculatePrice(totalTokens, conversation.model);
      setTotalPrice(totalPrice);
    });
  }, [totalTokens, conversation]);

  useEffect(() => {
    startTransition(() => {
      const currentPrice = calculatePrice(currentTokens, conversation.model);
      setCurrentPrice(currentPrice);
    });
  }, [currentTokens, conversation]);

  return {
    isPending,
    totalTokens,
    totalPrice,
    currentTokens,
    currentPrice,
  };
}
