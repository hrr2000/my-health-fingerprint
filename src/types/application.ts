import { type ReactNode } from "react";
import { type Session } from "next-auth";
export interface ILink {
  href: string;
  image?: ReactNode | string;
  display_text: string;
}

export interface Meta {
  name: string;
  content: string;
}
type FormValues = (values: Record<string, string>) => boolean;
export interface GenericProps {
  [k: string]:
    | ReactNode
    | ILink[]
    | Meta[]
    | Session["user"]
    | (() => void | React.ReactNode)
    | Record<string, string>
    | FormValues;
}
