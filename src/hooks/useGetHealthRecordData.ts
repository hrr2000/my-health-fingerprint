import { api } from "@/utils/api";

export default function useGetHealthRecordData(
  patientId: string,
  requestedData: "registered_collections" | "unregistered_collections" | ""
) {
  const dataObj = api.patient.getRegisteredCollections.useQuery(
    { nationalId: patientId },
    {
      enabled: !!patientId && requestedData === "registered_collections",
      retry: 1,
    }
  );

  return { dataObj };
}
