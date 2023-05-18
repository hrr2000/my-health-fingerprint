import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { usePatientContext } from "@/contexts/PatientContext";
import { TabsProvider } from "@/contexts/TabsContext";
import { Tab } from "@/contexts/Tab";
import { TabPanel } from "@/contexts/TabPanel";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const { data, error, fetchStatus, setPatientId } = usePatientContext();
  const [inputVal, setInputVal] = useState("");

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_250px] gap-2">
        <section className=" bg-slate- gap-2 border-r-[1px] border-slate-200 bg-slate-200 p-3 pb-16 text-black ">
          <div className="flex h-full overflow-hidden rounded-md border-[1px] border-slate-200 bg-white shadow-md">
            <TabsProvider
              initialValue="profile"
              defaultTabClassName="border-b-2 border-white p-2"
              defaultActiveTabClassName="bg-violet-400/30 border-b-2 border-white p-2 transition-all"
            >
              {data && (
                <aside className="flex min-w-[100px] flex-col  bg-black  text-lg text-white">
                  <Tab value="profile" textContext="Profile" />
                  <Tab value="scan" textContext="Scan" />
                  <Tab value="record" textContext="Record" />
                </aside>
              )}
              <section
                className={` flex  flex-1 flex-col p-2  ${
                  !data && fetchStatus === "idle"
                    ? "items-center justify-center"
                    : ""
                }`}
              >
                <span className="font-mono text-3xl font-semibold">
                  {!data && fetchStatus === "idle" && (
                    <div className="flex flex-col items-center gap-6">
                      <GiHealthNormal size={80} />
                      <p className="text-3xl">Please Search for a patient</p>
                    </div>
                  )}
                </span>
                {data && (
                  <div>
                    <TabPanel value="profile">
                      <p>{JSON.stringify(data)}</p>
                    </TabPanel>
                    <TabPanel value="scan">
                      <p>SCAN TAB</p>
                    </TabPanel>
                    <TabPanel value="record">
                      <p>RECORDS TAB</p>
                    </TabPanel>
                  </div>
                )}
              </section>
            </TabsProvider>

            {!data && fetchStatus === "fetching" && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <AiOutlineLoading3Quarters size={60} className="animate-spin" />
              </div>
            )}
          </div>
        </section>

        <aside className="relative py-4 px-2 text-black ">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient" className="text-lg font-semibold">
              Search For Patient
            </label>
            <input
              className="rounded-md text-black  "
              type="text"
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
              placeholder="NationalId..."
              id="patient"
            />
            {!data &&
              (fetchStatus === "idle" || fetchStatus === "fetching") && (
                <button
                  disabled={fetchStatus === "fetching"}
                  onClick={() => setPatientId?.(inputVal)}
                  className="rounded-md bg-black p-2 text-white transition-all disabled:bg-slate-700 hover:bg-purple-800 "
                >
                  Search
                </button>
              )}
            {data && (fetchStatus === "idle" || fetchStatus === "fetching") && (
              <button
                onClick={() => {
                  setPatientId?.("");
                  setInputVal("");
                }}
                className="rounded-md bg-red-600 p-2 text-white"
              >
                Reset
              </button>
            )}
            {error &&
              "Patient Not Found Please Make Sure to use the Patient's NationalId"}
          </div>
        </aside>
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
