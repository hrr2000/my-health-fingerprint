import { usePatientContext } from "@/contexts/PatientContext";
import useGetHealthRecordData from "@/hooks/useGetHealthRecordData";
import React from "react";

export const PatientRecordsView = () => {
  const { patientId } = usePatientContext();
  const records = useGetHealthRecordData(patientId || "");
  return <div>{JSON.stringify(records)}</div>;
};
