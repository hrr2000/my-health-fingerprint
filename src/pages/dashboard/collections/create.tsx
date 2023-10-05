import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession, getServerAuthZSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import TemplateBuilder from "@/components/templates/TemplateBuilder";
import { routes } from "@/routes";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user, links }) => {
  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_350px]">
        <TemplateBuilder />
      </main>
    </DashBoardLayout>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getServerAuthZSession(context, "collections");
}
