import { ClassNameSingleType, ClassNameType } from "../types";

/**
 * This appends the second className to the first className
 *
 * @param {ClassNameType} first The first className
 * @param {ClassNameType} second The second className
 *
 * @return {ClassNameSingleType[]} The result contains both values
 */
export function appendToClassName(
  first: ClassNameType,
  second: ClassNameType
): ClassNameSingleType[] {
  if (Array.isArray(first)) {
    if (Array.isArray(second)) {
      return [...first, ...second];
    }

    // second value has to be ClassNameSingleType or string
    return [...first, second];
  }

  // we now know that first is ClassNameSingleType or string
  if (Array.isArray(second)) {
    return [first, ...second];
  }

  // we now know that both have to be ClassNameSingleType or string
  return [first, second];
}
