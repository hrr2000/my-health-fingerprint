import { usePatientContext } from "@/contexts/PatientContext";
import React from "react";

export const PatientRecordsView = () => {
  const { records } = usePatientContext();
  return <div>{JSON.stringify(records)}</div>;
};
