import { handleResponse } from "@/lib/response";
import { Message } from "@/lib/types";
import { useChatStore } from "@/store/chat-store";
import { nanoid } from "ai";
import { useMemo, useState } from "react";

export interface UseChatOptions {
  idGenerator?: () => string;
}

export function useChat(options?: UseChatOptions) {
  const { idGenerator = nanoid } = options || {};

  const {
    currentConversationId,
    conversations,
    getConversation,
    updateConversation,
    addConversation,
    setCurrentConversationId,
  } = useChatStore();

  const [controller, setController] = useState<AbortController>();
  const [loading, setLoading] = useState(false);
  const [receiving, setReceiving] = useState(false);

  const currentConversation = useMemo(() => {
    if (!currentConversationId) {
      return undefined;
    }
    return getConversation(currentConversationId);
  }, [currentConversationId, conversations]);

  function init() {
    const id = idGenerator();
    addConversation(id);
    return id;
  }

  // TODO loading state push to message list
  async function send(text: string) {
    const _conversation = currentConversation;
    const _id = _conversation?.id;
    if (!_conversation || !_id) {
      return;
    }
    const messages: Message[] = [..._conversation.messages, { role: "user", content: text, _id: idGenerator() }];
    updateConversation(_id, {
      ..._conversation!,
      messages: [...messages],
    });
    const messagesWithPrompt = messages.map(({ role, content }) => ({
      role,
      content,
    }));
    if (_conversation.prompt) {
      messagesWithPrompt.unshift({
        role: "assistant",
        content: _conversation.prompt,
      });
    }
    try {
      const _controller = new AbortController();
      setController(_controller);
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: _conversation.model,
          messages: messagesWithPrompt,
        }),
        signal: _controller.signal,
      });
      setLoading(false);
      setReceiving(true);
      await handleResponse(response, (text) => {
        updateConversation(_id, {
          ..._conversation!,
          messages: [...messages, { role: "assistant", content: text, _id: idGenerator() }],
        });
      });
    } catch (e: any) {
      console.error(e);
      updateConversation(_id, {
        ..._conversation!,
        messages: [
          ...messages,
          {
            role: "assistant",
            content: e.message,
            _id: idGenerator(),
            type: "error",
          },
        ],
      });
    } finally {
      setLoading(false);
      setReceiving(false);
      setController(undefined);
    }
  }

  function stop() {
    controller?.abort();
  }

  function switchConversation(id: string) {
    setCurrentConversationId(id);
  }

  function clear() {
    if (!currentConversation) {
      return;
    }
    updateConversation(currentConversation.id, {
      ...currentConversation,
      messages: [],
    });
  }

  return {
    currentConversation,
    loading,
    receiving,

    init,
    send,
    stop,
    clear,
    switchConversation,
  };
}
