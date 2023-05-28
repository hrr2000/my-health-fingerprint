import { usePatientContext } from "@/contexts/PatientContext";
import useGetPatientProfileData from "@/hooks/useGetPatientProfileData";
import React from "react";
import Image from "next/image";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const PatientProfileView = () => {
  const { patientId } = usePatientContext();
  const { data, error, fetchStatus } = useGetPatientProfileData(
    patientId || ""
  );

  return (
    <main className={'relative flex-1'}>
      {data ? (
        <div className="p-5">
          <div className="flex flex-col items-center gap-2 p-5">
            <Image
              className="rounded-full shadow-md"
              width={220}
              height={220}
              priority
              src={
                data.profile.imageUrl ||
                "https://i.pravatar.cc/220?u=fake@pravatar.com"
              }
              alt=""
            />
            <h2 className="text-3xl font-bold capitalize">
              Hi , {data.profile.name}
            </h2>
          </div>
          <ul className="grid grid-cols-2 rounded-md bg-slate-300 p-5 capitalize shadow-md">
            <li>full name : {data.profile.name || "N/A"}</li>
            <li>gender : {data.profile.gender || "N/A"}</li>
            <li>
              main phone number : {data.profile.primary_phone_number || "N/A"}
            </li>

            <li>
              other phone numbers :
              {data.profile.alternative_phone_numbers || "N/A"}
            </li>
            <li>national id : {data.profile.nationalId}</li>
          </ul>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};
