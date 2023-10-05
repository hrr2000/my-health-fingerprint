import React from "react";
import Head from "next/head";
import { type ReactNode } from "react";
import {type Meta, type GenericProps, type ILink} from "@/types/application";
import SideBar from "@/components/dashboard/SiderBar";
import { type Session } from "next-auth";
interface LocalProps extends GenericProps {
  title: string;
  description: string;
  iconHref?: string;
  meta?: Meta[];
  children: ReactNode;
  user: Session["user"];
  links : ILink[]
}
export default function DashBoardLayout({
  title,
  description,
  iconHref,
  meta,
  children,
  links,
  user: { image, name, orgName },
}: LocalProps) {
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
        className=" relative flex min-h-screen text-white"
        style={{
          background: "#162848",
        }}
      >
        <SideBar
          links={links}
          username={name ? name : ""}
          userImageSrc={image ? image : ""}
        />
        <main className="flex-1 bg-[#f7fbfe]">
          <header className="h-[55px] rounded-br-sm rounded-bl-sm px-5 shadow-sm">
            <div className="h-full flex items-center">
              <h2 className={`text-slate-800 text-xl capitalize`}>{orgName}</h2>
            </div>
          </header>
          <section className="h-full">{children}</section>
        </main>
      </div>
    </>
  );
}
