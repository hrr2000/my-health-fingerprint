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
          <div className="flex flex-col items-center gap-5 p-5">
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
              Mr, {data.profile.name}
            </h2>
          </div>
          <ul className="grid grid-cols-2 rounded-md border-2 p-5 capitalize text-lg gap-3">
            <li><strong>full name: </strong> {data.profile.name || "N/A"}</li>
            <li><strong>gender: </strong> {data.profile.gender || "N/A"}</li>
            <li>
              <strong>main phone number: </strong> {data.profile.primary_phone_number || "N/A"}
            </li>

            <li>
              <strong>other phone numbers: </strong>
              {data.profile.alternative_phone_numbers || "N/A"}
            </li>
            <li><strong>national id: </strong> {data.profile.nationalId}</li>
          </ul>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};
