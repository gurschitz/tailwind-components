import * as React from "react";
import domElements, { DomElementTypes } from "./domElements";

type ClassNameObject = {
  [k: string]: boolean;
};

type ClassNameSingleType = ClassNameObject | string;
type ClassNameType = ClassNameSingleType | ClassNameSingleType[];

type TailwindComponentsElementProps<T> = {
  className?: ClassNameType;
} & Omit<T, "className">;

type TailwindComponents = {
  [k in keyof DomElementTypes]: React.ComponentType<
    TailwindComponentsElementProps<DomElementTypes[k]>
  >;
};

function transformClassName(classNameValue: ClassNameType): string {
  if (typeof classNameValue === "string") {
    return classNameValue;
  }

  let result = "";

  if (Array.isArray(classNameValue)) {
    result = classNameValue.map(transformClassName).join(" ");
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

const tailwindComponents: TailwindComponents = domElements.reduce(
  (acc, domElement) => {
    function Component<T>({
      className: classNameValue,
      ...attrs
    }: TailwindComponentsElementProps<T>) {
      let className = undefined;
      if (classNameValue) {
        className = transformClassName(classNameValue);
      }

      return React.createElement(domElement, {
        className,
        ...attrs
      });
    }

    return {
      ...acc,
      [domElement]: Component
    };
  },
  {}
) as TailwindComponents;

export default tailwindComponents;
