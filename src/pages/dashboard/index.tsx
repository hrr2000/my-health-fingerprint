import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import DashBoardLayout from "@/layouts/DashboardLayout";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const isDesktop = useIsDesktop();
  return (
    <>
      {isDesktop ? (
        <DashBoardLayout user={user} title="" description="">
          <span>hi</span>
        </DashBoardLayout>
      ) : (
        <div className="grid min-h-screen place-items-center text-4xl font-bold">
          <span>Use a Desktop Pls</span>
        </div>
      )}
    </>
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
