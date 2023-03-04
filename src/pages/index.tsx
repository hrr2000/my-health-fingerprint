import { type NextPage } from "next";
import Head from "next/head";
import CompanyLogo from "@/components/brand/CompanyLogo";
import SigninButton from "@/components/brand/SigninButton";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import NavBar from "@/components/layouts/NavBar";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MHFP</title>
        <meta name="description" content="My Health Fingerprint system." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="grid min-h-screen grid-rows-[60px_1fr] overflow-hidden p-8 xl:py-8 xl:px-48"
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
            mode="pc"
          />
          <SigninButton />
        </header>
        <MainLayout cols="2">
          <MainLayout.columnOne className="flex flex-col items-start justify-center gap-10 text-white">
            <div className="flex flex-col gap-3 font-mont font-semibold capitalize">
              <motion.h2 className="text-5xl lg:text-6xl">
                Intelligent
              </motion.h2>
              <h2 className="text-5xl lg:text-6xl">automation</h2>
              <h2 className="text-5xl lg:text-6xl">
                For{" "}
                <span className="bg-gradient-to-r from-[#f75e8e] to-[#fc737c] bg-clip-text text-transparent">
                  healthcare
                </span>
              </h2>
            </div>
            <p className="max-w-[30ch] text-2xl font-normal leading-normal">
              Automate every patient encounter and workflow, from front desk to
              back office.
            </p>
            <button className="rounded-md bg-white px-6 py-3 font-semibold text-black shadow-md">
              Request demo
            </button>
          </MainLayout.columnOne>
          <MainLayout.columnTwo className="hidden md:flex">
            <Image
              width={1000}
              height={1000}
              src="/test.svg"
              alt=""
              priority={true}
            />
          </MainLayout.columnTwo>
        </MainLayout>
        <footer>
          <NavBar
            links={[
              { href: "features", label: "Features" },
              { href: "how-to-apply", label: "How To Apply?" },
              { href: "vission", label: "Vission" },
            ]}
            mode="mobile"
            activeClassName="bg-slate-500/30 shadow-md"
          />
        </footer>
      </div>
    </>
  );
};

export default Home;
