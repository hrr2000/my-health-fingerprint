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

const DashboardPage: serverSidePropsType = ({ user }) => {

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_350px]">
        <section className="flex border-r-[1px] border-slate-200 text-black">
        </section>
        <section className="flex flex-col border-slate-200 text-black p-5">
          <div className={`w-full py-2 px-4`}>
            <h3 className={`text-slate-800 mb-2 border-b-slate-200 border-b-[1px]`}>Template Details</h3>
            <div className={`flex flex-col gap-2 text-sm items-center py-1`}>
              <select className="text-sm text-black w-full border-slate-300">
                <option>select icon</option>
              </select>
              <input
                className="text-sm text-black w-full border-slate-300"
                type="text"
                placeholder="name..."
              />
              <textarea
                className="text-sm text-black w-full border-slate-300"
                rows={3}
                placeholder="short description..."
              />
            </div>
          </div>
          <div className={`w-full py-2 px-4`}>
            <h3 className={`text-slate-800 mb-2 border-b-slate-200 border-b-[1px]`}>Preferences</h3>
            <div className={`flex gap-2 text-sm items-center py-1`}>
              <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
              <label htmlFor={'is_template_printable'} >Printable</label>
            </div>
            <div className={`flex gap-2 text-sm items-center py-1`}>
              <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
              <label htmlFor={'is_template_printable'} >Patient Profile</label>
            </div>
            <div className={`flex gap-2 text-sm items-center py-1`}>
              <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
              <label htmlFor={'is_template_printable'} >Public</label>
            </div>
          </div>
          <div className={`w-full py-2 px-4`}>
            <button
              className="rounded-md bg-black p-2 text-white disabled:bg-slate-700 w-full"
            >
              Save
            </button>
          </div>
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
