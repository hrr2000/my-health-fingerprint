import { type ReactNode } from "react";
import { type User } from "next-auth";
export interface ILink {
  href: string;
  display_text: string;
}

export interface Meta {
  name: string;
  content: string;
}

export interface GenericProps {
  [k: string]: ReactNode | ILink[] | Meta[] | User;
}
