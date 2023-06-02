import { api } from "@/utils/api";

export default function useGetHealthRecordData(
  patientId: string,
  requestedData: "registered_collections" | "unregistered_collections" | ""
) {
  let dataObj = null;
  dataObj = api.patient.getRegisteredCollections.useQuery(
    { nationalId: patientId },
    {
      enabled: !!patientId && requestedData === "registered_collections",
      retry: 1,
    }
  );
  // dataObj = api.patient.getUnRegisteredCollections.useQuery(
  //   { registeredCollections: [] },
  //   {
  //     enabled: !!patientId && requestedData === "unregistered_collections",
  //     retry: 1,
  //   }
  // );
  return { dataObj };
}
