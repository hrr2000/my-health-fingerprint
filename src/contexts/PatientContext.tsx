import React, { useContext, useState } from "react";
import useGetPatientProfileData from "@/hooks/useGetPatientProfileData";
import { type GenericProps } from "@/types/application";
import { createContext } from "react";
import useGetHealthRecordData from "@/hooks/useGetHealthRecordData";

const patientContext = createContext<
  Partial<{
    profile: ReturnType<typeof useGetPatientProfileData>;
    records: ReturnType<typeof useGetHealthRecordData>;
    patientId: string;
    setPatientId: React.Dispatch<React.SetStateAction<string>>;
  }>
>({});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
}

const PatientProvider = ({ children }: LocalProps) => {
  const [patientId, setPatientId] = useState("");
  const profile = useGetPatientProfileData(patientId);

  return (
    <patientContext.Provider
      value={{
        profile,
        patientId,
        setPatientId,
      }}
    >
      {children}
    </patientContext.Provider>
  );
};

const usePatientContext = () => useContext(patientContext);
export { PatientProvider, usePatientContext };
