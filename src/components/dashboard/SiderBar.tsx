import React, { type RefObject, useState } from "react";
import Link from "next/link";
import { HiAcademicCap } from "react-icons/hi";
import { FiActivity, FiFolder, FiTool } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { type GenericProps } from "../toolbox/types";
import useOnClickOutside from "@/hooks/useClickOutside";

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
        isSidebarOpen ? "w-[200px]" : "w-[60px]"
      }   flex-col gap-7 bg-black p-2 text-white shadow-md transition-all  duration-300`}
    >
      <header className="flex items-center overflow-hidden rounded-sm bg-violet-400/30 p-2">
        <FiActivity className="h-[30px] w-[30px] shrink-0" />
        <h2 className="ml-4 text-xl">MHFP</h2>
      </header>

      <nav className="overflow-hidden">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              className="flex flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
              href="/dashboard"
            >
              <HiAcademicCap className="h-[30px] w-[30px] shrink-0" />
              <span className="ml-4 whitespace-nowrap">Link 1</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
              href="/dashboard"
            >
              <FiFolder className="h-[30px] w-[30px] shrink-0" />
              <span className="ml-4 whitespace-nowrap">Link 2</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
              href="/dashboard"
            >
              <FiTool className="h-[30px] w-[30px] shrink-0" />
              <span className="ml-4 whitespace-nowrap">Link 3</span>
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="relative mt-auto flex flex-col gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex w-full items-center justify-center rounded-sm bg-slate-600/50 p-2 "
        >
          <AiOutlineArrowRight
            className={`transition-all ${isSidebarOpen ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUserTooltipOpen(!isUserTooltipOpen);
          }}
          className="relative flex w-full items-center overflow-hidden rounded-md p-2 text-lg hover:bg-gray-400/25"
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
          <AiOutlineArrowRight
            className={`transition-all duration-200 ${
              isUserTooltipOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <button
          onClick={() => void signOut()}
          className="flex w-full flex-1 items-center overflow-hidden rounded-md p-2 text-lg hover:bg-gray-400/25"
        >
          <HiOutlineLogout className="h-[30px] w-[30px] shrink-0" />
          <span className="ml-4 whitespace-nowrap">Signout</span>
        </button>
        {isUserTooltipOpen && (
          <ul
            ref={domNode as RefObject<HTMLUListElement>}
            className="absolute right-0 bottom-0 z-[999] h-56 w-56 translate-x-[110%] -translate-y-1/4 rounded-md bg-black shadow-md"
          >
            sad
          </ul>
        )}
      </footer>
    </aside>
  );
}

export default SiderBar;
