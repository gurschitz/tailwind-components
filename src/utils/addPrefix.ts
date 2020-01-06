type Config = {
  prefix: string;
  separator: string;
};

/**
 * This function adds a prefix to a given className. It uses the separator and prefix from the passed tailwind config.
 *
 * @param className The className, to which the prefix should be added
 * @param config The tailwind config
 *
 * @returns {string} The result with the added prefix, considering the separator
 */
export function addPrefix(
  className: string,
  { prefix, separator = ":" }: Config
): string {
  const classNames = className.split(" ");

  const classNamesWithPrefix = classNames
    .filter(c => c)
    .map(className => {
      const classNameSplitBySeparator = className.split(separator);

      if (classNameSplitBySeparator.length === 1) {
        return `${prefix}${className}`;
      }

      const [modifier, classNameWithoutModifier] = classNameSplitBySeparator;
      const classNameWithPrefix = `${prefix}${classNameWithoutModifier}`;

      const prefixedClassNameWithModifier = [
        modifier,
        classNameWithPrefix
      ].join(separator);

      return prefixedClassNameWithModifier;
    });

  return classNamesWithPrefix.join(" ");
}
