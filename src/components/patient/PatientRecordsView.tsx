import { useState } from "react";
import { usePatientContext } from "@/contexts/PatientContext";
import { TabsProvider, useTabsContext } from "@/contexts/TabsContext";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import ReadView from "../templates/TemplateBuilder/views/ReadView";
import WriteView from "../templates/TemplateBuilder/views/WriteView";
import RegisterCollectionView from "./RegisterCollectionView";
import Modal from "react-modal";
import { api } from "@/utils/api";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { formatFieldNamesToReadable } from "@/utils/helpers";

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
            className={`flex flex-1 flex-col p-2 ${
              data && fetchStatus === "idle"
                ? "items-stretch justify-center"
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
  const [isWriteViewModalOpen, setIsWriteViewModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const { currentTab } = useTabsContext();

  const { data, isLoading } =
    api.patient.getRegisteredCollectionDetails.useQuery(
      {
        collection_name: tabName,
        nationalId: patientId,
      },
      { enabled: currentTab === tabName && !!patientId, cacheTime: 0 }
    );

  const schema = JSON.parse(data?.collectionTemplate.schema || "[]") as {
    is_collection?: boolean;
    is_primary?: boolean;
    collection: string;
    label: string;
    name: string;
    type: string;
  }[][];

  return (
    <div className="relative flex-1">
      {!data && isLoading && <LoadingSpinner />}
      {data && data.collectionData && !data.collectionData?.length && (
        <div className="py-5">
          There is no records.
          <button
            onClick={() => setIsWriteViewModalOpen(true)}
            className="rounded-full  text-highlight underline transition hover:scale-110"
          >
            add now
          </button>
        </div>
      )}
      {data && !!data.collectionData?.length && (
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

              <button
                onClick={() => setIsWriteViewModalOpen(true)}
                className="rounded-full capitalize text-primary transition hover:scale-110"
              >
                <span>
                  <CiCirclePlus size={30} />
                </span>
              </button>
            </div>
          </div>
          <ReadView
            fieldName={fieldName}
            fieldValue={fieldValue}
            data={data.collectionData as { _id: string }[]}
          />
        </>
      )}
      <Modal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            textTransform: "capitalize",
            padding: "2rem",
          },
        }}
        // className={`w-md w- bg-black`}
        isOpen={isWriteViewModalOpen}
      >
        <header className={`flex justify-between`}>
          <h2 className={`font-bold text-slate-800`}>{currentTab}</h2>
          <button
            onClick={() => setIsWriteViewModalOpen(false)}
            className={`cursor-pointer text-slate-500`}
          >
            <AiOutlineClose size={15} />
          </button>
        </header>
        <main>
          <WriteView collectionName={currentTab} patientId={patientId} />
        </main>
      </Modal>
    </div>
  );
};

// function renderOptions(
//   rows: {
//     is_collection?: boolean;
//     is_primary?: boolean;
//     collection: string;
//     label: string;
//     name: string;
//     type: string;
//   }[][]
// ): React.ReactNode {
//   return (
//     <>
//       {rows.map((row) =>
//         row.map((col) => (
//           <option key={col.name} value={col.name}>
//             {col.label}
//           </option>
//         ))
//       )}
//     </>
//   );
// }
