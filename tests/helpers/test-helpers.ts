/**
 * Trims text in a null-safe way to make TS integration easier.
 * @param text
 * @hidden
 */
export function trim(text: string | null) {
  return text ? text.trim() : '';
}