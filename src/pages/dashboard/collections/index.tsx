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
      <main className="relative text-primary">
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
        <div className={`relative grid w-full grid-cols-collections gap-5 content-start py-5 px-10`}>
          <button
            onClick={() => void router.push("collections/create")}
            className={`relative flex w-full flex-col items-start justify-center rounded-xl border-[1px] border-slate-300 p-5 capitalize duration-300 disabled:grayscale hover:border-primary hover:shadow-lg`}
          >
            <div className="flex items-center gap-2">
              <span><IoIosAdd size={23} /></span>
              <span className={`text-sm font-bold`}>Create a Collection</span>
            </div>
          </button>

          {!isLoading &&
            paginatedData &&
            paginatedData.collections.map((collection) => (
              <button
                key={collection._id.toString()}
                onClick={() =>
                  void router.push(`collections/${collection._id.toString()}`)
                }
                className={`relative flex w-full flex-col items-start justify-center rounded-xl border-[1px] border-slate-300 p-5 capitalize duration-300 disabled:grayscale hover:border-primary hover:shadow-lg`}
              >
                <div className="flex items-center gap-2">
                  <span><CiMedicalCase size={23} /></span>
                  <span className={`text-sm font-bold`}>{collection.name}</span>
                </div>
              </button>
            ))}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <AiOutlineLoading3Quarters size={60} className="animate-spin" />
            </div>
          )}
        </div>
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
