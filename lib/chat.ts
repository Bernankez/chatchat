import { ChatMessage, Message } from "./types";
import { IdGenerator } from "./utils";

export function getMessagesWithPrompts<T extends ChatMessage | Message>(messages: T[], prompts?: string): T[] {
  if (messages.length === 0 || !prompts) {
    return messages;
  }
  const message = messages[0];
  if ("id" in message) {
    return [
      {
        id: IdGenerator(),
        role: "assistant",
        content: prompts,
      } as T,
      ...messages,
    ];
  } else {
    return [
      {
        role: "assistant",
        content: prompts,
      } as T,
      ...messages,
    ];
  }
}
