import { UAParser } from "ua-parser-js";

export function isDefined<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

const parser = new UAParser();

export function isMacOS() {
  return parser.getOS().name === "Mac OS";
}
