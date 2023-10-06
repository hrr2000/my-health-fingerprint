import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthZSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { usePatientContext } from "@/contexts/PatientContext";
import { TabsProvider } from "@/contexts/TabsContext";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PatientProfileView } from "@/components/patient/PatientProfileView";
import { PatientRecordsView } from "@/components/patient/PatientRecordsView";
import { PatientAppointmentsView } from "@/components/patient/PatientAppointmentsView";
import { CiCircleInfo, CiMedicalClipboard } from "react-icons/ci";
import GenericButton from "@/components/common/GenericButton";
import { IoIosAdd } from "react-icons/io";
import { api } from "@/utils/api";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslation } from "next-i18next";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user, links }) => {
  const { patientId, mode, setMode, profile, setPatientId } =
    usePatientContext();
  const { mutate: createProfile, isLoading: isCreatingProfile } =
    api.patient.createProfile.useMutation({
      onSuccess: () => profile?.refetch(),
    });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: recommendationsData } = api.patient.getRecommendations.useQuery(
    { patientId },
    {
      enabled: !!patientId.length && !profile.error,
    }
  );

  const {t} = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const recommendations = Object.keys(recommendationsData?.message || {})?.sort(
    (item1, item2) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const val1 = recommendationsData?.message?.[item1]?.[1];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const val2 = recommendationsData?.message?.[item2]?.[1];
      return val2 - val1;
    }
  );

  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_320px]">
        <section className="h-full gap-2 text-black">
          <div className="flex h-full flex-col overflow-hidden text-primary">
            <TabsProvider
              initialValue="profile"
              defaultTabClassName="font-medium top-[1px] relative h-14"
              defaultActiveTabClassName="border-b-[3px] border-primary text-highlight font-semibold"
            >
              {profile?.data && (
                <header className="text-md flex items-center gap-5 border-b-[1px] border-slate-300 px-5 text-black">
                  <Tab value="profile" textContext={t("Patient Profile")} />
                  <Tab value="record" textContext={t("Patient Record")} />
                  <Tab value="appointments" textContext={t("Patient Appointments")} />
                </header>
              )}

              <section
                className={`flex flex-1 flex-col ${
                  !profile?.data && profile?.fetchStatus === "idle"
                    ? "items-center"
                    : ""
                }`}
              >
                {!profile?.data && profile?.fetchStatus === "idle" && (
                  <div className="py-60 text-3xl  font-normal">
                    <div className="flex flex-col items-center justify-center gap-6">
                      <span className={`rounded-full bg-sky-100 p-5`}>
                        <CiMedicalClipboard size={50} />
                      </span>
                      <p className="text-2xl">{t("Please Search for a Patient")}</p>
                    </div>
                  </div>
                )}

                {profile?.data && (
                  <>
                    <TabPanel value="profile">
                      <PatientProfileView />
                    </TabPanel>
                    <TabPanel value="record">
                      <PatientRecordsView />
                    </TabPanel>
                    <TabPanel value="appointments">
                      <PatientAppointmentsView />
                    </TabPanel>
                  </>
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
              {t("Search For Patient")}
            </label>
            <input
              className="rounded-sm border-0 bg-slate-100 text-sm disabled:grayscale"
              type="text"
              onChange={(e) => setPatientId?.(e.target.value)}
              value={patientId}
              disabled={
                profile?.fetchStatus === "fetching" ||
                !!profile?.error ||
                !!profile?.data
              }
              placeholder={`${t("National Id")}...`}
              id="patient"
            />
            {(profile?.fetchStatus === "idle" ||
              profile?.fetchStatus === "fetching") && (
              <GenericButton
                theme={mode === "submit" ? "secondary" : "primary"}
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
                text={mode === "submit" ? t("Reset") : t("Search")}
                full
              />
            )}
            {profile?.error && (
              <ul>
                <li className="mb-3 text-red-500">Patient Not Found</li>
                <li className="flex items-center gap-1 rounded-md  font-medium capitalize text-primary ">
                  <CiCircleInfo size={25} />
                  <span>please use the Patient&apos;s NationalId</span>
                </li>
                <li className="flex items-center gap-1 rounded-md  font-medium capitalize text-primary ">
                  <CiCircleInfo size={25} />
                  <span>You can add a patient if not found</span>
                </li>
                <li className="flex items-center gap-1 rounded-md  font-medium capitalize text-primary ">
                  {profile.error.message.toLowerCase() ===
                    "no patients found" && (
                    <div className="mt-5 w-full rounded-md bg-primary  p-2 capitalize text-white shadow-md">
                      <h4 className="mb-1 text-lg font-bold">
                        valid nationalId
                      </h4>
                      <div className="flex items-center text-base ">
                        if you wish to
                        <button
                          disabled={isCreatingProfile}
                          onClick={() => {
                            if (patientId) {
                              createProfile({ nationalId: patientId });
                            }
                          }}
                          className="mx-2 rounded-md bg-white py-1 px-2 text-sm text-primary transition disabled:grayscale hover:bg-slate-100"
                        >
                          {isCreatingProfile ? (
                            <AiOutlineLoading className="animate-spin" />
                          ) : (
                            <IoIosAdd size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
          {/*<div className={`my-5 flex flex-col gap-3`}>*/}
          {/*  <h2*/}
          {/*    className={*/}
          {/*      "relative mb-4 flex items-center gap-2 text-sm font-bold text-primary"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <span>*/}
          {/*      <AiFillRobot size={18} />*/}
          {/*    </span>*/}
          {/*    <span>AI Recommendations For this patient!</span>*/}
          {/*  </h2>*/}
          {/*  {!profile.error &&*/}
          {/*    recommendations.slice(0, 100).map((item, idx) => {*/}
          {/*      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/}
          {/*      const percent: number =*/}
          {/*        recommendationsData?.message?.[item]?.[1];*/}
          {/*      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/}
          {/*      const percent2: number =*/}
          {/*        recommendationsData?.message?.[item]?.[1];*/}
          {/*      return (*/}
          {/*        <div*/}
          {/*          key={`recommendations-${item}`}*/}
          {/*          style={{*/}
          {/*            opacity: `${percent / 100}`,*/}
          {/*          }}*/}
          {/*          className={`relative w-full cursor-pointer rounded-lg border-[1px] transition hover:scale-[1.02] ${*/}
          {/*            percent > 50*/}
          {/*              ? "border-green-400 text-green-400"*/}
          {/*              : percent > 50*/}
          {/*              ? "border-lime-400 text-lime-400"*/}
          {/*              : "border-orange-400 text-orange-400"*/}
          {/*          } bg-slate-100 p-3  shadow-lg hover:animate-none`}*/}
          {/*        >*/}
          {/*          <div className={`flex flex-col gap-2 text-sm`}>*/}
          {/*            <div className="flex justify-between">*/}
          {/*              <div className={"flex gap-2"}>*/}
          {/*                <span>*/}
          {/*                  <GiMedicines size={20} />*/}
          {/*                </span>*/}
          {/*                <span className={"font-bold"}>{item}</span>*/}
          {/*              </div>*/}
          {/*              <span>*/}
          {/*                <strong className={"text-lg"}>{percent}%</strong>{" "}*/}
          {/*                Recommended !!*/}
          {/*              </span>*/}
          {/*            </div>*/}
          {/*            <span>*/}
          {/*              <div className="h-2 w-full rounded-lg bg-slate-300">*/}
          {/*                <div*/}
          {/*                  className={`h-full rounded-lg*/}
          {/*                  ${*/}
          {/*                    percent > 50*/}
          {/*                      ? "bg-green-400"*/}
          {/*                      : percent > 50*/}
          {/*                      ? "bg-lime-400"*/}
          {/*                      : "bg-orange-400"*/}
          {/*                  }`}*/}
          {/*                  style={{*/}
          {/*                    width: `${percent}%`,*/}
          {/*                  }}*/}
          {/*                ></div>*/}
          {/*              </div>*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*</div>*/}
        </aside>
      </main>
    </DashBoardLayout>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getServerAuthZSession(context, "patients");
}
