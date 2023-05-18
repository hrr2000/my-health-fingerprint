import { type ReactElement } from "react";
import { type GenericProps } from "@/types/application";
import { NavLinks } from "@/components/common/NavLinks";

interface LocalProps extends GenericProps {
  className: string;
  children: ReactElement<typeof NavLinks>;
  mode?: "mobile" | "pc";
}

export function NavBar({ children, className, mode }: LocalProps) {
  const [smallScreenState, largeScreenState] =
    mode === "mobile" ? ["block", "lg:hidden"] : ["hidden", "lg:block"];
  return (
    <nav className={`${className} ${smallScreenState} ${largeScreenState}`}>
      {children}
    </nav>
  );
}

NavBar.NavLinks = NavLinks;
