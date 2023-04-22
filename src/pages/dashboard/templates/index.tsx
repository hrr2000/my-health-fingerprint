import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import {IoIosAdd} from 'react-icons/io';
import {MdMedicalServices} from 'react-icons/md';
import {useRouter} from "next/router";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
  >;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const router = useRouter();

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative h-full">
        <section className="flex gap-2 px-5 py-3 border-black text-black bg-slate-100">
          <button className="p-1">
            <span> All Templates </span>
          </button>
          <button className="p-1">
            <span> Templates Store </span>
          </button>
        </section>
        <section className="flex h-full gap-2 p-5 border-r-2 border-black text-black">
          <button onClick={() => router.push('templates/create')}
                  className={`p-5 duration-300 hover:shadow-lg border-[1px] border-slate-300 h-40 w-40 flex justify-center items-center flex-col gap-4`}>
            <IoIosAdd size={25} />
            <span className={`text-xs`}>
              Create a Template
            </span>
          </button>
          <button className={`p-5 duration-300 hover:shadow-lg border-[1px] border-slate-300 h-40 w-40 flex justify-center items-center flex-col gap-4`}>
            <MdMedicalServices size={25} />
            <span className={`text-xs`}>
              Medical Plan Form
            </span>
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
