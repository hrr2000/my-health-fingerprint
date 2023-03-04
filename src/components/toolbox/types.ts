import { type ReactNode } from "react";

export interface ILink {
  href: string;
  display_text: string;
}

export interface Meta {
  name: string;
  content: string;
}

export interface GenericProps {
  [k: string]: ReactNode | ILink[] | Meta[];
}
