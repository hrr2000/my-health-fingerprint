import { NextPage } from "next";
import PageLayout from "@/layouts/PageLayout";
import MainLayout from "@/layouts/MainLayout";

const EHRSVisionPage: NextPage = () => {
  const ehrsVision = [
    {
      title: "Seamless Integration",
      description: "Enable seamless integration with existing healthcare systems and infrastructure, providing a unified and holistic view of patient data.",
    },
    {
      title: "Enhanced Efficiency and Productivity",
      description: "Streamline workflows and reduce administrative burden for healthcare professionals through automation, intuitive interfaces, and reduced paperwork.",
    },
    {
      title: "Advanced Data Analytics and Insights",
      description: "Leverage advanced data analytics and AI algorithms to unlock valuable insights from large-scale health data, enabling accurate diagnoses, personalized treatment plans, and proactive preventive measures.",
    },
    {
      title: "Robust Security and Privacy",
      description: "Ensure the highest level of data security, access controls, encryption, and privacy mechanisms to protect patient information and maintain confidentiality.",
    },
    {
      title: "Interoperability and Interconnectivity",
      description: "Promote interoperability and seamless data exchange between healthcare providers, facilitating continuity of care and comprehensive health records.",
    },
  ];

  return (
    <PageLayout title="home" description="Our Vision for Electrical Health Record System">
      <MainLayout cols="1">
        <div>
          <h1 className="text-2xl font-bold mb-4">Our Vision for Electrical Health Record System</h1>
          <div className="space-y-4 mb-4">
            {ehrsVision.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-md">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-800">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed">
            Through our vision for the EHRS page, we aspire to create a transformative system that empowers healthcare
            professionals, engages patients, and improves healthcare outcomes. By harnessing the power of technology and
            innovation, we aim to drive advancements in healthcare delivery, promote data-driven decision-making, and
            ultimately contribute to the well-being of individuals and communities.
          </p>
        </div>
      </MainLayout>
    </PageLayout>
  );
};

export default EHRSVisionPage;