import { usePatientContext } from "@/contexts/PatientContext";
import useGetHealthRecordData from "@/hooks/useGetHealthRecordData";
import React from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { TabsProvider, useTabsContext } from "@/contexts/TabsContext";
import { api } from "@/utils/api";

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
    <main className={``}>
      {!data ? (
        <LoadingSpinner />
      ) : (
        <TabsProvider
          initialValue={data?.health_record[0]?.collection_name || ""}
          defaultTabClassName="px-4 py-2 rounded-lg capitalize"
          defaultActiveTabClassName="bg-primary text-white font-semibold"
        >
          {data && (
            <header className="flex items-center bg-slate-100/80 py-2 px-5 text-sm text-black">
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
                  <CollectionDetailsView
                    patientId={patientId || ""}
                    tabName={collection_name}
                  />
                </TabPanel>
              ))}
            </div>
          </section>
        </TabsProvider>
      )}
    </main>
  );
};

const CollectionDetailsView = ({
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
  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      {d && (
        <>
          <div>{JSON.stringify(d.collectionData, null, 2)}</div>
          <div>{JSON.stringify(d.collectionTemplate, null, 2)}</div>
        </>
      )}
    </div>
  );
};

//  {
//    registeredCollections.health_record.map(({ collection_name }) => (
//      <li key={collection_name}>{collection_name}</li>
//    ));
//  }
