import { api } from "@/utils/api";

export default function useGetHealthRecordData(patientId: string) {
  // console.log({ patientId });

  const { data, fetchStatus, error } = api.patient.getRecords.useQuery(
    { id: patientId },
    {
      enabled: !!patientId,
      retry: 1,
    }
  );
  return { data, fetchStatus, error };
}
