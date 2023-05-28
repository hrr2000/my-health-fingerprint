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
import { TabsProvider } from "@/contexts/TabsContext";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PatientProfileView } from "@/components/patient/PatientProfileView";
import { PatientRecordsView } from "@/components/patient/PatientRecordsView";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const { patientId, mode, setMode, profile, setPatientId } =
    usePatientContext();

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_250px] gap-2">
        <section className="gap-2 text-black ">
          <div className="flex h-full flex-col overflow-hidden border-r-[1px] border-black">
            <TabsProvider
              initialValue="profile"
              defaultTabClassName="font-semibold rounded-md p-2"
              defaultActiveTabClassName="bg-violet-400  text-white shadow-md"
            >
              {profile?.data && (
                <header className="flex min-w-[100px] gap-2 border-[1px] border-b-black/20 p-1 text-lg text-black">
                  <Tab value="profile" textContext="Profile" />
                  <Tab value="record" textContext="Record" />
                </header>
              )}

              <section
                className={`flex flex-1 flex-col ${
                  !profile?.data && profile?.fetchStatus === "idle"
                    ? "items-center justify-center"
                    : ""
                }`}
              >
                {!profile?.data && profile?.fetchStatus === "idle" && (
                  <div className="font-mono text-3xl font-semibold">
                    <div className="flex flex-col items-center gap-6">
                      <GiHealthNormal size={80} />
                      <p className="text-3xl">Please Search for a patient</p>
                    </div>
                  </div>
                )}

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
              onChange={(e) => setPatientId?.(e.target.value)}
              value={patientId}
              placeholder="NationalId..."
              id="patient"
            />
            {(profile?.fetchStatus === "idle" ||
              profile?.fetchStatus === "fetching") && (
              <button
                type={mode}
                disabled={profile?.fetchStatus === "fetching"}
                onClick={() => {
                  setMode?.(mode === "submit" ? "reset" : "submit");
                  if (mode === "submit") {
                    setPatientId?.("");
                  }
                }}
                className={`rounded-md ${
                  mode === "submit" ? "bg-red-600" : "bg-black"
                }  p-2 text-white transition-all  disabled:bg-slate-700 hover:bg-purple-800`}
              >
                {mode === "submit" ? "Reset" : "Search"}
              </button>
            )}
            {/* {profile?.data &&
              (profile?.fetchStatus === "idle" ||
                profile?.fetchStatus === "fetching") && (
                <button
                  onClick={() => {
                    setPatientId?.("");
                  }}
                  className="rounded-md bg-red-600 p-2 text-white"
                >
                  Reset
                </button>
              )} */}
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
