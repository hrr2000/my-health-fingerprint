import { type GetServerSidePropsContext } from "next";

export const getServerQueryParams = (context: GetServerSidePropsContext) => {
  return context.query;
};

export const areAnyValuesEmpty = (values: Record<string, string>) => {
  const formValues = Object.values(values);
  return formValues.some((value) => value === "");
};

export const formatFieldNamesToReadable = (fieldName: string) => {
  const separatedFieldName = fieldName.split("_");
  return separatedFieldName.join(" ");
};

export const getDirection = (isRTL) => {
  if(isRTL) return 'rtl';
  return 'ltr'
}

export const isRTL = (locale: string) => {
  if(['ar'].includes(locale)) return true;
  return false
}
