import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type GenericProps, type ILink } from "@/types/application";

interface LocalProps extends GenericProps {
  links: ILink[];
  activeClassName: string;
  mode: "mobile" | "pc";
}

const NavBar = ({ links, activeClassName, mode }: LocalProps) => {
  const router = useRouter();
  const [smallScreenState, largeScreenState] =
    mode === "mobile" ? ["block", "lg:hidden"] : ["hidden", "lg:block"];
  return (
    <nav className={`h-full ${smallScreenState} ${largeScreenState}`}>
      <ul className="flex h-full gap-9 text-lg text-white">
        {links.map(({ href, display_text }) => (
          <li
            key={href}
            className={`flex rounded-md px-4 transition-all  hover:bg-slate-500/30 hover:shadow-md ${
              router.asPath === "/" + href ? activeClassName : ""
            }`}
          >
            <Link className="flex items-center" href={`/${href}`}>
              {display_text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
