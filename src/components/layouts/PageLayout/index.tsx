import { type ReactNode } from "react";
import { type Meta, type GenericProps } from "../../toolbox/types";
import Head from 'next/head';
import CompanyLogo from "../../brand/CompanyLogo";
import SigninButton from "../../brand/SigninButton";
import NavBar from "./NavBar";
import { routes } from "@/components/toolbox/routes";


interface LocalProps extends GenericProps {
  title: string;
  description: string;
  iconHref?: string;
  meta?: Meta[];
  children: ReactNode
}

export default function PageLayout ({title, description, iconHref, meta, children}: LocalProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={iconHref} />
        {meta?.map((item, idx) => <meta key={`${item.name}_${idx}`} {...item} />)}
      </Head>
      <div
        className="grid min-h-screen grid-rows-[60px_1fr] p-8 xl:py-8 xl:px-48 text-white whitespace-pre-wrap"
        style={{
          background: "radial-gradient(#27384e, #010304)",
        }}
      >
        <header className="flex items-center justify-between rounded-lg">
          <CompanyLogo />
          <NavBar
            links={routes.landingPages}
            activeClassName="bg-slate-500/30 shadow-md"
            mode="pc"
          />
          <SigninButton />
        </header>
        <>
        {children}
        </>
        <footer>
          <NavBar
            links={routes.landingPages}
            mode="mobile"
            activeClassName="bg-slate-500/30 shadow-md"
          />
        </footer>
      </div>
    </>
  );
}