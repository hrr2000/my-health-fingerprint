import { type ReactElement } from "react";
import { type GenericProps } from "@/types/application";
import { NavLinks } from "@/components/common/NavLinks";

type ModeOptions = "mobile" | "pc" | "both";
interface LocalProps extends GenericProps {
  className: string;
  children: ReactElement<typeof NavLinks>;
  mode: ModeOptions;
}

const checkMode = (mode: ModeOptions): string => {
  if (mode === "both") {
    return "";
  }
  const [smallScreenState, largeScreenState] =
    mode === "mobile" ? ["block", "lg:hidden"] : ["hidden", "lg:block"];

  return [smallScreenState, largeScreenState].join(" ");
};

export function NavBar({ children, className, mode }: LocalProps) {
  return <nav className={`${className} ${checkMode(mode)}`}>{children}</nav>;
}

NavBar.NavLinks = NavLinks;
