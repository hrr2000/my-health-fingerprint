import React from "react";
import Head from "next/head";
import { type ReactNode } from "react";
import { type Meta, type GenericProps } from "@/types/application";
import SiderBar from "@/components/dashboard/SiderBar";
import { type Session } from "next-auth";
interface LocalProps extends GenericProps {
  title: string;
  description: string;
  iconHref?: string;
  meta?: Meta[];
  children: ReactNode;
  user: Session["user"];
}
export default function DashBoardLayout({
  title,
  description,
  iconHref,
  meta,
  children,
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
        <SiderBar
          username={name ? name : ""}
          userImageSrc={image ? image : ""}
        />
        <main className="flex-1 bg-slate-50">
          <header className="h-[55px] rounded-br-sm rounded-bl-sm border-b-[1px] border-slate-200 px-5 shadow-sm">
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
