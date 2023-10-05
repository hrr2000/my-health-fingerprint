import { type ReactNode } from "react";
import { type Meta, type GenericProps } from "@/types/application";
import Head from "next/head";
import CompanyLogo from "@/components/brand/CompanyLogo";
import SigninButton from "@/components/brand/SigninButton";
import { NavBar } from "@/components/common/NavBar";
import { routes } from "@/routes";

interface LocalProps extends GenericProps {
  title: string;
  description: string;
  iconHref?: string;
  meta?: Meta[];
  children: ReactNode;
}

export default function PageLayout({
  title,
  description,
  iconHref,
  meta,
  children,
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
      <div className={`${title.toLowerCase()}`}>
        <div className={`bg-mesh grid min-h-screen grid-rows-[60px_1fr] p-8 text-primary xl:py-8 container m-auto`}>
          <header className="flex items-center justify-between rounded-lg">
            <CompanyLogo />
            <NavBar className="h-full" mode="pc">
              <NavBar.NavLinks
                className="flex h-full gap-9 text-lg text-primary"
                links={routes.landingPages}
                activeLinkClassName=""
                linkClassName=" flex px-4"
              />
            </NavBar>
            <SigninButton />
          </header>
          <div className="self-center py-10 lg:py-20">{children}</div>
          <footer>
            <NavBar className="h-full" mode="mobile">
              <NavBar.NavLinks
                className="flex h-full gap-9 text-lg text-primary"
                links={routes.landingPages}
                activeLinkClassName="outline-white outline-2"
                linkClassName="flex px-4 outline hover:outline-2  hover:outline-white"
              />
            </NavBar>
          </footer>
        </div>
      </div>
    </>
  );
}
