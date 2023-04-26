import React from "react";
import { useTabsContext } from "./TabsContext";
import { type GenericProps } from "@/types/application";

interface LocalProps extends GenericProps {
  value: string;
  className?: string;
  activeClassName?: string;
  textContext: string;
}
export const Tab = ({
  value,
  className,
  textContext,
  activeClassName,
}: LocalProps) => {
  const {
    setCurrentTab,
    defaultActiveTabClassName,
    defaultTabClassName,
    currentTab,
  } = useTabsContext();

  const activeClasses = activeClassName
    ? activeClassName
    : defaultActiveTabClassName;
  const classes = className ? className : defaultTabClassName;

  return (
    <button
      onClick={() => setCurrentTab?.(value)}
      className={currentTab === value ? activeClasses : classes}
    >
      {textContext}
    </button>
  );
};
