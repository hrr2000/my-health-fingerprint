import {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';

export const templateDetailsInitialValues = {
  name: "",
  schema: [],
  printable: false,
  public: false
};

export const collectionDetailsInitialValues = {
  name: "",
  description: "",
  icon: "",
  public: false,
  organization: ""
}

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

export const TemplateBuilderContext = createContext<{
  templateDetails: TemplateDetails,
  collectionDetails: CollectionDetails,
  setTemplateDetails?: Dispatch<SetStateAction<TemplateDetails>>,
  setCollectionDetails?: Dispatch<SetStateAction<CollectionDetails>>,
  appendRow: (columnsCount: number) => void,
  removeRow: (index: number) => void,
  updateColumn: (rowIndex: number, columnIndex: number, updateQuery: Partial<TemplateComponent>) => void
}>({
  templateDetails: templateDetailsInitialValues,
  collectionDetails: collectionDetailsInitialValues,
  appendRow: (columnsCount: number) => {},
  removeRow: (index: number) => {},
  updateColumn: (rowIndex: number, columnIndex: number, updateQuery: Partial<TemplateComponent>) => {}
});

export function TemplateBuilderContextProvider({children}: {children: ReactNode}) {
  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(templateDetailsInitialValues);
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(collectionDetailsInitialValues);

  const appendRow = (columnsCount: number) => {
    if(!columnsCount || columnsCount > 4) return;
    const row = [];
    for(let i = 0; i < columnsCount; i ++) row.push({})
    setTemplateDetails({
      ...templateDetails,
      schema: [...templateDetails.schema, row]
    });
  }

  const removeRow = (index: number) => {
    setTemplateDetails({
      ...templateDetails,
      schema: templateDetails.schema.filter((item, idx) => idx != index)
    });
  }

  const updateColumn = (rowIndex: number, columnIndex: number, updateQuery: Partial<TemplateComponent>) => {
    const tmpSchema = templateDetails.schema;
    if(tmpSchema?.[rowIndex]?.[columnIndex]) {
      // @ts-ignore
      tmpSchema[rowIndex][columnIndex] = {
        ...tmpSchema?.[rowIndex]?.[columnIndex],
        ...updateQuery
      };
    }
    setTemplateDetails({
      ...templateDetails,
      schema: tmpSchema
    });
  }

  return (
    <TemplateBuilderContext.Provider value={{
      templateDetails,
      setTemplateDetails,
      collectionDetails,
      setCollectionDetails,
      appendRow,
      removeRow,
      updateColumn
    }}>
      {children}
    </TemplateBuilderContext.Provider>
  )
}
