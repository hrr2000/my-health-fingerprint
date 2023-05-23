import { usePatientContext } from "@/contexts/PatientContext";
import React from "react";

export const PatientProfileView = () => {
  const { profile } = usePatientContext();
  return <div>{JSON.stringify(profile)}</div>;
};
