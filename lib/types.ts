export type Role = "system" | "user" | "assistant";

export interface Conversation {
  id: string;
  temperature: number;
  messages: Message[];
  model: Model;
  prompt?: string;
}

export interface Message {
  _id: string;
  role: Role;
  content: string;
  type?: MessageType;
}

export type MessageType = "error";

export type Model = "gpt-4-1106-preview";
