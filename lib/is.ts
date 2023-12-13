export function isDefined<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}
