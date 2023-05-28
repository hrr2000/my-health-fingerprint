import { type NextPage } from "next";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import { motion } from "framer-motion";
import GenericButton from "@/components/common/GenericButton";
import {useRouter} from "next/router";
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Home" description="">
      <MainLayout cols="2">
        <MainLayout.columnOne className="flex flex-col items-start justify-center gap-10 font-tajawal">
          <div className="flex flex-col gap-3 font-mont font-semibold capitalize text text-5xl lg:text-7xl">
            <motion.h2 className="">Intelligent</motion.h2>
            <h2 className="">automation</h2>
            <h2 className="">
              <span>For </span>
              <span className="text-highlight">healthcare</span>
            </h2>
          </div>
          <p className="max-w-[30ch] text-4xl font-normal leading-normal">
            Automate every patient encounter and workflow, from front desk to
            back office.
          </p>
          <GenericButton text={"Get Started"} theme={"primary"} onClick={() => {
            void router.push('/dashboard/home');
          }} />
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
