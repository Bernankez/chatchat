import { encode, encodeChatGenerator } from "gpt-tokenizer";
import { ChatMessage, ChatModel } from "./types";
import BigNumber from "bignumber.js";

type EncodeModel = Parameters<typeof encodeChatGenerator>[1];

export function encodeMessages(messages: ChatMessage[], model: ChatModel) {
  const tokens: number[] = [];
  let _model: EncodeModel;
  if (model === "gpt-4-1106-preview") {
    _model = "gpt-4";
  } else if (model === "gpt-3.5-instruct") {
    _model = "gpt-3.5-turbo";
  } else {
    _model = model;
  }
  for (const token of encodeChatGenerator(messages, _model)) {
    tokens.push(...token);
  }
  return tokens;
}

export function encodeText(text: string) {
  return encode(text);
}

const pricing: Record<ChatModel, BigNumber> = {
  "gpt-4": BigNumber("0.03").div(1000),
  "gpt-4-1106-preview": BigNumber("0.01").div(1000),
  "gpt-4-32k": BigNumber("0.03").div(1000),
  "gpt-3.5-turbo": BigNumber("0.0010").div(1000),
  "gpt-3.5-instruct": BigNumber("0.0015").div(1000),
};

export function calculatePrice(tokenCount: number, model: ChatModel = "gpt-4-1106-preview") {
  const price = Number(pricing[model].multipliedBy(tokenCount).toFixed());
  return Number.isNaN(price) ? 0 : price;
}
