import { type NextPage } from "next";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import { motion } from "framer-motion";
import { api } from "@/utils/api";
const Home: NextPage = () => {
  const { mutate } = api.patient.createOne.useMutation();

  return (
    <PageLayout title="Home" description="مهفب ءفءح">
      <MainLayout cols="2">
        <MainLayout.columnOne className="flex flex-col items-start justify-center gap-10 text-white">
          <div className="flex flex-col gap-3 font-mont font-semibold capitalize">
            <motion.h2 className="text-5xl lg:text-6xl">Intelligent</motion.h2>
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
          <button
            onClick={() => mutate()}
            className="rounded-md bg-white px-6 py-3 font-semibold text-black shadow-md"
          >
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
    </PageLayout>
  );
};

export default Home;
