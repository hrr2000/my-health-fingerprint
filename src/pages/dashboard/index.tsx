import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
const DashboardPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  const { data, isLoading } = api.patient.getDestro.useQuery();
  return (
    <>
      {!isLoading && (
        <>
          <div>Hi {JSON.stringify(user)}</div> <div>{JSON.stringify(data)}</div>
        </>
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
