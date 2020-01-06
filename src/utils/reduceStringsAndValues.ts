/**
 * Takes both strings and values and reduces them to a string
 *
 * @param {TemplateStringsArray} strings
 * @param {(string | undefined | null)[]} values
 *
 * @returns {string}
 */
export function reduceStringsAndValues(
  strings: TemplateStringsArray,
  values: (string | undefined | null)[]
): string {
  return strings
    .flatMap((str, i) => {
      return [str, values[i] || ""];
    })
    .join(" ");
}
