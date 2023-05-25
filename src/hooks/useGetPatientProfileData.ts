import { api } from "@/utils/api";

export default function useGetPatientProfileData(patientId: string) {
  // console.log({ patientId });

  const { data, fetchStatus, error } = api.patient.getProfile.useQuery(
    { nationalId: patientId },
    {
      enabled: !!patientId,
      retry: 1,
    }
  );
  return { data, fetchStatus, error };
}
