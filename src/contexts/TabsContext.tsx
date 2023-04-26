import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { type GenericProps } from "@/types/application";
import { createContext } from "react";

const tabsContext = createContext<
  Partial<{
    setCurrentTab: Dispatch<SetStateAction<any>> | undefined;
    currentTab: string;
    tabs: string[];
  }>
>({});

interface LocalProps extends GenericProps {
  children: React.ReactNode;
  initialValue: string;
}

// (typeof tabs)[number]
const TabsProvider = ({ children, initialValue }: LocalProps) => {
  const [currentTab, setCurrentTab] = useState(initialValue);
  return (
    <tabsContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </tabsContext.Provider>
  );
};

const useTabsContext = () => useContext(tabsContext);

export { TabsProvider, useTabsContext };
