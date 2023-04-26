import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Modal from 'react-modal';

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
  appendRow: (columnsCount: number) => void;
  removeRow: (index: number) => void;
  updateColumn: (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => void;
}>({
  templateDetails: templateDetailsInitialValues,
  collectionDetails: collectionDetailsInitialValues,
  appendRow: (columnsCount: number) => {
    return undefined;
  },
  removeRow: (index: number) => {
    return undefined;
  },
  updateColumn: (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => {
    return undefined;
  },
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
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    </TemplateBuilderContext.Provider>
  );
}

export const useTemplateBuilder = () => useContext(TemplateBuilderContext);
