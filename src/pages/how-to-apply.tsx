import React from "react";
import { type NextPage } from "next";
import CompanyLogo from "@/components/brand/CompanyLogo";
import SigninButton from "@/components/brand/SigninButton";
import MainLayout from "@/components/layouts/MainLayout";
import NavBar from "@/components/layouts/NavBar";

const HowtoApply: NextPage = () => {
  return (
    <div
      className="grid min-h-screen grid-rows-[60px_1fr] p-8 xl:py-8 xl:px-48"
      style={{
        background: "radial-gradient(#27384e, #010304)",
      }}
    >
      <header className="flex items-center justify-between rounded-lg">
        <CompanyLogo />
        <NavBar
          links={[
            { href: "features", label: "Features" },
            { href: "how-to-apply", label: "How To Apply?" },
            { href: "vission", label: "Vission" },
          ]}
          activeClassName="bg-slate-500/30 shadow-md"
        />
        <SigninButton />
      </header>
      <MainLayout cols="1">
        <MainLayout.columnOne className="p-y text-5xl font-extrabold text-white">
          Hi how to apply
        </MainLayout.columnOne>
      </MainLayout>
    </div>
  );
};

export default HowtoApply;
