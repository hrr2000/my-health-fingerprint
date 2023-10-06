export interface TemplateDetails {
  name?: string;
  schema?: Partial<TemplateComponent>[][] | string;
  isPrintable?: boolean;
}

export interface CollectionDetails {
  name: string;
  displayNameEn: string;
  displayNameAr: string;
  description: string;
  isPublic: boolean;
  isPatientProfile: boolean;
  isPatientSpecific: boolean;
}

export interface TemplateComponent {
  _id: string;
  type: string;
  name: string;
  collection?: string;
  label: string;
}

export const templateDetailsInitialValues = {
  name: "main",
  schema: [],
  isPrintable: false,
};

export const collectionDetailsInitialValues = {
  name: "",
  description: "",
  displayNameEn: "",
  displayNameAr: "",
  isPublic: false,
  isPatientProfile: false,
  isPatientSpecific: false,
};
