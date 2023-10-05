import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession, getServerAuthZSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { OrganizationModel, UserModel } from "@/server/models";
import { dbConnect } from "@/server/db";
import { routes } from "@/routes";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const IndexPage: serverSidePropsType = ({
  user,
  links,
  pageSpecificPermissions,
}) => {
  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative ">
        <section className="flex gap-2 bg-slate-50 px-5 py-3 text-black">
          Hello org
        </section>
      </main>
    </DashBoardLayout>
  );
};

export default IndexPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getServerAuthZSession(context, "organizations");
}
