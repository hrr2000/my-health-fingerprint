import React, { useState } from "react";
import { type ReactNode } from "react";
import { type Meta, type GenericProps } from "../../toolbox/types";
import Head from "next/head";
import Link from "next/link";
import { HiAcademicCap } from "react-icons/hi";
import { FiActivity, FiFolder, FiTool } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
interface LocalProps extends GenericProps {
  title: string;
  description: string;
  iconHref?: string;
  meta?: Meta[];
  children: ReactNode;
}
export default function DashBoardLayout({
  title,
  description,
  iconHref,
  meta,
  children,
}: LocalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={iconHref} />
        {meta?.map((item, idx) => (
          <meta key={`${item.name}_${idx}`} {...item} />
        ))}
      </Head>
      <div
        className=" flex min-h-screen text-white"
        style={{
          background: "#162848",
        }}
      >
        <aside
          className={`relative flex ${
            isOpen ? "w-[200px]" : "w-[60px]"
          }  flex-col gap-7  bg-black p-2 text-white transition-all  duration-300`}
        >
          <header className="mt-8 flex items-center overflow-hidden rounded-md bg-violet-400/30 p-2">
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
                  <span className="ml-4">Link</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
                  href="/dashboard"
                >
                  <FiFolder className="h-[30px] w-[30px] shrink-0" />
                  <span className="ml-4">Link</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
                  href="/dashboard"
                >
                  <FiTool className="h-[30px] w-[30px] shrink-0" />
                  <span className="ml-4">Link</span>
                </Link>
              </li>
            </ul>
          </nav>
          <footer className="mt-auto overflow-hidden">
            <button
              onClick={() => void signOut()}
              className="flex w-full flex-1 items-center rounded-md p-2 text-lg hover:bg-gray-400/25"
            >
              <HiOutlineLogout className="h-[30px] w-[30px] shrink-0" />
              <span className="ml-4">Signout</span>
            </button>
          </footer>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1 right-0 flex h-8 w-8 translate-x-3 items-center  justify-center rounded-[50%] bg-white text-black "
          >
            <AiOutlineArrowRight
              className={`  transition-all ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </aside>
        <div className="flex-1 bg-teal-700 py-10 lg:py-20">{children}</div>
      </div>
    </>
  );
}
