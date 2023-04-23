import {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';

const templateDetailsInitialValues = {
  name: "",
  schema: [],
  printable: false,
  public: false
};

const collectionDetailsInitialValues = {
  name: "",
  description: "",
  icon: "",
  public: false,
  organization: ""
}

interface TemplateComponent {
  _id: string;
  type: string;
  entity?: string;
}

interface TemplateDetails {
  name: string;
  schema: (TemplateComponent & {position: number[]})[];
  printable: boolean;
  public: boolean;
}

interface CollectionDetails {
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
}>({
  templateDetails: templateDetailsInitialValues,
  collectionDetails: collectionDetailsInitialValues,
});

export function TemplateBuilderContextProvider({children}: {children: ReactNode}) {
  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(templateDetailsInitialValues);
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(collectionDetailsInitialValues);

  return (
    <TemplateBuilderContext.Provider value={{templateDetails, setTemplateDetails, collectionDetails, setCollectionDetails}}>
      {children}
    </TemplateBuilderContext.Provider>
  )
}
