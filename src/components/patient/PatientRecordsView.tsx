import { usePatientContext } from "@/contexts/PatientContext";
import React from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { TabsProvider, useTabsContext } from "@/contexts/TabsContext";
import { api } from "@/utils/api";
import ReadView from "../templates/TemplateBuilder/views/ReadView";
import { IoIosAdd } from "react-icons/io";
import RegisterCollectionView from "./RegisterCollectionView";

const formatFieldNamesToReadable = (fieldName: string) => {
  const separatedFieldName = fieldName.split("_");
  return separatedFieldName.join(" ");
  return fieldName;
};

export const PatientRecordsView = () => {
  const { patientId } = usePatientContext();

  const {
    data,
    fetchStatus,
    refetch: refetchRegisteredCollection,
  } = api.patient.getRegisteredCollections.useQuery(
    { nationalId: patientId || "" },
    {
      enabled: !!patientId,
      retry: 1,
    }
  );

  const registeredCollectionsNames = data?.health_record.map(
    ({ collection_name }) => collection_name
  );

  return (
    <main className={`relative flex flex-1 flex-col`}>
      {!data ? (
        <LoadingSpinner />
      ) : (
        <TabsProvider
          initialValue={data?.health_record[0]?.collection_name || ""}
          defaultTabClassName="px-4 py-2 rounded-lg capitalize bg-primary text-white hover:bg-primary-hover"
          defaultActiveTabClassName="bg-primary  font-semibold bg-pr bg-primary-hover"
        >
          {data && (
            <header className="flex items-center gap-2 bg-slate-100/80 py-2 px-5 text-sm text-black">
              {registeredCollectionsNames?.map((collection_name) => (
                <Tab
                  key={collection_name}
                  value={collection_name}
                  textContext={formatFieldNamesToReadable(collection_name)}
                >
                  {formatFieldNamesToReadable(collection_name)}
                </Tab>
              ))}
              <Tab value="add" textContext={"Add"}>
                <IoIosAdd color="white" size={28} />
              </Tab>
            </header>
          )}
          <section
            className={`flex flex-1 flex-col p-2  ${
              data && fetchStatus === "idle"
                ? "items-stretch justify-center "
                : "items-stretch justify-start"
            }`}
          >
            <div className="flex w-full flex-1 px-3">
              {data.health_record.map(({ collection_name }) => (
                <TabPanel key={collection_name} value={collection_name}>
                  <PatientCollectionDetailsView
                    patientId={patientId || ""}
                    tabName={collection_name}
                  />
                </TabPanel>
              ))}
              <TabPanel value="add">
                <RegisterCollectionView
                  registeredCollections={registeredCollectionsNames || []}
                  refetchOnAdd={() => void refetchRegisteredCollection()}
                  patientId={patientId || ""}
                />
              </TabPanel>
            </div>
          </section>
        </TabsProvider>
      )}
    </main>
  );
};

const PatientCollectionDetailsView = ({
  tabName,
  patientId,
}: {
  tabName: string;
  patientId: string;
}) => {
  const { currentTab } = useTabsContext();
  const { data: d, isLoading } =
    api.patient.getRegisteredCollectionDetails.useQuery(
      { collection_name: tabName, nationalId: patientId },
      { enabled: currentTab === tabName && !!patientId, cacheTime: 0 }
    );

  return (
    <div className="relative flex-1">
      {d ? (
        <>
          <div className="mb-5 flex flex-col rounded-md bg-slate-200 py-3 px-6">
            <h3 className="py-2 text-xl font-bold">Search :</h3>
            <div className="flex gap-2">
              <select
                className="rounded-md border-0 bg-slate-300 capitalize outline-0"
                name=""
                id=""
              >
                <option selected>field names</option>
                {renderOptions(d.collectionData)}
              </select>
              <input
                className="rounded-md border-0 bg-slate-300 outline-0"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <ReadView data={d.collectionData as { _id: string }[]} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

function renderOptions<T>(data: T): React.ReactNode {
  console.log(data);

  if (Array.isArray(data) && typeof data[0] === "object") {
    const temp = data as Array<object>;
    const fieldNames = Object.entries(temp[0] || []);
    console.log(fieldNames);

    return (
      <>
        {fieldNames.map(
          ([k, _]) =>
            k !== "_id" && (
              <option key={k} value={k}>
                {k}
              </option>
            )
        )}
      </>
    );
  }
  return <></>;
}
