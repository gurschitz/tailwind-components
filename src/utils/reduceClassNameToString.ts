import { ClassNameType } from "../types";

/**
 * Reduces a value of type ClassNameType to a string
 *
 * @param {ClassNameType | null} classNameValue
 *
 * @returns {string} the reduced string
 */
export function reduceClassNameToString(
  classNameValue?: ClassNameType | null
): string {
  if (!classNameValue) {
    return "";
  }

  if (typeof classNameValue === "string") {
    return classNameValue;
  }

  let result = "";

  if (Array.isArray(classNameValue)) {
    result = classNameValue.map(reduceClassNameToString).join(" ");
  } else {
    const classNames = Object.keys(classNameValue);
    const filteredClassNames = classNames.filter(className => {
      const classNameIsIncluded = classNameValue[className];
      return classNameIsIncluded;
    });
    return filteredClassNames.join(" ");
  }

  return result;
}
