export type Role = "system" | "user" | "assistant";

export interface Conversation {
  id: string | number;
  temperature: number;
  messages: Message[];
  prompt?: string;
}

export interface Message {
  role: Role;
  content: string;
}
