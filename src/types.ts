import { TailwindComponent } from "./buildComponentFunction";
import { DomElementTypes } from "./utils/domElements";

type ClassNameObject = {
  [k: string]: boolean;
};

export type ClassNameSingleType = ClassNameObject | string;

export type ClassNameType = ClassNameSingleType | ClassNameSingleType[];

export type Props<T> = {
  className?: ClassNameType;
} & Omit<T, "className">;

export type TailwindComponents = {
  [k in keyof DomElementTypes]: TailwindComponent<Props<DomElementTypes[k]>>;
};

export { DomElementTypes } from "./utils/domElements";
