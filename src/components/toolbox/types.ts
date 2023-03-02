import { type ReactNode } from "react";

export interface GenericProps {
  [k: string]: ReactNode | unknown;
}
