import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { type GenericProps } from "@/types/application";
import { createContext } from "react";

const tabsContext = createContext<
  Partial<{
    setCurrentTab: Dispatch<SetStateAction<any>> | undefined;
    currentTab: string;
    tabs: string[];
    defaultTabClassName: string;
    defaultActiveTabClassName: string;
  }>
>({});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
  initialValue: string;
  defaultTabClassName: string;
  defaultActiveTabClassName: string;
}

// (typeof tabs)[number]
const TabsProvider = ({
  children,
  initialValue,
  defaultTabClassName,
  defaultActiveTabClassName,
}: LocalProps) => {
  const [currentTab, setCurrentTab] = useState(initialValue);
  return (
    <tabsContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        defaultTabClassName,
        defaultActiveTabClassName,
      }}
    >
      {children}
    </tabsContext.Provider>
  );
};

const useTabsContext = () => useContext(tabsContext);

export { TabsProvider, useTabsContext };
