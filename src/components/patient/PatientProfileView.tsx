import { usePatientContext } from "@/contexts/PatientContext";
import useGetPatientProfileData from "@/hooks/useGetPatientProfileData";
import React from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const PatientProfileView = () => {
  const { patientId } = usePatientContext();
  const { data, error, fetchStatus } = useGetPatientProfileData(
    patientId || ""
  );
  return (
    <div>
      {data ? <div>{JSON.stringify(data.profile)}</div> : <LoadingSpinner />}
    </div>
  );
};
