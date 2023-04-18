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
  user: { image, name },
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
        <main className="flex-1 bg-white">
          <header className="h-[55px]  rounded-br-sm rounded-bl-sm border-b-[1px] border-black  p-2 shadow-sm">
            <div className="h-full">sss</div>
          </header>
          <section className="h-full">{children}</section>
        </main>
      </div>
    </>
  );
}
