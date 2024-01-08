export type Role = "system" | "user" | "assistant";

export type Fn = (...args: any[]) => void;

export interface Conversation {
  id: string;
  temperature: number;
  model: ChatModel;
  messages: Message[];
  prompts: string;
}

export interface ChatMessage {
  role: Role;
  name?: string;
  content: string;
}

export interface Message extends ChatMessage {
  id: string;
  type?: MessageType;
}

export type MessageType = "error";

export type ChatModel = "gpt-4" | "gpt-4-1106-preview" | "gpt-4-32k" | "gpt-3.5-turbo" | "gpt-3.5-instruct";
