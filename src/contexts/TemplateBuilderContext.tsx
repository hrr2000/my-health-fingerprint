import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from "react-icons/ai";

export const templateDetailsInitialValues = {
  name: "",
  schema: [],
  printable: false,
  public: false,
};

export const collectionDetailsInitialValues = {
  name: "",
  description: "",
  icon: "",
  public: false,
  organization: "",
};

export interface TemplateComponent {
  _id: string;
  type: string;
  collection?: string;
}

export interface TemplateDetails {
  name: string;
  schema: Partial<TemplateComponent>[][];
  printable: boolean;
  public: boolean;
}

export interface CollectionDetails {
  name: string;
  description: string;
  icon: string;
  public: boolean;
  organization: string;
}

const TemplateBuilderContext = createContext<{
  templateDetails: TemplateDetails;
  collectionDetails: CollectionDetails;
  setTemplateDetails?: Dispatch<SetStateAction<TemplateDetails>>;
  setCollectionDetails?: Dispatch<SetStateAction<CollectionDetails>>;
  openModal: () => void;
  closeModal: () => void;
  appendRow: (columnsCount: number) => void;
  removeRow: (index: number) => void;
  updateColumn: (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>,
  ) => void;
}>({
  templateDetails: templateDetailsInitialValues,
  collectionDetails: collectionDetailsInitialValues,
  openModal: () => undefined,
  closeModal: () => undefined,
  appendRow: (columnsCount: number) => undefined,
  removeRow: (index: number) => undefined,
  updateColumn: (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => undefined,
});

export function TemplateBuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(
    templateDetailsInitialValues
  );
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    collectionDetailsInitialValues
  );

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const appendRow = (columnsCount: number) => {
    if (!columnsCount || columnsCount > 4) return;
    const row = [];
    for (let i = 0; i < columnsCount; i++) row.push({});
    setTemplateDetails({
      ...templateDetails,
      schema: [...templateDetails.schema, row],
    });
  };

  const removeRow = (index: number) => {
    setTemplateDetails({
      ...templateDetails,
      schema: templateDetails.schema.filter((_, idx) => idx != index),
    });
  };

  const updateColumn = (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => {
    const tmpSchema = templateDetails.schema;
    if (tmpSchema[rowIndex]) {
      const columns = tmpSchema[rowIndex];
      if (columns) {
        columns[columnIndex] = {
          ...tmpSchema?.[rowIndex]?.[columnIndex],
          ...updateQuery,
        };
      }
    }
    setTemplateDetails({
      ...templateDetails,
      schema: tmpSchema,
    });
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <TemplateBuilderContext.Provider
      value={{
        templateDetails,
        collectionDetails,
        setTemplateDetails,
        setCollectionDetails,
        appendRow,
        removeRow,
        updateColumn,
        openModal,
        closeModal
      }}
    >
      {children}
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={`w-[600px]`}>
            <h2 className={`flex justify-between border-b-2`}>
              <span className={`font-bold text-slate-800`}>Primary Fields</span>
              <button
                onClick={() => closeModal()}
                className={`text-slate-500 cursor-pointer`}>
                <AiOutlineClose size={15} />
              </button>
            </h2>
            <div className={`my-3 flex gap-3`}>
              <div className={`border-2 w-fit p-5 duration-300 hover:border-black cursor-pointer`}>
                Text Field
              </div>
              <div className={`border-2 w-fit p-5 duration-300 hover:border-black cursor-pointer`}>
                Number Field
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </TemplateBuilderContext.Provider>
  );
}

export const useTemplateBuilder = () => useContext(TemplateBuilderContext);
