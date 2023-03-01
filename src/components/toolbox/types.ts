import { type ReactNode } from "react";

export interface GenericProps {
  [k: string]: object | [] | string | number | undefined | boolean | ReactNode;
}
