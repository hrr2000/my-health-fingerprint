import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import TemplateBuilder from "@/components/templates/TemplateBuilder";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
  >;

const DashboardPage: serverSidePropsType = ({ user }) => {

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_350px]">
        <TemplateBuilder />
      </main>
    </DashBoardLayout>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
