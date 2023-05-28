import React, { type RefObject, useState } from "react";
import { FiActivity } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { type GenericProps } from "@/types/application";
import useOnClickOutside from "@/hooks/useClickOutside";
import { NavBar } from "../common/NavBar";
import { routes } from "@/routes";
import { CiLogout } from "react-icons/ci";

interface LocalProps extends GenericProps {
  username: string;
  userImageSrc: string;
}

function SiderBar({ username, userImageSrc }: LocalProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserTooltipOpen, setIsUserTooltipOpen] = useState(false);
  const domNode = useOnClickOutside(() => setIsUserTooltipOpen(false));

  return (
    <aside
      className={` flex ${
        isSidebarOpen ? "w-[220px]" : "w-[220px]"
      }   flex-col gap-7 bg-white py-2 px-3 text-primary shadow-md transition-all duration-300`}
    >
      <header className="flex gap-3 items-center justify-start overflow-hidden rounded-sm p-2">
        <FiActivity className="h-[30px] w-[30px] shrink-0" />
        <h2 className={`text-2xl font-black`}>
          MHFP
        </h2>
      </header>
      <NavBar className="overflow-hidden" mode="both">
        <NavBar.NavLinks
          links={routes.dashboardPages}
          activeLinkClassName="bg-primary rounded-md shadow-lg shadow-sky-200 text-white hover:text-white"
          linkClassName="flex capitalize font-semibold text-sm items-center p-2 text-lg hover:text-highlight"
          className="flex flex-col gap-4"
        />
      </NavBar>
      <hr />
      <footer className="relative flex flex-col gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUserTooltipOpen(!isUserTooltipOpen);
          }}
          className="relative flex w-full items-center overflow-hidden rounded-md p-2 text-lg hover:bg-gray-300/25"
        >
          <Image
            src={userImageSrc}
            width={30}
            height={30}
            alt=""
            className="shrink-0 rounded-[50%]"
          />
          <span className="mx-4 whitespace-nowrap text-sm capitalize">
            {username}
          </span>
        </button>
        <button
          onClick={() => void signOut()}
          className="flex w-full flex-1 items-center overflow-hidden rounded-md p-2 text-sm hover:text-red-500"
        >
          <CiLogout className="h-[25px] w-[25px] shrink-0" />
          <span className="ml-4 whitespace-nowrap">Signout</span>
        </button>
        {isUserTooltipOpen && (
          <ul
            ref={domNode as RefObject<HTMLUListElement>}
            className="absolute right-0 bottom-0 z-[999] h-56 w-56 translate-x-[110%] -translate-y-1/4 rounded-sm bg-purple-800 p-2 shadow-md"
          >
            sad
          </ul>
        )}
      </footer>
    </aside>
  );
}

export default SiderBar;
