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
    mode?: "submit" | "reset" | "button";
    setPatientId: React.Dispatch<React.SetStateAction<string>>;
    setMode: React.Dispatch<React.SetStateAction<"submit" | "reset">>;
  }>
>({});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
}

const PatientProvider = ({ children }: LocalProps) => {
  const [patientId, setPatientId] = useState("");
  const [mode, setMode] = useState<"submit" | "reset" | "button">("button");
  const profile = useGetPatientProfileData(mode === "submit" ? patientId : "");

  return (
    <patientContext.Provider
      value={{
        profile,
        patientId,
        mode,
        setMode,
        setPatientId,
      }}
    >
      {children}
    </patientContext.Provider>
  );
};

const usePatientContext = () => useContext(patientContext);
export { PatientProvider, usePatientContext };
