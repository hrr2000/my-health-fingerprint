import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { usePatientContext } from "@/contexts/PatientContext";
import { TabsProvider } from "@/contexts/TabsContext";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PatientProfileView } from "@/components/patient/PatientProfileView";
import { PatientRecordsView } from "@/components/patient/PatientRecordsView";
import {CiMedicalClipboard, CiMedicalCross} from "react-icons/ci";
import GenericButton from "@/components/common/GenericButton";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const { patientId, mode, setMode, profile, setPatientId } =
    usePatientContext();

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_280px]">
        <section className="gap-2 text-black ">
          <div className="flex flex-col overflow-hidden text-primary">
            <TabsProvider
              initialValue="profile"
              defaultTabClassName="font-medium top-[1px] relative h-14"
              defaultActiveTabClassName="border-b-[3px] border-primary text-highlight font-semibold"
            >
              {profile?.data && (
                <header className="flex gap-5 items-center px-5 border-b-[1px] border-slate-300 text-md text-black">
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
                  <div className=" text-3xl font-normal  py-40">
                    <div className="flex flex-col items-center justify-center gap-6">
                      <span className={`p-5 bg-sky-100 rounded-full`}>
                        <CiMedicalClipboard size={50} />
                      </span>
                      <p className="text-2xl">Please Search for a Patient</p>
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

        <aside className="relative bg-white py-4 px-5 text-black ">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient" className="font-semibold">
              Search For Patient
            </label>
            <input
              className="rounded-sm text-sm bg-slate-100 border-0"
              type="text"
              onChange={(e) => setPatientId?.(e.target.value)}
              value={patientId}
              placeholder="NationalId..."
              id="patient"
            />
            {(profile?.fetchStatus === "idle" ||
              profile?.fetchStatus === "fetching") && (
              <GenericButton
                theme={mode === "submit" ? 'secondary' : 'primary'}
                type={mode}
                disabled={profile?.fetchStatus === "fetching"}
                onClick={() => {
                  if (patientId) {
                    setMode?.(mode === "submit" ? "reset" : "submit");
                  }
                  if (mode === "submit") {
                    setPatientId?.("");
                  }
                }}
                className={`rounded-md ${
                  mode === "submit" ? "bg-red-600" : "bg-primary"
                }  p-2 text-white transition-all  disabled:bg-slate-700 hover:bg-primary-hover`}
                text={mode === "submit" ? "Reset" : "Search"}
                full
              />
            )}
            {profile?.error && (
              <p className={`text-red-500`}>
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
