import React from "react";
import { api } from "@/utils/api";
import { LoadingSpinner } from "../common/LoadingSpinner";
import Link from "next/link";
import {CiMedicalCase} from 'react-icons/ci';

export default function RegisterCollectionView({
  patientId,
  registeredCollections,
  refetchOnAdd,
}: {
  patientId: string;
  registeredCollections: string[];
  refetchOnAdd: () => void;
}) {
  const { data } = api.patient.getUnRegisteredCollections.useQuery(
    { registeredCollections },
    {
      enabled: !!patientId,
      retry: 1,
      cacheTime: 0,
    }
  );
  const {
    mutate,
    isSuccess: isRegisterSuccess,
    isLoading: isRegistering,
  } = api.patient.registerCollection.useMutation();
  if (isRegisterSuccess) {
    refetchOnAdd();
  }

  return (
    <div className={`relative grid w-full grid-cols-collections`}>
      {!data ? (
        <LoadingSpinner />
      ) : !data.length ? (
        <div className={`relative grid w-full place-items-center `}>
          <div className="text-center">
            <h2 className="mb-4 text-4xl">No More Collections to Add</h2>
            <div className="text-lg capitalize">
              <span className="mx-2">
                if you have something in mind please you want to add
              </span>
              <Link
                className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-hover"
                href={"/dashboard/collections"}
              >
                click here
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative grid w-full grid-cols-collections gap-5 content-start`}>
          {data.map(({ name }) => (
            <button
              disabled={isRegistering}
              onClick={() => {
                mutate({ collectionName: name, patientId });
              }}
              className={`relative flex w-full flex-col items-start justify-center rounded-xl border-[1px] border-slate-300 p-5 capitalize duration-300 disabled:grayscale hover:border-primary hover:shadow-lg`}
              key={name}
            > 
              <div className="flex items-center gap-2">
                <span><CiMedicalCase size={23} /></span>
                <span>{name}</span>
              </div>
              {isRegistering && <LoadingSpinner />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
