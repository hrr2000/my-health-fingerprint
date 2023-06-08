import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const IndexPage: serverSidePropsType = ({ user }) => {
  return (
    <DashBoardLayout user={user} title="" description="">
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
