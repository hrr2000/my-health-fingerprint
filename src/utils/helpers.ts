import { type GetServerSidePropsContext } from "next";

export const getServerQueryParams = (context: GetServerSidePropsContext) => {
  return context.query;
};
