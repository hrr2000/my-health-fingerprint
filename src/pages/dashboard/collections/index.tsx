import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { IoIosAdd } from "react-icons/io";
import { MdMedicalServices } from "react-icons/md";
import { useRouter } from "next/router";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const router = useRouter();

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative h-full">
        <section className="flex gap-2 border-black bg-slate-100 px-5 py-3 text-black">
          <button className="p-1">
            <span> All Templates </span>
          </button>
          <button className="p-1">
            <span> Templates Store </span>
          </button>
        </section>
        <section className="flex h-full gap-2 border-r-2 border-black p-5 text-black">
          <button
            onClick={() => void router.push("collections/create")}
            className={`flex h-40 w-40 flex-col items-center justify-center gap-4 border-[1px] border-slate-300 p-5 duration-300 hover:shadow-lg`}
          >
            <IoIosAdd size={25} />
            <span className={`text-xs`}>Create a Collection</span>
          </button>
          <button
            className={`flex h-40 w-40 flex-col items-center justify-center gap-4 border-[1px] border-slate-300 p-5 duration-300 hover:shadow-lg`}
          >
            <MdMedicalServices size={25} />
            <span className={`text-xs`}>Medical Plan Form</span>
          </button>
        </section>
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
