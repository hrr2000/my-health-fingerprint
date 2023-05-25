import React from "react";
import { useTabsContext } from "../../contexts/TabsContext";
import { type GenericProps } from "@/types/application";

interface LocalProps extends GenericProps {
  value: string;
  children: React.ReactNode;
}
export const TabPanel = ({ value, children }: LocalProps) => {
  const { currentTab } = useTabsContext();
  return <>{currentTab === value && children}</>;
};
