/**
 * Returns `true` if value is neither null nor undefined
 */
export default function isOkay<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
