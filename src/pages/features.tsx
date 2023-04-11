import { type NextPage } from "next";
import PageLayout from "@/layouts/PageLayout";
import MainLayout from "@/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title="Home" description="مهفب ءفءح">
      <MainLayout cols="1">
        Software Goals Regarding Organization owners and Employees 1 - Ease of
        Use 2 - Ease of signing up however accompanied with high emphasis on
        valid docs 3 - Ease of on boarding process for employees 4 - Ease and
        speed of information access and navigation almost intuitive 5 -
        accessibility is key Regarding Patients 1 - Safety of accessing his
        information and making sure his info is not getting abused 2 - foolproof
        methods for identity validation 3 - ease of tracking patient history
        Regarding security 1 - Built with fine grained authorization as it main
        ideology 2 - data access tracking 3 - applying for usage is not trivial
        and standard , clear and procedures will be defined for acceptance
      </MainLayout>
    </PageLayout>
  );
};

export default Home;
