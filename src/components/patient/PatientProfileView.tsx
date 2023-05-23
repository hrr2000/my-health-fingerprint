import { usePatientContext } from "@/contexts/PatientContext";
import useGetPatientProfileData from "@/hooks/useGetPatientProfileData";
import React from "react";

export const PatientProfileView = () => {
  const { patientId } = usePatientContext();
  const profile = useGetPatientProfileData(patientId || "");
  return <div>{JSON.stringify(profile)}</div>;
};
