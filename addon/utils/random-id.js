const ALPHABET_SIZE = 36;
const PREFIX_TRIM_LENGTH = 2;

/**
 * @hidden
 * @private
 * Creates a random ID based on JavaScript's `Math.random` function
 *
 * @returns {string} random ASCII string
 */
export default function randomId() {
  return Math
    .random()
    .toString(ALPHABET_SIZE)
    .substr(PREFIX_TRIM_LENGTH);
}
