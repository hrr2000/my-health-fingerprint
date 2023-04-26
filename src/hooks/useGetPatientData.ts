import { useState } from "react";
import { api } from "@/utils/api";

export default function useGetPatientData() {
  const [patientId, setPatientId] = useState("");
  const { data, fetchStatus, error } = api.patient.findOne.useQuery(
    { id: patientId },
    { enabled: !!patientId, retry: 1 }
  );
  return { setPatientId, data, fetchStatus, error };
}
