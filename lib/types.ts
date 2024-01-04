export type Role = "system" | "user" | "assistant";

export type Fn = (...args: any[]) => void;

export interface Conversation {
  id: string;
  temperature: number;
  model: Model;
  messages: Message[];
  prompts: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  type?: MessageType;
}

export type MessageType = "error";

export type Model = "gpt-4-1106-preview";
