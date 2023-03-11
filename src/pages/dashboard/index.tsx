import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/components/layouts/DashboardLayout";

// type serverSideProps = NextPage<
// InferGetServerSidePropsType<typeof getServerSideProps>>;

const DashboardPage = ({}) => {
  return (
    <DashBoardLayout user={{ id: "11" }} title="" description="">
      <div>hi</div>
    </DashBoardLayout>
  );
};

export default DashboardPage;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerAuthSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }
//   return {
//     props: {
//       user: session.user,
//     },
//   };
// }
