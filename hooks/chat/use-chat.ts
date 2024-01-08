import { handleResponse } from "@/lib/response";
import { Message } from "@/lib/types";
import { createConversation, useChatStore } from "@/store/chat-store";
import { useMemo, useState } from "react";
import { IdGenerator } from "@/lib/utils";
import { getMessagesWithPrompts } from "@/lib/chat";

export interface UseChatOptions {}

export function useChat(options?: UseChatOptions) {
  const [controller, setController] = useState<AbortController>();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { conversation, setConversation, history, addHistory } = useChatStore();

  const historyList = useMemo(
    () => [...history.entries()].reverse().map(([_id, conversation]) => conversation),
    [history],
  );

  const messages = useMemo(() => conversation.messages, [conversation]);

  const messagesWithPrompts = useMemo(() => getMessagesWithPrompts(messages, conversation.prompts), [conversation]);

  // TODO loading state push to message list
  async function send(text: string) {
    const newMessages: Message[] = [...conversation.messages, { role: "user", content: text, id: IdGenerator() }];
    setConversation({ ...conversation, messages: [...newMessages] });
    const messagesWithPrompt = getMessagesWithPrompts(
      newMessages.map(({ role, content }) => ({
        role,
        content,
      })),
      conversation.prompts,
    );
    try {
      const abortCtrl = new AbortController();
      setController(abortCtrl);
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: conversation.model,
          messages: messagesWithPrompt,
          temperature: conversation.temperature,
        }),
        signal: abortCtrl.signal,
      });
      setLoading(false);
      setGenerating(true);
      await handleResponse(response, (text) => {
        setConversation({
          ...conversation,
          messages: [...newMessages, { role: "assistant", content: text, id: IdGenerator() }],
        });
      });
    } catch (e: any) {
      console.error(e);
      setConversation({
        ...conversation,
        messages: [
          ...newMessages,
          {
            role: "assistant",
            content: e.message,
            id: IdGenerator(),
            type: "error",
          },
        ],
      });
    } finally {
      setLoading(false);
      setGenerating(false);
      setController(undefined);
    }
  }

  function stop() {
    controller?.abort();
  }

  function clear() {
    setConversation(createConversation());
  }

  function archive() {
    addHistory();
  }

  function switchConversation(id: string) {
    const newConversation = history.get(id);
    if (newConversation) {
      setConversation({ ...newConversation });
      return true;
    }
    return false;
  }

  return {
    conversation,
    loading,
    generating,
    historyList,
    messages,
    messagesWithPrompts,

    setConversation,
    send,
    stop,
    clear,
    archive,
    switchConversation,
  };
}
