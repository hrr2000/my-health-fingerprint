import React, { useContext, useState } from "react";
import useGetPatientData from "@/hooks/useGetPatientData";
import { type GenericProps } from "@/types/application";
import { createContext } from "react";

const paginationContext = createContext<{
  perPage?: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}>({
  perPage: 10,
  dataSource: null,
});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
  perPage?: number;
  dataSource: () => void;
}

const PaginationProvider = ({
  children,
  perPage = 10,
  dataSource,
}: LocalProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <paginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </paginationContext.Provider>
  );
};

const usePaginationContext = () => useContext(paginationContext);
export { PaginationProvider, usePaginationContext };
