import { domElements } from "./utils";
import { TailwindComponents } from "./types";
import buildComponentFunction from "./buildComponentFunction";

/**
 * Returns an object with all dom elements as tailwind components
 *
 * @returns {TailwindComponents} All tailwind components
 */
export const tailwindComponents = domElements.reduce<TailwindComponents>(
  (acc, domElement) => {
    return {
      ...acc,
      [domElement]: buildComponentFunction(domElement)
    };
  },
  {} as TailwindComponents
);
