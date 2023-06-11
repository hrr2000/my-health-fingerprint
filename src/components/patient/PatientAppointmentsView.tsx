import { usePatientContext } from "@/contexts/PatientContext";
import { api } from "@/utils/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSession } from "next-auth/react";
import ReadView, {
  IRow,
} from "@/components/templates/TemplateBuilder/views/ReadView";
import GenericButton from "@/components/common/GenericButton";

export function PatientAppointmentsView() {
  const { patientId } = usePatientContext();

  return (
    <main className={`relative flex flex-1 flex-col`}>
      <section
        className={`flex flex-1 flex-col items-stretch justify-center p-2 `}
      >
        <div className="flex w-full flex-1 px-3">
          <PatientAppointmentsDetailsView patientId={patientId} />
        </div>
      </section>
    </main>
  );
}

type appointmentsEntry = {
  organization_name: string;
  started_by: string;
  start_date: Date;
  end_date: Date;
};

const PatientAppointmentsDetailsView = ({
  patientId,
}: {
  patientId: string;
}) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const {
    data: { user },
  } = useSession();

  const {
    data,
    isLoading: isLoadingAppointments,
    refetch,
  } = api.patient.getRegisteredCollectionDetails.useQuery(
    {
      collection_name: "appointments",
      nationalId: patientId,
    },
    { enabled: !!patientId, retry: 0 }
  );

  const {
    mutate: save,
    isLoading: isAddingAppointment,
    isSuccess,
    error,
  } = api.patient.addEntryToCollection.useMutation({
    onSuccess: () => refetch(),
  });

  const {
    mutate: update,
    isLoading: isUpdatingAppointment,
  } = api.patient.updateEntryOfCollection.useMutation({
    onSuccess: () => refetch(),
  });

  const schema = JSON.parse(data?.collectionTemplate.schema || "[]") as {
    is_collection?: boolean;
    is_primary?: boolean;
    collection: string;
    label: string;
    name: string;
    type: string;
  }[][];

  const isSessionActive = !!(
    data?.collectionData as appointmentsEntry[]
  )?.filter((item) => !item.end_date).length;

  return (
    <div className="relative flex-1">
      {!data && isLoadingAppointments && <LoadingSpinner />}
      {data && (
        <>
          <div className="mb-5 flex flex-col rounded-md bg-slate-100 py-3 px-6 shadow-md">
            {/* <h3 className="py-2 text-xl font-bold">Search :</h3> */}
            <div className="flex items-center justify-between gap-2">
              <div className="space-x-2">
                <select
                  className="rounded-md border-0 bg-slate-100 capitalize outline-0"
                  name="fieldName"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                >
                  <option value="">field names</option>
                  {schema.map((row) =>
                    row.map((col) => (
                      <>
                        {Object.entries(col).length && col.type !== "date" && (
                          <option key={col.name} value={col.name}>
                            {col.label}
                          </option>
                        )}
                      </>
                    ))
                  )}
                </select>
                <input
                  className="w-96 rounded-md border-0 bg-slate-200 outline-0"
                  placeholder={"Search..."}
                  type="text"
                  onChange={(e) => setFieldValue(e.target.value)}
                  value={fieldValue}
                  name="fieldValue"
                  id=""
                />
              </div>
              <div className={`flex gap-2 items-center ${isSessionActive ? `text-green-500` : `text-red-500`}`}>
                {isSessionActive ? (
                  <span className={`bg-green-500 h-2 w-2 block rounded-full`}></span>
                ) : (
                  <span className={`bg-red-500 h-2 w-2 block rounded-full`}></span>
                )}
                <span>
                  {isSessionActive ? `On going session` : `No session is Active`}
                </span>
              </div>
              <GenericButton
                onClick={() => {
                  if (!isSessionActive) {
                    save({
                      collectionName: "appointments",
                      patientId: patientId,
                      data: {
                        organization_name: user.orgName,
                        started_by: user.name,
                        start_date: new Date(),
                        end_date: null,
                      },
                    });
                    return;
                  }
                  update({
                    collectionName: "appointments",
                    patientId: patientId,
                  });
                }}
                theme={`${!isSessionActive ? "primary" : "secondary"}`}
              >
                {isSessionActive ? "stop" : "start"}
              </GenericButton>
            </div>
          </div>
        </>
      )}
      <ReadView
        data={data?.collectionData?.reverse() as IRow[]}
        fieldName={fieldName}
        fieldValue={fieldValue}
      />
    </div>
  );
};
