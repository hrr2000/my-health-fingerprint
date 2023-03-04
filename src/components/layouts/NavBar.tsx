import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const NavBar = ({
  links,
  activeClassName,
  mode,
}: {
  links: { href: string; label: string }[];
  activeClassName: string;
  mode: "mobile" | "pc";
}) => {
  const router = useRouter();
  const [smallScreenState, largeScreenState] =
    mode === "mobile" ? ["block", "lg:hidden"] : ["hidden", "lg:block"];
  return (
    <nav className={`h-full ${smallScreenState} ${largeScreenState}`}>
      <ul className="flex h-full gap-9 text-lg text-white">
        {links.map(({ href, label }) => (
          <li
            key={href}
            className={`flex rounded-md px-4 transition-all  hover:bg-slate-500/30 hover:shadow-md ${
              router.asPath === "/" + href ? activeClassName : ""
            }`}
          >
            <Link className="flex items-center" href={`/${href}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
