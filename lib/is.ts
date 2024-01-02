import { UAParser } from "ua-parser-js";
import { Fn } from "./types";

export function isDefined<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

const parser = new UAParser();

export function isMacOS() {
  return parser.getOS().name === "Mac OS";
}

export const isFunction = <T extends Fn>(val: any): val is T => typeof val === "function";

export const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export const isProd = process.env.NODE_ENV === "production";
export const isBrowser = typeof window !== "undefined";
export const isNavigator = typeof navigator !== "undefined";
