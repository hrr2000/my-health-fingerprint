import React from "react";
import { type NextPage } from "next";
import PageTransitionWrapper from "@/components/global-animations/PageTransitionWrapper";
import Link from "next/link";
import CompanyLogo from "@/components/brand/CompanyLogo";
import SigninButton from "@/components/brand/SigninButton";

const Vission: NextPage = () => {
  return (
    <div
      className="grid min-h-screen grid-rows-[60px_1fr] p-8 xl:py-8 xl:px-48"
      style={{
        background: "radial-gradient(#27384e, #010304)",
      }}
    >
      <header className="flex items-center justify-between rounded-lg">
        <CompanyLogo />
        <nav className="hidden h-full lg:block">
          <ul className="flex h-full gap-9 text-lg text-white">
            {["vission", "how-to-apply", "features"].map((linkText) => (
              <li
                key={linkText}
                className="flex rounded-md px-2 transition-all  hover:bg-slate-500/30 hover:shadow-md"
              >
                <Link className="flex items-center" href={`/${linkText}`}>
                  {linkText}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SigninButton />
      </header>
      <PageTransitionWrapper>
        <main className="grid gap-3 overflow-hidden text-white md:grid-cols-2 ">
          hi features
        </main>
      </PageTransitionWrapper>
    </div>
  );
};

export default Vission;
