import { NextPage } from "next";
import PageLayout from "@/layouts/PageLayout";
import MainLayout from "@/layouts/MainLayout";

const Home: NextPage = () => {
  const softwareGoals = [
    "Ease of Use",
    "Ease of signing up however accompanied with high emphasis on valid docs",
    "Ease of onboarding process for employees",
    "Ease and speed of information access and navigation, almost intuitive",
    "Accessibility is key",
  ];

  const patientGoals = [
    "Safety of accessing their information and making sure it's not getting abused",
    "Foolproof methods for identity validation",
    "Ease of tracking patient history",
  ];

  const securityGoals = [
    "Built with fine-grained authorization as its main ideology",
    "Data access tracking",
    "Applying for usage is not trivial and standard, clear procedures will be defined for acceptance",
  ];

  return (
    <PageLayout title="Home" description="مهفب ءفءح">
      <MainLayout cols="1">
        <div className="mb-4">
          <p className="font-bold text-2xl">Software Goals Regarding Organization owners and Employees</p>
          {softwareGoals.map((goal, index) => (
            <p key={index} className="pl-4">
              <span className="font-bold">{index + 1} - </span>
              {goal}
            </p>
          ))}
        </div>
        <div className="mb-4">
          <p className="font-bold text-2xl">Regarding Patients</p>
          {patientGoals.map((goal, index) => (
            <p key={index} className="pl-4">
              <span className="font-bold">{index + 1} - </span>
              {goal}
            </p>
          ))}
        </div>
        <div>
          <p className="font-bold text-2xl">Regarding security</p>
          {securityGoals.map((goal, index) => (
            <p key={index} className="pl-4">
              <span className="font-bold">{index + 1} - </span>
              {goal}
            </p>
          ))}
        </div>
      </MainLayout>
    </PageLayout>
  );
};

export default Home;
