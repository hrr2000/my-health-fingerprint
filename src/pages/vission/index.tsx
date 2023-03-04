import { type NextPage } from "next";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title="Home" description="مهفب ءفءح">
      Software Goals
      <br />

      Regarding Organization owners and Employees
      <br />
      1 - Ease of Use
      <br />
      2 - Ease of signing up however accompanied with high emphasis on valid docs 
      <br />
      3 - Ease of on boarding process for employees 
      <br />
      4 - Ease and speed of information access and navigation almost intuitive 
      <br />
      5 - accessibility is key 
      <br />

      Regarding Patients 
      <br />
      1 - Safety of accessing his information and making sure his info is not getting abused
      <br />
      2 - foolproof methods for identity validation
      <br />
      3 - ease of tracking patient's history 
      <br />

      Regarding security 
      <br />
      1 - Built with fine grained authorization as it's main ideology
      <br />
      2 - data access tracking 
      <br />
      3 - applying for usage is not trivial and standard , clear and  procedures will be
      <br />
      defined for acceptance
      <br />
    </PageLayout>
  );
};

export default Home;
