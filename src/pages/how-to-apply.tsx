import { type NextPage } from "next";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title="Home" description="مهفب ءفءح">
      Pay Money and we will use them for 20$ a day.
    </PageLayout>
  );
};

export default Home;
