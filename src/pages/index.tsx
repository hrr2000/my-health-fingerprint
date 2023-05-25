import { type NextPage } from "next";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import { motion } from "framer-motion";
import { api } from "@/utils/api";
import GenericButton from "@/components/common/GenericButton";
const Home: NextPage = () => {
  const { mutate } = api.test.useMutation();

  return (
    <PageLayout title="Home" description="">
      <MainLayout cols="2">
        <MainLayout.columnOne className="flex flex-col items-start justify-center gap-10 font-tajawal">
          <div className="flex flex-col gap-3 font-mont font-semibold capitalize">
            <motion.h2 className="text-5xl lg:text-7xl">Intelligent</motion.h2>
            <h2 className="text text-5xl lg:text-7xl">automation</h2>
            <h2 className="text-5xl lg:text-7xl">
              <span className={`text-7xl`}>For </span>
              <span className="text-highlight">healthcare</span>
            </h2>
          </div>
          <p className="max-w-[30ch] text-4xl font-normal leading-normal">
            Automate every patient encounter and workflow, from front desk to
            back office.
          </p>
          <GenericButton text={"Request a Demo"} theme={"primary"} />
        </MainLayout.columnOne>
        <MainLayout.columnTwo className="hidden md:flex">
          <Image
            width={900}
            height={900}
            draggable={false}
            src="/banner.png"
            alt=""
            priority={true}
          />
        </MainLayout.columnTwo>
      </MainLayout>
    </PageLayout>
  );
};

export default Home;
