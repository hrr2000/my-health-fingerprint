import { usePatientContext } from "@/contexts/PatientContext";
import useGetHealthRecordData from "@/hooks/useGetHealthRecordData";
import React from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { TabsProvider } from "@/contexts/TabsContext";

const formatFieldNamesToReadable = (fieldName: string) => {
  const separatedFieldName = fieldName.split("_");
  return separatedFieldName.join(" ");
};

export const PatientRecordsView = () => {
  const { patientId } = usePatientContext();
  const { data, error, fetchStatus } = useGetHealthRecordData(
    patientId || "",
    "registered_collections"
  );
  return (
    <main>
      {!data ? (
        <LoadingSpinner />
      ) : (
        <TabsProvider
          initialValue={data?.health_record[0]?.collection_name || ""}
          defaultTabClassName="font-semibold rounded-md p-2 capitalize rounded-md"
          defaultActiveTabClassName="bg-violet-500 text-white shadow-md "
        >
          {data && (
            <header className="min-w-[100px] flex-col gap-2 border-[1px] border-b-black/20 p-1 text-lg  text-black">
              {data.health_record.map(({ collection_name }) => (
                <Tab
                  key={collection_name}
                  value={collection_name}
                  textContext={formatFieldNamesToReadable(collection_name)}
                >
                  {formatFieldNamesToReadable(collection_name)}
                </Tab>
              ))}
            </header>
          )}
          <section
            className={` flex  flex-1 flex-col p-2  ${
              data && fetchStatus === "idle"
                ? "items-center justify-center"
                : ""
            }`}
          >
            <div>
              {data.health_record.map(({ collection_name }) => (
                <TabPanel key={collection_name} value={collection_name}>
                  {collection_name}
                </TabPanel>
              ))}
            </div>
          </section>
        </TabsProvider>
      )}
    </main>
  );
};

//  {
//    registeredCollections.health_record.map(({ collection_name }) => (
//      <li key={collection_name}>{collection_name}</li>
//    ));
//  }
