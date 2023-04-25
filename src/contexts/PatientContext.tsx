import React, { useContext } from "react";
import useGetPatientData from "@/hooks/useGetPatientData";
import { type GenericProps } from "@/types/application";
import { createContext } from "react";

const patientContext = createContext<
  Partial<ReturnType<typeof useGetPatientData>>
>({});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
}

const PatientProvider = ({ children }: LocalProps) => {
  const { data, error, fetchStatus, setPatientId } = useGetPatientData();

  return (
    <patientContext.Provider value={{ data, error, fetchStatus, setPatientId }}>
      {children}
    </patientContext.Provider>
  );
};

const usePatientContext = () => useContext(patientContext);
export { PatientProvider, usePatientContext };
