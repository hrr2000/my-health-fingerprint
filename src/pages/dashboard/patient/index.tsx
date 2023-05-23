import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { GiHealthNormal } from "react-icons/gi";
import { usePatientContext } from "@/contexts/PatientContext";
import { TabsProvider } from "@/components/tabs/TabsContext";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/contexts/TabPanel";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PatientProfileView } from "@/components/patient/PatientProfileView";
import { PatientRecordsView } from "@/components/patient/PatientRecordsView";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const { profile, setPatientId } = usePatientContext();
  const [inputVal, setInputVal] = useState("");

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_250px] gap-2">
        <section className="gap-2 text-black ">
          <div className="flex h-full flex-col overflow-hidden border-r-[1px] border-black">
            <TabsProvider
              initialValue="profile"
              defaultTabClassName="border-b-2 p-2 font-semibold"
              defaultActiveTabClassName="bg-violet-400/30 border-b-2 p-2 font-semibold transition-all"
            >
              {profile?.data && (
                <header className="flex min-w-[100px] gap-2 border-[1px] border-b-black text-lg text-black">
                  <Tab value="profile" textContext="Profile" />
                  <Tab value="record" textContext="Record" />
                </header>
              )}
              <section
                className={` flex  flex-1 flex-col p-2  ${
                  !profile?.data && profile?.fetchStatus === "idle"
                    ? "items-center justify-center"
                    : ""
                }`}
              >
                <span className="font-mono text-3xl font-semibold">
                  {!profile?.data && profile?.fetchStatus === "idle" && (
                    <div className="flex flex-col items-center gap-6">
                      <GiHealthNormal size={80} />
                      <p className="text-3xl">Please Search for a patient</p>
                    </div>
                  )}
                </span>
                {profile?.data && (
                  <div>
                    <TabPanel value="profile">
                      <PatientProfileView />
                    </TabPanel>
                    <TabPanel value="record">
                      <PatientRecordsView />
                    </TabPanel>
                  </div>
                )}
              </section>
            </TabsProvider>

            {!profile?.data && profile?.fetchStatus === "fetching" && (
              <LoadingSpinner />
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
            {!profile?.data &&
              (profile?.fetchStatus === "idle" ||
                profile?.fetchStatus === "fetching") && (
                <button
                  disabled={profile?.fetchStatus === "fetching"}
                  onClick={() => setPatientId?.(inputVal)}
                  className="rounded-md bg-black p-2 text-white transition-all disabled:bg-slate-700 hover:bg-purple-800 "
                >
                  Search
                </button>
              )}
            {profile?.data &&
              (profile?.fetchStatus === "idle" ||
                profile?.fetchStatus === "fetching") && (
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
            {profile?.error && (
              <p>
                Patient Not Found Please Make Sure to use the Patient NationalId
              </p>
            )}
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
