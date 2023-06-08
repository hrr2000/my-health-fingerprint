import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { IoIosAdd } from "react-icons/io";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { CiMedicalCase } from "react-icons/ci";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const [page, setPage] = useState(1);
  const { data: paginatedData, isLoading } = api.collection.list.useQuery({
    page: page,
    perPage: 20,
  }, {
    cacheTime: 0,
  });
  const router = useRouter();

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative ">
        <section className="flex gap-2 bg-slate-50 px-5 py-3 text-black">
          <button className="p-1">
            <span> All Templates </span>
          </button>
          {/*<button className="p-1" onClick={() => setPage(page + 1)}>*/}
          {/*  <span> Page+</span>*/}
          {/*</button>*/}
          {/*<button className="p-1" onClick={() => setPage(page - 1)}>*/}
          {/*  <span> Page-</span>*/}
          {/*</button>*/}
          <button className="p-1">
            <span> Templates Store </span>
          </button>
        </section>
        <section className="grid h-[87vh] grid-cols-collections content-start gap-2 overflow-auto p-5 text-primary ">
          <button
            onClick={() => void router.push("collections/create")}
            className={`flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl border-[3px] border-transparent p-5 duration-300 hover:border-primary hover:shadow-lg`}
          >
            <IoIosAdd size={25} />
            <span className={`text-sm font-bold`}>Create a Collection</span>
          </button>

          {!isLoading &&
            paginatedData &&
            paginatedData.collections.map((collection) => (
              <button
                key={collection._id.toString()}
                onClick={() =>
                  void router.push(`collections/${collection._id.toString()}`)
                }
                className={`flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl border-[3px] border-transparent p-5 duration-300 hover:border-primary hover:shadow-lg`}
              >
                <CiMedicalCase size={40} />
                <span className={`text-sm font-bold`}>{collection.name}</span>
              </button>
            ))}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <AiOutlineLoading3Quarters size={60} className="animate-spin" />
            </div>
          )}
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
