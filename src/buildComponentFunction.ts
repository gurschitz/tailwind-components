import React from "react";
import { Props, DomElementTypes } from "./types";
import {
  reduceClassNameToString,
  appendToClassName,
  reduceStringsAndValues
} from "./utils";

type ComponentType<T> = React.ComponentType<T>;

type TemplateFunction<T> = (
  strings: TemplateStringsArray,
  ...values: (string | undefined | null)[]
) => ComponentType<T>;

export interface TailwindComponent<T> extends React.FunctionComponent<T> {
  /**
   * A template literal function that returns a Component and passes the given template string as a className.
   * The resulting component also accepts className as a prop.
   */
  className: TemplateFunction<T>;
}

/**
 * Higher-order function for building the Tailwind Component for a given element
 *
 * @param {keyof DomElementTypes} element - A valid dom element
 *
 * @returns {TailwindComponent<T>} The tailwind component for the given element
 */
function buildComponentFunction<T>(
  element: keyof DomElementTypes
): TailwindComponent<T> {
  const className: TemplateFunction<T> = (strings, ...values) => {
    const templateResult = reduceStringsAndValues(strings, values);
    return ({ className, ...props }: Props<T>) => {
      className = appendToClassName(className, templateResult);
      return React.createElement(Component, { ...props, className });
    };
  };

  function Component<T>(props: Props<T>) {
    let className = reduceClassNameToString(props.className);
    return React.createElement(element, { ...props, className });
  }

  // setting the template literal function as the className property on Component
  // allows us styled-components-like usage, for example const Container = tw.div.className`bg-green-500`
  Component.className = className;

  return Component;
}

export default buildComponentFunction;
