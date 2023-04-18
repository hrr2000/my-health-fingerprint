import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { api } from "@/utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DashboardPage: serverSidePropsType = ({ user }) => {
  const [patientId, setPatientId] = useState("");
  const { data, fetchStatus, error } = api.patient.findOne.useQuery(
    { id: patientId },
    { enabled: !!patientId, retry: 1 }
  );
  const [inputVal, setInputVal] = useState("");

  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative grid h-full grid-cols-[1fr_250px] gap-2">
        <section className="flex gap-2 border-r-2 border-black  text-black ">
          {!data && fetchStatus === "idle" ? null : (
            <aside className="w-[70px]">POs</aside>
          )}
          <section
            className={` flex  flex-1 flex-col  ${
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
            {data && JSON.stringify(data)}
          </section>
          {!data && fetchStatus === "fetching" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <AiOutlineLoading3Quarters size={60} className="animate-spin" />
            </div>
          )}
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
                  onClick={() => setPatientId(inputVal)}
                  className="rounded-md bg-black p-2 text-white disabled:bg-slate-700 "
                >
                  Search
                </button>
              )}
            {data && (fetchStatus === "idle" || fetchStatus === "fetching") && (
              <button
                onClick={() => {
                  setPatientId("");
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
